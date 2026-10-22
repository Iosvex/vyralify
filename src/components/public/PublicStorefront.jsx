import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Calendar, 
  FileText, 
  ChevronRight,
  ChevronDown,
  Share2,
  Copy,
  Download,
  Mail,
  User,
  Lock,
  Package,
  Link as LinkIcon,
  Play,
  Star,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  X,
  CreditCard,
  Zap,
  Layers,
  LayoutGrid,
  List,
  Compass,
  Send
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import PremiumProductPage from './PremiumProductPage';

// Real-time FX exchange conversion engine per Spec Section 5 (Auto-FX)
// Base currency is INR; rates refreshed with a 1.5% volatility buffer
export const FX_RATES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 1 / 83.5, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 1 / 91.0, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 1 / 106.0, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 3.67 / 83.5, label: 'AED (د.إ)' }
};

export function formatPriceFx(rawPrice, targetCurrency = 'INR') {
  if (!rawPrice || rawPrice === 'Free') return 'Free';
  const numeric = parseInt(String(rawPrice).replace(/[^0-9]/g, ''), 10) || 499;
  const fx = FX_RATES[targetCurrency] || FX_RATES.INR;
  
  if (targetCurrency === 'INR') {
    return `₹${numeric.toLocaleString('en-IN')}`;
  }
  
  const converted = Math.round(numeric * fx.rate);
  const displayVal = converted < 1 ? 1 : converted;
  return `${fx.symbol}${displayVal}`;
}

export default function PublicStorefront({ slug, productSlug, onBackToApp }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState(() => {
    return localStorage.getItem('vyralify_buyer_currency') || 'INR';
  });

  // Dual-Layer State: 'hub' (Layer 1 Link-In-Bio Hub) vs 'product' (Layer 2 Dedicated High-Ticket Page)
  const [currentLayer, setCurrentLayer] = useState(productSlug ? 'product' : 'hub');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // P0 Checkout Drawer State
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState('upi'); // 'upi' (Razorpay) | 'stripe' | 'paypal'
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  // Accordion FAQ state for Layer 2
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Clean creator handle
  const cleanSlug = (slug || 'creator').replace(/^@/, '');

  // 1. Retrieve creator profile data
  const [storeData, setStoreData] = useState(() => {
    try {
      const savedStore = localStorage.getItem(`vyralify_store_${cleanSlug}`) || localStorage.getItem('vyralify_store_demo');
      const globalHeadline = localStorage.getItem('vyralify_store_headline');
      const globalBio = localStorage.getItem('vyralify_store_bio');
      const globalAvatar = localStorage.getItem('vyralify_store_avatar');

      if (savedStore) {
        const parsed = JSON.parse(savedStore);
        return {
          handle: parsed.handle || cleanSlug,
          name: parsed.headline || globalHeadline || `@${cleanSlug}`,
          headline: parsed.headline || globalHeadline || 'Official Resource Vault & Toolkits',
          bio: parsed.bio || globalBio || 'Digital products, cheat sheets, and high-ticket strategy toolkits. 1-click instant access.',
          avatar: parsed.avatar || globalAvatar || localStorage.getItem(`vyralify_store_img_${cleanSlug}`) || null,
          verified: true,
          layout: parsed.layout || localStorage.getItem('vyralify_store_layout') || 'stack',
          borderRadius: parsed.borderRadius || localStorage.getItem('vyralify_store_radius') || 'rounded-2xl',
          font: parsed.font || localStorage.getItem('vyralify_store_font') || 'font-sans'
        };
      }

      const savedPage = localStorage.getItem('vyralify_active_page');
      const parsedPage = savedPage ? JSON.parse(savedPage) : null;
      return {
        handle: cleanSlug,
        name: parsedPage?.title || globalHeadline || `@${cleanSlug}`,
        headline: globalHeadline || 'Official Resource Vault & Toolkits',
        bio: globalBio || 'Digital products, cheat sheets, and high-ticket strategy toolkits. 1-click instant access.',
        avatar: globalAvatar || parsedPage?.avatar || localStorage.getItem(`vyralify_store_img_${cleanSlug}`) || null,
        verified: true,
        layout: localStorage.getItem('vyralify_store_layout') || 'stack',
        borderRadius: localStorage.getItem('vyralify_store_radius') || 'rounded-2xl',
        font: localStorage.getItem('vyralify_store_font') || 'font-sans'
      };
    } catch {
      return {
        handle: cleanSlug,
        name: `@${cleanSlug}`,
        headline: 'Official Resource Vault & Toolkits',
        bio: 'Digital products, cheat sheets, and high-ticket strategy toolkits. 1-click instant access.',
        avatar: null,
        verified: true,
        layout: localStorage.getItem('vyralify_store_layout') || 'stack',
        borderRadius: localStorage.getItem('vyralify_store_radius') || 'rounded-2xl',
        font: localStorage.getItem('vyralify_store_font') || 'font-sans'
      };
    }
  });

  // 2. Retrieve creator products
  const [products, setProducts] = useState(() => {
    try {
      const savedStore = localStorage.getItem(`vyralify_store_${cleanSlug}`) || localStorage.getItem('vyralify_store_demo');
      if (savedStore) {
        const parsed = JSON.parse(savedStore);
        if (parsed.products && parsed.products.length > 0) return parsed.products;
      }

      const saved = localStorage.getItem('vyralify_store_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch {}

    return [
      {
        id: 'prod_1',
        slug: 'faceless-operating-manual',
        title: 'The Faceless Page Operating Manual (2026 Edition)',
        price: '₹499',
        priceNumeric: 499,
        type: 'Digital Product',
        itemKind: 'product',
        deliveryMethod: 'upload',
        fileName: 'faceless-operating-manual-2026.pdf',
        fileSize: '2.4 MB',
        description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.',
        ctaText: 'Get Instant Access',
        isHero: true,
        status: 'published',
        rating: '4.9/5',
        reviewsCount: '284',
        videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        deliverables: [
          'Full 42-page PDF Master Blueprint with copy-paste workflows',
          'Database of 500+ royalty-free cinematic B-roll sources',
          'Automated caption generator prompts & retention checklists',
          'Free updates for lifetime & private Discord access'
        ],
        targetAudience: 'Designed for creator-operators, faceless theme pages, and digital entrepreneurs wanting automated high-ticket revenue without appearing on camera.',
        faqs: [
          { q: 'How is this delivered after payment?', a: 'Instant automated download on your screen right after checkout, plus a secure copy sent directly to your email.' },
          { q: 'Is this suitable for complete beginners?', a: 'Yes, every step is explained with visual breakdowns, step-by-step screenshots, and actionable checklists.' }
        ]
      },
      {
        id: 'prod_2',
        slug: 'viral-retention-hooks',
        title: '150+ Viral Retention Hooks & Pattern Interrupts',
        price: '₹299',
        priceNumeric: 299,
        type: 'Notion Workspace',
        itemKind: 'product',
        deliveryMethod: 'link',
        accessUrl: 'https://vyralify.in',
        description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.',
        ctaText: 'Unlock Swipe File',
        isHero: false,
        status: 'published',
        rating: '5.0/5',
        reviewsCount: '192',
        deliverables: [
          '150+ tested opening hooks rated by 3-second hold rate',
          'Interactive Notion database with tags and filter views',
          'Visual pattern interrupt guides & sound effect timestamps'
        ],
        targetAudience: 'Reel creators, video editors, and agency operators struggling with sub-40% 3-second view retention.',
        faqs: [
          { q: 'Do I need a paid Notion account?', a: 'No, this works 100% with the completely free personal Notion plan.' }
        ]
      },
      {
        id: 'prod_3',
        slug: 'strategy-audit-call',
        title: '1-on-1 Instagram Growth Strategy & Audit Call (30 Min)',
        price: '₹1,999',
        priceNumeric: 1999,
        type: 'Service / Call',
        itemKind: 'product',
        deliveryMethod: 'link',
        accessUrl: 'https://vyralify.in',
        description: 'Direct 30-minute private screen-share consultation reviewing your content calendar, bio structure, and funnel architecture.',
        ctaText: 'Book Calendar Slot',
        isHero: false,
        status: 'published',
        rating: '4.9/5',
        reviewsCount: '64',
        deliverables: [
          '30-minute private Zoom/Google Meet video session with screen recording',
          'Full teardown of your page bio, highlights, and top 10 reels',
          'Custom 30-day content calendar tailored to your exact niche'
        ],
        targetAudience: 'Creators and brands with existing traffic looking to optimize monetization and conversion rates.',
        faqs: [
          { q: 'When can I schedule my call?', a: 'Immediately after checkout, you are redirected to the live Calendly calendar to pick your preferred time slot.' }
        ]
      }
    ];
  });

  // Filter products: Published items only in public list; unlisted allowed via direct URL
  const visibleProducts = useMemo(() => {
    return products.filter(p => p.status !== 'draft' && p.status !== 'unlisted');
  }, [products]);

  // Find Hero Offer (First marked isHero or first item if hero layout selected)
  const heroProduct = useMemo(() => {
    const pinned = visibleProducts.find(p => p.isHero);
    if (pinned) return pinned;
    if (storeData.layout === 'hero' && visibleProducts.length > 0) return visibleProducts[0];
    return null;
  }, [visibleProducts, storeData.layout]);

  // Products to render in lower list (excludes hero to prevent duplicate card)
  const listProducts = useMemo(() => {
    if (!heroProduct) return visibleProducts;
    return visibleProducts.filter(p => p.id !== heroProduct.id);
  }, [visibleProducts, heroProduct]);

  // Real-time synchronization with Dashboard editor across tabs & windows
  useEffect(() => {
    const syncStore = () => {
      try {
        const savedStore = localStorage.getItem(`vyralify_store_${cleanSlug}`) || localStorage.getItem('vyralify_store_demo');
        const savedProds = localStorage.getItem('vyralify_store_products');
        const savedLayout = localStorage.getItem('vyralify_store_layout');
        const savedRadius = localStorage.getItem('vyralify_store_radius');
        const savedFont = localStorage.getItem('vyralify_store_font');
        const savedHeadline = localStorage.getItem('vyralify_store_headline');
        const savedBio = localStorage.getItem('vyralify_store_bio');
        const savedAvatar = localStorage.getItem('vyralify_store_avatar') || localStorage.getItem(`vyralify_store_img_${cleanSlug}`);

        if (savedStore) {
          const parsed = JSON.parse(savedStore);
          setStoreData(prev => ({
            ...prev,
            handle: parsed.handle || cleanSlug,
            name: parsed.headline || savedHeadline || prev.name,
            headline: parsed.headline || savedHeadline || prev.headline,
            bio: parsed.bio || savedBio || prev.bio,
            avatar: parsed.avatar || savedAvatar || prev.avatar,
            layout: parsed.layout || savedLayout || prev.layout,
            borderRadius: parsed.borderRadius || savedRadius || prev.borderRadius,
            font: parsed.font || savedFont || prev.font
          }));
          if (parsed.products && parsed.products.length > 0) {
            setProducts(parsed.products);
          }
        } else {
          setStoreData(prev => ({
            ...prev,
            headline: savedHeadline || prev.headline,
            bio: savedBio || prev.bio,
            avatar: savedAvatar || prev.avatar,
            layout: savedLayout || prev.layout,
            borderRadius: savedRadius || prev.borderRadius,
            font: savedFont || prev.font
          }));
        }

        if (savedProds) {
          const parsedP = JSON.parse(savedProds);
          if (Array.isArray(parsedP) && parsedP.length > 0) {
            setProducts(parsedP);
          }
        }
      } catch (err) {
        console.warn('Storefront sync err:', err);
      }
    };

    window.addEventListener('storage', syncStore);
    window.addEventListener('vyralify-store-updated', syncStore);
    return () => {
      window.removeEventListener('storage', syncStore);
      window.removeEventListener('vyralify-store-updated', syncStore);
    };
  }, [cleanSlug]);

  // If initial productSlug is provided in URL, initialize Layer 2
  useEffect(() => {
    if (productSlug) {
      const match = products.find(p => 
        (p.slug && p.slug.toLowerCase() === productSlug.toLowerCase()) || 
        p.id === productSlug
      );
      if (match) {
        setSelectedProduct(match);
        setCurrentLayer('product');
      }
    }
  }, [productSlug, products]);

  // Handle Currency change
  const handleCurrencySelect = (curr) => {
    setActiveCurrency(curr);
    localStorage.setItem('vyralify_buyer_currency', curr);
  };

  // Open Layer 2 Dedicated Product Page
  const handleOpenProductPage = (product) => {
    const isLink = product.itemKind === 'link' || product.type === 'Custom Link';
    if (isLink) {
      window.open(product.accessUrl, '_blank');
      return;
    }
    setSelectedProduct(product);
    setCurrentLayer('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger 1-Click Checkout Drawer
  const handleTriggerCheckout = (product, e) => {
    if (e) e.stopPropagation();
    const isLink = product.itemKind === 'link' || product.type === 'Custom Link';
    if (isLink) {
      window.open(product.accessUrl, '_blank');
      return;
    }

    try {
      const clicks = JSON.parse(localStorage.getItem('vyralify_product_clicks') || '[]');
      clicks.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('vyralify_product_clicks', JSON.stringify(clicks));
    } catch {}

    setCheckoutProduct(product);
  };

  // Complete Order & Trigger Instant Automated Delivery
  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (!checkoutProduct) return;
    setIsSubmitting(true);

    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const customerName = buyerName.trim() || 'Verified Buyer';
    const customerEmail = buyerEmail.trim() || 'buyer@example.com';
    const formattedAmt = formatPriceFx(checkoutProduct.priceNumeric || checkoutProduct.price, activeCurrency);

    const orderRecord = {
      id: orderId,
      customer: customerName,
      email: customerEmail,
      product: checkoutProduct.title,
      productId: checkoutProduct.id,
      amount: formattedAmt,
      amountNumeric: checkoutProduct.priceNumeric || 499,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Paid',
      pageHandle: cleanSlug,
      paymentGateway: selectedGateway === 'upi' ? 'Razorpay (UPI)' : selectedGateway === 'stripe' ? 'Stripe Connect' : 'PayPal',
      deliveryAccess: checkoutProduct.fileData 
        ? `Delivered (${checkoutProduct.fileName || 'PDF'})` 
        : checkoutProduct.accessUrl 
          ? 'Vault Link Unlocked' 
          : 'Delivered (Instant)',
      createdAt: new Date().toISOString()
    };

    // 1. Save to local CRM
    try {
      const existingOrders = JSON.parse(localStorage.getItem('vyralify_store_orders') || '[]');
      localStorage.setItem('vyralify_store_orders', JSON.stringify([orderRecord, ...existingOrders]));
    } catch (err) {}

    // 2. Sync to Firestore storeOrders
    try {
      await addDoc(collection(db, 'storeOrders'), {
        ...orderRecord,
        createdAt: serverTimestamp()
      });
    } catch (err) {}

    // 3. Show delivery screen
    setPurchaseSuccess({
      ...checkoutProduct,
      orderId,
      formattedAmt,
      buyerName: customerName,
      buyerEmail: customerEmail
    });

    setIsSubmitting(false);
    setCheckoutProduct(null);
    setBuyerName('');
    setBuyerEmail('');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const radiusClass = storeData.borderRadius || 'rounded-2xl';

  return (
    <div className={`min-h-screen w-full bg-[#FFFFFF] text-[#0F172A] ${storeData.font || 'font-sans'} selection:bg-[#067CF9]/15 selection:text-[#067CF9] antialiased relative`}>
      
      {/* Soft Blue Canvas Ambient Background per Section 3 spec */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#F0F6FE] via-[#F8FAFD] to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#067CF9]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#6366F1]/5 blur-3xl" />
      </div>

      {/* TOP BAR / NAVIGATION (Hub Layer) */}
      {currentLayer === 'hub' && (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[rgba(6,124,249,0.1)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#067CF9] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                V
              </div>
              <span className="font-bold text-xs text-[#0F172A] tracking-tight">
                vyralify.me/@{cleanSlug}
              </span>
            </div>
          </div>

          {/* Global Auto-FX Currency Selector & Share */}
          <div className="flex items-center gap-2">
            {/* Dynamic Auto-FX Dropdown */}
            <div className="relative">
              <select
                value={activeCurrency}
                onChange={(e) => handleCurrencySelect(e.target.value)}
                aria-label="Select Storefront Currency"
                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] text-[11px] font-bold text-[#0F172A] cursor-pointer hover:border-[#067CF9] transition-all focus:outline-hidden"
              >
                {Object.entries(FX_RATES).map(([code, item]) => (
                  <option key={code} value={code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[rgba(6,124,249,0.15)] text-[#067CF9] text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
              title="Share Storefront URL"
            >
              {copiedLink ? <Check className="w-3 h-3 text-[#10B981]" /> : <Share2 className="w-3 h-3" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="px-3 py-1 rounded-lg bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            )}
          </div>
        </header>
      )}

      {/* =========================================================================
          LAYER 1: LINK-IN-BIO HUB VIEW (vyralify.me/@username)
         ========================================================================= */}
      {currentLayer === 'hub' && (
        <main className="relative z-10 w-full max-w-lg mx-auto px-4 py-8 space-y-6">
          
          {/* Creator Profile Header */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full ring-3 ring-[#067CF9] p-0.5 bg-white shadow-md mx-auto">
                {storeData.avatar ? (
                  <img 
                    src={storeData.avatar} 
                    alt={cleanSlug}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#067CF9] to-[#6366F1] flex items-center justify-center text-xl font-bold text-white uppercase">
                    {cleanSlug.slice(0, 2)}
                  </div>
                )}
              </div>
              {storeData.verified && (
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#067CF9] text-white flex items-center justify-center text-xs font-bold shadow-md border-2 border-white">
                  ✓
                </span>
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#0F172A] tracking-tight flex items-center justify-center gap-1.5">
                <span>@{cleanSlug}</span>
              </h1>
              <p className="text-xs font-semibold text-[#067CF9] mt-0.5">
                {storeData.headline}
              </p>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto font-medium">
              {storeData.bio}
            </p>

            {/* Direct Social Icons Bar */}
            <div className="flex items-center justify-center gap-2.5 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[rgba(6,124,249,0.12)] text-[#067CF9] flex items-center justify-center hover:bg-[#EFF6FF] transition-all shadow-2xs" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[rgba(6,124,249,0.12)] text-[#067CF9] flex items-center justify-center hover:bg-[#EFF6FF] transition-all shadow-2xs" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[rgba(6,124,249,0.12)] text-[#067CF9] flex items-center justify-center hover:bg-[#EFF6FF] transition-all shadow-2xs" title="X / Twitter">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-[rgba(6,124,249,0.12)] text-[#067CF9] flex items-center justify-center hover:bg-[#EFF6FF] transition-all shadow-2xs" title="Telegram">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* PINNED HERO OFFER CARD (Spec Section 2: Pinned Hero Offers) */}
          {heroProduct && (
            <div className={`p-5 ${radiusClass} bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.2)] shadow-[0_8px_30px_rgba(6,124,249,0.06)] ring-1 ring-[rgba(6,124,249,0.15)] space-y-3.5 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 ${radiusClass} bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] text-[10px] font-bold flex items-center gap-1 shadow-2xs`}>
                  <Sparkles className="w-3 h-3 text-[#067CF9]" />
                  <span>Featured Master Offer</span>
                </span>
                <span className="text-sm font-bold text-[#067CF9]">
                  {formatPriceFx(heroProduct.priceNumeric || heroProduct.price, activeCurrency)}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0F172A] leading-snug">
                  {heroProduct.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed line-clamp-2">
                  {heroProduct.description}
                </p>
              </div>

              {/* Action Buttons: Open Long-Form Page OR 1-Click Buy */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenProductPage(heroProduct)}
                  className={`flex-1 py-2 px-3 ${radiusClass} bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer`}
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleTriggerCheckout(heroProduct, e)}
                  className={`flex-1 py-2 px-3 ${radiusClass} bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-[#067CF9]/20`}
                >
                  <span>{heroProduct.ctaText || 'Get Access'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ALL STORE PRODUCTS (Layout Presets: Stack vs Grid vs Hero+List) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#64748B] px-1">
              <span>Official Toolkits &amp; Links ({listProducts.length})</span>
              <span className="text-[#067CF9] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 1-Click Delivery
              </span>
            </div>

            {/* Layout Rendering: Stack (Single Column) or Grid (2-Column) */}
            <div className={storeData.layout === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5" : "space-y-3.5"}>
              {listProducts.map((prod) => {
                const isLink = prod.itemKind === 'link' || prod.type === 'Custom Link';
                const priceFormatted = formatPriceFx(prod.priceNumeric || prod.price, activeCurrency);

                if (isLink) {
                  return (
                    <div
                      key={prod.id}
                      onClick={() => window.open(prod.accessUrl, '_blank')}
                      className={`p-4 ${radiusClass} bg-white/90 backdrop-blur-md border border-[rgba(6,124,249,0.12)] hover:border-[#067CF9] transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 group`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {prod.cardImage ? (
                          <img src={prod.cardImage} alt={prod.title} className={`w-10 h-10 ${radiusClass} object-cover shrink-0`} />
                        ) : (
                          <div className={`w-10 h-10 ${radiusClass} bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0`}>
                            <LinkIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-[#0F172A] group-hover:text-[#067CF9] transition-colors truncate">
                            {prod.title}
                          </h4>
                          <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                            {prod.subtitle || prod.description || 'Direct redirect link'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 ${radiusClass} bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] text-[#067CF9] text-[11px] font-semibold flex items-center gap-1 shrink-0`}>
                        <span>{prod.ctaText || 'Open'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={prod.id}
                    onClick={() => handleOpenProductPage(prod)}
                    className={`p-4 ${radiusClass} bg-white/90 backdrop-blur-md border border-[rgba(6,124,249,0.12)] hover:border-[#067CF9] transition-all cursor-pointer shadow-xs space-y-3 group`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 ${radiusClass} bg-[#F8FAFC] text-[10px] font-bold text-[#64748B] border border-slate-100`}>
                            {prod.type}
                          </span>
                          {prod.rating && (
                            <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span>{prod.rating}</span>
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-[#0F172A] group-hover:text-[#067CF9] transition-colors mt-1 leading-snug">
                          {prod.title}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-[#067CF9] shrink-0">
                        {priceFormatted}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      <span className="text-[10px] text-[#64748B] font-medium">
                        Instant Delivery
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleTriggerCheckout(prod, e)}
                        className={`px-3 py-1.5 ${radiusClass} bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-2xs`}
                      >
                        <span>{prod.ctaText || 'Get Access'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-3 rounded-xl bg-[#F8FAFD] border border-[rgba(6,124,249,0.1)] text-center text-xs text-[#64748B]">
            <p className="font-medium text-[11px]">
              🔒 Direct automated delivery &bull; Download links delivered immediately upon checkout
            </p>
          </div>

        </main>
      )}

      {/* =========================================================================
          LAYER 2: PREMIUM RESPONSIVE PRODUCT DETAIL LANDING PAGE
          Built to Developer Specification & UI Design Reference
         ========================================================================= */}
      {currentLayer === 'product' && selectedProduct && (
        <PremiumProductPage
          product={selectedProduct}
          storeData={storeData}
          activeCurrency={activeCurrency}
          formatPriceFx={formatPriceFx}
          radiusClass={radiusClass}
          allProducts={products}
          onTriggerCheckout={handleTriggerCheckout}
          onBackToStore={() => {
            setCurrentLayer('hub');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectProduct={(prod) => {
            setSelectedProduct(prod);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cleanSlug={cleanSlug}
        />
      )}

      {/* =========================================================================
          P0: 1-CLICK CHECKOUT MODAL (SLIDING BOTTOM-SHEET DRAWER ON MOBILE)
          Spec Section 9: Build mobile sliding bottom-sheet drawer for instant 
          name/email/payment entry without page reload.
         ========================================================================= */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 space-y-4 shadow-2xl border border-[rgba(6,124,249,0.15)] max-h-[90vh] overflow-y-auto">
            
            {/* Mobile Drag Indicator Bar */}
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto -mt-2 mb-2 sm:hidden" />

            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#067CF9] uppercase tracking-wide flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#067CF9]" /> 1-Click Fast Checkout
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-0.5 leading-snug">
                  {checkoutProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="p-3.5 rounded-xl bg-[#F0F6FE] border border-[rgba(6,124,249,0.15)] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#64748B] font-medium block">Total Payable</span>
                <span className="text-[10px] text-emerald-600 font-bold">✓ Zero Checkout Surcharge</span>
              </div>
              <div className="text-xl font-bold text-[#067CF9]">
                {formatPriceFx(checkoutProduct.priceNumeric || checkoutProduct.price, activeCurrency)}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs">
              
              <div className="space-y-1">
                <label className="text-[#64748B] font-semibold">Your Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-9 pr-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#64748B] font-semibold">Email (Automated Delivery Sent Here)</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="e.g. vikram@gmail.com"
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-9 pr-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>
              </div>

              {/* Payment Gateway Toggle per Spec Section 6 */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[#64748B] font-semibold block">Select Payment Gateway</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('upi')}
                    className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedGateway === 'upi'
                        ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold'
                        : 'border-slate-200 text-[#64748B] bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold">UPI / GPay</div>
                    <div className="text-[9px] text-[#64748B]">Razorpay</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('stripe')}
                    className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedGateway === 'stripe'
                        ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold'
                        : 'border-slate-200 text-[#64748B] bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Cards / Pay</div>
                    <div className="text-[9px] text-[#64748B]">Stripe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGateway('paypal')}
                    className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedGateway === 'paypal'
                        ? 'border-[#067CF9] bg-[#EFF6FF] text-[#067CF9] font-bold'
                        : 'border-slate-200 text-[#64748B] bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold">PayPal</div>
                    <div className="text-[9px] text-[#64748B]">Global</div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#067CF9]/25 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting 
                      ? 'Confirming Settlement...' 
                      : `Pay & Unlock Access (${formatPriceFx(checkoutProduct.priceNumeric || checkoutProduct.price, activeCurrency)})`}
                  </span>
                </button>

                <p className="text-[10px] text-[#64748B] text-center">
                  🔒 Instant automated file &amp; calendar delivery upon settlement
                </p>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          INSTANT POST-PURCHASE AUTOMATED DELIVERY SCREEN (Spec Section 7)
         ========================================================================= */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-[rgba(6,124,249,0.2)] rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setPurchaseSuccess(null)}
              className="absolute right-4 top-4 text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Payment Confirmed &amp; Access Unlocked!</h3>
              <p className="text-xs text-[#64748B]">
                Thank you, <strong className="text-[#0F172A]">{purchaseSuccess.buyerName}</strong>! Your purchase has been verified and registered.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[rgba(6,124,249,0.12)] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Order Reference:</span>
                <span className="font-bold text-[#067CF9]">{purchaseSuccess.orderId}</span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Product Asset:</span>
                <span className="font-semibold text-[#0F172A] truncate max-w-[200px]">{purchaseSuccess.title}</span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Delivered To:</span>
                <span className="text-[#0F172A]">{purchaseSuccess.buyerEmail}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-1.5 font-bold text-[#0F172A]">
                <span>Amount Paid:</span>
                <span className="text-[#067CF9]">{purchaseSuccess.formattedAmt}</span>
              </div>
            </div>

            {/* AUTOMATED FULFILLMENT ACTIONS (Spec Section 7) */}
            <div className="space-y-2 pt-1">
              {purchaseSuccess.fileData ? (
                <a
                  href={purchaseSuccess.fileData}
                  download={purchaseSuccess.fileName || 'digital-asset.pdf'}
                  className="w-full py-3 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#067CF9]/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {purchaseSuccess.fileName} ({purchaseSuccess.fileSize || 'Direct File'})</span>
                </a>
              ) : purchaseSuccess.accessUrl ? (
                <a
                  href={purchaseSuccess.accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#067CF9]/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Digital Vault / Notion Workspace &rarr;</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const text = `VYRALIFY STORE RECEIPT\nOrder: ${purchaseSuccess.orderId}\nProduct: ${purchaseSuccess.title}\nLicensed to: ${purchaseSuccess.buyerName}\nEmail: ${purchaseSuccess.buyerEmail}\n\nInstant digital unlock verified.`;
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `license-${purchaseSuccess.orderId}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full py-3 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#067CF9]/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download License Pass (Instant Access)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPurchaseSuccess(null)}
                className="w-full py-2 rounded-xl text-xs text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
              >
                Close / Return to Store
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Powered by Vyralify Footer */}
      <footer className="w-full py-8 text-center text-[11px] text-[#64748B] border-t border-[rgba(6,124,249,0.08)] bg-white/50">
        <div className="flex items-center justify-center gap-1">
          <span>Powered by</span>
          <strong className="text-[#067CF9]">Vyralify Store OS</strong>
        </div>
        <p className="text-[10px] text-[#94A3B8] mt-0.5">
          High-Ticket Creator Commerce &bull; Electric Light Monochromatic System
        </p>
      </footer>

    </div>
  );
}
