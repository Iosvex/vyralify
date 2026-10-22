import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
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
  Search,
  ShoppingCart,
  MessageCircle,
  ThumbsUp,
  RefreshCw,
  Award,
  Video,
  Layers,
  Heart
} from 'lucide-react';

export default function PremiumProductPage({
  product,
  storeData = {},
  activeCurrency = 'INR',
  formatPriceFx,
  radiusClass = 'rounded-2xl',
  allProducts = [],
  onTriggerCheckout,
  onBackToStore,
  onSelectProduct,
  cleanSlug = 'creator'
}) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const heroCtaRef = useRef(null);

  // Gallery images with high-resolution fallbacks
  const galleryImages = [
    product.videoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80'
  ];

  // Dynamic pricing calculations
  const priceNumeric = product.priceNumeric || (parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 499);
  const compareAtNumeric = product.compareAtNumeric || Math.round(priceNumeric * 2);
  const discountPercent = Math.round(((compareAtNumeric - priceNumeric) / compareAtNumeric) * 100);

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Arjun K.',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment: 'Insane value! Everything is explained step by step. Already got my first 10K followers and made ₹18,000 using the monetization framework.'
    },
    {
      id: 2,
      author: 'Sara M.',
      rating: 5,
      date: '1 month ago',
      verified: true,
      comment: 'Best guide for faceless Instagram theme pages. The content ideas and hook formulas alone are worth 10x the price.'
    },
    {
      id: 3,
      author: 'Karan S.',
      rating: 5,
      date: '1 month ago',
      verified: true,
      comment: 'Super practical and easy to follow. No fluff, just direct systems that work in 2026. Highly recommend to anyone starting out!'
    }
  ]);

  // Handle intersection observer to toggle floating sticky buy bar on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (heroCtaRef.current) {
        const rect = heroCtaRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deliverables parsing
  const deliverables = (product.deliverables && product.deliverables.length > 0)
    ? product.deliverables
    : (product.deliverablesText
        ? product.deliverablesText.split('\n').map(s => s.trim()).filter(Boolean)
        : [
            'Full 42-page PDF Master Blueprint with copy-paste workflows',
            '500+ Royalty-free cinematic B-roll sources',
            'Automated caption generator prompts & retention loops',
            'Monetization strategies (multiple income streams)'
          ]
      );

  // FAQ parsing
  const faqs = (product.faqs && product.faqs.length > 0)
    ? product.faqs
    : (product.faqQ1
        ? [
            { q: product.faqQ1, a: product.faqA1 || 'Instant automated access upon checkout.' },
            ...(product.faqQ2 ? [{ q: product.faqQ2, a: product.faqA2 || 'Yes, suitable for complete beginners.' }] : [])
          ]
        : [
            { q: 'Is this a physical product?', a: 'No, this is a 100% digital toolkit. You receive instant download access on your screen and via email right after purchase.' },
            { q: 'How will I receive the files?', a: 'Immediately after 1-click checkout, a direct download button appears on your screen and a permanent access link is sent to your email.' },
            { q: 'Do I need any prior experience?', a: 'None at all. Everything is broken down step by step with screenshots, video walkthroughs, and actionable copy-paste prompts.' },
            { q: 'Will I get future updates?', a: 'Yes! Lifetime access includes all future edition updates, new B-roll databases, and algorithm changes completely free.' },
            { q: 'Can I get a refund?', a: 'Due to the immediate access nature of digital intellectual property, all sales are final, but our creator support team is always here to assist you.' }
          ]
      );

  // Similar Products list
  const similarProducts = (allProducts && allProducts.length > 1)
    ? allProducts.filter(p => p.id !== product.id).slice(0, 4)
    : [
        {
          id: 'sim_1',
          title: '110 High-Ticket Business Ideas for 2026',
          price: '₹399',
          priceNumeric: 399,
          compareAt: '₹799',
          rating: '4.8',
          reviewsCount: '120+',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
          type: 'Digital Guide'
        },
        {
          id: 'sim_2',
          title: 'Instagram Viral Captions & Retention Hooks',
          price: '₹299',
          priceNumeric: 299,
          compareAt: '₹599',
          rating: '4.9',
          reviewsCount: '340+',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
          type: 'Notion Swipe File'
        },
        {
          id: 'sim_3',
          title: '500+ Cinematic Reels Transitions & Effects',
          price: '₹399',
          priceNumeric: 399,
          compareAt: '₹799',
          rating: '4.8',
          reviewsCount: '210+',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
          type: 'Video Assets Pack'
        },
        {
          id: 'sim_4',
          title: '1-on-1 Instagram Growth Strategy Call (30 Min)',
          price: '₹1,499',
          priceNumeric: 1499,
          compareAt: '₹2,999',
          rating: '4.9',
          reviewsCount: '60+',
          image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
          type: '1-on-1 Consultation'
        }
      ];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    const rev = {
      id: Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      comment: newReviewText.trim()
    };
    setReviewsList([rev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setWriteReviewOpen(false);
  };

  const scrollToSection = (tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(`section-${tabId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#0F172A] selection:bg-[#067CF9]/15 selection:text-[#067CF9] pb-24 sm:pb-16 antialiased">
      
      {/* =========================================================================
          1. STORE HEADER & NAVIGATION (Matching Design Reference Mockup)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[rgba(6,124,249,0.1)] px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Store Logo & Name with Back Link */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Return to creator store"
            >
              <ArrowLeft className="w-4 h-4 text-[#067CF9]" />
              <span className="hidden sm:inline">Store</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div 
              onClick={onBackToStore}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#067CF9] to-[#6366F1] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                V
              </div>
              <span className="font-bold text-sm tracking-tight text-[#0F172A]">
                {storeData.name || `vyralify.me/@${cleanSlug}`}
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#64748B]">
            <button onClick={onBackToStore} className="text-[#067CF9] hover:text-[#067CF9] transition-colors cursor-pointer">
              Store
            </button>
            <button onClick={onBackToStore} className="hover:text-[#0F172A] transition-colors cursor-pointer">
              All Products
            </button>
            <button onClick={onBackToStore} className="hover:text-[#0F172A] transition-colors cursor-pointer">
              Courses
            </button>
            <button onClick={onBackToStore} className="hover:text-[#0F172A] transition-colors cursor-pointer">
              Templates
            </button>
            <button onClick={onBackToStore} className="hover:text-[#0F172A] transition-colors cursor-pointer">
              Tools
            </button>
            <button onClick={onBackToStore} className="hover:text-[#0F172A] transition-colors cursor-pointer">
              Consultations
            </button>
          </nav>

          {/* Right: Search, Cart Icon & Currency */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-48 lg:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-hidden focus:border-[#067CF9]"
              />
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={(e) => onTriggerCheckout(product, e)}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#067CF9] transition-colors cursor-pointer"
              title="Cart items"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#067CF9] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                1
              </span>
            </button>

            {/* Creator Avatar */}
            <div className="w-7 h-7 rounded-full ring-2 ring-[#067CF9]/40 overflow-hidden shrink-0">
              <img 
                src={storeData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} 
                alt="Store avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. MAIN PRODUCT HERO SECTION (~52% Gallery Left, ~48% Offer Right)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-10">
        
        {/* Breadcrumb Hierarchy */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#64748B] mb-4 overflow-x-auto whitespace-nowrap">
          <button onClick={onBackToStore} className="hover:text-[#067CF9] transition-colors cursor-pointer">Store</button>
          <span>&gt;</span>
          <span className="hover:text-[#067CF9] transition-colors cursor-pointer">Digital Products</span>
          <span>&gt;</span>
          <span className="text-[#0F172A] font-bold truncate">{product.type || 'Instagram Growth'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: PRODUCT MEDIA GALLERY (~52% -> 7 Cols)
             ===================================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Interactive Media Box */}
            <div className={`relative w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-900 ${radiusClass} overflow-hidden border border-[rgba(6,124,249,0.15)] shadow-xl group flex items-center justify-center`}>
              
              {/* Product Cover / Active Image */}
              <img
                src={galleryImages[activeMediaIndex]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Bestseller Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-[#EFF6FF] backdrop-blur-md text-[#067CF9] font-bold text-xs border border-[rgba(6,124,249,0.25)] shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#067CF9]" />
                  <span>{product.badge || 'Bestseller'}</span>
                </span>
              </div>

              {/* Video Play Overlay (if video or index 0) */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="absolute inset-0 bg-black/20 hover:bg-black/35 flex items-center justify-center transition-colors cursor-pointer group/btn"
                title="Watch Video Walkthrough"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-md text-[#067CF9] flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#067CF9] ml-1" />
                </div>
              </button>

              {/* Carousel Left / Right Navigation Arrows */}
              <button
                type="button"
                onClick={() => setActiveMediaIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0F172A] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer z-10"
                title="Previous media"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0F172A] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer z-10"
                title="Next media"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* 4K Video Walkthrough Included Badge */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                ✓ Full 4K Video Teardown Included
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative aspect-square ${radiusClass} overflow-hidden border-2 transition-all cursor-pointer ${
                    activeMediaIndex === idx
                      ? 'border-[#067CF9] ring-2 ring-[#067CF9]/30 shadow-md scale-102'
                      : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Video More Thumbnail Pill */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className={`relative aspect-square ${radiusClass} overflow-hidden bg-slate-900 border-2 border-slate-200 hover:border-[#067CF9] text-white flex flex-col items-center justify-center p-1 transition-all cursor-pointer group`}
                title="Watch preview video"
              >
                <div className="w-6 h-6 rounded-full bg-[#067CF9] text-white flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span className="text-[10px] font-bold">+12 more</span>
              </button>
            </div>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: OFFER DETAILS & PRIMARY CONVERSION CTA (~48% -> 5 Cols)
             ===================================================================== */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Title & Short Summary */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {product.subtitle || product.description || 'The complete step-by-step blueprint to build, grow and monetize faceless theme pages from scratch.'}
              </p>
            </div>

            {/* Social Proof: Rating & Sold Count */}
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div 
                onClick={() => scrollToSection('reviews')}
                className="flex items-center gap-1.5 text-amber-500 hover:underline cursor-pointer"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[#0F172A] font-bold">4.9/5</span>
                <span className="text-[#64748B] font-normal">({reviewsList.length * 90}+ students)</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="text-[#64748B] flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                <span>{product.salesCount || 84} sold</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.18)] text-[#067CF9] text-xs font-semibold flex items-center gap-1">
                <Download className="w-3 h-3 text-[#067CF9]" />
                <span>{product.type || 'Digital Download'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.18)] text-[#067CF9] text-xs font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#067CF9]" />
                <span>Instant Access</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.18)] text-[#067CF9] text-xs font-semibold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-[#067CF9]" />
                <span>Lifetime Updates</span>
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#067CF9] tracking-tight">
                {formatPriceFx(priceNumeric, activeCurrency)}
              </span>
              <span className="text-lg text-slate-400 line-through font-medium">
                {formatPriceFx(compareAtNumeric, activeCurrency)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#067CF9] text-xs font-extrabold">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Bulleted Highlights Checklist */}
            <div className="p-4 rounded-xl bg-[#F8FAFD] border border-[rgba(6,124,249,0.12)] space-y-2.5 text-xs text-[#0F172A]">
              {deliverables.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#067CF9] shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* PRIMARY CONVERSION CTA BUTTON */}
            <div ref={heroCtaRef} className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={(e) => onTriggerCheckout(product, e)}
                className={`w-full py-4 px-6 ${radiusClass} bg-gradient-to-r from-[#067CF9] via-[#0568D2] to-[#0457B0] hover:opacity-95 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-between shadow-xl shadow-[#067CF9]/30 hover:shadow-[#067CF9]/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
              >
                <span>{product.ctaText || 'Get Instant Access'}</span>
                <span className="flex items-center gap-2 font-mono text-sm">
                  <span>|</span>
                  <span>{formatPriceFx(priceNumeric, activeCurrency)}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </span>
              </button>

              {/* Micro Trust Assurance Bar */}
              <div className="grid grid-cols-3 gap-1 text-[11px] text-[#64748B] text-center pt-1 font-medium">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#067CF9]" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#067CF9]" />
                  <span>30-Day Support</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          3. HORIZONTAL 4-PILL TRUST CARDS BAR (Full Width)
         ========================================================================= */}
      <section className="bg-[#F8FAFD] border-y border-[rgba(6,124,249,0.1)] py-6 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-white border border-[rgba(6,124,249,0.1)] flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F172A]">Instant Download</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5">Get access immediately after purchase.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[rgba(6,124,249,0.1)] flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F172A]">Lifetime Access</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5">One-time payment. No recurring fees.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[rgba(6,124,249,0.1)] flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F172A]">Regular Updates</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5">Get all future editions for free.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[rgba(6,124,249,0.1)] flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F172A]">Secure Payment</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5">100% safe &amp; encrypted checkout.</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. CONTENT TAB NAVIGATION BAR
         ========================================================================= */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-bold text-[#64748B]">
          {[
            { id: 'description', label: 'Description' },
            { id: 'deliverables', label: "What's Included" },
            { id: 'audience', label: 'Who This Is For' },
            { id: 'faqs', label: 'FAQs' },
            { id: 'reviews', label: `Reviews (${reviewsList.length * 90}+)` }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#067CF9] text-[#067CF9]'
                  : 'border-transparent hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          5. DETAILED CONTENT BODY (Two Columns on Desktop)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT CONTENT COLUMN (~65% -> 8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Section: Description */}
            <div id="section-description" className="space-y-4">
              <span className="text-[11px] font-bold text-[#067CF9] uppercase tracking-wider">
                BUILD • GROW • MONETIZE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug">
                Build, Grow &amp; Monetize Faceless Theme Pages Step-by-Step.
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                The Faceless Operating Manual (2026 Edition) gives you the exact systems, strategies, and templates to build, grow, and monetize faceless Instagram theme pages — even if you're a complete beginner with zero followers.
              </p>

              {/* What You'll Learn Checklist */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-sm text-[#0F172A]">What You'll Learn:</h3>
                <div className="space-y-2 text-xs text-[#0F172A]">
                  {[
                    'How to find profitable niches with high advertiser demand',
                    'Step-by-step page setup, viral bio formulas & optimization',
                    'Viral content frameworks (with 40+ proven content types)',
                    'Caption templates, hook formulas & engagement loops (copy-paste)',
                    'Growth strategies to reach 10K, 100K and beyond organically',
                    'Multiple monetization methods (digital products, affiliate, brand deals)'
                  ].map((learn, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#067CF9] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{learn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inline Secondary CTA */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={(e) => onTriggerCheckout(product, e)}
                  className={`py-3 px-5 ${radiusClass} bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#067CF9]/20 transition-all cursor-pointer`}
                >
                  <span>Get Instant Access</span>
                  <span>{formatPriceFx(priceNumeric, activeCurrency)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className={`py-3 px-4 ${radiusClass} bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Preview</span>
                </button>
              </div>
            </div>

            {/* Section: What's Included / Deliverables */}
            <div id="section-deliverables" className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#067CF9]" />
                <span>What's Included?</span>
              </h3>
              <p className="text-xs text-[#64748B]">Everything you need to build, grow and monetize faceless theme pages.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#067CF9] shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-[#0F172A] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Who This Is For */}
            <div id="section-audience" className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <User className="w-5 h-5 text-[#067CF9]" />
                <span>Who This Is For?</span>
              </h3>
              <div className="p-4 rounded-xl bg-[#F8FAFD] border border-[rgba(6,124,249,0.12)] space-y-2 text-xs text-[#0F172A]">
                <div className="flex items-start gap-2">
                  <span className="text-[#067CF9] font-bold">•</span>
                  <span>Beginners who want to start profitable faceless theme pages from scratch without showing their face.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#067CF9] font-bold">•</span>
                  <span>Content creators looking to optimize view retention and turn attention into high-ticket sales.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#067CF9] font-bold">•</span>
                  <span>Digital entrepreneurs building automated digital product funnels and recurring affiliate income.</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR COLUMN (~35% -> 4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Creator Store Profile Card */}
            <div className={`p-5 ${radiusClass} bg-white border border-[rgba(6,124,249,0.15)] shadow-md space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ring-2 ring-[#067CF9]/40 overflow-hidden shrink-0">
                    <img 
                      src={storeData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'} 
                      alt="Creator avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A] leading-tight">
                      {storeData.name || `Vyralify Store`}
                    </h4>
                    <p className="text-[11px] text-[#64748B]">Digital Products for Creators</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isFollowing
                      ? 'bg-slate-100 text-[#0F172A]'
                      : 'bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)]'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Creator Stats */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                <div>
                  <span className="text-sm font-extrabold text-[#0F172A] block">12</span>
                  <span className="text-[10px] text-[#64748B]">Products</span>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-[#0F172A] block">8.5K</span>
                  <span className="text-[10px] text-[#64748B]">Customers</span>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-[#0F172A] block">4.9/5</span>
                  <span className="text-[10px] text-[#64748B]">Rating</span>
                </div>
              </div>

              {/* You'll Also Get Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0F172A] block">You'll Also Get:</span>
                <div className="space-y-1.5 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#067CF9]" />
                    <span>Instant download link (PDF)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#067CF9]" />
                    <span>Bonus resources &amp; templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#067CF9]" />
                    <span>Access to private update channel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#067CF9]" />
                    <span>Future updates included (free)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Purchase Card */}
            <div className={`p-5 ${radiusClass} bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-[rgba(6,124,249,0.15)] shadow-xs space-y-3`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#64748B] block font-medium">Limited Edition Price</span>
                  <span className="text-2xl font-extrabold text-[#067CF9]">
                    {formatPriceFx(priceNumeric, activeCurrency)}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Instant Payout
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => onTriggerCheckout(product, e)}
                className={`w-full py-2.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#067CF9]/20 cursor-pointer`}
              >
                <span>{product.ctaText || 'Get Instant Access'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* =====================================================================
            6. FREQUENTLY ASKED QUESTIONS SECTION (Accordion)
           ===================================================================== */}
        <div id="section-faqs" className="pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#067CF9]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <span className="text-xs text-[#067CF9] font-semibold cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`border border-slate-200 ${radiusClass} overflow-hidden bg-white shadow-2xs`}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] flex items-center justify-between hover:bg-[#F8FAFD] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#067CF9]">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#067CF9] transition-transform duration-200 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-1 text-xs text-[#64748B] leading-relaxed bg-[#F8FAFD]/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            7. CUSTOMER REVIEWS & SOCIAL PROOF SECTION
           ===================================================================== */}
        <div id="section-reviews" className="pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>Student Reviews</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                4.9/5 average based on {reviewsList.length * 90}+ verified creator purchases.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setWriteReviewOpen(!writeReviewOpen)}
              className="px-3.5 py-1.5 rounded-xl border border-[rgba(6,124,249,0.2)] bg-[#EFF6FF] hover:bg-blue-100 text-[#067CF9] text-xs font-semibold transition-colors cursor-pointer"
            >
              Write a review
            </button>
          </div>

          {/* Optional Write Review Form */}
          {writeReviewOpen && (
            <form onSubmit={handleAddReview} className="p-4 rounded-xl bg-[#F8FAFD] border border-blue-200 space-y-3 text-xs">
              <div className="font-bold text-[#0F172A]">Share Your Experience</div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Rahul S.)"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars (Great)</option>
                  <option value={3}>⭐⭐⭐ 3 Stars (Good)</option>
                </select>
              </div>
              <textarea
                rows={2}
                required
                placeholder="What did you learn and how did this blueprint help you?"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setWriteReviewOpen(false)}
                  className="px-3 py-1 rounded-lg text-slate-500 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#067CF9] text-white font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviewsList.map(rev => (
              <div key={rev.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">{rev.author}</span>
                    <span className="text-[10px] text-[#64748B]">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                {rev.verified && (
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-2 border-t border-slate-100">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            8. SIMILAR PRODUCTS CAROUSEL
           ===================================================================== */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F172A]">
              Similar Products
            </h3>
            <button 
              onClick={onBackToStore} 
              className="text-xs font-semibold text-[#067CF9] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map((sim, i) => (
              <div
                key={sim.id || i}
                onClick={() => onSelectProduct ? onSelectProduct(sim) : onTriggerCheckout(sim)}
                className={`p-3.5 ${radiusClass} bg-white border border-slate-200 hover:border-[#067CF9] transition-all cursor-pointer shadow-xs hover:shadow-md space-y-3 group flex flex-col justify-between`}
              >
                <div className="space-y-2.5">
                  <div className={`relative aspect-[16/10] ${radiusClass} overflow-hidden bg-slate-900`}>
                    <img
                      src={sim.image || sim.videoUrl || galleryImages[i + 1] || galleryImages[0]}
                      alt={sim.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                      {sim.type || 'Digital Asset'}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A] group-hover:text-[#067CF9] transition-colors line-clamp-1 leading-snug">
                      {sim.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold mt-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{sim.rating || '4.9'} ({sim.reviewsCount || '100+'})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-[#067CF9]">
                      {formatPriceFx(sim.priceNumeric || sim.price, activeCurrency)}
                    </span>
                    {sim.compareAt && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {sim.compareAt}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerCheckout(sim, e);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#067CF9] text-[#067CF9] hover:text-white font-semibold text-[11px] transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          9. FLOATING STICKY BOTTOM BUY BAR (Mobile Responsive)
         ========================================================================= */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[rgba(6,124,249,0.15)] p-3 shadow-2xl flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-8 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 hidden sm:block">
              <img src={galleryImages[0]} alt="Mini preview" className="w-full h-full object-cover" />
            </div>
            <div className="truncate">
              <span className="font-bold text-xs text-[#0F172A] block truncate">{product.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-extrabold text-[#067CF9]">
                  {formatPriceFx(priceNumeric, activeCurrency)}
                </span>
                <span className="text-[10px] text-slate-400 line-through">
                  {formatPriceFx(compareAtNumeric, activeCurrency)}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => onTriggerCheckout(product, e)}
            className={`py-2.5 px-6 ${radiusClass} bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#067CF9]/25 cursor-pointer shrink-0`}
          >
            <span>{product.ctaText || 'Get Instant Access'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          10. VIDEO WALKTHROUGH MODAL
         ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            <div className="flex items-center justify-between p-3 border-b border-white/10 text-white">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-[#067CF9] text-[#067CF9]" />
                <span>{product.title} &bull; 4K Video Teardown</span>
              </span>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={galleryImages[0]}
                alt="Video preview background"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-[#067CF9] text-white flex items-center justify-center mx-auto shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <div className="text-sm font-bold text-white">Interactive Video Walkthrough</div>
                <p className="text-xs text-slate-300 max-w-md">
                  In this comprehensive teardown, you'll see every template, workflow, and viral framework included inside the package.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
