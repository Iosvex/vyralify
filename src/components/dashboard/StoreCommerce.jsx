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
  Zap,
  ChevronUp,
  ChevronDown,
  EyeOff,
  LayoutGrid,
  List,
  Video,
  HelpCircle
} from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import PublicStorefrontProductView from '../storefront/PublicStorefrontProductView';

// Curated Storefront Theme Palettes with rich gradients and live styling
export const STORE_THEMES = [
  {
    id: 'blue',
    label: 'Electric Blue',
    swatch: 'bg-[#067CF9]',
    primary: '#067CF9',
    containerBg: 'bg-[#F0F6FE]',
    cardBg: 'bg-white',
    cardBorder: 'border-[rgba(6,124,249,0.15)]',
    textPrimary: 'text-[#0F172A]',
    textSecondary: 'text-[#64748B]',
    priceColor: 'text-[#067CF9]',
    ringColor: 'ring-[#067CF9]',
    buttonClass: 'bg-[#067CF9] hover:bg-[#0568D2] text-white',
    tagClass: 'bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)]'
  },
  {
    id: 'obsidian',
    label: 'Obsidian Dark',
    swatch: 'bg-[#0F172A]',
    primary: '#0F172A',
    containerBg: 'bg-[#090D16]',
    cardBg: 'bg-[#111827]',
    cardBorder: 'border-slate-800',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-400',
    priceColor: 'text-[#38BDF8]',
    ringColor: 'ring-slate-700',
    buttonClass: 'bg-[#067CF9] hover:bg-[#0568D2] text-white',
    tagClass: 'bg-slate-800 text-slate-300 border border-slate-700'
  },
  {
    id: 'sunset',
    label: 'Sunset Violet',
    swatch: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500',
    primary: '#8B5CF6',
    containerBg: 'bg-gradient-to-b from-[#FAF5FF] via-white to-[#FDF2F8]',
    cardBg: 'bg-white/95 backdrop-blur-md',
    cardBorder: 'border-violet-100',
    textPrimary: 'text-[#1E1B4B]',
    textSecondary: 'text-[#6B7280]',
    priceColor: 'text-violet-600',
    ringColor: 'ring-violet-500',
    buttonClass: 'bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-95 text-white shadow-xs',
    tagClass: 'bg-violet-50 text-violet-700 border border-violet-200'
  },
  {
    id: 'cyan',
    label: 'Ice Cyan',
    swatch: 'bg-gradient-to-r from-sky-400 to-cyan-500',
    primary: '#0EA5E9',
    containerBg: 'bg-gradient-to-b from-[#F0F9FF] to-white',
    cardBg: 'bg-white',
    cardBorder: 'border-sky-100',
    textPrimary: 'text-[#082F49]',
    textSecondary: 'text-[#64748B]',
    priceColor: 'text-sky-600',
    ringColor: 'ring-sky-400',
    buttonClass: 'bg-gradient-to-r from-sky-500 to-cyan-600 hover:opacity-95 text-white',
    tagClass: 'bg-sky-50 text-sky-700 border border-sky-200'
  },
  {
    id: 'emerald',
    label: 'Emerald Matrix',
    swatch: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    primary: '#10B981',
    containerBg: 'bg-gradient-to-b from-[#ECFDF5] to-white',
    cardBg: 'bg-white',
    cardBorder: 'border-emerald-100',
    textPrimary: 'text-[#064E3B]',
    textSecondary: 'text-[#64748B]',
    priceColor: 'text-emerald-600',
    ringColor: 'ring-emerald-500',
    buttonClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white',
    tagClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  },
  {
    id: 'rose',
    label: 'Neon Rose',
    swatch: 'bg-gradient-to-r from-rose-500 to-red-500',
    primary: '#F43F5E',
    containerBg: 'bg-gradient-to-b from-[#FFF1F2] to-white',
    cardBg: 'bg-white',
    cardBorder: 'border-rose-100',
    textPrimary: 'text-[#881337]',
    textSecondary: 'text-[#64748B]',
    priceColor: 'text-rose-600',
    ringColor: 'ring-rose-500',
    buttonClass: 'bg-gradient-to-r from-rose-500 to-red-500 hover:opacity-95 text-white',
    tagClass: 'bg-rose-50 text-rose-700 border border-rose-200'
  }
];

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

  // Store Customizer State: Title, Img, Subtitle, Theme & Currency
  const [storeThemeColor, setStoreThemeColor] = useState(() => localStorage.getItem('vyralify_store_theme') || 'blue');
  const activeTheme = STORE_THEMES.find(t => t.id === storeThemeColor) || STORE_THEMES[0];
  const [storeCurrency, setStoreCurrency] = useState(() => localStorage.getItem('vyralify_currency') || user?.currency || 'INR');
  const [storeHeadline, setStoreHeadline] = useState('Official Resource Vault & Toolkits');
  const [storeBio, setStoreBio] = useState(`Digital products, cheat sheets, and 1-on-1 strategy calls to fast-track your results in ${activePage?.category || 'business'}.`);
  const [storeCustomImage, setStoreCustomImage] = useState('');
  const [copiedStoreLink, setCopiedStoreLink] = useState(false);

  // Layout Presets & Styling Controls (Spec Section 4: Layout Presets & Styling Matrix)
  const [storeLayout, setStoreLayout] = useState(() => localStorage.getItem('vyralify_store_layout') || 'stack'); // 'stack' | 'grid' | 'hero'
  const [storeBorderRadius, setStoreBorderRadius] = useState(() => localStorage.getItem('vyralify_store_radius') || 'rounded-2xl');
  const [storeFont, setStoreFont] = useState(() => localStorage.getItem('vyralify_store_font') || 'font-sans');

  // Real-Time Phone Preview Layer Switcher: 'hub' (Layer 1 Link-in-Bio) | 'product' (Layer 2 Dedicated Page)
  const [previewLayer, setPreviewLayer] = useState('hub');
  const [previewProduct, setPreviewProduct] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // Analytics CRM Time Range (Spec Section 8: Day, Week, Month, All-Time)
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('month');

  // Professional Product Catalog State
  const [products, setProducts] = useState([
    {
      id: 'prod_1',
      slug: 'faceless-operating-manual',
      itemKind: 'product',
      title: 'The Faceless Operating Manual (2026 Edition)',
      price: '₹499',
      priceNumeric: 499,
      type: 'Digital Download',
      salesCount: 84,
      revenue: '₹41,916',
      status: 'published',
      isHero: true,
      ctaText: 'Get Instant Access',
      deliverablesText: 'Full 42-page PDF Master Blueprint\n500+ Royalty-free cinematic B-roll sources\nAutomated caption prompts & retention loops\nFree future lifetime updates',
      targetAudience: 'Designed for creator-operators, faceless theme pages, and digital entrepreneurs wanting automated high-ticket revenue.',
      videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      faqQ1: 'How is this delivered upon payment?',
      faqA1: 'Instant automated download on your screen right after checkout, plus a secure backup copy sent to your email.',
      faqQ2: 'Is this suitable for beginners?',
      faqA2: 'Yes, includes step-by-step visual breakdowns and copy-paste action checklists.'
    },
    {
      id: 'prod_2',
      slug: 'growth-audit-call',
      itemKind: 'product',
      title: '1-on-1 Growth Audit & Consultation (30m)',
      price: '₹1,499',
      priceNumeric: 1499,
      type: '1-on-1 Call',
      salesCount: 18,
      revenue: '₹26,982',
      status: 'published',
      isHero: false,
      ctaText: 'Book Calendar Slot',
      deliverablesText: '30-minute private Zoom/Google Meet video session\nFull teardown of your page bio, highlights & top 10 reels\nCustom 30-day content calendar tailored to your exact niche',
      targetAudience: 'Creators and brands with existing traffic looking to optimize monetization and conversion rates.',
      videoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
      faqQ1: 'When can I schedule my call?',
      faqA1: 'Immediately after checkout, you are redirected to the live Calendly calendar to pick your preferred slot.'
    },
    {
      id: 'prod_3',
      slug: 'viral-retention-hooks',
      itemKind: 'product',
      title: '150+ Viral Retention Hooks Vault',
      price: '₹299',
      priceNumeric: 299,
      type: 'Digital Download',
      salesCount: 112,
      revenue: '₹33,488',
      status: 'published',
      isHero: false,
      ctaText: 'Unlock Hooks Database',
      deliverablesText: '150+ tested opening hooks rated by 3-second hold rate\nInteractive Notion database with tags and filter views\nVisual pattern interrupt guides & sound effect timestamps',
      targetAudience: 'Reel creators, video editors, and agency operators struggling with sub-40% 3-second view retention.'
    }
  ]);

  // Create Product Modal State (3-Step Form & Custom Links)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [modalCurrency, setModalCurrency] = useState(storeCurrency === 'USD' ? 'USD' : 'INR');
  const [newProd, setNewProd] = useState({
    itemKind: 'product', // 'product' | 'link'
    title: '',
    slug: '',
    priceAmount: '499',
    type: 'Digital Download',
    deliveryMethod: 'upload', // 'upload' | 'link'
    fileData: null,
    fileName: '',
    fileSize: '',
    accessUrl: '',
    linkUrl: '',
    linkSubtitle: '',
    linkImage: '',
    description: '',
    ctaText: 'Get Instant Access',
    // Layer 2 Dedicated Product Page fields (Spec Section 4 & 7)
    deliverablesText: 'Comprehensive 42-page PDF Master Blueprint\n500+ Royalty-free cinematic B-roll sources\nAutomated caption prompts & retention loops\nFree future lifetime updates',
    targetAudience: 'Designed for creator-operators, Instagram theme pages, and digital agency founders looking for automated monetization.',
    videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    faqQ1: 'How is this delivered upon payment?',
    faqA1: 'Instant automated download on your screen right after checkout, plus a secure backup copy sent to your email.',
    faqQ2: 'Is this suitable for beginners?',
    faqA2: 'Yes, includes step-by-step visual breakdowns and copy-paste action checklists.',
    status: 'published', // 'published' | 'unlisted' | 'draft'
    isHero: false
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

  // Custom Creator Store Handle & Clean vyralify.in URL
  const defaultUserHandle = (activePage?.handle || user?.displayName || user?.name || 'maazahmad').replace(/^@/, '');
  const [storeHandle, setStoreHandle] = useState(() => {
    return localStorage.getItem('vyralify_store_handle') || defaultUserHandle;
  });

  useEffect(() => {
    if (activePage?.handle && activePage.handle !== 'creator') {
      const clean = activePage.handle.replace(/^@/, '');
      setStoreHandle(clean);
      localStorage.setItem('vyralify_store_handle', clean);
    }
  }, [activePage?.handle]);

  const rawHandle = storeHandle.replace(/^@/, '').trim() || defaultUserHandle;
  const cleanStoreUrl = `vyralify.in/${rawHandle}`;

  // Individual product link copied state
  const [copiedProductId, setCopiedProductId] = useState(null);
  const [isBeaconsPreviewOpen, setIsBeaconsPreviewOpen] = useState(false);

  // Copy Direct Product Landing Page Link
  const handleCopyProductLink = (prod, e) => {
    if (e) e.stopPropagation();
    const prodSlug = prod.slug || prod.id;
    const fullProdUrl = typeof window !== 'undefined' && window.location.hostname.includes('localhost')
      ? `${window.location.origin}/${rawHandle}/${prodSlug}`
      : `https://vyralify.in/${rawHandle}/${prodSlug}`;
    navigator.clipboard.writeText(fullProdUrl);
    setCopiedProductId(prod.id);
    addNotification({
      title: 'Product Link Copied! 📋',
      message: `${fullProdUrl} copied to clipboard! Share it directly with your buyers.`,
      type: 'success'
    });
    setTimeout(() => setCopiedProductId(null), 2000);
  };

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
    localStorage.setItem('vyralify_store_layout', storeLayout);
    localStorage.setItem('vyralify_store_radius', storeBorderRadius);
    localStorage.setItem('vyralify_store_font', storeFont);
    localStorage.setItem('vyralify_store_headline', storeHeadline);
    localStorage.setItem('vyralify_store_bio', storeBio);
    if (displayAvatar) {
      localStorage.setItem('vyralify_store_avatar', displayAvatar);
    }
    const handleKey = rawHandle || 'creator';
    const storePayload = {
      handle: handleKey,
      headline: storeHeadline,
      bio: storeBio,
      products: products,
      themeColor: storeThemeColor,
      avatar: displayAvatar,
      layout: storeLayout,
      borderRadius: storeBorderRadius,
      font: storeFont
    };
    localStorage.setItem(`vyralify_store_${handleKey}`, JSON.stringify(storePayload));
    // Also save under demo key for instant preview
    localStorage.setItem('vyralify_store_demo', JSON.stringify({ ...storePayload, handle: 'demo' }));

    // Dispatch update event for active storefront listeners
    try {
      window.dispatchEvent(new CustomEvent('vyralify-store-updated', { detail: storePayload }));
    } catch {}
  }, [products, storeHeadline, storeBio, storeThemeColor, rawHandle, displayAvatar, storeLayout, storeBorderRadius, storeFont]);

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
    const fullStoreUrl = typeof window !== 'undefined' && window.location.hostname.includes('localhost')
      ? `${window.location.origin}/${rawHandle}`
      : `https://vyralify.in/${rawHandle}`;
    navigator.clipboard.writeText(fullStoreUrl);
    setCopiedStoreLink(true);
    addNotification({
      title: 'Store Link Copied! 🚀',
      message: `${fullStoreUrl} copied to clipboard! Share it with your followers.`,
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

  // Theme Palette Handler
  const handleSelectTheme = (themeId) => {
    setStoreThemeColor(themeId);
    localStorage.setItem('vyralify_store_theme', themeId);
    try {
      const saved = localStorage.getItem(`vyralify_store_${rawHandle}`);
      const parsed = saved ? JSON.parse(saved) : {};
      parsed.theme = themeId;
      localStorage.setItem(`vyralify_store_${rawHandle}`, JSON.stringify(parsed));
    } catch (e) {}
    addNotification({
      title: 'Store Theme Applied',
      message: `Palette updated to ${STORE_THEMES.find(t => t.id === themeId)?.label || themeId}.`,
      type: 'info'
    });
  };

  // Currency & Payment Gateway Toggle Handler
  const handleToggleCurrency = (curr) => {
    setStoreCurrency(curr);
    localStorage.setItem('vyralify_currency', curr);
    setModalCurrency(curr);
    addNotification({
      title: 'Currency Preference Updated',
      message: `Storefront set to ${curr === 'INR' ? 'INR (₹ - Razorpay/UPI)' : 'USD ($ - Stripe/Cards)'}.`,
      type: 'info'
    });
  };

  // Open Modal for Editing an Existing Product or Link
  const handleEditProduct = (prod) => {
    setEditingProductId(prod.id);
    const isLink = prod.itemKind === 'link' || prod.type === 'Custom Link';
    setNewProd({
      itemKind: isLink ? 'link' : 'product',
      title: prod.title || '',
      slug: prod.slug || '',
      priceAmount: String(prod.priceNumeric || (prod.price ? prod.price.replace(/[^0-9.]/g, '') : '499')),
      type: prod.type || 'Digital Download',
      deliveryMethod: prod.deliveryMethod || 'upload',
      fileData: prod.fileData || null,
      fileName: prod.fileName || '',
      fileSize: prod.fileSize || '',
      accessUrl: prod.accessUrl || '',
      linkUrl: prod.accessUrl || '',
      linkSubtitle: prod.subtitle || '',
      linkImage: prod.cardImage || '',
      description: prod.description || '',
      ctaText: prod.ctaText || 'Get Instant Access',
      deliverablesText: prod.deliverablesText || (Array.isArray(prod.deliverables) ? prod.deliverables.join('\n') : ''),
      targetAudience: prod.targetAudience || '',
      videoUrl: prod.videoUrl || '',
      faqQ1: prod.faqQ1 || (prod.faqs?.[0]?.q || ''),
      faqA1: prod.faqA1 || (prod.faqs?.[0]?.a || ''),
      faqQ2: prod.faqQ2 || (prod.faqs?.[1]?.q || ''),
      faqA2: prod.faqA2 || (prod.faqs?.[1]?.a || ''),
      status: prod.status || 'published',
      isHero: Boolean(prod.isHero)
    });
    setIsAddProductModalOpen(true);
  };

  // Create Product or Custom Link Handler (also handles editing)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProd.title.trim()) return;

    // Handle Custom Redirect Link Creation or Update
    if (newProd.itemKind === 'link') {
      const createdLink = {
        id: editingProductId || ('link_' + Date.now()),
        itemKind: 'link',
        title: newProd.title,
        subtitle: newProd.linkSubtitle || '',
        price: 'Free',
        priceNumeric: 0,
        type: 'Custom Link',
        accessUrl: newProd.linkUrl || 'https://vyralify.app',
        cardImage: newProd.linkImage || '',
        description: newProd.linkSubtitle || '',
        salesCount: 0,
        revenue: '—',
        status: newProd.status || 'published',
        ctaText: newProd.ctaText || 'Open Link'
      };

      const updated = editingProductId
        ? products.map(p => p.id === editingProductId ? { ...p, ...createdLink, id: editingProductId } : p)
        : [createdLink, ...products];

      setProducts(updated);
      localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
      setIsAddProductModalOpen(false);
      setEditingProductId(null);
      setNewProd({
        itemKind: 'product',
        title: '',
        slug: '',
        priceAmount: '499',
        type: 'Digital Download',
        deliveryMethod: 'upload',
        fileData: null,
        fileName: '',
        fileSize: '',
        accessUrl: '',
        linkUrl: '',
        linkSubtitle: '',
        linkImage: '',
        description: '',
        ctaText: 'Get Instant Access'
      });
      addNotification({
        title: editingProductId ? 'Link Updated' : 'Custom Link Added 🎉',
        message: `"${createdLink.title}" is now active on your storefront.`,
        type: 'success'
      });
      return;
    }

    if (!editingProductId && tier === 'free' && products.length >= 1) {
      openUpgradeModal(
        'store_products',
        'Free plan includes 1 product slot. Upgrade to Pro to list unlimited digital goods and services.'
      );
      return;
    }

    const existingProd = editingProductId ? products.find(p => p.id === editingProductId) : null;
    const currencySymbol = modalCurrency === 'INR' ? '₹' : '$';
    const cleanPrice = `${currencySymbol}${newProd.priceAmount.replace(/[^0-9.]/g, '') || '499'}`;
    const cleanNum = parseFloat(newProd.priceAmount.replace(/[^0-9.]/g, '') || '499');
    const autoSlug = (newProd.slug?.trim() || existingProd?.slug || newProd.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || ('prod-' + Date.now());

    const deliverablesArr = newProd.deliverablesText 
      ? newProd.deliverablesText.split('\n').map(s => s.trim()).filter(Boolean)
      : [];

    const faqsArr = [];
    if (newProd.faqQ1?.trim()) {
      faqsArr.push({ q: newProd.faqQ1.trim(), a: newProd.faqA1?.trim() || 'Instant automated download upon checkout.' });
    }
    if (newProd.faqQ2?.trim()) {
      faqsArr.push({ q: newProd.faqQ2.trim(), a: newProd.faqA2?.trim() || 'Yes, suitable for beginners.' });
    }

    const created = {
      id: editingProductId || ('prod_' + Date.now()),
      slug: autoSlug,
      itemKind: 'product',
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
      salesCount: existingProd ? (existingProd.salesCount || 0) : 0,
      revenue: existingProd ? (existingProd.revenue || `${currencySymbol}0`) : `${currencySymbol}0`,
      status: newProd.status || 'published',
      isHero: Boolean(newProd.isHero),
      ctaText: newProd.ctaText || 'Get Instant Access',
      deliverablesText: newProd.deliverablesText,
      deliverables: deliverablesArr,
      targetAudience: newProd.targetAudience,
      videoUrl: newProd.videoUrl,
      faqQ1: newProd.faqQ1,
      faqA1: newProd.faqA1,
      faqQ2: newProd.faqQ2,
      faqA2: newProd.faqA2,
      faqs: faqsArr
    };

    const updated = editingProductId
      ? products.map(p => p.id === editingProductId ? { ...p, ...created, id: editingProductId } : p)
      : [created, ...products];

    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    setIsAddProductModalOpen(false);
    setEditingProductId(null);
    setNewProd({
      itemKind: 'product',
      title: '',
      priceAmount: '499',
      type: 'Digital Download',
      deliveryMethod: 'upload',
      fileData: null,
      fileName: '',
      fileSize: '',
      accessUrl: '',
      linkUrl: '',
      linkSubtitle: '',
      linkImage: '',
      description: '',
      ctaText: 'Get Instant Access',
      deliverablesText: 'Comprehensive 42-page PDF Master Blueprint\n500+ Royalty-free cinematic B-roll sources\nAutomated caption prompts & retention loops\nFree future lifetime updates',
      targetAudience: 'Designed for creator-operators, Instagram theme pages, and digital agency founders looking for automated monetization.',
      videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      faqQ1: 'How is this delivered upon payment?',
      faqA1: 'Instant automated download on your screen right after checkout, plus a secure backup copy sent to your email.',
      faqQ2: 'Is this suitable for beginners?',
      faqA2: 'Yes, includes step-by-step visual breakdowns and copy-paste action checklists.',
      status: 'published',
      isHero: false
    });
    addNotification({
      title: editingProductId ? 'Product Updated' : 'Product Published',
      message: `"${created.title}" settings have been saved live!`,
      type: 'success'
    });
  };

  // Product Reordering & Hero Pinning Handlers (Spec Section 4: Block Reordering)
  const handleMoveProduct = (index, direction) => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= products.length) return;
    const copy = [...products];
    const [item] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, item);
    setProducts(copy);
    localStorage.setItem('vyralify_store_products', JSON.stringify(copy));
  };

  const handleToggleHero = (prodId) => {
    const updated = products.map(p => ({
      ...p,
      isHero: p.id === prodId ? !p.isHero : false
    }));
    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    addNotification({
      title: 'Hero Offer Pin Updated',
      message: 'Updated pinned hero offer on your storefront header.',
      type: 'success'
    });
  };

  const handleToggleProductStatus = (prodId) => {
    const updated = products.map(p => {
      if (p.id === prodId) {
        const nextStatus = p.status === 'unlisted' ? 'published' : 'unlisted';
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('vyralify_store_products', JSON.stringify(updated));
    addNotification({
      title: 'Visibility Toggled',
      message: 'Product visibility updated (published vs unlisted).',
      type: 'info'
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

    if (tier === 'free' && products.length >= 3) {
      openUpgradeModal(
        'unlimited_products',
        'Free tier allows up to 3 active storefront products. Upgrade to Pro to import unlimited turnkey assets!'
      );
      addNotification({
        title: 'Product Limit Reached (Free Plan)',
        message: 'Upgrade to Pro to import unlimited turnkey assets from the Winning Products Vault.',
        type: 'info'
      });
      return;
    }

    const imported = {
      id: 'prod_' + Date.now(),
      itemKind: 'product',
      title: winProd.title,
      price: winProd.suggestedPrice,
      priceNumeric: winProd.suggestedPriceNum,
      type: winProd.type,
      description: winProd.description,
      deliveryMethod: 'upload',
      fileName: `${winProd.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`,
      fileSize: '3.2 MB',
      accessUrl: 'https://vyralify.app',
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
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl p-1 rounded-xl border border-[rgba(99,102,241,0.2)] shadow-xs shrink-0">
          <button
            onClick={() => setActiveSection('store')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSection === 'store'
                ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
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
                ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
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
          {/* A. STOREFRONT ANALYTICS (Section 8: No-Fluff CRM & Time Filters) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-xl p-3 rounded-2xl border border-[rgba(6,124,249,0.12)] shadow-xs">
              <div>
                <h3 className="font-bold text-[#0F172A] text-xs flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#067CF9]" />
                  <span>Storefront Commerce Intelligence (No-Fluff CRM)</span>
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  Verified conversion telemetry, clean traffic filtration &amp; buyer retention.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Time Range Filter: Day, Week, Month, All-Time */}
                <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-xl border border-slate-200 text-xs">
                  {[
                    { id: 'day', label: 'Day' },
                    { id: 'week', label: 'Week' },
                    { id: 'month', label: 'Month' },
                    { id: 'all', label: 'All-Time' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAnalyticsTimeRange(tab.id)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                        analyticsTimeRange === tab.id
                          ? 'bg-white text-[#067CF9] shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Customer Lead Vault CSV Export */}
                <button
                  type="button"
                  onClick={handleExportOrdersCsv}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[rgba(6,124,249,0.2)] text-[#067CF9] hover:bg-[#EFF6FF] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  title="Export Customer Lead Vault CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lead Vault (CSV)</span>
                </button>

                {/* Beacons-Style Product Storefront Preview (Blueprint Section 5) */}
                <button
                  type="button"
                  onClick={() => setIsBeaconsPreviewOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#067CF9] text-white hover:bg-[#0063D1] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  title="Preview Beacons-Style Mobile Storefront (390px x 844px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Beacons Preview</span>
                </button>
              </div>
            </div>

            {/* 4 High-Density KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(6,124,249,0.12)] hover:ring-[rgba(6,124,249,0.28)] transition-all">
                <span className="text-[11px] text-[#64748B] font-medium block">Gross Revenue &amp; AOV</span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {storeCurrency === 'USD' 
                    ? `$${Math.round((analyticsTimeRange === 'day' ? 28 : analyticsTimeRange === 'week' ? 152 : analyticsTimeRange === 'all' ? Math.round(totalStoreRevenue / 80 * 2.4) : Math.round(totalStoreRevenue / 80))).toLocaleString('en-US')}` 
                    : `₹${(analyticsTimeRange === 'day' ? 2297 : analyticsTimeRange === 'week' ? 12480 : analyticsTimeRange === 'all' ? Math.round(totalStoreRevenue * 2.4) : totalStoreRevenue).toLocaleString('en-IN')}`}
                </div>
                <div className="flex items-center justify-between text-[10px] mt-1">
                  <span className="text-[#067CF9] font-bold">AOV: {storeCurrency === 'USD' ? '$18' : '₹560'}</span>
                  <span className="text-emerald-600 font-semibold">+18.2%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(6,124,249,0.12)] hover:ring-[rgba(6,124,249,0.28)] transition-all">
                <span className="text-[11px] text-[#64748B] font-medium block">Verified Store Views</span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {analyticsTimeRange === 'day' ? '142' : analyticsTimeRange === 'week' ? '980' : analyticsTimeRange === 'all' ? '8,420' : '2,840'}
                </div>
                <span className="text-[10px] text-[#64748B] mt-1 block font-medium">Excludes bot/crawler hits</span>
              </div>

              <div className="p-4 rounded-xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(6,124,249,0.12)] hover:ring-[rgba(6,124,249,0.28)] transition-all">
                <span className="text-[11px] text-[#64748B] font-medium block">Product CTR</span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {analyticsTimeRange === 'day' ? '16.2%' : analyticsTimeRange === 'week' ? '15.1%' : analyticsTimeRange === 'all' ? '14.2%' : '14.8%'}
                </div>
                <span className="text-[10px] text-[#067CF9] mt-1 block font-semibold">Offer engagement rate</span>
              </div>

              <div className="p-4 rounded-xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(6,124,249,0.12)] hover:ring-[rgba(6,124,249,0.28)] transition-all">
                <span className="text-[11px] text-[#64748B] font-medium block">Checkout Conversion</span>
                <div className="text-xl font-bold text-[#0F172A] mt-1">
                  {analyticsTimeRange === 'day' ? '5.6%' : analyticsTimeRange === 'week' ? '4.8%' : analyticsTimeRange === 'all' ? '3.9%' : '4.2%'}
                </div>
                <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">Above creator avg (2.8%)</span>
              </div>
            </div>
          </div>

          {/* B. ORDERS & SALES FEED (Directly Under Analytics)
              User Request: "Ki naam ata rhe, kon kya khreeed raha hai. Analytics ke neechey" */}
          <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] space-y-4 transition-all">
            
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
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by customer name, email..."
                    className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#6366F1]/60"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleExportOrdersCsv}
                  className="px-3 py-1.5 rounded-xl border border-[rgba(99,102,241,0.2)] text-[#0F172A] hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateTestOrder}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#6366F1] border border-[rgba(99,102,241,0.25)] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                  title="Simulate a live customer purchase"
                >
                  <Plus className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Test Purchase</span>
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
                <tbody className="divide-y divide-[rgba(6,124,249,0.08)]">
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
                            {storeCurrency === 'USD' && ord.amount?.startsWith('₹') 
                              ? `$${Math.round(ord.amountNumeric / 80) || 6}` 
                              : ord.amount}
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
              <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-5">
                
                <div>
                  <h3 className="font-bold text-[#0F172A] text-sm">
                    Storefront Builder &amp; Branding
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                    Customize your store's title, logo image, subtitle, and listed digital products.
                  </p>
                </div>

                {/* 1. Store Link & Custom Handle Row */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Store Link &amp; Custom Handle</label>
                    <span className="text-[10px] text-slate-400">Share with followers</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/70 border border-[rgba(99,102,241,0.2)] rounded-xl px-3.5 py-2 text-xs shadow-2xs">
                    <div className="flex items-center gap-1 overflow-hidden">
                      <span className="text-[#64748B] font-semibold text-xs shrink-0">vyralify.in/</span>
                      <input
                        type="text"
                        value={storeHandle}
                        onChange={(e) => {
                          const clean = e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '');
                          setStoreHandle(clean);
                          localStorage.setItem('vyralify_store_handle', clean);
                        }}
                        placeholder="yourstorename"
                        className="font-bold text-[#0F172A] text-xs bg-transparent border-b border-dashed border-[#067CF9]/40 focus:border-[#067CF9] focus:outline-hidden px-1 py-0.5 max-w-[150px] sm:max-w-[200px]"
                        title="Edit your public store handle (e.g. onlycashuniversity)"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`/${rawHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white border border-[rgba(6,124,249,0.2)] text-[#067CF9] hover:bg-[#EFF6FF] text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                        title="Open live public storefront in new tab"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Visit Store</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyStoreLink}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 border border-[rgba(99,102,241,0.25)] text-[#6366F1] hover:text-[#4F46E5] text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        {copiedStoreLink ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedStoreLink ? 'Copied' : 'Copy Store Link'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Store Image / Logo / Avatar (User Request: "img") */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] font-semibold">Store Image / Brand Logo</label>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)]">
                    <div className="relative w-14 h-14 rounded-full ring-2 ring-[#6366F1]/50 p-0.5 bg-white shrink-0 shadow-xs">
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
                        <label className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-semibold cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-sm shadow-indigo-500/20">
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

                {/* 5. Layout Presets (Spec Section 4: Layout Presets & Styling Matrix) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Layout Preset</label>
                    <span className="text-[11px] font-medium text-[#067CF9]">
                      {storeLayout === 'stack' ? 'Single Column Stack' : storeLayout === 'grid' ? '2-Column Grid' : 'Featured Hero + List'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'stack', label: 'Stack', icon: List, desc: '1-Column' },
                      { id: 'grid', label: 'Grid', icon: LayoutGrid, desc: '2-Column' },
                      { id: 'hero', label: 'Hero+List', icon: Star, desc: 'Pinned Offer' }
                    ].map(layout => {
                      const IconComp = layout.icon;
                      return (
                        <button
                          key={layout.id}
                          type="button"
                          onClick={() => setStoreLayout(layout.id)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            storeLayout === layout.id
                              ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold shadow-xs'
                              : 'border-neutral-200 text-[#64748B] hover:border-neutral-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <IconComp className="w-3.5 h-3.5" />
                            <span className="text-xs">{layout.label}</span>
                          </div>
                          <span className="text-[10px] text-[#64748B] font-normal block">{layout.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5b. Card Radius & Typography Styling */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#64748B] font-semibold">Card Radius</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'rounded-none', label: 'Square' },
                        { id: 'rounded-2xl', label: 'Smooth' },
                        { id: 'rounded-3xl', label: 'Pill' }
                      ].map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setStoreBorderRadius(r.id)}
                          className={`py-1.5 px-1 rounded-lg border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                            storeBorderRadius === r.id
                              ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9]'
                              : 'border-slate-200 text-[#64748B] hover:border-slate-300 bg-white'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#64748B] font-semibold">Font Family</label>
                    <select
                      value={storeFont}
                      onChange={(e) => setStoreFont(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    >
                      <option value="font-sans">Plus Jakarta Sans</option>
                      <option value="font-inter">Inter</option>
                      <option value="font-geist">Geist</option>
                    </select>
                  </div>
                </div>

                {/* 5c. Theme Palette Selector (Live Dynamic Styling) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Theme Palette</label>
                    <span className="text-[11px] font-medium text-[#067CF9]">{activeTheme.label}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STORE_THEMES.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectTheme(c.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          storeThemeColor === c.id
                            ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold shadow-xs'
                            : 'border-neutral-200 text-[#64748B] hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${c.swatch} shrink-0 flex items-center justify-center shadow-xs`}>
                          {storeThemeColor === c.id && <Check className="w-2 h-2 text-white" />}
                        </span>
                        <span className="truncate">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5d. Currency & Payment Gateway Selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Storefront Currency &amp; Gateway</label>
                    <span className="text-[11px] font-medium text-[#067CF9]">
                      {storeCurrency === 'INR' ? '₹ INR (Razorpay / UPI / Cards)' : '$ USD (Stripe / Global Cards)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleCurrency('INR')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        storeCurrency === 'INR'
                          ? 'border-[#6366F1]/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 text-[#6366F1] ring-1 ring-[rgba(99,102,241,0.25)] shadow-xs'
                          : 'border-neutral-200/80 text-[#64748B] hover:border-indigo-300 bg-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">₹</span>
                        <div className="text-left">
                          <div className="font-bold text-[#0F172A]">INR (₹)</div>
                          <div className="text-[10px] text-[#64748B] font-normal">Razorpay &amp; UPI</div>
                        </div>
                      </div>
                      {storeCurrency === 'INR' && <Check className="w-3.5 h-3.5 text-[#6366F1]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleCurrency('USD')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        storeCurrency === 'USD'
                          ? 'border-[#6366F1]/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 text-[#6366F1] ring-1 ring-[rgba(99,102,241,0.25)] shadow-xs'
                          : 'border-neutral-200/80 text-[#64748B] hover:border-indigo-300 bg-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#067CF9] flex items-center justify-center font-bold text-xs shrink-0">$</span>
                        <div className="text-left">
                          <div className="font-bold text-[#0F172A]">USD ($)</div>
                          <div className="text-[10px] text-[#64748B] font-normal">Stripe &amp; Global</div>
                        </div>
                      </div>
                      {storeCurrency === 'USD' && <Check className="w-3.5 h-3.5 text-[#6366F1]" />}
                    </button>
                  </div>
                </div>

                {/* 6. Product & Link Management Section */}
                <div className="pt-3 border-t border-[rgba(99,102,241,0.1)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-xs">
                        Active Products &amp; Links ({products.length})
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        Drag, pin hero offer, or toggle visibility on your store.
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
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-500/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product / Link</span>
                    </button>
                  </div>

                  {/* Product & Link items mini list with Reordering & Visibility */}
                  <div className="space-y-2">
                    {products.map((prod, idx) => {
                      const isLink = prod.itemKind === 'link' || prod.type === 'Custom Link';
                      const isUnlisted = prod.status === 'unlisted';
                      return (
                        <div
                          key={prod.id}
                          className={`p-3 rounded-xl bg-[#F8FAFC] border transition-all flex items-center justify-between gap-2.5 ${
                            prod.isHero 
                              ? 'border-[#067CF9] bg-blue-50/30 ring-1 ring-[#067CF9]/20' 
                              : isUnlisted 
                              ? 'border-dashed border-slate-300 opacity-75' 
                              : 'border-[rgba(6,124,249,0.12)] hover:border-[#067CF9]/40'
                          }`}
                        >
                          {/* Reordering Controls (Up/Down) */}
                          <div className="flex flex-col gap-0.5 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveProduct(idx, 'up')}
                              className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-200"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === products.length - 1}
                              onClick={() => handleMoveProduct(idx, 'down')}
                              className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-200"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-[#0F172A] truncate">
                                {prod.title}
                              </span>
                              {prod.isHero && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200 shrink-0 flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Hero Offer
                                </span>
                              )}
                              {isUnlisted ? (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200 shrink-0">
                                  Unlisted
                                </span>
                              ) : isLink ? (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-[#067CF9] font-bold border border-[rgba(6,124,249,0.2)] shrink-0 flex items-center gap-1">
                                  <LinkIcon className="w-2.5 h-2.5" /> Link
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#067CF9] font-bold border border-[rgba(6,124,249,0.15)] shrink-0">
                                  {storeCurrency === 'USD' && prod.price?.startsWith('₹') 
                                    ? `$${Math.round(prod.priceNumeric / 80) || 6}` 
                                    : prod.price}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#64748B] mt-0.5 truncate max-w-sm">
                              {isLink ? (prod.accessUrl || 'Custom redirect link') : `${prod.type} • ${prod.salesCount || 0} sold`}
                            </div>
                            {!isLink && (
                              <div className="text-[10px] text-[#067CF9] font-mono mt-0.5 truncate max-w-sm flex items-center gap-1">
                                <span>vyralify.in/{rawHandle}/{prod.slug || prod.id}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Copy Direct Product Link button */}
                            {!isLink && (
                              <button
                                type="button"
                                onClick={(e) => handleCopyProductLink(prod, e)}
                                className={`px-2 py-1 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                                  copiedProductId === prod.id
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                                    : 'bg-white border-blue-100 text-[#067CF9] hover:bg-blue-50'
                                }`}
                                title="Copy direct product link to clipboard"
                              >
                                {copiedProductId === prod.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                <span className="text-[10px] hidden sm:inline">{copiedProductId === prod.id ? 'Copied!' : 'Copy Link'}</span>
                              </button>
                            )}

                            {/* View Live Product Page in new tab */}
                            {!isLink && (
                              <a
                                href={`/${rawHandle}/${prod.slug || prod.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#067CF9] hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Open live product landing page in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Pin Hero Offer button */}
                            {!isLink && (
                              <button
                                type="button"
                                onClick={() => handleToggleHero(prod.id)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  prod.isHero 
                                    ? 'text-amber-500 bg-amber-50' 
                                    : 'text-[#64748B] hover:text-amber-500 hover:bg-amber-50'
                                }`}
                                title={prod.isHero ? 'Unpin Hero Offer' : 'Pin as Featured Hero Offer'}
                              >
                                <Star className={`w-3.5 h-3.5 ${prod.isHero ? 'fill-amber-500' : ''}`} />
                              </button>
                            )}

                            {/* Visibility toggle button */}
                            <button
                              type="button"
                              onClick={() => handleToggleProductStatus(prod.id)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isUnlisted 
                                  ? 'text-slate-400 hover:text-slate-700 bg-slate-100' 
                                  : 'text-[#64748B] hover:text-[#067CF9] hover:bg-blue-50'
                              }`}
                              title={isUnlisted ? 'Make Published (Live on Store)' : 'Make Unlisted (Only accessible via direct link)'}
                            >
                              {isUnlisted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>

                            {/* Edit Product / Link Button */}
                            <button
                              type="button"
                              onClick={() => handleEditProduct(prod)}
                              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#067CF9] hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Edit Details & Sales Page"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Preview in Phone Button */}
                            {!isLink && (
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewProduct(prod);
                                  setPreviewLayer('product');
                                }}
                                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#067CF9] hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Preview Layer 2 Dedicated Page in Phone Frame"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Delete Product button */}
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
                      );
                    })}
                  </div>

                  {/* Quick Shortcut to Commerce Winning Products */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 border border-[rgba(99,102,241,0.2)] flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/80 border border-[rgba(99,102,241,0.2)] flex items-center justify-center shrink-0 shadow-xs">
                        <Sparkles className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0F172A]">Need turnkey digital products to sell?</div>
                        <div className="text-[11px] text-[#64748B]">Browse verified Winning Products in the Commerce section.</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('commerce')}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm shadow-indigo-500/20 shrink-0 transition-all"
                    >
                      <span>Explore Winning Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Save & Publish Store button */}
                <div className="pt-4 border-t border-[rgba(99,102,241,0.1)] flex items-center justify-between">
                  <span className="text-[11px] text-[#6366F1] flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6366F1]" /> Auto-synced with CDN
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
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-500/20"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save &amp; Publish Store</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Right Column: Sleek iOS Phone Frame with Real-Time Dual-Layer Preview (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center sticky top-6 space-y-2.5">
              
              {/* Dual-Layer Preview Switcher Tabs */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl p-1 rounded-xl border border-[rgba(6,124,249,0.15)] shadow-xs text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPreviewLayer('hub')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewLayer === 'hub'
                      ? 'bg-[#067CF9] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Layer 1: Bio Hub</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!previewProduct && products.length > 0) {
                      setPreviewProduct(products[0]);
                    }
                    setPreviewLayer('product');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewLayer === 'product'
                      ? 'bg-[#067CF9] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Layer 2: Product Page</span>
                </button>
              </div>

              {/* iPhone Frame */}
              <div className="w-[324px] rounded-[48px] bg-white p-3.5 shadow-[0_20px_50px_rgba(6,124,249,0.12)] border-[6px] border-slate-100 ring-1 ring-[rgba(6,124,249,0.2)] relative">
                
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 bg-[#0F172A] rounded-full mx-auto mb-2 flex items-center justify-end pr-2">
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Screen Inner */}
                <div className={`${activeTheme.containerBg} ${storeFont} rounded-[36px] p-3.5 text-center min-h-[550px] max-h-[580px] flex flex-col justify-between overflow-y-auto ${activeTheme.textPrimary} transition-all duration-300 relative text-left`}>
                  
                  {previewLayer === 'hub' ? (
                    /* ========================================================
                       LAYER 1: LINK-IN-BIO HUB PREVIEW
                       ======================================================== */
                    <div className="space-y-3 pt-1">
                      {/* Creator Avatar & Handle */}
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-2">
                          <img
                            src={displayAvatar}
                            alt={rawHandle}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getSafeAvatarUrl('', rawHandle);
                            }}
                            className={`w-full h-full rounded-full object-cover ring-2 ${activeTheme.ringColor} shadow-md`}
                          />
                          <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${activeTheme.swatch} border-2 border-white shadow-xs flex items-center justify-center`}>
                            <Check className="w-2.5 h-2.5 text-white" />
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          <h4 className="font-bold text-xs tracking-tight text-[#0F172A]">@{rawHandle}</h4>
                          <span className="w-3.5 h-3.5 rounded-full bg-[#067CF9] text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                        </div>
                        <p className="text-[11px] font-bold text-[#0F172A] mt-0.5">{storeHeadline}</p>
                        <p className="text-[10px] text-[#64748B] leading-tight mt-1 max-w-[240px] mx-auto line-clamp-2">
                          {storeBio}
                        </p>

                        {/* Direct Social Icons */}
                        <div className="flex items-center justify-center gap-2 mt-2">
                          {['IG', 'YT', 'X', 'TG'].map((soc, i) => (
                            <span key={i} className="w-6 h-6 rounded-full bg-white/80 border border-slate-200 text-[#64748B] text-[9px] font-bold flex items-center justify-center shadow-2xs">
                              {soc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Featured Hero Offer Card (if storeLayout === 'hero' or product isHero) */}
                      {(() => {
                        const heroProduct = products.find(p => p.isHero) || (storeLayout === 'hero' ? products[0] : null);
                        if (!heroProduct) return null;
                        const isLink = heroProduct.itemKind === 'link' || heroProduct.type === 'Custom Link';
                        return (
                          <div 
                            onClick={() => {
                              if (!isLink) {
                                setPreviewProduct(heroProduct);
                                setPreviewLayer('product');
                              }
                            }}
                            className={`p-3 ${storeBorderRadius} bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white border-2 border-[#067CF9]/40 shadow-xs cursor-pointer hover:border-[#067CF9] transition-all relative overflow-hidden`}
                          >
                            <div className="flex items-center justify-between text-[9px] mb-1">
                              <span className="px-2 py-0.5 rounded-full bg-[#067CF9] text-white font-bold flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-white" /> Pinned Hero Offer
                              </span>
                              <span className="font-bold text-[#067CF9]">
                                {storeCurrency === 'USD' && heroProduct.price?.startsWith('₹') 
                                  ? `$${Math.round(heroProduct.priceNumeric / 80) || 6}` 
                                  : heroProduct.price}
                              </span>
                            </div>
                            <h5 className="font-bold text-xs text-[#0F172A] line-clamp-1">{heroProduct.title}</h5>
                            <p className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">{heroProduct.description || heroProduct.subtitle}</p>
                            <button className={`w-full mt-2 py-1.5 ${storeBorderRadius} bg-[#067CF9] text-white text-[10px] font-bold flex items-center justify-center gap-1`}>
                              <span>{cleanArrow(heroProduct.ctaText || 'Get Instant Access')}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })()}

                      {/* Product Stack or Grid */}
                      <div className={storeLayout === 'grid' ? 'grid grid-cols-2 gap-2 pt-1' : 'space-y-2 pt-1'}>
                        {products
                          .filter(p => !p.isHero || storeLayout !== 'hero')
                          .map(p => {
                            const isLink = p.itemKind === 'link' || p.type === 'Custom Link';
                            return (
                              <div
                                key={p.id}
                                onClick={() => {
                                  if (!isLink) {
                                    setPreviewProduct(p);
                                    setPreviewLayer('product');
                                  }
                                }}
                                className={`p-2.5 ${storeBorderRadius} bg-white/90 border border-[rgba(6,124,249,0.12)] shadow-xs hover:border-[#067CF9]/50 transition-all cursor-pointer`}
                              >
                                <div className="flex items-center justify-between text-[9px] mb-1">
                                  <span className="text-[#64748B] font-medium truncate max-w-[90px]">{p.type}</span>
                                  <span className="font-bold text-[#067CF9]">
                                    {isLink ? 'Free' : (storeCurrency === 'USD' && p.price?.startsWith('₹') ? `$${Math.round(p.priceNumeric / 80) || 6}` : p.price)}
                                  </span>
                                </div>
                                <h5 className="font-bold text-[11px] text-[#0F172A] line-clamp-1 leading-snug">{p.title}</h5>
                                <button className={`w-full mt-2 py-1 ${storeBorderRadius} bg-slate-100 hover:bg-[#067CF9] hover:text-white text-[#0F172A] font-semibold text-[9px] flex items-center justify-center gap-1 transition-colors`}>
                                  <span>{cleanArrow(p.ctaText || 'View')}</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    /* ========================================================
                       LAYER 2: DEDICATED PRODUCT PAGE PREVIEW
                       ======================================================== */
                    (() => {
                      const activeProd = previewProduct || products[0] || {};
                      return (
                        <div className="space-y-3 pt-1 text-left">
                          {/* Breadcrumb back to store */}
                          <button
                            type="button"
                            onClick={() => setPreviewLayer('hub')}
                            className="inline-flex items-center gap-1 text-[10px] text-[#067CF9] font-bold hover:underline"
                          >
                            ← Back to @{rawHandle}'s Store
                          </button>

                          {/* Media / Video Box */}
                          <div className={`relative h-28 w-full ${storeBorderRadius} overflow-hidden bg-slate-900 border border-slate-200 shadow-xs flex items-center justify-center group`}>
                            <img
                              src={activeProd.videoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}
                              alt={activeProd.title}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                              <span className="w-9 h-9 rounded-full bg-white/90 text-[#067CF9] flex items-center justify-center shadow-md">
                                ▶
                              </span>
                            </div>
                            <span className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[8px] font-bold backdrop-blur-xs">
                              4K Overview Video
                            </span>
                          </div>

                          {/* Product Header */}
                          <div>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-[#067CF9] font-bold border border-blue-200">
                              {activeProd.type || 'Digital Download'}
                            </span>
                            <h4 className="font-bold text-xs text-[#0F172A] mt-1 leading-snug">{activeProd.title}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mt-0.5">
                              <span>⭐ 4.9/5 (280+ students)</span>
                            </div>
                          </div>

                          {/* Bulleted Deliverables */}
                          <div className={`p-2.5 ${storeBorderRadius} bg-white border border-slate-200 space-y-1`}>
                            <div className="text-[10px] font-bold text-[#0F172A]">What's Included:</div>
                            {(activeProd.deliverablesText || 'Full PDF Master Blueprint\nRoyalty-free B-roll sources\nAutomated caption prompts')
                              .split('\n')
                              .filter(Boolean)
                              .slice(0, 3)
                              .map((line, i) => (
                                <div key={i} className="flex items-start gap-1.5 text-[9px] text-[#64748B]">
                                  <Check className="w-3 h-3 text-[#067CF9] shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{line}</span>
                                </div>
                              ))}
                          </div>

                          {/* Target Audience */}
                          <div className={`p-2.5 ${storeBorderRadius} bg-blue-50/50 border border-blue-200/60`}>
                            <div className="text-[10px] font-bold text-[#0F172A]">Who This Is For:</div>
                            <p className="text-[9px] text-[#64748B] line-clamp-2 mt-0.5">
                              {activeProd.targetAudience || 'Built for creator-operators and digital entrepreneurs wanting automated high-ticket revenue.'}
                            </p>
                          </div>

                          {/* Sticky Buy Button inside Phone */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                addNotification({
                                  title: '1-Click Checkout Drawer',
                                  message: 'Simulated 1-click checkout bottom sheet in test mode.',
                                  type: 'info'
                                });
                              }}
                              className={`w-full py-2.5 ${storeBorderRadius} bg-[#067CF9] hover:bg-[#0568d4] text-white font-bold text-[11px] shadow-sm flex items-center justify-between px-3`}
                            >
                              <span>{cleanArrow(activeProd.ctaText || 'Get Instant Access')}</span>
                              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                                {storeCurrency === 'USD' && activeProd.price?.startsWith('₹') 
                                  ? `$${Math.round(activeProd.priceNumeric / 80) || 6}` 
                                  : activeProd.price}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {/* Clean Footer Brand Tag */}
                  <div className={`pt-3 pb-1 border-t border-[rgba(6,124,249,0.1)] text-[9px] text-[#64748B] font-medium text-center`}>
                    Powered by <strong className="text-[#067CF9]">Vyralify Store v2.4</strong>
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
          <div className="p-6 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] animate-pulse" />
                  <h3 className="font-bold text-[#0F172A] text-base">
                    Sell Vyralify Co-Pilot (White-Label Software Resell)
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] mt-1 font-medium max-w-2xl">
                  Rebrand Vyralify's complete AI Co-Pilot software under your custom domain &amp; logo. Sell recurring software subscriptions directly to your audience, clients, and students—keep 100% of the recurring MRR.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 border border-[rgba(99,102,241,0.25)] text-[#6366F1] text-xs font-bold self-start sm:self-auto shrink-0 flex items-center gap-1.5 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>100% Software Profit Margins</span>
              </span>
            </div>

            {/* 3 Pillar Feature Cards for Co-Pilot Software Resell */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#067CF9]" />
                  <span className="font-bold text-[#0F172A] block">Custom Domain &amp; Logo</span>
                </div>
                <p className="text-[#64748B] leading-relaxed">
                  Host under your custom domain (e.g., <code className="text-[#6366F1] font-semibold">copilot.yourbrand.com</code>) with your white-label logo, branding, and custom favicon.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#067CF9]" />
                  <span className="font-bold text-[#0F172A] block">100% Software Profit Margins</span>
                </div>
                <p className="text-[#64748B] leading-relaxed">
                  Connect your own Stripe or Razorpay accounts. Charge ₹1,999/mo or ₹14,999/yr per license and keep 100% of recurring subscriber revenue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] space-y-1.5">
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
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 border border-[rgba(99,102,241,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[rgba(99,102,241,0.25)] text-[#6366F1] flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">Deploy Your Branded AI Co-Pilot Software</h4>
                  <p className="text-[#64748B]">Activate your Co-Pilot reseller license to generate instant client access keys and white-label portals.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openUpgradeModal('white_label_ai', 'Upgrade to Elite Plan to resell Vyralify Co-Pilot under your own software brand.')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-sm shadow-indigo-500/20"
              >
                <span>Get Co-Pilot Reseller License</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. WINNING PRODUCTS VAULT (Directly Below Co-Pilot Resell in Commerce) */}
          <div className="space-y-4">
            
            {/* Header & Filter Controls */}
            <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0F172A] text-base">
                      Winning Products Vault
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/60 text-[#6366F1] border border-[rgba(99,102,241,0.25)] text-[10px] font-bold shadow-xs">
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
                    className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#6366F1] transition-colors"
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
                        ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
                        : 'bg-white/60 text-[#64748B] hover:text-[#0F172A] border border-[rgba(99,102,241,0.12)]'
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
                    className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(6,124,249,0.03)] ring-1 ring-[rgba(99,102,241,0.1)] space-y-4 flex flex-col justify-between hover:ring-[rgba(99,102,241,0.28)] transition-all group"
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
                          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] text-white text-[10px] font-bold shadow-xs">
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
                      <div className="p-2.5 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.1)] flex items-center justify-between text-xs">
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
                        <div className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Active on Your Storefront</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleImportWinningProduct(winProd)}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-500/20"
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
          <div className="w-full max-w-lg rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/80 ring-1 ring-[rgba(99,102,241,0.2)] shadow-2xl p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">
                  {editingProductId 
                    ? (newProd.itemKind === 'link' ? 'Edit Custom Link' : 'Edit Digital Product')
                    : (newProd.itemKind === 'link' ? 'Add Custom Link to Store' : 'Add Digital Product to Store')}
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  {editingProductId
                    ? 'Update details, deliverables, pricing, and fulfillment settings.'
                    : (newProd.itemKind === 'link' 
                        ? 'Add a redirect card with custom thumbnail, title, and link.' 
                        : 'Configure your digital asset, pricing, and automated fulfillment.')}
                </p>
              </div>
              <button 
                onClick={() => setIsAddProductModalOpen(false)} 
                className="text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle: Digital Product vs Custom Link */}
            <div className="flex items-center gap-1.5 p-1 bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl">
              <button
                type="button"
                onClick={() => setNewProd({ ...newProd, itemKind: 'product' })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  newProd.itemKind !== 'link'
                    ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Digital Product</span>
              </button>
              <button
                type="button"
                onClick={() => setNewProd({ ...newProd, itemKind: 'link' })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  newProd.itemKind === 'link'
                    ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Custom Link</span>
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {newProd.itemKind === 'link' ? (
                /* CUSTOM LINK FORM */
                <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                  <div className="text-[10px] font-bold text-[#067CF9] uppercase">
                    Custom Redirect Link
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] font-semibold">Link Title *</label>
                    <input
                      type="text"
                      required
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      placeholder="e.g. Join My Free VIP Telegram Channel"
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] font-semibold">Subtitle / Description</label>
                    <input
                      type="text"
                      value={newProd.linkSubtitle}
                      onChange={(e) => setNewProd({ ...newProd, linkSubtitle: e.target.value })}
                      placeholder="e.g. Daily market charts, breakdown audio notes & live Q&A"
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] font-semibold">Destination Redirect URL *</label>
                    <input
                      type="url"
                      required
                      value={newProd.linkUrl}
                      onChange={(e) => setNewProd({ ...newProd, linkUrl: e.target.value })}
                      placeholder="https://t.me/yourchannel or https://youtube.com/@..."
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] font-semibold">Card Image / Thumbnail URL (Optional)</label>
                    <input
                      type="url"
                      value={newProd.linkImage}
                      onChange={(e) => setNewProd({ ...newProd, linkImage: e.target.value })}
                      placeholder="https://images.unsplash.com/... or icon URL"
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] font-semibold">Button CTA Text</label>
                    <input
                      type="text"
                      value={newProd.ctaText}
                      onChange={(e) => setNewProd({ ...newProd, ctaText: e.target.value })}
                      placeholder="e.g. Open Link or Join Now"
                      className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>
                </div>
              ) : (
                <>
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
                    onChange={(e) => {
                      const title = e.target.value;
                      const next = { ...newProd, title };
                      if (!editingProductId && !newProd.slugManuallyEdited) {
                        next.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      }
                      setNewProd(next);
                    }}
                    placeholder="e.g. 30-Day Stoic Mindset Journal & Audio Guide"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                {/* Direct Landing Page Slug */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Direct Product URL Slug</label>
                    <span className="text-[10px] text-slate-400">Shareable buyer link</span>
                  </div>
                  <div className="flex items-center bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus-within:border-[#067CF9]">
                    <span className="text-[#64748B] font-semibold text-[11px] shrink-0">
                      vyralify.in/{rawHandle}/
                    </span>
                    <input
                      type="text"
                      value={newProd.slug || ''}
                      onChange={(e) => {
                        const clean = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
                        setNewProd({ ...newProd, slug: clean, slugManuallyEdited: true });
                      }}
                      placeholder="custom-product-slug"
                      className="w-full bg-transparent border-0 focus:outline-hidden font-bold text-[#067CF9] text-xs px-1"
                    />
                  </div>
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

              {/* STEP 3: Layer 2 High-Ticket Sales Page Builder (Spec Section 4 & 7) */}
              <div className="space-y-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)]">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#067CF9] uppercase">
                  <span>Step 3 &bull; High-Ticket Sales Page &amp; Pitch</span>
                  <span className="text-slate-400 font-normal lowercase">Layer 2 page builder</span>
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

                {/* Deliverables ("What's Included") */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Deliverables &bull; What's Included (1 per line)</label>
                    <span className="text-[10px] text-slate-400">Bulleted checklist</span>
                  </div>
                  <textarea
                    rows={3}
                    value={newProd.deliverablesText}
                    onChange={(e) => setNewProd({ ...newProd, deliverablesText: e.target.value })}
                    placeholder="Full 42-page PDF Master Blueprint&#10;500+ Royalty-free cinematic B-roll sources&#10;Automated caption prompts &amp; retention loops"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] resize-none focus:outline-hidden focus:border-[#067CF9] font-mono text-[11px]"
                  />
                </div>

                {/* Target Audience ("Who This Is For") */}
                <div className="space-y-1">
                  <label className="text-[#64748B] font-semibold">Target Audience &bull; Who This Is For</label>
                  <input
                    type="text"
                    value={newProd.targetAudience}
                    onChange={(e) => setNewProd({ ...newProd, targetAudience: e.target.value })}
                    placeholder="e.g., Designed for creator-operators and faceless theme page owners."
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                {/* Video / Cover Image Media URL */}
                <div className="space-y-1">
                  <label className="text-[#64748B] font-semibold">Video Preview or Cover Image URL</label>
                  <input
                    type="url"
                    value={newProd.videoUrl}
                    onChange={(e) => setNewProd({ ...newProd, videoUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or YouTube/Loom video link"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                {/* FAQ Accordions */}
                <div className="space-y-2 pt-1 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-[#067CF9]" />
                    <span>Frequently Asked Questions (Accordion)</span>
                  </span>
                  
                  <div className="space-y-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={newProd.faqQ1}
                      onChange={(e) => setNewProd({ ...newProd, faqQ1: e.target.value })}
                      placeholder="FAQ 1 Question: How is this delivered upon payment?"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] font-semibold focus:outline-hidden focus:border-[#067CF9]"
                    />
                    <textarea
                      rows={2}
                      value={newProd.faqA1}
                      onChange={(e) => setNewProd({ ...newProd, faqA1: e.target.value })}
                      placeholder="FAQ 1 Answer: Instant automated download on your screen right after checkout..."
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#64748B] resize-none focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>

                  <div className="space-y-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={newProd.faqQ2}
                      onChange={(e) => setNewProd({ ...newProd, faqQ2: e.target.value })}
                      placeholder="FAQ 2 Question: Is this suitable for beginners?"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] font-semibold focus:outline-hidden focus:border-[#067CF9]"
                    />
                    <textarea
                      rows={2}
                      value={newProd.faqA2}
                      onChange={(e) => setNewProd({ ...newProd, faqA2: e.target.value })}
                      placeholder="FAQ 2 Answer: Yes, includes step-by-step visual breakdowns and action checklists..."
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-[#64748B] resize-none focus:outline-hidden focus:border-[#067CF9]"
                    />
                  </div>
                </div>

                {/* Button CTA Text with Quick Presets */}
                <div className="space-y-1.5 pt-1 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <label className="font-semibold">Button CTA Label (Max 28 chars)</label>
                    <span className="text-[10px]">{newProd.ctaText.length}/28</span>
                  </div>
                  <input
                    type="text"
                    maxLength={28}
                    value={newProd.ctaText}
                    onChange={(e) => setNewProd({ ...newProd, ctaText: e.target.value })}
                    placeholder="e.g., Get Instant Access"
                    className="w-full bg-white border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-semibold focus:outline-hidden focus:border-[#067CF9]"
                  />
                  {/* Quick Preset Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    {['Buy Now', 'Get Instant Access', 'Book 1-on-1 Call', 'Download Free Guide', 'Join VIP Club'].map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setNewProd({ ...newProd, ctaText: preset })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          newProd.ctaText === preset
                            ? 'bg-[#EFF6FF] border-[#067CF9] text-[#067CF9] font-bold'
                            : 'bg-white border-slate-200 text-[#64748B] hover:border-slate-300'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-[#0F172A]">Listing Visibility</div>
                    <div className="text-[10px] text-[#64748B]">
                      {newProd.status === 'unlisted' ? 'Hidden from store list, direct link active' : 'Publicly visible on your storefront'}
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setNewProd({ ...newProd, status: 'published' })}
                      className={`px-2.5 py-1 rounded font-semibold text-[10px] transition-all cursor-pointer ${
                        newProd.status !== 'unlisted'
                          ? 'bg-white text-[#067CF9] shadow-xs'
                          : 'text-[#64748B]'
                      }`}
                    >
                      Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProd({ ...newProd, status: 'unlisted' })}
                      className={`px-2.5 py-1 rounded font-semibold text-[10px] transition-all cursor-pointer ${
                        newProd.status === 'unlisted'
                          ? 'bg-white text-slate-800 shadow-xs'
                          : 'text-[#64748B]'
                      }`}
                    >
                      Unlisted
                    </button>
                  </div>
                </div>

              </div>
              </>
              )}

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
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold cursor-pointer shadow-sm shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                >
                  {editingProductId ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>
                    {editingProductId 
                      ? 'Save Changes' 
                      : (newProd.itemKind === 'link' ? 'Add Link to Storefront' : 'Publish Product to Store')}
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Beacons-Style Mobile Storefront Modal (Blueprint Section 5) */}
      {isBeaconsPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto">
            <PublicStorefrontProductView
              product={{
                storeName: `@${rawHandle}`,
                creatorAvatar: displayAvatar,
                creatorBio: storeBio || 'Digital Creator & Monetization Strategist • 240K+ followers',
                title: products[0]?.title || 'Ultimate Reels Growth Guide 2025',
                currencySymbol: storeCurrency === 'USD' ? '$' : '₹',
                price: products[0]?.price?.replace(/[^0-9.]/g, '') || (storeCurrency === 'USD' ? '29.00' : '499'),
                comparePrice: storeCurrency === 'USD' ? '89.00' : '1499',
                rating: 5.0,
                reviewCount: 128,
                coverImage: products[0]?.fileData || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
                media: [
                  {
                    url: products[0]?.fileData || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
                    title: products[0]?.title || 'Course Teaser Video / Masterclass'
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                    title: 'Viral Hook Vault & Retention Blueprints'
                  }
                ],
                description: products[0]?.description || `
                  <p>Master the exact algorithm mechanisms behind <b>10M+ organic Reel impressions</b> without spending on ads.</p>
                  <ul>
                    <li><b>12 High-Retention Hook Archetypes:</b> 3-second pattern interrupts tested across viral reels.</li>
                    <li><b>Retention Curve Blueprints:</b> Stop the 3-second viewer drop-off.</li>
                    <li><b>Beacons Storefront Funnel:</b> High-converting digital commerce checkout.</li>
                  </ul>
                `,
                faqs: [
                  {
                    question: 'How do I access the product after checkout?',
                    answer: 'Instant automated delivery on your screen and direct email download link.'
                  },
                  {
                    question: 'What payment methods are supported?',
                    answer: 'Stripe Direct (Global Cards/Apple Pay), Razorpay Custom, and UPI Direct.'
                  }
                ],
                reviews: [
                  {
                    name: 'Sarah Jenkins',
                    handle: '@sarahj_creative',
                    rating: 5,
                    date: '2 days ago',
                    text: 'The 3-second hook formulas completely turned my page around. My first reel using Hook #2 just crossed 48,000 views!',
                    verified: true
                  },
                  {
                    name: 'Marcus Vance',
                    handle: '@marcusgrowth',
                    rating: 5,
                    date: '1 week ago',
                    text: 'Hands down the best link-in-bio digital product I have bought. The Notion sprint calendar alone is worth 5x the price.',
                    verified: true
                  }
                ]
              }}
              onClose={() => setIsBeaconsPreviewOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
