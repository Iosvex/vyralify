import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Package, 
  Smartphone, 
  ArrowRight, 
  Download, 
  Trash2, 
  Edit3, 
  Crown, 
  Lock, 
  ShieldCheck, 
  Tag, 
  Clock, 
  Eye, 
  CreditCard,
  AlertCircle,
  Search,
  Upload,
  File,
  FileText,
  Link as LinkIcon,
  Mail,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';

// Curated Ready-to-Sell Winning Products Library
const WINNING_CATALOG = [
  {
    id: 'win_1',
    title: 'The Faceless Page Operating Manual (2026 Edition)',
    type: 'Digital Guide (PDF)',
    niche: 'Business & Money',
    suggestedPrice: '₹499',
    avgMonthlyRevenue: '₹28,500/mo',
    margin: '100% Digital Margin',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.'
  },
  {
    id: 'win_2',
    title: '150+ Viral Retention Hooks & Pattern Interrupts',
    type: 'Notion Database',
    niche: 'All Niches',
    suggestedPrice: '₹299',
    avgMonthlyRevenue: '₹34,200/mo',
    margin: '100% Digital Margin',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.'
  },
  {
    id: 'win_3',
    title: '1-on-1 Theme Page Growth Audit & Strategy Call',
    type: 'Consultation (30 Min)',
    niche: 'Business & Self-Improvement',
    suggestedPrice: '₹1,999',
    avgMonthlyRevenue: '₹48,000/mo',
    margin: 'High-Ticket Service',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    description: 'Direct 30-minute private screen-share consultation reviewing content calendar, bio structure, and DM funnel architecture.'
  },
  {
    id: 'win_4',
    title: 'Faceless B-Roll Aesthetic Video Vault (500+ Clips)',
    type: 'Digital Asset Pack',
    niche: 'Lifestyle & Luxury',
    suggestedPrice: '₹699',
    avgMonthlyRevenue: '₹22,400/mo',
    margin: '100% Digital Margin',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    description: 'Curated 4K vertical footage library of luxury cars, lo-fi workspaces, city skylines, and moody coffee clips ready to caption.'
  }
];

export default function StoreCommerce({ onNavigate }) {
  const { user, tier } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Sub-Tab Navigation: 'builder' | 'products' | 'winning' | 'orders' | 'resale'
  const [activeTab, setActiveTab] = useState('builder');

  // Store Customizer State
  const [storeThemeColor, setStoreThemeColor] = useState('emerald');
  const [storeHeadline, setStoreHeadline] = useState(`Official Resource Vault & Toolkits`);
  const [storeBio, setStoreBio] = useState(`Digital products, cheat sheets, and 1-on-1 strategy calls to fast-track your results in ${activePage?.category || 'business'}.`);
  const [copiedStoreLink, setCopiedStoreLink] = useState(false);

  // Products List State
  const [products, setProducts] = useState([
    {
      id: 'prod_1',
      title: 'Faceless Theme Page Master Blueprint',
      price: '₹499',
      type: 'Digital Product',
      salesCount: 84,
      revenue: '₹41,916',
      status: 'active',
      ctaText: 'Get Instant Access &rarr;'
    },
    {
      id: 'prod_2',
      title: '1-on-1 Page Audit & Consultation (30m)',
      price: '₹1,499',
      type: 'Service / Call',
      salesCount: 12,
      revenue: '₹17,988',
      status: 'active',
      ctaText: 'Book Calendar Slot &rarr;'
    }
  ]);

  // Create Product Modal State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    price: '₹499',
    type: 'Digital Product',
    deliveryMethod: 'upload', // 'upload' | 'link'
    fileData: null,
    fileName: '',
    fileSize: '',
    accessUrl: '',
    description: '',
    ctaText: 'Unlock Download & Instant Access'
  });

  // Orders Log State & Search Query
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { id: 'ORD-8921', customer: 'Vikram Sharma', email: 'vikram@example.com', product: 'Faceless Theme Page Master Blueprint', amount: '₹499', amountNumeric: 499, date: 'Today, 14:12', status: 'Paid', deliveryAccess: 'Delivered (PDF)' },
    { id: 'ORD-8920', customer: 'Sara Khan', email: 'sara@creates.io', product: 'Faceless Theme Page Master Blueprint', amount: '₹499', amountNumeric: 499, date: 'Today, 11:45', status: 'Paid', deliveryAccess: 'Delivered (PDF)' },
    { id: 'ORD-8919', customer: 'Aarav Patel', email: 'aarav@gmail.com', product: '1-on-1 Page Audit & Consultation', amount: '₹1,499', amountNumeric: 1499, date: 'Yesterday', status: 'Paid', deliveryAccess: 'Calendar Scheduled' },
    { id: 'ORD-8918', customer: 'Priya Joshi', email: 'priya@outlook.com', product: 'Faceless Theme Page Master Blueprint', amount: '₹499', amountNumeric: 499, date: 'Yesterday', status: 'Paid', deliveryAccess: 'Delivered (PDF)' },
    { id: 'ORD-8917', customer: 'Rohan Gupta', email: 'rohan@tech.in', product: 'Faceless Theme Page Master Blueprint', amount: '₹499', amountNumeric: 499, date: '2 days ago', status: 'Paid', deliveryAccess: 'Delivered (PDF)' }
  ]);

  // Public Storefront URL
  const storeUrl = `vyralify.in/u/${activePage?.handle || 'creator'}`;

  // Initial load of custom products & orders
  useEffect(() => {
    const savedProds = localStorage.getItem('vyralify_store_products');
    if (savedProds) {
      try {
        setProducts(JSON.parse(savedProds));
      } catch (e) {}
    }

    const savedOrders = localStorage.getItem('vyralify_store_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {}
    }
  }, []);

  // Sync store settings & products for the public storefront /u/:slug
  useEffect(() => {
    localStorage.setItem('vyralify_store_products', JSON.stringify(products));
    const handleKey = (activePage?.handle || 'creator').replace(/^@/, '');
    localStorage.setItem(`vyralify_store_${handleKey}`, JSON.stringify({
      handle: handleKey,
      headline: storeHeadline,
      bio: storeBio,
      products: products,
      themeColor: storeThemeColor,
      avatar: activePage?.avatar
    }));
  }, [products, storeHeadline, storeBio, storeThemeColor, activePage?.handle, activePage?.avatar]);

  // Real-time Firestore sync for incoming live store orders
  useEffect(() => {
    const handleKey = (activePage?.handle || 'creator').replace(/^@/, '');
    try {
      const q = query(
        collection(db, 'storeOrders'),
        where('pageHandle', '==', handleKey)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const remoteList = [];
          snapshot.forEach(docSnap => remoteList.push({ id: docSnap.id, ...docSnap.data() }));
          setOrders(prev => {
            const merged = [...remoteList, ...prev.filter(p => !remoteList.some(r => r.id === p.id))];
            localStorage.setItem('vyralify_store_orders', JSON.stringify(merged));
            return merged;
          });
        }
      }, (err) => {
        console.warn('Store orders listener fallback:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Store orders listener init warning:', e);
    }
  }, [activePage?.handle]);

  // Copy Storefront Link
  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    setCopiedStoreLink(true);
    addNotification({
      title: 'Store Link Copied',
      message: `https://${storeUrl} copied to clipboard! Paste into your Instagram Bio link.`,
      type: 'success'
    });
    setTimeout(() => setCopiedStoreLink(false), 2000);
  };

  // Digital Asset File Upload Handler (Base64 data URL)
  const handleDigitalFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      addNotification({
        title: 'File Too Large',
        message: 'File size must be under 15MB. For larger videos or archives, choose External Access Link.',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setNewProd(prev => ({
        ...prev,
        fileData: dataUrl,
        fileName: file.name,
        fileSize: `${sizeMb} MB`
      }));
      addNotification({
        title: 'Asset Attached',
        message: `Successfully attached ${file.name} (${sizeMb} MB) for automated customer delivery.`,
        type: 'success'
      });
    };
    reader.readAsDataURL(file);
  };

  // Create Product (Gated by Tier)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProd.title.trim()) return;

    // Check Plan Limits: Free = 1 product, Pro = Unlimited
    if (tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Free plan includes 1 product slot. Upgrade to Pro to list unlimited digital goods and services.'
      );
      return;
    }

    const created = {
      id: 'prod_' + Date.now(),
      title: newProd.title,
      price: newProd.price,
      type: newProd.type,
      deliveryMethod: newProd.deliveryMethod,
      fileData: newProd.fileData,
      fileName: newProd.fileName,
      fileSize: newProd.fileSize,
      accessUrl: newProd.accessUrl,
      description: newProd.description || 'Instant digital download delivered upon purchase.',
      salesCount: 0,
      revenue: '₹0',
      status: 'active',
      ctaText: newProd.ctaText || 'Get Instant Access &rarr;'
    };

    setProducts([created, ...products]);
    setIsAddProductModalOpen(false);
    setNewProd({
      title: '',
      price: '₹499',
      type: 'Digital Product',
      deliveryMethod: 'upload',
      fileData: null,
      fileName: '',
      fileSize: '',
      accessUrl: '',
      description: '',
      ctaText: 'Unlock Download & Instant Access'
    });
    addNotification({
      title: 'Product Published',
      message: `"${created.title}" is now live on your link-in-bio storefront with instant delivery!`,
      type: 'success'
    });
  };

  // 1-Click Import from Winning Library
  const handleImportWinningProduct = (item) => {
    if (tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Upgrade to Pro to import unlimited turnkey products from the Winning Products Library.'
      );
      return;
    }

    const imported = {
      id: 'prod_' + Date.now(),
      title: item.title,
      price: item.suggestedPrice,
      type: item.type,
      description: item.description,
      deliveryMethod: 'upload',
      fileName: `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`,
      fileSize: '1.8 MB',
      accessUrl: 'https://vyralify.in',
      salesCount: 0,
      revenue: '₹0',
      status: 'active',
      ctaText: 'Get Instant Access &rarr;'
    };

    setProducts([imported, ...products]);
    addNotification({
      title: 'Product Imported',
      message: `"${item.title}" added to your store. Ready to sell!`,
      type: 'success'
    });
  };

  // Export Orders CSV for Email Marketing & CRM
  const handleExportOrdersCsv = () => {
    const headers = 'Order ID,Customer,Email,Product,Amount,Date,Status,Delivery Access\n';
    const rows = orders.map(o => `${o.id},"${o.customer}",${o.email},"${o.product}","${o.amount}","${o.date}",${o.status},"${o.deliveryAccess || 'Delivered'}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_customers_${(activePage?.handle || 'creator').replace(/^@/, '')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Customer List Exported',
      message: `Exported ${orders.length} customer records to CSV for retargeting & email newsletters.`,
      type: 'success'
    });
  };

  // Test Order Simulator
  const handleSimulateTestOrder = () => {
    const targetProduct = products[0] || WINNING_CATALOG[0];
    const testBuyers = [
      { name: 'Arjun Verma', email: 'arjun.v@gmail.com' },
      { name: 'Meera Sengupta', email: 'meera@creatorflow.in' },
      { name: 'Sameer Khan', email: 'sameer.k@outlook.com' },
      { name: 'Tanvi Deshmukh', email: 'tanvi@digitalvault.io' }
    ];
    const buyer = testBuyers[Math.floor(Math.random() * testBuyers.length)];
    const priceNum = parseInt(targetProduct.price?.replace(/[^0-9]/g, '') || '499');

    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: buyer.name,
      email: buyer.email,
      product: targetProduct.title,
      amount: targetProduct.price || '₹499',
      amountNumeric: priceNum,
      date: 'Just now',
      status: 'Paid',
      pageHandle: (activePage?.handle || 'creator').replace(/^@/, ''),
      creatorUid: user?.uid || 'guest',
      deliveryAccess: 'Dispatched & Downloaded'
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('vyralify_store_orders', JSON.stringify(updated));

    if (user?.uid) {
      addDoc(collection(db, 'storeOrders'), {
        ...newOrder,
        createdAt: serverTimestamp()
      }).catch(() => {});
    }

    addNotification({
      title: 'Order Verified & Received! 💰',
      message: `${buyer.name} purchased "${targetProduct.title}" (${targetProduct.price}). Logged to CRM.`,
      type: 'success'
    });
  };

  // Filtered orders by search query
  const filteredOrders = orders.filter(o => {
    if (!orderSearchQuery.trim()) return true;
    const q = orderSearchQuery.toLowerCase();
    return (
      o.customer?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q) ||
      o.product?.toLowerCase().includes(q) ||
      o.id?.toLowerCase().includes(q)
    );
  });

  const totalStoreRevenue = orders.reduce((acc, o) => {
    const num = o.amountNumeric || parseInt(o.amount?.replace(/[^0-9]/g, '') || '0', 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const uniqueCustomersCount = new Set(orders.map(o => o.email?.toLowerCase())).size;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. MODULE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mb-2 font-medium">
            <ShoppingBag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Phase 7 &bull; Link-in-Bio Storefront & Creator Commerce</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Store & Commerce</span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-[10px] font-mono text-neutral-600 dark:text-neutral-300 font-normal">
              @{activePage?.handle || 'creator'} &bull; vyralify.me/{activePage?.handle || 'creator'}
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
            Turn your Instagram bio link into an ultra-fast, high-converting digital storefront with instant checkout.
          </p>
        </div>

        {/* Sub-Tabs & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white dark:bg-[#0C0D12] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-x-auto no-scrollbar">
            {[
              { id: 'builder', label: 'Store Builder', icon: Smartphone },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'winning', label: 'Winning Catalog', icon: Sparkles },
              { id: 'orders', label: 'Orders CRM', icon: CreditCard },
              { id: 'resale', label: 'White-Label AI', icon: Crown }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleCopyStoreLink}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
          >
            {copiedStoreLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStoreLink ? 'Copied Link' : 'Copy Bio Link'}</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB: STORE BUILDER WITH LIVE PHONE PREVIEW */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Customizer Settings (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                Storefront Customization
              </h3>

              {/* Bio Link Slug */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-500 font-medium">Public Storefront Handle</label>
                <div className="flex items-center bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono">
                  <span className="text-neutral-400">https://vyralify.me/</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{activePage?.handle || 'creator'}</span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-500 font-medium">Store Headline / Title</label>
                <input
                  type="text"
                  value={storeHeadline}
                  onChange={(e) => setStoreHeadline(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Bio Pitch */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-500 font-medium">Storefront Subtitle / Proposition</label>
                <textarea
                  rows={2}
                  value={storeBio}
                  onChange={(e) => setStoreBio(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl p-3 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Theme Color Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 font-medium">Theme Palette</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'emerald', label: 'Emerald Green', bg: 'bg-emerald-600' },
                    { id: 'obsidian', label: 'Obsidian Black', bg: 'bg-neutral-900' },
                    { id: 'indigo', label: 'Indigo Tech', bg: 'bg-indigo-600' },
                    { id: 'amber', label: 'Sunset Gold', bg: 'bg-amber-600' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setStoreThemeColor(c.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        storeThemeColor === c.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 font-semibold'
                          : 'border-neutral-200 dark:border-white/[0.06]'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Feedback */}
              <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-600 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Auto-saved &amp; synced with CDN
                </span>
                <button
                  onClick={handleCopyStoreLink}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs"
                >
                  Share Storefront &rarr;
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Total Store Revenue</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">₹59,904</div>
                <span className="text-[10px] text-emerald-600 font-mono mt-1 block font-semibold">+18.2% this month</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Storefront Clicks</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">2,840</div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Conversion: 4.2%</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Active Products</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                  {products.length} / {tier === 'free' ? '1 (Free)' : 'Unlimited'}
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Instant Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Live Mobile Preview Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] rounded-[40px] bg-neutral-900 p-3 shadow-2xl border-4 border-neutral-800 relative">
              
              {/* Phone Notch */}
              <div className="w-28 h-4 bg-neutral-950 rounded-b-xl mx-auto mb-2" />

              {/* Screen Inner */}
              <div className="bg-[#F8FAFC] dark:bg-[#0A0B0E] rounded-[32px] p-4 text-center min-h-[560px] flex flex-col justify-between overflow-hidden text-neutral-900 dark:text-white">
                
                {/* Store Profile Header */}
                <div className="space-y-3 pt-2">
                  <div className="relative w-16 h-16 mx-auto">
                    <img
                      src={getSafeAvatarUrl(activePage?.avatar, activePage?.handle)}
                      alt={activePage?.handle || "Creator"}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getSafeAvatarUrl('', activePage?.handle);
                      }}
                      className="w-full h-full rounded-full object-cover ring-2 ring-emerald-500 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm tracking-tight">@{activePage?.handle || 'creator'}</h4>
                    <p className="text-[10px] font-mono text-neutral-500 mt-0.5">{storeHeadline}</p>
                    <p className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-tight mt-1 max-w-[240px] mx-auto">
                      {storeBio}
                    </p>
                  </div>

                  {/* Product Cards Stack in Phone */}
                  <div className="space-y-2.5 pt-2 text-left">
                    {products.map(p => (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-white/[0.08] shadow-xs space-y-1.5 hover:scale-[1.02] transition-transform"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-neutral-400">{p.type}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{p.price}</span>
                        </div>
                        <h5 className="font-semibold text-xs leading-snug line-clamp-1">{p.title}</h5>
                        <button className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
                          <span>{p.ctaText}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 pb-2 border-t border-neutral-200 dark:border-white/[0.06] text-[9px] font-mono text-neutral-400">
                  Powered by <strong>Vyralify Bio Commerce</strong>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. SUB-TAB: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Product Catalog & Pricing</h3>
                <span className="text-xs font-mono text-neutral-400">
                  Listed: {products.length} / {tier === 'free' ? '1 (Free Plan Limit)' : 'Unlimited'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Manage your digital goods, guides, courses, and 1-on-1 consultations.
              </p>
            </div>

            <button
              onClick={() => {
                if (tier === 'free' && products.length >= 1) {
                  openUpgradeModal('store_products', 'Free tier includes 1 product slot. Upgrade to Pro for unlimited store products.');
                } else {
                  setIsAddProductModalOpen(true);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-neutral-900 dark:text-white text-base">No Products Listed Yet</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                  Create your first digital guide or 1-click import a high-converting offer from the Winning Products Library.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
                >
                  Create Custom Product
                </button>
                <button
                  onClick={() => setActiveTab('winning')}
                  className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 font-semibold text-xs border border-neutral-200 dark:border-white/[0.08] cursor-pointer"
                >
                  Browse Winning Products &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 font-medium">
                        {prod.type}
                      </span>
                      <span className="font-bold text-emerald-600 text-sm">{prod.price}</span>
                    </div>

                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm leading-snug">
                      {prod.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-xs">
                    <div className="font-mono text-neutral-400">
                      <span className="text-neutral-900 dark:text-white font-bold">{prod.salesCount}</span> sales &bull; {prod.revenue}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase">Live &bull; 100% Margin</span>
                  </div>
                </div>
              ))}
            </div>
          )}


          {tier === 'free' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Starter Plan Quota:</strong> You are using your 1 included product slot. Upgrade to Pro to sell unlimited guides, toolkits, and consultations.
                </span>
              </div>
              <button
                onClick={() => openUpgradeModal('store_products', 'Upgrade to Pro for unlimited products on your storefront.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap cursor-pointer shadow-xs"
              >
                Upgrade to Pro
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. SUB-TAB: WINNING PRODUCTS LIBRARY */}
      {activeTab === 'winning' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Turnkey Winning Digital Products</h3>
              <p className="text-xs text-neutral-500">1-click import ready-to-sell blueprints and templates with proven conversion rates.</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-semibold">100% Digital Rights Included</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WINNING_CATALOG.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <span>{item.type}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-600 font-semibold">{item.margin}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-xs leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Suggested Price: </span>
                    <strong className="text-emerald-600 font-mono">{item.suggestedPrice}</strong>
                    <span className="text-[10px] text-neutral-400 block font-mono">Avg: {item.avgMonthlyRevenue}</span>
                  </div>

                  <button
                    onClick={() => handleImportWinningProduct(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import to Store</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUB-TAB: ORDERS CRM */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Top 4 Summary Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[11px] font-mono font-medium">Gross Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                ₹{totalStoreRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">100% digital profit</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[11px] font-mono font-medium">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                {orders.length}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Lifetime fulfillments</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[11px] font-mono font-medium">Unique Buyers</span>
                <UserCheck className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                {uniqueCustomersCount}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Email list size</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-1">
                <span className="text-[11px] font-mono font-medium">Avg Order Value</span>
                <DollarSign className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                ₹{orders.length ? Math.round(totalStoreRevenue / orders.length).toLocaleString('en-IN') : 0}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Per customer spend</span>
            </div>
          </div>

          {/* CRM Container */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Storefront Sales & Fulfillment CRM</h3>
                <p className="text-xs text-neutral-500">Real-time log of customer transactions and instant digital asset deliveries.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSimulateTestOrder}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Simulate an instant customer purchase to test live delivery & CRM sync"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Test Order</span>
                </button>

                <button
                  onClick={handleExportOrdersCsv}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200/60 dark:border-white/[0.06]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search orders by customer name, email, product, or order ID..."
                className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
              {orderSearchQuery && (
                <button
                  onClick={() => setOrderSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                    <th className="pb-2.5 font-medium">Order ID</th>
                    <th className="pb-2.5 font-medium">Customer</th>
                    <th className="pb-2.5 font-medium">Product Title</th>
                    <th className="pb-2.5 font-medium">Amount</th>
                    <th className="pb-2.5 font-medium">Payment</th>
                    <th className="pb-2.5 font-medium">Fulfillment Status</th>
                    <th className="pb-2.5 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/60 dark:divide-white/[0.04]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-neutral-400">
                        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-neutral-500 opacity-60" />
                        <p className="font-medium text-xs">No customer orders found</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Try searching for a different name or email, or click "Simulate Test Order".</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-mono text-neutral-500 font-medium">{ord.id}</td>
                        <td className="py-3">
                          <span className="font-semibold text-neutral-900 dark:text-white block">{ord.customer}</span>
                          <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                            <Mail className="w-2.5 h-2.5" />
                            {ord.email}
                          </span>
                        </td>
                        <td className="py-3 text-neutral-800 dark:text-neutral-200 font-medium max-w-[200px] truncate" title={ord.product}>
                          {ord.product}
                        </td>
                        <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{ord.amount}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                            <ShieldCheck className="w-3 h-3 text-blue-500" />
                            <span>{ord.deliveryAccess || 'Delivered (Asset)'}</span>
                          </span>
                        </td>
                        <td className="py-3 text-right text-neutral-400 font-mono text-[11px] whitespace-nowrap">{ord.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. SUB-TAB: WHITE-LABEL AI RESALE (ELITE) */}
      {activeTab === 'resale' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                  White-Label AI Co-Pilot Resale Engine
                </h3>
                <p className="text-xs text-neutral-500">Rebrand Vyralify AI and sell access directly to your followers as your own proprietary software.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold uppercase">
              Elite Agency Exclusive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Custom Subdomain &amp; Logo</span>
              <p className="text-neutral-500">Host under your own custom domain with custom color accents and branding.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Set Your Own Subscription Prices</span>
              <p className="text-neutral-500">Charge ₹999/mo or ₹2,999/mo. Keep 100% of subscriber revenue directly in Razorpay/Stripe.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1.5">
              <span className="font-bold text-neutral-900 dark:text-white block">Zero Server Maintenance</span>
              <p className="text-neutral-500">Vyralify powers all LLaMA-3 / Gemini Flash inference and backend routing automatically.</p>
            </div>
          </div>

          {tier !== 'elite' && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>White-Label AI resale is locked on your current plan. Upgrade to <strong>Elite Agency</strong> to launch your own branded software.</span>
              </div>
              <button
                onClick={() => openUpgradeModal('white_label', 'Upgrade to Elite to rebrand and resell Vyralify AI.')}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-xs whitespace-nowrap"
              >
                Upgrade to Elite
              </button>
            </div>
          )}
        </div>
      )}

      {/* 7. ADD PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200 dark:border-white/[0.08] shadow-2xl p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Add New Product to Store</h3>
                <p className="text-[11px] text-neutral-500">Automated digital asset fulfillment upon customer checkout.</p>
              </div>
              <button 
                onClick={() => setIsAddProductModalOpen(false)} 
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-lg p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-neutral-500 font-medium">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  placeholder="e.g. 30-Day Stoic Mindset Journal & Audio Guide"
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Product Category</label>
                  <select
                    value={newProd.type}
                    onChange={(e) => setNewProd({ ...newProd, type: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                  >
                    <option value="Digital Product">Digital Asset (PDF/Guide)</option>
                    <option value="Notion Workspace">Notion Workspace / Template</option>
                    <option value="Asset Pack">Asset Pack (Presets/Footage)</option>
                    <option value="Service / Call">1-on-1 Consultation Call</option>
                    <option value="Subscription">Community Membership</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Price (INR)</label>
                  <input
                    type="text"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    placeholder="₹499"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Delivery Method Selection */}
              <div className="space-y-2 pt-1 border-t border-neutral-200/60 dark:border-white/[0.04]">
                <label className="font-mono text-neutral-500 font-medium block">
                  Automated Customer Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProd({ ...newProd, deliveryMethod: 'upload' })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                      newProd.deliveryMethod === 'upload'
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-medium'
                        : 'border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <Upload className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs">Direct File Upload</div>
                      <div className="text-[10px] text-neutral-400">PDF, ZIP, EPUB up to 15MB</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProd({ ...newProd, deliveryMethod: 'link' })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                      newProd.deliveryMethod === 'link'
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-medium'
                        : 'border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs">Access Link / Vault</div>
                      <div className="text-[10px] text-neutral-400">Notion, Drive, Loom, Calendly</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Delivery Method Details: File Upload or Link Input */}
              {newProd.deliveryMethod === 'upload' ? (
                <div className="space-y-2">
                  <label className="font-mono text-neutral-500 font-medium block">Select File to Deliver</label>
                  {newProd.fileName ? (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div className="truncate">
                          <span className="font-semibold text-neutral-900 dark:text-white block truncate">{newProd.fileName}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">{newProd.fileSize} &bull; Ready for instant buyer download</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewProd({ ...newProd, fileData: null, fileName: '', fileSize: '' })}
                        className="text-neutral-400 hover:text-red-500 text-xs font-mono ml-2 shrink-0 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-neutral-300 dark:border-white/[0.1] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors bg-neutral-50/50 dark:bg-white/[0.01]">
                      <Upload className="w-6 h-6 text-neutral-400 mb-1.5" />
                      <span className="font-semibold text-neutral-700 dark:text-neutral-200 text-xs">Choose digital file to deliver</span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">Supports PDF, ZIP, EPUB, DOCX (Max 15MB)</span>
                      <input
                        type="file"
                        accept=".pdf,.zip,.rar,.epub,.doc,.docx"
                        onChange={handleDigitalFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium block">Customer Access URL</label>
                  <input
                    type="url"
                    value={newProd.accessUrl}
                    onChange={(e) => setNewProd({ ...newProd, accessUrl: e.target.value })}
                    placeholder="https://notion.so/my-workspace or https://drive.google.com/..."
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-mono"
                  />
                  <span className="text-[10px] text-neutral-400 block">Buyer is immediately granted access to this URL upon purchase completion.</span>
                </div>
              )}

              {/* Product Description */}
              <div className="space-y-1">
                <label className="font-mono text-neutral-500 font-medium">Short Description / Value Pitch</label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Outline what is inside this asset, who it is for, and key takeaways..."
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white resize-none focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-500 font-medium">Button CTA Text</label>
                <input
                  type="text"
                  value={newProd.ctaText}
                  onChange={(e) => setNewProd({ ...newProd, ctaText: e.target.value })}
                  placeholder="Unlock Instant Access &rarr;"
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.05] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
