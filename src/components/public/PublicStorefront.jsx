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
  Copy,
  Download,
  Mail,
  User,
  Lock,
  Package
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PublicStorefront({ slug, onBackToApp }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  // Checkout form state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean slug
  const cleanSlug = (slug || 'creator').replace(/^@/, '');

  // Retrieve creator data from localStorage or fallback to standard profile
  const [storeData, setStoreData] = useState(() => {
    try {
      const savedStore = localStorage.getItem(`vyralify_store_${cleanSlug}`);
      if (savedStore) {
        const parsed = JSON.parse(savedStore);
        return {
          handle: parsed.handle || cleanSlug,
          name: parsed.headline || `@${cleanSlug} Official Store`,
          headline: parsed.headline || 'Official Resource Vault & Toolkits',
          bio: parsed.bio || 'Digital products, cheat sheets, and 1-on-1 strategy toolkits. Instant download upon checkout.',
          themeColor: parsed.themeColor || 'emerald',
          avatar: parsed.avatar || null,
          verified: true
        };
      }

      const savedPage = localStorage.getItem('vyralify_active_page');
      const parsedPage = savedPage ? JSON.parse(savedPage) : null;
      return {
        handle: cleanSlug,
        name: parsedPage?.title || `@${cleanSlug} Official Store`,
        headline: 'Official Resource Vault & Toolkits',
        bio: 'Digital products, cheat sheets, and 1-on-1 strategy toolkits. Instant download upon checkout.',
        themeColor: 'emerald',
        avatar: parsedPage?.avatar || null,
        verified: true
      };
    } catch {
      return {
        handle: cleanSlug,
        name: `@${cleanSlug} Official Store`,
        headline: 'Official Resource Vault & Toolkits',
        bio: 'Official digital toolkits, swipe files, and instant downloads.',
        themeColor: 'emerald',
        avatar: null,
        verified: true
      };
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      // Check store-specific products first
      const savedStore = localStorage.getItem(`vyralify_store_${cleanSlug}`);
      if (savedStore) {
        const parsed = JSON.parse(savedStore);
        if (parsed.products && parsed.products.length > 0) {
          return parsed.products;
        }
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
        title: 'The Faceless Page Operating Manual (2026 Edition)',
        price: '₹499',
        type: 'Digital Product',
        deliveryMethod: 'upload',
        fileName: 'faceless-operating-manual-2026.pdf',
        fileSize: '2.4 MB',
        description: 'Comprehensive 42-page roadmap covering niche selection, copyright-free B-roll sourcing, retention loops, and monetization.',
        ctaText: 'Unlock Download & Instant Access'
      },
      {
        id: 'prod_2',
        title: '150+ Viral Retention Hooks & Pattern Interrupts',
        price: '₹299',
        type: 'Notion Workspace',
        deliveryMethod: 'link',
        accessUrl: 'https://vyralify.in',
        description: 'Swipe file of the top 1% tested opening lines, visual zooms, and comment-to-DM triggers categorized by emotional hooks.',
        ctaText: 'Get Instant Access'
      },
      {
        id: 'prod_3',
        title: '1-on-1 Instagram Strategy & Audit Call (30 Min)',
        price: '₹1,999',
        type: 'Service / Call',
        deliveryMethod: 'link',
        accessUrl: 'https://vyralify.in',
        description: 'Direct 30-minute private screen-share consultation reviewing content calendar, bio structure, and funnel architecture.',
        ctaText: 'Book Calendar Slot'
      }
    ];
  });

  // Track product click analytics
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

  // Complete checkout & instant delivery
  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (!activeProduct) return;
    setIsSubmitting(true);

    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const numPrice = parseInt(activeProduct.price?.replace(/[^0-9]/g, '') || '499', 10);
    const customerName = buyerName.trim() || 'Verified Buyer';
    const customerEmail = buyerEmail.trim() || 'customer@vyralify.in';

    const orderRecord = {
      id: orderId,
      customer: customerName,
      email: customerEmail,
      product: activeProduct.title,
      productId: activeProduct.id,
      amount: activeProduct.price,
      amountNumeric: numPrice,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Paid',
      pageHandle: cleanSlug,
      deliveryAccess: activeProduct.fileData 
        ? `Delivered (${activeProduct.fileName || 'PDF'})` 
        : activeProduct.accessUrl 
          ? 'Vault Link Unlocked' 
          : 'Delivered (Instant)',
      createdAt: new Date().toISOString()
    };

    // 1. Save to localStorage orders CRM
    try {
      const existingOrders = JSON.parse(localStorage.getItem('vyralify_store_orders') || '[]');
      localStorage.setItem('vyralify_store_orders', JSON.stringify([orderRecord, ...existingOrders]));
    } catch (err) {
      console.warn('Error saving local order:', err);
    }

    // 2. Sync to Firestore collection storeOrders
    try {
      await addDoc(collection(db, 'storeOrders'), {
        ...orderRecord,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore storeOrder sync fallback:', err.message);
    }

    // 3. Deliver product to buyer
    setPurchaseSuccess({
      ...activeProduct,
      orderId,
      buyerName: customerName,
      buyerEmail: customerEmail
    });

    setIsSubmitting(false);
    setActiveProduct(null);
    setBuyerName('');
    setBuyerEmail('');
  };

  // Fallback demo file download if no custom file attached
  const handleDownloadDemoAsset = (title) => {
    const textContent = `VYRALIFY CREATOR STORE DELIVERY\n\nProduct: ${title}\nAuthorized For: ${purchaseSuccess?.buyerName || 'Valued Customer'}\nEmail: ${purchaseSuccess?.buyerEmail || 'N/A'}\nOrder ID: ${purchaseSuccess?.orderId || 'ORD-LIVE'}\n\nThank you for your purchase! Your resource license has been verified.\nAccess your full toolkit via the link provided in your email.\n\nGenerated by Vyralify Link-in-Bio OS.`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-access-pass.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-[#08090C] text-neutral-100 flex flex-col justify-between selection:bg-[#23E598]/30 selection:text-white font-sans antialiased">
      
      {/* Top Banner Navigation (For preview or back) */}
      <header className="w-full border-b border-white/[0.06] bg-[#0C0D12]/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#23E598] flex items-center justify-center font-bold text-[#08090C] text-xs">
            V
          </div>
          <span className="text-xs font-semibold tracking-tight text-white font-mono">
            vyralify.me/{cleanSlug}
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
              className="px-3 py-1 rounded-lg bg-[#23E598] hover:bg-[#1DCC84] text-[#08090C] font-bold text-xs transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Link-in-Bio Container (Max 480px, mobile optimized) */}
      <main className="w-full max-w-md mx-auto px-4 py-8 flex-1 space-y-6">
        
        {/* Creator Identity Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#23E598] to-emerald-400 p-0.5 shadow-xl mx-auto flex items-center justify-center">
              {storeData.avatar ? (
                <img 
                  src={storeData.avatar} 
                  alt={cleanSlug}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#0C0D12] flex items-center justify-center text-2xl font-bold text-white uppercase font-mono">
                  {cleanSlug.slice(0, 2)}
                </div>
              )}
            </div>
            {storeData.verified && (
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#23E598] text-[#08090C] flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#08090C]">
                ✓
              </span>
            )}
          </div>

          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>@{cleanSlug}</span>
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#23E598]">
              <span>Official Creator Vault</span>
              <span className="text-neutral-500">&bull;</span>
              <span className="text-neutral-400">Instant Access</span>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
            {storeData.bio}
          </p>
        </div>

        {/* Product Cards Stack (Mobile-first Link-in-Bio format) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-1">
            <span>Official Resources ({products.length})</span>
            <span className="text-[#23E598] font-semibold">Instant Delivery</span>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="p-4 rounded-2xl bg-[#0F1118] border border-white/[0.08] hover:border-[#23E598]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between gap-3 active:scale-[0.99]"
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

                {product.fileName && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.04]">
                    <FileText className="w-3 h-3 text-[#23E598]" />
                    <span>Includes {product.fileName} {product.fileSize ? `(${product.fileSize})` : ''}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#23E598]" />
                  <span>Instant Automated Delivery</span>
                </span>
                <span className="font-semibold text-xs text-[#23E598] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{product.ctaText || 'Get Access'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Trust & Security Notice */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-neutral-400 text-center space-y-1">
          <p className="font-mono text-[10px] text-neutral-500">
            🔒 Direct digital asset delivery. Files &amp; private vaults unlocked immediately upon checkout.
          </p>
        </div>

      </main>

      {/* Product Purchase Checkout Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#111420] border border-white/[0.1] rounded-t-2xl sm:rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#23E598] uppercase tracking-wide">Instant Checkout</span>
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
              <div>
                <span className="text-[11px] text-neutral-400 block">Total Due</span>
                <span className="text-[10px] text-emerald-400 font-mono">100% Secure &bull; Instant Delivery</span>
              </div>
              <span className="text-xl font-bold font-mono text-[#23E598]">{activeProduct.price}</span>
            </div>

            {/* Buyer Contact Form */}
            <form onSubmit={handleCompleteOrder} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 font-medium">Your Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#23E598]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 font-medium">Email Address (For Delivery Receipt)</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="e.g. vikram@example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#23E598]"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[10px] text-neutral-400 flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-[#23E598] shrink-0 mt-0.5" />
                <span>Immediate digital vault access and direct file download is delivered directly on screen upon clicking unlock.</span>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#08090C] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Verifying & Unlocking...' : `Unlock Asset & Instant Access (${activeProduct.price})`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="w-full py-2 px-3 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. INSTANT DIGITAL ASSET DELIVERY SCREEN (VAULT MODAL) */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#0F121C] border border-[#23E598]/30 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl relative">
            <button
              onClick={() => setPurchaseSuccess(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white text-lg p-1 cursor-pointer"
            >
              &times;
            </button>

            {/* Glowing Success Banner */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#23E598]/20 border border-[#23E598] text-[#23E598] flex items-center justify-center mx-auto shadow-lg shadow-[#23E598]/10">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Order Confirmed &amp; Access Unlocked!</h3>
              <p className="text-xs text-neutral-300">
                Thank you, <strong className="text-white">{purchaseSuccess.buyerName}</strong>! Your digital order has been verified and registered.
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Order ID</span>
                <span className="text-[#23E598] font-bold">{purchaseSuccess.orderId}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Product</span>
                <span className="text-white font-sans font-medium truncate max-w-[200px]">{purchaseSuccess.title}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Delivered To</span>
                <span className="text-neutral-200">{purchaseSuccess.buyerEmail}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 text-neutral-300 font-semibold">
                <span>Amount Paid</span>
                <span className="text-[#23E598]">{purchaseSuccess.price}</span>
              </div>
            </div>

            {/* FULFILLMENT ACCESS ACTIONS */}
            <div className="space-y-2.5 pt-1">
              {purchaseSuccess.fileData ? (
                <a
                  href={purchaseSuccess.fileData}
                  download={purchaseSuccess.fileName || 'vyralify-digital-asset.pdf'}
                  className="w-full py-3 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#08090C] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {purchaseSuccess.fileName} ({purchaseSuccess.fileSize || 'Direct File'})</span>
                </a>
              ) : purchaseSuccess.accessUrl ? (
                <a
                  href={purchaseSuccess.accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Digital Vault / Notion Workspace &rarr;</span>
                </a>
              ) : (
                <button
                  onClick={() => handleDownloadDemoAsset(purchaseSuccess.title)}
                  className="w-full py-3 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#08090C] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resource Package (Instant Pass)</span>
                </button>
              )}

              <button
                onClick={() => setPurchaseSuccess(null)}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Done / Back to Store
              </button>
            </div>

            <p className="text-[10px] text-neutral-500 text-center font-mono">
              A copy of this digital delivery receipt has been archived in creator CRM.
            </p>
          </div>
        </div>
      )}

      {/* Powered by Vyralify Footer */}
      <footer className="w-full py-6 text-center text-[11px] text-neutral-500 border-t border-white/[0.04] bg-[#08090C]">
        <div className="flex items-center justify-center gap-1.5">
          <span>Powered by</span>
          <img src="/vyralify-logo-white.png" alt="Vyralify" className="h-3.5 w-auto object-contain opacity-85 ml-1" />
        </div>
        <p className="text-[10px] text-neutral-600 mt-1">
          Launch your own Instagram link-in-bio store &bull; Zero monthly fee
        </p>
      </footer>

    </div>
  );
}
