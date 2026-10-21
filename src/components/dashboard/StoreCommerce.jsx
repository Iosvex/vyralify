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
  X,
  Image as ImageIcon,
  CheckCircle2,
  Flame,
  User,
  Star,
  CheckCheck,
  Cpu,
  Globe,
  Zap
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';

// Verified Winning Products Database for Commerce Section
const WINNING_PRODUCTS = [
  {
    id: 'win_1',
    title: 'The Faceless Operating Manual (2026 Edition)',
    category: 'guides',
    categoryLabel: 'Digital Guide • PDF',
    type: 'Digital Download',
    suggestedPrice: '₹499',
    suggestedPriceNum: 499,
    margin: '100% Margin (₹499 Profit)',
    salesProof: '2,840+ copies sold across creators',
    badge: '🔥 Top Performer',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.'
  },
  {
    id: 'win_2',
    title: '150+ Viral Retention Hooks Vault',
    category: 'notion',
    categoryLabel: 'Notion Database',
    type: 'Digital Download',
    suggestedPrice: '₹299',
    suggestedPriceNum: 299,
    margin: '100% Margin (₹299 Profit)',
    salesProof: '4,120+ downloads recorded',
    badge: '⚡ High Conversion',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.'
  },
  {
    id: 'win_3',
    title: '1-on-1 Growth Audit & Monetization Call',
    category: 'consulting',
    categoryLabel: 'Calendly Consultation',
    type: '1-on-1 Call',
    suggestedPrice: '₹1,499',
    suggestedPriceNum: 1499,
    margin: 'High-Ticket Direct Payout',
    salesProof: '180+ sessions booked',
    badge: '💎 Premium Ticket',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    description: 'Direct 30-minute private screen-share consultation reviewing content calendar, bio structure, and DM funnel architecture.'
  },
  {
    id: 'win_4',
    title: 'Aesthetic B-Roll Video Vault (4K Vertical)',
    category: 'media',
    categoryLabel: 'Digital Asset Pack',
    type: 'Digital Download',
    suggestedPrice: '₹799',
    suggestedPriceNum: 799,
    margin: '100% Margin (₹799 Profit)',
    salesProof: '980+ packs downloaded',
    badge: '⭐ High Retention',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    description: 'Curated 4K vertical footage library of luxury cars, lo-fi workspaces, city skylines, and moody coffee clips ready to caption.'
  },
  {
    id: 'win_5',
    title: 'High-Converting DM Sales Funnel Scripts',
    category: 'notion',
    categoryLabel: 'Notion Swipe File',
    type: 'Digital Download',
    suggestedPrice: '₹599',
    suggestedPriceNum: 599,
    margin: '100% Margin (₹599 Profit)',
    salesProof: '1,420+ units sold',
    badge: '🚀 High ROI',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    description: 'Exact word-for-word conversation triggers to turn comments into automated DMs and high-ticket clients without sounding salesy.'
  },
  {
    id: 'win_6',
    title: 'Creator Media Kit & Brand Pitch Deck',
    category: 'guides',
    categoryLabel: 'Canva & Figma Deck',
    type: 'Digital Download',
    suggestedPrice: '₹399',
    suggestedPriceNum: 399,
    margin: '100% Margin (₹399 Profit)',
    salesProof: '850+ decks downloaded',
    badge: '📈 Brand Magnet',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    description: 'Sleek agency-grade media kit template ready to customize with your handles, reach metrics, audience demos, and package pricing.'
  }
];

export default function StoreCommerce({ onNavigate, initialSection = 'store' }) {
  const { user, tier } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  // Top-Level Two Sections: 'store' | 'commerce'
  const [activeSection, setActiveSection] = useState(initialSection === 'resell' ? 'commerce' : 'store');

  // Commerce Section: Winning Products Filters
  const [winningCategory, setWinningCategory] = useState('all');
  const [winningSearchQuery, setWinningSearchQuery] = useState('');

  // Store Customizer State: Title, Img, Subtitle, Theme
  const [storeThemeColor, setStoreThemeColor] = useState('blue');
  const [storeHeadline, setStoreHeadline] = useState('Official Resource Vault & Toolkits');
  const [storeBio, setStoreBio] = useState(`Digital products, cheat sheets, and 1-on-1 strategy calls to fast-track your results in ${activePage?.category || 'business'}.`);
  const [storeCustomImage, setStoreCustomImage] = useState('');
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

  // Orders Log State - "Ki naam ata rhe, kon kya khreeed raha hai"
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

  // Effective avatar image
  const displayAvatar = storeCustomImage || getSafeAvatarUrl(activePage?.avatar, rawHandle);

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

    const savedCustomImg = localStorage.getItem(`vyralify_store_img_${rawHandle}`);
    if (savedCustomImg) {
      setStoreCustomImage(savedCustomImg);
    }
  }, [rawHandle]);

  // Sync store settings & products for public storefront
  useEffect(() => {
    localStorage.setItem('vyralify_store_products', JSON.stringify(products));
    const handleKey = rawHandle;
    localStorage.setItem(`vyralify_store_${handleKey}`, JSON.stringify({
      handle: handleKey,
      headline: storeHeadline,
      bio: storeBio,
      products: products,
      themeColor: storeThemeColor,
      avatar: displayAvatar
    }));
  }, [products, storeHeadline, storeBio, storeThemeColor, rawHandle, displayAvatar]);

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

  // Avatar Upload Handler
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addNotification({
        title: 'Image Too Large',
        message: 'Please choose an image under 5MB.',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setStoreCustomImage(dataUrl);
      localStorage.setItem(`vyralify_store_img_${rawHandle}`, dataUrl);
      addNotification({
        title: 'Store Image Updated',
        message: 'Storefront logo and avatar updated.',
        type: 'success'
      });
    };
    reader.readAsDataURL(file);
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

  // 1-Click Import from Winning Products Vault into Creator Store
  const handleImportWinningProduct = (winProd) => {
    // Check if already in store
    const isAlreadyInStore = products.some(p => p.title.toLowerCase() === winProd.title.toLowerCase());
    if (isAlreadyInStore) {
      addNotification({
        title: 'Already in Store',
        message: `"${winProd.title}" is already listed on your storefront.`,
        type: 'info'
      });
      return;
    }

    if (tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Upgrade to Pro to import unlimited turnkey assets from the Winning Products Vault.'
      );
      return;
    }

    const imported = {
      id: 'prod_' + Date.now(),
      title: winProd.title,
      price: winProd.suggestedPrice,
      priceNumeric: winProd.suggestedPriceNum,
      type: winProd.type,
      description: winProd.description,
      deliveryMethod: 'upload',
      fileName: `${winProd.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`,
      fileSize: '3.2 MB',
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
      title: 'Winning Product Imported! 🎉',
      message: `"${winProd.title}" is now active in your store. Ready to earn!`,
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
    const targetProduct = products[0] || WINNING_PRODUCTS[0];
    const testBuyers = [
      { name: 'Arjun Verma', email: 'arjun.v@gmail.com' },
      { name: 'Meera Sengupta', email: 'meera@creatorflow.in' },
      { name: 'Sameer Khan', email: 'sameer.k@outlook.com' },
      { name: 'Tanvi Deshmukh', email: 'tanvi@digitalvault.io' },
      { name: 'Kavita Nair', email: 'kavita.nair@icloud.com' }
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
      paymentGateway: Math.random() > 0.5 ? 'Razorpay' : 'Stripe',
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
      title: 'New Customer Purchase! 🎉',
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

  // Filtered winning products in Commerce
  const filteredWinningProducts = WINNING_PRODUCTS.filter(w => {
    if (winningCategory !== 'all' && w.category !== winningCategory) return false;
    if (winningSearchQuery.trim()) {
      const q = winningSearchQuery.toLowerCase();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchDesc = w.description.toLowerCase().includes(q);
      const matchCat = w.categoryLabel.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  const totalStoreRevenue = orders.reduce((acc, o) => {
    const num = o.amountNumeric || parseInt(o.amount?.replace(/[^0-9]/g, '') || '0', 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const cleanArrow = (text) => {
    if (!text) return 'Get Instant Access';
    return text.replace(/&rarr;/g, '').replace(/→/g, '').trim();
  };

  // Initials generator for customer avatars
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'CU';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP HEADER & TWO MASTER TOGGLES: [ Store | Commerce ] */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Store &amp; Commerce
          </h1>
          <p className="text-[#64748B] text-xs mt-1 font-medium">
            Build ultra-fast digital storefronts, resell Vyralify Co-Pilot software, and import verified winning products.
          </p>
        </div>

        {/* Top-Level Master Two Toggles: [ Store | Commerce ] */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-[rgba(6,124,249,0.15)] shadow-xs shrink-0">
          <button
            onClick={() => setActiveSection('store')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSection === 'store'
                ? 'bg-[#067CF9] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Store</span>
          </button>

          <button
            onClick={() => setActiveSection('commerce')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSection === 'commerce'
                ? 'bg-[#067CF9] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Commerce</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: STORE VIEW
          Structure:
          A. Storefront Analytics (4 KPI Cards)
          B. Live Customer Orders & Sales Feed ("Ki naam ata rhe, kon kya khreeed raha hai")
          C. Storefront Builder (Title, Img, Subtitle, Products, Mobile Phone Preview)
         ========================================================================= */}
      {activeSection === 'store' && (
        <div className="space-y-6">
          
          {/* A. STOREFRONT ANALYTICS (4 KPI CARDS) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] text-[#64748B] font-medium block">Total Revenue</span>
              <div className="text-xl font-bold text-[#0F172A] mt-1">
                ₹{totalStoreRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#10B981] mt-1 block font-semibold">+18.2% this month</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] text-[#64748B] font-medium block">Storefront Clicks</span>
              <div className="text-xl font-bold text-[#0F172A] mt-1">2,840</div>
              <span className="text-[10px] text-[#64748B] mt-1 block font-medium">Traffic across bio links</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] text-[#64748B] font-medium block">Conversion Rate</span>
              <div className="text-xl font-bold text-[#0F172A] mt-1">4.2%</div>
              <span className="text-[10px] text-[#10B981] mt-1 block font-semibold">Above creator avg (2.8%)</span>
            </div>

            <div className="p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)]">
              <span className="text-[11px] text-[#64748B] font-medium block">Active Products</span>
              <div className="text-xl font-bold text-[#0F172A] mt-1">
                {products.length} / {tier === 'free' ? '1 (Free)' : 'Unlimited'}
              </div>
              <span className="text-[10px] text-[#067CF9] mt-1 block font-semibold">Instant checkout enabled</span>
            </div>
          </div>

          {/* B. ORDERS & SALES FEED (Directly Under Analytics)
              User Request: "Ki naam ata rhe, kon kya khreeed raha hai. Analytics ke neechey" */}
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#0F172A] text-sm">
                    Orders &amp; Live Customer Purchases
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Activity Feed
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  Real-time log of customer names, products purchased, and instant payment settlements.
                </p>
              </div>

              {/* Action Buttons: Search, Export CSV, Test Order */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by customer name, email..."
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleExportOrdersCsv}
                  className="px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.2)] text-[#0F172A] hover:bg-[#EFF6FF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#067CF9]" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateTestOrder}
                  className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] border border-[rgba(6,124,249,0.25)] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Simulate a live customer purchase"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Test Purchase</span>
                </button>
              </div>
            </div>

            {/* High-Contrast Light Orders Table */}
            <div className="overflow-x-auto rounded-xl border border-[rgba(6,124,249,0.1)]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[rgba(6,124,249,0.1)] text-[#64748B] text-[11px]">
                    <th className="py-2.5 px-3.5 font-semibold">Customer (Naam &amp; Email)</th>
                    <th className="py-2.5 px-3 font-semibold">Product Purchased</th>
                    <th className="py-2.5 px-3 font-semibold">Amount</th>
                    <th className="py-2.5 px-3 font-semibold">Gateway</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3.5 font-semibold text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(6,124,249,0.06)]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-[#94A3B8] text-xs">
                        No orders found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord, idx) => (
                      <tr 
                        key={ord.id} 
                        className={`${idx % 2 === 1 ? 'bg-[#FAFCFF]' : 'bg-white'} hover:bg-[#EFF6FF]/60 transition-colors`}
                      >
                        {/* Customer Column: Displays name and email clearly */}
                        <td className="py-3 px-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#EFF6FF] border border-[rgba(6,124,249,0.25)] text-[#067CF9] text-[10px] font-bold flex items-center justify-center shrink-0">
                              {getInitials(ord.customer)}
                            </div>
                            <div>
                              <div className="font-bold text-[#0F172A] text-xs leading-tight">
                                {ord.customer}
                              </div>
                              <div className="text-[11px] text-[#64748B] font-medium leading-tight">
                                {ord.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Product Purchased */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-[#067CF9] shrink-0" />
                            <span className="font-semibold text-[#0F172A] max-w-[240px] truncate" title={ord.product}>
                              {ord.product}
                            </span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-3">
                          <span className="font-bold text-[#0F172A] text-xs">
                            {ord.amount}
                          </span>
                        </td>

                        {/* Payment Gateway */}
                        <td className="py-3 px-3">
                          <span className="text-[#64748B] text-[11px] font-medium">
                            {ord.paymentGateway || 'Razorpay'}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)]">
                            <Check className="w-2.5 h-2.5" />
                            {ord.status}
                          </span>
                        </td>

                        {/* Date / Time */}
                        <td className="py-3 px-3.5 text-right text-[#64748B] text-[11px] font-medium whitespace-nowrap">
                          {ord.date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* C. STOREFRONT BUILDER (Title, Img, Subtitle, Products, Mobile Phone Preview)
              User Request: "store builder, title, img, subtitle wagera" */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Store Configuration Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-5">
                
                <div>
                  <h3 className="font-bold text-[#0F172A] text-sm">
                    Storefront Builder &amp; Branding
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                    Customize your store's title, logo image, subtitle, and listed digital products.
                  </p>
                </div>

                {/* 1. Store Link Row */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] font-semibold">Store Link</label>
                  <div className="flex items-center justify-between bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3.5 py-2 text-xs">
                    <span className="text-[#0F172A] font-bold">
                      {cleanStoreUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyStoreLink}
                      className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedStoreLink ? <Check className="w-3 h-3 text-[#067CF9]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedStoreLink ? 'Copied' : 'Copy Store Link'}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Store Image / Logo / Avatar (User Request: "img") */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] font-semibold">Store Image / Brand Logo</label>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)]">
                    <div className="relative w-14 h-14 rounded-full ring-2 ring-[#067CF9] p-0.5 bg-white shrink-0">
                      <img
                        src={displayAvatar}
                        alt="Store avatar"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getSafeAvatarUrl('', rawHandle);
                        }}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-bold text-[#0F172A]">
                        Displayed on your public store &amp; mobile link-in-bio
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="px-3 py-1.5 rounded-lg bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                        {storeCustomImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setStoreCustomImage('');
                              localStorage.removeItem(`vyralify_store_img_${rawHandle}`);
                            }}
                            className="text-xs text-[#64748B] hover:text-red-500 font-medium px-2 py-1 cursor-pointer"
                          >
                            Reset to Profile Pic
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Store Title (User Request: "title") */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Store Title</label>
                    <span className="text-[11px] font-medium">{storeHeadline.length}/60</span>
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

                {/* 4. Store Subtitle / Bio (User Request: "subtitle wagera") */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Store Subtitle / Bio</label>
                    <span className="text-[11px] font-medium">{storeBio.length}/160</span>
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

                {/* 5. Theme Palette Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] font-semibold">Theme Palette</label>
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

                {/* 6. Product Management Section */}
                <div className="pt-3 border-t border-[rgba(6,124,249,0.08)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-xs">
                        Active Products ({products.length})
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        Products shown on your storefront.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (tier === 'free' && products.length >= 1) {
                          openUpgradeModal('store_products', 'Free tier includes 1 product slot. Upgrade to Pro for unlimited store products.');
                        } else {
                          setIsAddProductModalOpen(true);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Product</span>
                    </button>
                  </div>

                  {/* Product items mini list */}
                  <div className="space-y-2">
                    {products.map(prod => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] flex items-center justify-between gap-3 hover:border-[#067CF9]/40 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#0F172A] truncate">
                              {prod.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#067CF9] font-bold border border-[rgba(6,124,249,0.15)] shrink-0">
                              {prod.price}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748B] mt-0.5">
                            {prod.type} &bull; {prod.salesCount} sold ({prod.revenue || '₹0'})
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 rounded-lg text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Shortcut to Commerce Winning Products */}
                  <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#067CF9] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#0F172A]">Need turnkey digital products to sell?</div>
                        <div className="text-[11px] text-[#64748B]">Browse verified Winning Products in the Commerce section.</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('commerce')}
                      className="px-3 py-1.5 rounded-lg bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs shrink-0"
                    >
                      <span>Explore Winning Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Save & Publish Store button */}
                <div className="pt-4 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between">
                  <span className="text-[11px] text-[#067CF9] flex items-center gap-1 font-semibold">
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

            {/* Right Column: Sleek iOS Phone Frame with Real-Time Mobile Preview (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center sticky top-6">
              <div className="w-[320px] rounded-[48px] bg-white p-3.5 shadow-[0_20px_50px_rgba(6,124,249,0.12)] border-[6px] border-slate-100 ring-1 ring-[rgba(6,124,249,0.2)] relative">
                
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 bg-[#0F172A] rounded-full mx-auto mb-2 flex items-center justify-end pr-2">
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Screen Inner */}
                <div className="bg-[#F0F6FE] rounded-[36px] p-4 text-center min-h-[540px] flex flex-col justify-between overflow-hidden text-[#0F172A]">
                  
                  {/* Store Profile Header */}
                  <div className="space-y-3 pt-1">
                    <div className="relative w-16 h-16 mx-auto">
                      <img
                        src={displayAvatar}
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
                      <p className="text-[11px] text-[#0F172A] mt-0.5 font-bold">{storeHeadline}</p>
                      <p className="text-[10px] text-[#64748B] leading-tight mt-1 max-w-[240px] mx-auto line-clamp-2">
                        {storeBio}
                      </p>
                    </div>

                    {/* Product Cards Stack in Phone */}
                    <div className="space-y-2.5 pt-2 text-left">
                      {products.map(p => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.12)] shadow-xs space-y-2 hover:border-[#067CF9]/40 transition-colors"
                        >
                          <div className="flex items-center justify-between text-[10px]">
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
                  <div className="pt-3 pb-1 border-t border-[rgba(6,124,249,0.1)] text-[9px] text-[#64748B] font-medium">
                    Powered by <strong className="text-[#067CF9]">Vyralify Store</strong>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          SECTION 2: COMMERCE VIEW
          User Request:
          "Winning Products ke upar he ek aisa tab add krdena
           White-Label software resell wala
           Ki sell vyralify's co-pilot
           Agency resell nahi tha apna, Vyralfiy Co-Pilot resell tha. Software tha wo, Agency nai
           Isko laga dena winning Products me Sabse up"
         ========================================================================= */}
      {activeSection === 'commerce' && (
        <div className="space-y-6">
          
          {/* 1. VYRALIFY CO-PILOT SOFTWARE RESELL (White-Label Software Reseller - Placed at the very top of Commerce) */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.15)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#067CF9] animate-pulse" />
                  <h3 className="font-bold text-[#0F172A] text-base">
                    Sell Vyralify Co-Pilot (White-Label Software Resell)
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] mt-1 font-medium max-w-2xl">
                  Rebrand Vyralify's complete AI Co-Pilot software under your custom domain &amp; logo. Sell recurring software subscriptions directly to your audience, clients, and students—keep 100% of the recurring MRR.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[rgba(6,124,249,0.25)] text-[#067CF9] text-xs font-bold self-start sm:self-auto shrink-0 flex items-center gap-1.5 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>100% Software Profit Margins</span>
              </span>
            </div>

            {/* 3 Pillar Feature Cards for Co-Pilot Software Resell */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#067CF9]" />
                  <span className="font-bold text-[#0F172A] block">Custom Domain &amp; Logo</span>
                </div>
                <p className="text-[#64748B] leading-relaxed">
                  Host under your custom domain (e.g., <code className="text-[#067CF9] font-semibold">copilot.yourbrand.com</code>) with your white-label logo, branding, and custom favicon.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#067CF9]" />
                  <span className="font-bold text-[#0F172A] block">100% Software Profit Margins</span>
                </div>
                <p className="text-[#64748B] leading-relaxed">
                  Connect your own Stripe or Razorpay accounts. Charge ₹1,999/mo or ₹14,999/yr per license and keep 100% of recurring subscriber revenue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#067CF9]" />
                  <span className="font-bold text-[#0F172A] block">Turnkey Cloud AI Engine</span>
                </div>
                <p className="text-[#64748B] leading-relaxed">
                  Zero server or GPU management. Vyralify handles all AI script engineering, viral intelligence, and uptime silently in the background.
                </p>
              </div>
            </div>

            {/* Action Banner for Co-Pilot Reseller */}
            <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[rgba(6,124,249,0.25)] text-[#067CF9] flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 text-[#067CF9]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Deploy Your Branded AI Co-Pilot Software</h4>
                  <p className="text-[#64748B]">Activate your Co-Pilot reseller license to generate instant client access keys and white-label portals.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openUpgradeModal('white_label', 'Upgrade to Elite Plan to resell Vyralify Co-Pilot under your own software brand.')}
                className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-xs"
              >
                <span>Get Co-Pilot Reseller License</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. WINNING PRODUCTS VAULT (Directly Below Co-Pilot Resell in Commerce) */}
          <div className="space-y-4">
            
            {/* Header & Filter Controls */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0F172A] text-base">
                      Winning Products Vault
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)] text-[10px] font-bold">
                      {WINNING_PRODUCTS.length} Verified Turnkey Assets
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                    Pre-packaged digital downloads, Notion templates, and 1-on-1 consultations tested for high conversion. 1-click import directly into your store.
                  </p>
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={winningSearchQuery}
                    onChange={(e) => setWinningSearchQuery(e.target.value)}
                    placeholder="Search winning assets, guides..."
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                {[
                  { id: 'all', label: 'All Winning Products' },
                  { id: 'guides', label: 'Guides & Ebooks' },
                  { id: 'notion', label: 'Notion Systems' },
                  { id: 'consulting', label: '1-on-1 Consultations' },
                  { id: 'media', label: '4K B-Roll & Media' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setWinningCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      winningCategory === cat.id
                        ? 'bg-[#067CF9] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[rgba(6,124,249,0.08)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Winning Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWinningProducts.map(winProd => {
                const isAlreadyInStore = products.some(
                  p => p.title.toLowerCase().trim() === winProd.title.toLowerCase().trim()
                );

                return (
                  <div
                    key={winProd.id}
                    className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-4 flex flex-col justify-between hover:border-[#067CF9]/40 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Top Thumbnail & Badges */}
                      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900">
                        <img
                          src={winProd.thumbnail}
                          alt={winProd.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                            {winProd.categoryLabel}
                          </span>
                        </div>

                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#067CF9] text-white text-[10px] font-bold shadow-xs">
                            {winProd.badge}
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <span className="text-[10px] text-white/80 font-medium block">{winProd.salesProof}</span>
                          <span className="text-xs font-bold leading-tight line-clamp-1">{winProd.title}</span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-[#0F172A] text-sm leading-snug">
                          {winProd.title}
                        </h4>
                        <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">
                          {winProd.description}
                        </p>
                      </div>

                      {/* Profit & Margin Highlights */}
                      <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-[#64748B] font-medium block">Suggested Price</span>
                          <strong className="text-[#0F172A] font-bold text-sm">{winProd.suggestedPrice}</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-600 font-semibold block">{winProd.margin}</span>
                          <span className="text-[10px] text-[#64748B] font-medium">Instant Payout</span>
                        </div>
                      </div>
                    </div>

                    {/* Import to My Store Button */}
                    <div className="pt-2">
                      {isAlreadyInStore ? (
                        <div className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5">
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Active on Your Storefront</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleImportWinningProduct(winProd)}
                          className="w-full py-2.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Import to My Store</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

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
                <div className="text-[10px] font-bold text-[#067CF9] uppercase">
                  Step 1 &bull; Basic Details
                </div>

                <div className="space-y-1">
                  <label className="text-[#64748B] font-semibold">Product Title</label>
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
                    <label className="text-[#64748B] font-semibold">Category</label>
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
                    <div className="flex items-center justify-between text-[#64748B] font-semibold">
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
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#64748B]">
                        {modalCurrency === 'INR' ? '₹' : '$'}
                      </span>
                      <input
                        type="text"
                        required
                        value={newProd.priceAmount}
                        onChange={(e) => setNewProd({ ...newProd, priceAmount: e.target.value })}
                        placeholder="499"
                        className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl pl-7 pr-3 py-2 text-xs font-bold text-[#067CF9] focus:outline-hidden focus:border-[#067CF9]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: Fulfillment Asset */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="text-[10px] font-bold text-[#067CF9] uppercase">
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
                            <span className="text-[10px] text-[#64748B] font-medium">{newProd.fileSize} &bull; Ready for instant buyer download</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewProd({ ...newProd, fileData: null, fileName: '', fileSize: '' })}
                          className="text-[#64748B] hover:text-red-500 text-xs ml-2 shrink-0 cursor-pointer font-medium"
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
                    <label className="text-[#64748B] font-semibold block">Customer Access Link</label>
                    <input
                      type="url"
                      value={newProd.accessUrl}
                      onChange={(e) => setNewProd({ ...newProd, accessUrl: e.target.value })}
                      placeholder="https://calendly.com/... or https://notion.so/..."
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>
                )}
              </div>

              {/* STEP 3: Button Label & Description */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="text-[10px] font-bold text-[#067CF9] uppercase">
                  Step 3 &bull; Pitch &amp; Call to Action
                </div>

                <div className="space-y-1">
                  <label className="text-[#64748B] font-semibold">Short Sales Pitch</label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    placeholder="Outline what is inside this asset, who it is for, and key takeaways..."
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] resize-none focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#64748B] font-semibold">Button CTA Text</label>
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
                  className="px-3.5 py-1.5 rounded-xl text-[#64748B] hover:bg-neutral-100 cursor-pointer transition-colors font-medium"
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
