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
  RefreshCw,
  Calendar,
  X
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';

// 4 Core Pre-Built Digital Asset Starters
const TEMPLATE_VAULT = [
  {
    id: 'tpl_1',
    title: 'The Faceless Operating Manual',
    format: 'Digital Guide • PDF',
    type: 'Digital Download',
    suggestedPrice: '₹499',
    suggestedPriceNum: 499,
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.'
  },
  {
    id: 'tpl_2',
    title: '150+ Viral Retention Hooks Vault',
    format: 'Notion Database',
    type: 'Digital Download',
    suggestedPrice: '₹299',
    suggestedPriceNum: 299,
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.'
  },
  {
    id: 'tpl_3',
    title: '1-on-1 Growth Audit Session',
    format: 'Calendly Consultation',
    type: '1-on-1 Call',
    suggestedPrice: '₹1,499',
    suggestedPriceNum: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    description: 'Direct 30-minute private screen-share consultation reviewing content calendar, bio structure, and DM funnel architecture.'
  },
  {
    id: 'tpl_4',
    title: 'Aesthetic B-Roll Video Vault',
    format: 'Digital Asset Pack',
    type: 'Digital Download',
    suggestedPrice: '₹799',
    suggestedPriceNum: 799,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    description: 'Curated 4K vertical footage library of luxury cars, lo-fi workspaces, city skylines, and moody coffee clips ready to caption.'
  }
];

export default function StoreCommerce({ onNavigate }) {
  const { user, tier } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  // Sub-Tab Navigation: 5 clean tabs
  // 'builder' | 'products' | 'templates' | 'orders' | 'resell'
  const [activeTab, setActiveTab] = useState('builder');

  // Store Customizer State
  const [storeThemeColor, setStoreThemeColor] = useState('blue');
  const [storeHeadline, setStoreHeadline] = useState('Official Resource Vault & Toolkits');
  const [storeBio, setStoreBio] = useState(`Digital products, cheat sheets, and 1-on-1 strategy calls to fast-track your results in ${activePage?.category || 'business'}.`);
  const [copiedStoreLink, setCopiedStoreLink] = useState(false);

  // Professional Product Catalog State
  const [products, setProducts] = useState([
    {
      id: 'prod_1',
      title: 'The Faceless Operating Manual (2026 Edition)',
      price: '₹499',
      priceNumeric: 499,
      type: 'Digital Download',
      salesCount: 84,
      revenue: '₹41,916',
      status: 'Active',
      ctaText: 'Get Instant Access'
    },
    {
      id: 'prod_2',
      title: '1-on-1 Growth Audit & Consultation (30m)',
      price: '₹1,499',
      priceNumeric: 1499,
      type: '1-on-1 Call',
      salesCount: 18,
      revenue: '₹26,982',
      status: 'Active',
      ctaText: 'Book Calendar Slot'
    },
    {
      id: 'prod_3',
      title: '150+ Viral Retention Hooks Vault',
      price: '₹299',
      priceNumeric: 299,
      type: 'Digital Download',
      salesCount: 112,
      revenue: '₹33,488',
      status: 'Active',
      ctaText: 'Unlock Hooks Database'
    }
  ]);

  // Create Product Modal State (3-Step Form)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [modalCurrency, setModalCurrency] = useState('INR'); // 'INR' | 'USD'
  const [newProd, setNewProd] = useState({
    title: '',
    priceAmount: '499',
    type: 'Digital Download',
    deliveryMethod: 'upload', // 'upload' | 'link'
    fileData: null,
    fileName: '',
    fileSize: '',
    accessUrl: '',
    description: '',
    ctaText: 'Get Instant Access'
  });

  // Orders Log State
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-8921', 
      customer: 'Vikram Sharma', 
      email: 'vikram@creatorflow.in', 
      product: 'The Faceless Operating Manual', 
      amount: '₹499', 
      amountNumeric: 499, 
      paymentGateway: 'Razorpay', 
      fulfillment: 'Delivered', 
      date: 'Today, 14:12', 
      status: 'Paid' 
    },
    { 
      id: 'ORD-8920', 
      customer: 'Sara Khan', 
      email: 'sara@modernmedia.co', 
      product: '150+ Viral Retention Hooks Vault', 
      amount: '₹299', 
      amountNumeric: 299, 
      paymentGateway: 'Stripe', 
      fulfillment: 'Delivered', 
      date: 'Today, 11:45', 
      status: 'Paid' 
    },
    { 
      id: 'ORD-8919', 
      customer: 'Aarav Patel', 
      email: 'aarav.patel@gmail.com', 
      product: '1-on-1 Growth Audit Session', 
      amount: '₹1,499', 
      amountNumeric: 1499, 
      paymentGateway: 'Razorpay', 
      fulfillment: 'Delivered', 
      date: 'Yesterday, 18:20', 
      status: 'Paid' 
    },
    { 
      id: 'ORD-8918', 
      customer: 'Priya Joshi', 
      email: 'priya@growthvault.io', 
      product: 'The Faceless Operating Manual', 
      amount: '₹499', 
      amountNumeric: 499, 
      paymentGateway: 'Stripe', 
      fulfillment: 'Delivered', 
      date: 'Yesterday, 15:30', 
      status: 'Paid' 
    },
    { 
      id: 'ORD-8917', 
      customer: 'Rohan Gupta', 
      email: 'rohan@telemetry.in', 
      product: 'Aesthetic B-Roll Video Vault', 
      amount: '₹799', 
      amountNumeric: 799, 
      paymentGateway: 'Razorpay', 
      fulfillment: 'Delivered', 
      date: '2 days ago', 
      status: 'Paid' 
    }
  ]);

  // Clean Storefront URL
  const rawHandle = (activePage?.handle || 'creator').replace(/^@/, '');
  const cleanStoreUrl = `vyralify.me/${rawHandle}`;

  // Initial load of custom products & orders
  useEffect(() => {
    const savedProds = localStorage.getItem('vyralify_store_products');
    if (savedProds) {
      try {
        const parsed = JSON.parse(savedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      } catch (e) {}
    }

    const savedOrders = localStorage.getItem('vyralify_store_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      } catch (e) {}
    }
  }, []);

  // Sync store settings & products for the public storefront
  useEffect(() => {
    localStorage.setItem('vyralify_store_products', JSON.stringify(products));
    const handleKey = rawHandle;
    localStorage.setItem(`vyralify_store_${handleKey}`, JSON.stringify({
      handle: handleKey,
      headline: storeHeadline,
      bio: storeBio,
      products: products,
      themeColor: storeThemeColor,
      avatar: activePage?.avatar
    }));
  }, [products, storeHeadline, storeBio, storeThemeColor, rawHandle, activePage?.avatar]);

  // Real-time Firestore sync for incoming live store orders
  useEffect(() => {
    const handleKey = rawHandle;
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
  }, [rawHandle]);

  // Copy Storefront Link
  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${cleanStoreUrl}`);
    setCopiedStoreLink(true);
    addNotification({
      title: 'Store Link Copied',
      message: `https://${cleanStoreUrl} copied to clipboard!`,
      type: 'success'
    });
    setTimeout(() => setCopiedStoreLink(false), 2000);
  };

  // Digital Asset File Upload Handler (Up to 25MB)
  const handleDigitalFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      addNotification({
        title: 'File Too Large',
        message: 'File size must be under 25MB. For larger videos or archives, choose Access Link.',
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
        message: `Successfully attached ${file.name} (${sizeMb} MB).`,
        type: 'success'
      });
    };
    reader.readAsDataURL(file);
  };

  // Create Product Handler
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProd.title.trim()) return;

    if (tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Free plan includes 1 product slot. Upgrade to Pro to list unlimited digital goods and services.'
      );
      return;
    }

    const currencySymbol = modalCurrency === 'INR' ? '₹' : '$';
    const cleanPrice = `${currencySymbol}${newProd.priceAmount.replace(/[^0-9.]/g, '') || '499'}`;
    const cleanNum = parseFloat(newProd.priceAmount.replace(/[^0-9.]/g, '') || '499');

    const created = {
      id: 'prod_' + Date.now(),
      title: newProd.title,
      price: cleanPrice,
      priceNumeric: cleanNum,
      type: newProd.type,
      deliveryMethod: newProd.deliveryMethod,
      fileData: newProd.fileData,
      fileName: newProd.fileName,
      fileSize: newProd.fileSize,
      accessUrl: newProd.accessUrl,
      description: newProd.description || 'Instant digital download delivered upon purchase.',
      salesCount: 0,
      revenue: '₹0',
      status: 'Active',
      ctaText: newProd.ctaText || 'Get Instant Access'
    };

    const updated = [created, ...products];
    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    setIsAddProductModalOpen(false);
    setNewProd({
      title: '',
      priceAmount: '499',
      type: 'Digital Download',
      deliveryMethod: 'upload',
      fileData: null,
      fileName: '',
      fileSize: '',
      accessUrl: '',
      description: '',
      ctaText: 'Get Instant Access'
    });
    addNotification({
      title: 'Product Published',
      message: `"${created.title}" is now live on your storefront!`,
      type: 'success'
    });
  };

  // Delete product
  const handleDeleteProduct = (prodId) => {
    const updated = products.filter(p => p.id !== prodId);
    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    addNotification({ title: 'Product Removed', message: 'Product removed from your catalog.', type: 'info' });
  };

  // 1-Click Import from Pre-Built Digital Asset Vault
  const handleImportTemplate = (tpl) => {
    if (tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Upgrade to Pro to import unlimited turnkey assets from the Pre-Built Vault.'
      );
      return;
    }

    const imported = {
      id: 'prod_' + Date.now(),
      title: tpl.title,
      price: tpl.suggestedPrice,
      priceNumeric: tpl.suggestedPriceNum,
      type: tpl.type,
      description: tpl.description,
      deliveryMethod: 'upload',
      fileName: `${tpl.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`,
      fileSize: '2.4 MB',
      accessUrl: 'https://vyralify.me',
      salesCount: 0,
      revenue: '₹0',
      status: 'Active',
      ctaText: 'Get Instant Access'
    };

    const updated = [imported, ...products];
    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    addNotification({
      title: 'Template Imported',
      message: `"${tpl.title}" added to your store. Ready to sell!`,
      type: 'success'
    });
  };

  // Export Orders CSV
  const handleExportOrdersCsv = () => {
    const headers = 'Order ID,Customer,Email,Product,Amount,Payment Gateway,Fulfillment,Date\n';
    const rows = orders.map(o => `${o.id},"${o.customer}",${o.email},"${o.product}","${o.amount}","${o.paymentGateway || 'Razorpay'}","${o.fulfillment || 'Delivered'}","${o.date}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_orders_${rawHandle}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Customer Orders Exported',
      message: `Exported ${orders.length} orders to CSV.`,
      type: 'success'
    });
  };

  // Simulate Test Order
  const handleSimulateTestOrder = () => {
    const targetProduct = products[0] || TEMPLATE_VAULT[0];
    const testBuyers = [
      { name: 'Arjun Verma', email: 'arjun.v@gmail.com' },
      { name: 'Meera Sengupta', email: 'meera@creatorflow.in' },
      { name: 'Sameer Khan', email: 'sameer.k@outlook.com' },
      { name: 'Tanvi Deshmukh', email: 'tanvi@digitalvault.io' }
    ];
    const buyer = testBuyers[Math.floor(Math.random() * testBuyers.length)];
    const priceNum = targetProduct.priceNumeric || parseInt(targetProduct.price?.replace(/[^0-9]/g, '') || '499');

    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: buyer.name,
      email: buyer.email,
      product: targetProduct.title,
      amount: targetProduct.price || '₹499',
      amountNumeric: priceNum,
      paymentGateway: 'Razorpay',
      fulfillment: 'Delivered',
      date: 'Just now',
      status: 'Paid',
      pageHandle: rawHandle,
      creatorUid: user?.uid || 'guest'
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
      title: 'Test Order Received',
      message: `${buyer.name} purchased "${targetProduct.title}" (${targetProduct.price}).`,
      type: 'success'
    });
  };

  // Filtered orders
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

  const cleanArrow = (text) => {
    if (!text) return 'Get Instant Access';
    return text.replace(/&rarr;/g, '').replace(/→/g, '').trim();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP PANEL TITLE & TAB NAVIGATION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Creator Storefront &amp; Commerce
          </h1>
          <p className="text-[#64748B] text-xs mt-1 font-medium">
            Build ultra-fast digital storefronts, manage products, and track instant payouts.
          </p>
        </div>

        {/* Streamlined Segmented Navigation (5 Tabs) */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-[rgba(6,124,249,0.12)] shadow-xs overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'builder', label: 'Store Builder', icon: Smartphone },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'templates', label: 'Digital Templates', icon: Sparkles },
            { id: 'orders', label: 'Orders & Sales', icon: CreditCard },
            { id: 'resell', label: 'Agency Resell', icon: Crown }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#067CF9] text-white shadow-xs font-semibold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: STORE BUILDER & LIVE MOBILE PREVIEW STUDIO (Panel 5 Blueprint: Sleek iOS white phone bezel frame over a soft clean backdrop) */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          
          {/* Store Analytics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] font-mono text-[#64748B] font-medium">Total Revenue</span>
              <div className="text-xl font-bold font-mono text-[#0F172A] mt-1">
                ₹{totalStoreRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block font-semibold">+18.2% this month</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] font-mono text-[#64748B] font-medium">Storefront Clicks</span>
              <div className="text-xl font-bold font-mono text-[#0F172A] mt-1">2,840</div>
              <span className="text-[10px] text-[#64748B] font-mono mt-1 block">Traffic across bio links</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] font-mono text-[#64748B] font-medium">Conversion Rate</span>
              <div className="text-xl font-bold font-mono text-[#0F172A] mt-1">4.2%</div>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block font-semibold">Above creator avg (2.8%)</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] font-mono text-[#64748B] font-medium">Active Products</span>
              <div className="text-xl font-bold font-mono text-[#0F172A] mt-1">
                {products.length} / {tier === 'free' ? '1 (Free)' : 'Unlimited'}
              </div>
              <span className="text-[10px] text-[#067CF9] font-mono mt-1 block font-semibold">Instant checkout enabled</span>
            </div>
          </div>

          {/* 2-Column Store Builder: Left Form Controls (7 Cols) & Right Mobile Preview (5 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Input Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
                
                {/* Store Link Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#64748B] font-medium">Store Link</label>
                  <div className="flex items-center justify-between bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3.5 py-2 text-xs font-mono">
                    <span className="text-[#0F172A] font-semibold">
                      {cleanStoreUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyStoreLink}
                      className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] text-[11px] font-sans font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedStoreLink ? <Check className="w-3 h-3 text-[#067CF9]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedStoreLink ? 'Copied' : 'Copy Store Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Store Title & Subtitle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <label className="font-medium">Store Title</label>
                    <span className="text-[11px]">{storeHeadline.length}/60</span>
                  </div>
                  <input
                    type="text"
                    maxLength={60}
                    value={storeHeadline}
                    onChange={(e) => setStoreHeadline(e.target.value)}
                    placeholder="e.g., Official Resource Vault & Toolkits"
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <label className="font-medium">Store Subtitle</label>
                    <span className="text-[11px]">{storeBio.length}/160</span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={160}
                    value={storeBio}
                    onChange={(e) => setStoreBio(e.target.value)}
                    placeholder="e.g., Digital products, cheat sheets, and 1-on-1 strategy calls..."
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl p-3 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9] transition-colors resize-none"
                  />
                </div>

                {/* Theme Palette Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#64748B] font-medium">Theme Palette</label>
                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      { id: 'blue', label: 'Electric Blue', colorClass: 'bg-[#067CF9]' },
                      { id: 'obsidian', label: 'Obsidian Navy', colorClass: 'bg-[#0F172A]' },
                      { id: 'cyan', label: 'Ice Cyan', colorClass: 'bg-[#38BDF8]' }
                    ].map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setStoreThemeColor(c.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          storeThemeColor === c.id
                            ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold shadow-xs'
                            : 'border-neutral-200 text-[#64748B] hover:border-neutral-300'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${c.colorClass} flex items-center justify-center`}>
                          {storeThemeColor === c.id && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between">
                  <span className="text-[11px] text-[#067CF9] font-mono flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Auto-synced with CDN
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      addNotification({
                        title: 'Storefront Published',
                        message: 'Your store settings and design have been saved live!',
                        type: 'success'
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save &amp; Publish Store</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek iOS White Phone Bezel Frame over Soft Clean Backdrop (Blueprint Section 2.F) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[320px] rounded-[48px] bg-white p-3.5 shadow-[0_20px_50px_rgba(6,124,249,0.12)] border-[6px] border-slate-100 ring-1 ring-[rgba(6,124,249,0.2)] relative">
                
                {/* Dynamic Island pill */}
                <div className="w-24 h-5 bg-[#0F172A] rounded-full mx-auto mb-2 flex items-center justify-end pr-2">
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Screen Inner */}
                <div className="bg-[#F0F6FE] rounded-[36px] p-4 text-center min-h-[540px] flex flex-col justify-between overflow-hidden text-[#0F172A]">
                  
                  {/* Store Profile Header */}
                  <div className="space-y-3 pt-1">
                    <div className="relative w-16 h-16 mx-auto">
                      <img
                        src={getSafeAvatarUrl(activePage?.avatar, rawHandle)}
                        alt={rawHandle}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getSafeAvatarUrl('', rawHandle);
                        }}
                        className="w-full h-full rounded-full object-cover ring-2 ring-[#067CF9] shadow-md"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#067CF9] border-2 border-white" />
                    </div>

                    <div>
                      <h4 className="font-bold text-xs tracking-tight text-[#0F172A]">@{rawHandle}</h4>
                      <p className="text-[10px] font-mono text-[#64748B] mt-0.5 font-medium">{storeHeadline}</p>
                      <p className="text-[10px] text-[#64748B] leading-tight mt-1 max-w-[240px] mx-auto line-clamp-2">
                        {storeBio}
                      </p>
                    </div>

                    {/* Product Cards Stack in Phone (White cards with Electric Blue price tags) */}
                    <div className="space-y-2.5 pt-2 text-left">
                      {products.map(p => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.12)] shadow-xs space-y-2 hover:border-[#067CF9]/40 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#64748B] font-medium">{p.type}</span>
                            <span className="font-bold text-[#067CF9]">{p.price}</span>
                          </div>
                          <h5 className="font-semibold text-xs leading-snug line-clamp-1 text-[#0F172A]">{p.title}</h5>
                          
                          <button className="w-full py-1.5 rounded-lg bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
                            <span>{cleanArrow(p.ctaText)}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Footer Brand Tag */}
                  <div className="pt-3 pb-1 border-t border-[rgba(6,124,249,0.1)] text-[9px] font-mono text-[#64748B]">
                    Powered by <strong className="text-[#067CF9]">Vyralify Store</strong>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 3. TAB 2: PRODUCTS CATALOG (Panel 5 Blueprint: White glass cards with Electric Blue price tags ₹499) */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          
          {/* Catalog Overview Banner */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#0F172A] text-sm">Product Catalog</h3>
                <span className="text-xs font-mono text-[#067CF9] bg-[#EFF6FF] px-2 py-0.5 rounded font-semibold border border-[rgba(6,124,249,0.15)]">
                  {products.length} Listed
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Manage your active digital assets, guides, and services.
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
              className="px-3.5 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Product</span>
            </button>
          </div>

          {/* White glass cards with Electric Blue price tags (Blueprint Section 2.F) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(prod => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-4 flex flex-col justify-between hover:border-[#067CF9]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#64748B] font-medium text-[10px] border border-neutral-100">
                      {prod.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#067CF9] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9] animate-pulse" />
                      Active
                    </span>
                  </div>

                  <h4 className="font-bold text-[#0F172A] text-sm leading-snug">
                    {prod.title}
                  </h4>

                  {/* Electric Blue Price Tag */}
                  <div className="text-xs text-[#64748B] font-mono mt-2">
                    Price: <strong className="text-[#067CF9] font-bold text-sm">{prod.price}</strong> &bull; Sales: {prod.salesCount} units ({prod.revenue || '₹0'})
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-end gap-1">
                  <button
                    onClick={() => {
                      addNotification({ title: 'Edit Product', message: 'Edit modal opening...', type: 'info' });
                    }}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyStoreLink}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 4. TAB 3: DIGITAL TEMPLATES (Pre-Built Asset Vault) */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm">Pre-Built Digital Asset Vault</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Import verified templates, guides, and resource kits directly into your storefront.
              </p>
            </div>
            <span className="text-xs font-mono text-[#067CF9] bg-[#EFF6FF] px-2 py-0.5 rounded font-semibold border border-[rgba(6,124,249,0.15)]">
              4 Core Templates Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEMPLATE_VAULT.map(tpl => (
              <div
                key={tpl.id}
                className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-4 flex flex-col justify-between hover:border-[#067CF9]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img src={tpl.thumbnail} alt={tpl.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#F8FAFC] text-[10px] font-mono text-[#64748B] font-medium border border-neutral-100">
                      {tpl.format}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-xs leading-snug mt-1">{tpl.title}</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">{tpl.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#64748B] font-mono text-[11px]">Suggested Price: </span>
                    <strong className="text-[#067CF9] font-mono font-bold text-sm">{tpl.suggestedPrice}</strong>
                  </div>

                  <button
                    onClick={() => handleImportTemplate(tpl)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Import to My Store</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 5. TAB 4: ORDERS & SALES (Panel 5 Blueprint: High-contrast light table with alternating row fills #F8FAFC aur clean Electric Blue 'Paid' status badges) */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Top Controls */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by customer email, order ID..."
                className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-8 pr-3 py-2 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#067CF9]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportOrdersCsv}
                className="px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.2)] text-[#0F172A] hover:bg-[#EFF6FF] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleSimulateTestOrder}
                className="text-xs text-[#64748B] hover:text-[#067CF9] font-medium px-2 py-1 cursor-pointer transition-colors"
                title="Simulate a test order to verify CRM logging"
              >
                Simulate Test Order
              </button>
            </div>
          </div>

          {/* High-contrast light table with alternating row fills #F8FAFC & Electric Blue 'Paid' badges (Blueprint Section 2.F) */}
          <div className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[rgba(6,124,249,0.12)] text-[#64748B] font-mono text-[11px]">
                  <th className="pb-2.5 font-semibold">Order ID</th>
                  <th className="pb-2.5 font-semibold">Customer Email</th>
                  <th className="pb-2.5 font-semibold">Product Purchased</th>
                  <th className="pb-2.5 font-semibold">Amount</th>
                  <th className="pb-2.5 font-semibold">Payment Gateway</th>
                  <th className="pb-2.5 font-semibold">Fulfillment</th>
                  <th className="pb-2.5 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(6,124,249,0.06)]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-[#94A3B8] text-xs">
                      No matching orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord, idx) => (
                    <tr 
                      key={ord.id} 
                      className={`${idx % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'} hover:bg-[#EFF6FF]/60 transition-colors`}
                    >
                      <td className="py-3 font-mono text-[#64748B] font-medium">{ord.id}</td>
                      <td className="py-3 font-mono text-[#0F172A]">{ord.email}</td>
                      <td className="py-3 text-[#0F172A] font-medium max-w-[200px] truncate" title={ord.product}>
                        {ord.product}
                      </td>
                      <td className="py-3 font-mono font-bold text-[#0F172A]">{ord.amount}</td>
                      <td className="py-3 font-mono text-[#64748B] text-[11px]">{ord.paymentGateway || 'Razorpay'}</td>
                      
                      {/* Clean Electric Blue "Paid" status badges (Blueprint Section 2.F) */}
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)]">
                            {ord.status}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#64748B] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9]" />
                            {ord.fulfillment || 'Delivered'}
                          </span>
                        </div>
                      </td>
                      
                      <td className="py-3 text-right text-[#64748B] font-mono text-[11px] whitespace-nowrap">{ord.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* 6. TAB 5: AGENCY RESELL */}
      {activeTab === 'resell' && (
        <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">
                Agency Resell &amp; Custom Branding
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Rebrand Vyralify under your custom domain and sell subscription access to your clients.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] text-xs font-mono font-bold self-start sm:self-auto">
              Elite Agency Reseller
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] space-y-1.5">
              <span className="font-bold text-[#0F172A] block">Custom Domain &amp; Logo</span>
              <p className="text-[#64748B]">Host under your custom domain with white-label logos, colors, and favicon.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] space-y-1.5">
              <span className="font-bold text-[#0F172A] block">Client Billing &amp; Invoicing</span>
              <p className="text-[#64748B]">Connect your own Stripe or Razorpay accounts and keep 100% of subscriber revenue.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] space-y-1.5">
              <span className="font-bold text-[#0F172A] block">Dedicated AI Inference Engine</span>
              <p className="text-[#64748B]">Zero infrastructure overhead with Vyralify handling all AI processing silently in background.</p>
            </div>
          </div>

          {/* Upgrade Lock Banner */}
          <div className="p-5 rounded-2xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[rgba(6,124,249,0.2)] text-[#067CF9] flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 text-[#067CF9]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A]">Agency Reseller Access</h4>
                <p className="text-[#64748B]">Upgrade to Elite Agency Plan to deploy custom-branded portals for client rosters.</p>
              </div>
            </div>

            <button
              onClick={() => openUpgradeModal('white_label', 'Upgrade to Elite Agency to launch your custom branded software portal.')}
              className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-xs"
            >
              <span>Upgrade to Elite Agency Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 7. STRUCTURED 3-STEP ADD PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[rgba(6,124,249,0.15)] shadow-2xl p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.1)]">
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">Add Product to Store</h3>
                <p className="text-[11px] text-[#64748B]">Configure your digital asset, pricing, and automated fulfillment.</p>
              </div>
              <button 
                onClick={() => setIsAddProductModalOpen(false)} 
                className="text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {/* STEP 1: Basic Details */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="font-mono text-[10px] font-bold text-[#067CF9] uppercase">
                  Step 1 &bull; Basic Details
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#64748B] font-medium">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProd.title}
                    onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                    placeholder="e.g. 30-Day Stoic Mindset Journal & Audio Guide"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[#64748B] font-medium">Category</label>
                    <select
                      value={newProd.type}
                      onChange={(e) => setNewProd({ ...newProd, type: e.target.value })}
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    >
                      <option value="Digital Download">Digital Download (PDF/Guide)</option>
                      <option value="1-on-1 Call">1-on-1 Call (Consultation)</option>
                      <option value="Notion Workspace">Notion Workspace</option>
                      <option value="Asset Pack">Asset Pack (B-Roll/Presets)</option>
                      <option value="Subscription">Community Membership</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-[#64748B] font-medium">
                      <label>Price</label>
                      <div className="flex items-center gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setModalCurrency('INR')}
                          className={`px-1.5 py-0.2 rounded cursor-pointer ${modalCurrency === 'INR' ? 'bg-[#067CF9] text-white font-bold' : 'text-[#64748B]'}`}
                        >
                          INR (₹)
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalCurrency('USD')}
                          className={`px-1.5 py-0.2 rounded cursor-pointer ${modalCurrency === 'USD' ? 'bg-[#067CF9] text-white font-bold' : 'text-[#64748B]'}`}
                        >
                          USD ($)
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-[#64748B]">
                        {modalCurrency === 'INR' ? '₹' : '$'}
                      </span>
                      <input
                        type="text"
                        required
                        value={newProd.priceAmount}
                        onChange={(e) => setNewProd({ ...newProd, priceAmount: e.target.value })}
                        placeholder="499"
                        className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-bold text-[#067CF9] focus:outline-hidden focus:border-[#067CF9]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: Fulfillment Asset */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="font-mono text-[10px] font-bold text-[#067CF9] uppercase">
                  Step 2 &bull; Fulfillment Asset
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProd({ ...newProd, deliveryMethod: 'upload' })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                      newProd.deliveryMethod === 'upload'
                        ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold'
                        : 'border-neutral-200 text-[#64748B] hover:bg-neutral-50'
                    }`}
                  >
                    <Upload className="w-4 h-4 mt-0.5 text-[#067CF9] shrink-0" />
                    <div>
                      <div className="font-semibold text-xs">Upload File</div>
                      <div className="text-[10px] text-[#64748B]">PDF/ZIP up to 25MB</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProd({ ...newProd, deliveryMethod: 'link' })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                      newProd.deliveryMethod === 'link'
                        ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold'
                        : 'border-neutral-200 text-[#64748B] hover:bg-neutral-50'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4 mt-0.5 text-[#067CF9] shrink-0" />
                    <div>
                      <div className="font-semibold text-xs">Access Link</div>
                      <div className="text-[10px] text-[#64748B]">Notion/Drive/Calendly</div>
                    </div>
                  </button>
                </div>

                {newProd.deliveryMethod === 'upload' ? (
                  <div>
                    {newProd.fileName ? (
                      <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-[#067CF9] shrink-0" />
                          <div className="truncate">
                            <span className="font-semibold text-[#0F172A] block truncate">{newProd.fileName}</span>
                            <span className="text-[10px] text-[#64748B] font-mono">{newProd.fileSize} &bull; Ready for instant buyer download</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewProd({ ...newProd, fileData: null, fileName: '', fileSize: '' })}
                          className="text-[#64748B] hover:text-red-500 text-xs font-mono ml-2 shrink-0 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="border border-dashed border-[rgba(6,124,249,0.25)] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#067CF9] transition-colors bg-white">
                        <Upload className="w-5 h-5 text-[#067CF9] mb-1" />
                        <span className="font-semibold text-[#0F172A] text-xs">Choose digital file to deliver</span>
                        <span className="text-[10px] text-[#64748B] mt-0.5">Supports PDF, ZIP, EPUB up to 25MB</span>
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
                    <label className="font-mono text-[#64748B] font-medium block">Customer Access Link</label>
                    <input
                      type="url"
                      value={newProd.accessUrl}
                      onChange={(e) => setNewProd({ ...newProd, accessUrl: e.target.value })}
                      placeholder="https://calendly.com/... or https://notion.so/..."
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9] font-mono"
                    />
                  </div>
                )}
              </div>

              {/* STEP 3: Button Label & Description */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="font-mono text-[10px] font-bold text-[#067CF9] uppercase">
                  Step 3 &bull; Pitch &amp; Call to Action
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#64748B] font-medium">Short Sales Pitch</label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    placeholder="Outline what is inside this asset, who it is for, and key takeaways..."
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] resize-none focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#64748B] font-medium">Button CTA Text</label>
                  <input
                    type="text"
                    value={newProd.ctaText}
                    onChange={(e) => setNewProd({ ...newProd, ctaText: e.target.value })}
                    placeholder="e.g., Get Instant Access"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl text-[#64748B] hover:bg-neutral-100 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Product to Store</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
