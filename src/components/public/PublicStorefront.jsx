import React, { useState, useEffect } from 'react';
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
  Share2,
  Copy
} from 'lucide-react';

export default function PublicStorefront({ slug, onBackToApp }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  // Retrieve creator data from localStorage or fallback to standard profile
  const [storeData, setStoreData] = useState(() => {
    try {
      const savedPage = localStorage.getItem('vyralify_active_page');
      const parsedPage = savedPage ? JSON.parse(savedPage) : null;
      return {
        handle: slug || parsedPage?.handle || 'creator',
        name: parsedPage?.title || 'Official Creator Store',
        niche: parsedPage?.category || 'Business & Money',
        subNiche: parsedPage?.subNiche || 'Online Entrepreneurship',
        bio: 'Official digital toolkits, swipe files, and 1-on-1 growth consulting. Instant download upon checkout.',
        verified: true,
        avatar: null
      };
    } catch {
      return {
        handle: slug || 'creator',
        name: 'Official Creator Store',
        niche: 'Business & Money',
        subNiche: 'Online Entrepreneurship',
        bio: 'Official digital toolkits, swipe files, and 1-on-1 growth consulting.',
        verified: true,
        avatar: null
      };
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('vyralify_store_products');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'prod_1',
        title: 'The Faceless Page Operating Manual (2026 Edition)',
        price: '₹499',
        type: 'Digital Guide (PDF)',
        description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.',
        cta: 'Get Instant Access',
        paymentUrl: 'https://rzp.io/l/demo-product-1'
      },
      {
        id: 'prod_2',
        title: '150+ Viral Retention Hooks & Pattern Interrupts',
        price: '₹299',
        type: 'Notion Database',
        description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.',
        cta: 'Download Notion Vault',
        paymentUrl: 'https://rzp.io/l/demo-product-2'
      },
      {
        id: 'prod_3',
        title: '1-on-1 Instagram Strategy & Audit Call (30 Min)',
        price: '₹1,999',
        type: 'Consultation (30 Min)',
        description: 'Direct 30-minute private screen-share consultation reviewing content calendar, bio structure, and funnel architecture.',
        cta: 'Book Calendar Slot',
        paymentUrl: 'https://calendly.com'
      }
    ];
  });

  // Track product click per v4 spec (/go/:productId click analytics at zero cost)
  const handleProductClick = (product) => {
    try {
      const clicks = JSON.parse(localStorage.getItem('vyralify_product_clicks') || '[]');
      clicks.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct'
      });
      localStorage.setItem('vyralify_product_clicks', JSON.stringify(clicks));
    } catch (e) {
      console.warn('Click tracking error:', e);
    }

    // Direct to payment URL or open modal
    setActiveProduct(product);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCompleteOrder = () => {
    setPurchaseSuccess(activeProduct);
    setActiveProduct(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#090A0F] text-neutral-100 flex flex-col justify-between selection:bg-[#23E598]/30 selection:text-white font-sans antialiased">
      
      {/* Top Banner Navigation (For preview or back) */}
      <header className="w-full border-b border-white/[0.06] bg-[#0D0F16]/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#23E598] flex items-center justify-center font-bold text-[#090A0F] text-xs">
            V
          </div>
          <span className="text-xs font-semibold tracking-tight text-white">
            vyralify.io/u/{storeData.handle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer border border-white/[0.08]"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#23E598]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="px-3 py-1 rounded-lg bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Link-in-Bio Container (Max 480px, perfectly optimized for mobile phones) */}
      <main className="w-full max-w-md mx-auto px-4 py-8 flex-1 space-y-6">
        
        {/* Creator Identity Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#23E598] to-emerald-400 p-0.5 shadow-xl mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0D0F16] flex items-center justify-center text-2xl font-bold text-white uppercase font-mono">
                {storeData.handle.slice(0, 2)}
              </div>
            </div>
            {storeData.verified && (
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#23E598] text-[#0A0A0A] flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#090A0F]">
                ✓
              </span>
            )}
          </div>

          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>@{storeData.handle}</span>
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#23E598]">
              <span>{storeData.niche}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{storeData.subNiche}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
            {storeData.bio}
          </p>
        </div>

        {/* Success Alert Banner if Purchase Made */}
        {purchaseSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1 animate-in fade-in">
            <div className="font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#23E598]" />
              <span>Order Confirmed!</span>
            </div>
            <p className="text-neutral-300 text-[11px]">
              Access to "{purchaseSuccess.title}" has been authorized. Check your registered email for your 1-hour secure download link.
            </p>
          </div>
        )}

        {/* Product Cards Stack (Mobile-first Link-in-Bio format) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-1">
            <span>Official Resources ({products.length})</span>
            <span className="text-[#23E598]">Instant Delivery</span>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="p-4 rounded-2xl bg-[#0F121C] border border-white/[0.08] hover:border-[#23E598]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between gap-3 active:scale-[0.99]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                    {product.type}
                  </span>
                  <span className="text-sm font-bold font-mono text-[#23E598]">
                    {product.price}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#23E598] transition-colors leading-snug">
                  {product.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#23E598]" />
                  <span>Verified Safe Checkout</span>
                </span>
                <span className="font-semibold text-xs text-[#23E598] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{product.cta || 'Get Access'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Trust & Security Notice */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-neutral-400 text-center space-y-1">
          <p className="font-mono text-[10px] text-neutral-500">
            🔒 Payments processed securely via creator's direct gateway. Vyralify does not store payment cards.
          </p>
        </div>

      </main>

      {/* Product Purchase Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#111420] border border-white/[0.1] rounded-t-2xl sm:rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#23E598] uppercase">Checkout Gateway</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeProduct.title}</h3>
              </div>
              <button
                onClick={() => setActiveProduct(null)}
                className="text-neutral-400 hover:text-white text-lg p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-neutral-400">Total Due</span>
              <span className="text-lg font-bold font-mono text-[#23E598]">{activeProduct.price}</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Upon completing payment on the creator's gateway, an ephemeral 1-hour secure download link is generated and dispatched to your email.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={activeProduct.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCompleteOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveProduct(null)}
                className="w-full py-2 px-3 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Powered by Vyralify Footer */}
      <footer className="w-full py-6 text-center text-[11px] text-neutral-500 border-t border-white/[0.04] bg-[#0A0B10]">
        <div className="flex items-center justify-center gap-1.5">
          <span>Powered by</span>
          <span className="font-bold text-neutral-300">Vyralify</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#23E598]" />
        </div>
        <p className="text-[10px] text-neutral-600 mt-1">
          Launch your own Instagram link-in-bio store &bull; Zero monthly fee
        </p>
      </footer>

    </div>
  );
}
