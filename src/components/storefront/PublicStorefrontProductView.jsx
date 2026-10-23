'use client';

import React, { useState } from 'react';
import { 
  Star, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Zap, 
  Smartphone, 
  Monitor, 
  ArrowRight,
  Share2,
  Check,
  X
} from 'lucide-react';
import { sanitizeProductDescription } from '../../lib/sanitizer/purifier';

/**
 * Beacons-Style Creator Public Storefront Product View
 * Specification: Blueprint Section 5 (5.1 Layout, 5.2 Purifier, 5.3 Dynamic Modules, 5.4 Payments)
 */
export function PublicStorefrontProductView({ 
  product: initialProduct,
  onClose,
  isEmbedded = false
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' (390px x 844px) | 'responsive'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState('stripe'); // 'stripe' | 'razorpay' | 'upi'
  const [isCopied, setIsCopied] = useState(false);

  // Default product details per blueprint Section 5.1 & 5.3
  const product = initialProduct || {
    storeName: '@creator_handle',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    creatorBio: 'Digital Creator & Monetization Strategist • 240K+ followers',
    title: 'Ultimate Reels Growth Guide 2025',
    currencySymbol: '$',
    price: '29.00',
    comparePrice: '89.00',
    rating: 5.0,
    reviewCount: 128,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        title: 'Course Teaser Video / Masterclass'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        title: 'Viral Hook Vault & Retention Blueprints'
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        title: '30-Day Growth Dashboard & Notion Template'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: `
      <p>Master the exact algorithm mechanisms behind <b>10M+ organic Reel impressions</b> without burning thousands on ads.</p>
      <br/>
      <p><b>What is included inside this instant access vault:</b></p>
      <ul>
        <li><b>12 High-Retention Hook Archetypes:</b> 3-second pattern interrupts tested across 500+ viral reels.</li>
        <li><b>Retention Curve Blueprints:</b> Stop the 3-second viewer drop-off and push past 200 views.</li>
        <li><b>Beacons-Style Storefront Funnel:</b> How to convert casual reel viewers into paying digital customers.</li>
        <li><b>Notion Viral Planner:</b> 30-day scheduled content sprint with pre-filled script templates.</li>
      </ul>
    `,
    faqs: [
      {
        question: 'How do I access the products after purchase?',
        answer: 'You will receive immediate access on this screen plus an email receipt with direct download links and private Notion vault access.'
      },
      {
        question: 'Does this work for newly created or low-follower accounts?',
        answer: 'Yes! The 3-second retention law applies regardless of follower count. Even pages with <500 followers use these hooks to trigger algorithm distribution.'
      },
      {
        question: 'What currency and payment methods are supported?',
        answer: 'We support Stripe Direct (Cards, Apple Pay, Google Pay), Razorpay Custom, and UPI Direct (Instant PhonePe, Google Pay, Paytm).'
      },
      {
        question: 'Is there a money-back guarantee?',
        answer: 'Yes, we offer a 100% 14-day risk-free money-back guarantee if you are not fully satisfied with your results.'
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
      },
      {
        name: 'Aarav Mehta',
        handle: '@aaravfin',
        rating: 5,
        date: '2 weeks ago',
        text: 'Zero fluff, pure actionable framework. Converted 14 ebook sales from my bio link in 48 hours.',
        verified: true
      }
    ]
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const currentMedia = product.media?.[activeMediaIndex] || { url: product.coverImage };

  return (
    <div className={`relative w-full ${isEmbedded ? '' : 'min-h-screen bg-[#F0F6FE] py-6 px-4'}`}>
      
      {/* Viewport standard toggle for dashboard builder mode */}
      {!isEmbedded && (
        <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between bg-white/80 backdrop-blur-md p-3 px-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#067CF9]" />
            <h3 className="text-xs font-bold text-slate-900">Beacons-Style Product Storefront Preview</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#067CF9] border border-blue-100 font-medium">
              Standard Viewport: 390px × 844px
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition cursor-pointer ${
                  viewMode === 'mobile' ? 'bg-white text-[#067CF9] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (390px)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('responsive')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition cursor-pointer ${
                  viewMode === 'responsive' ? 'bg-white text-[#067CF9] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Full</span>
              </button>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                title="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Frame Container */}
      <div className={`mx-auto transition-all duration-300 ${
        viewMode === 'mobile' 
          ? 'w-[390px] min-h-[844px] bg-white rounded-[40px] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative' 
          : 'max-w-md w-full min-h-screen bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative'
      }`}>
        
        {/* Mobile Dynamic Island / Notch */}
        {viewMode === 'mobile' && (
          <div className="w-full pt-3 pb-1 flex justify-center bg-white sticky top-0 z-50">
            <div className="w-28 h-4 bg-slate-950 rounded-full" />
          </div>
        )}

        {/* Public Storefront Content */}
        <div className="relative pb-28">
          
          {/* Header Profile Module (Blueprint Section 5.1 & 5.3) */}
          <div className="p-6 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white relative">
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-[#067CF9] transition shadow-xs"
              title="Share Link"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Profile Avatar: 96px Circle */}
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 border-[3px] border-[#067CF9] mb-3 overflow-hidden shadow-md">
              <img 
                src={product.creatorAvatar} 
                alt="Creator Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>

            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              {product.storeName}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              {product.creatorBio}
            </p>
          </div>

          {/* Media Carousel Container (16:9 Aspect Ratio) */}
          <div className="w-full aspect-video bg-slate-100 overflow-hidden relative group">
            <img 
              src={currentMedia.url} 
              alt={currentMedia.title || "Product Media"} 
              className="w-full h-full object-cover transition-transform duration-500" 
            />

            {/* Carousel navigation controls */}
            {product.media && product.media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : product.media.length - 1))}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition shadow-xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaIndex((prev) => (prev < product.media.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition shadow-xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {product.media.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeMediaIndex === idx ? 'w-5 bg-[#067CF9]' : 'w-1.5 bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Main Info */}
          <div className="p-5 space-y-4">
            
            {/* Star Rating Module */}
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-slate-800 ml-1 font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount} Reviews)</span>
            </div>

            {/* Product Title */}
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h2>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-[#067CF9]">
                {product.currencySymbol}{product.price}
              </span>
              {product.comparePrice && (
                <span className="text-sm font-semibold text-slate-400 line-through">
                  {product.currencySymbol}{product.comparePrice}
                </span>
              )}
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 ml-auto">
                67% OFF
              </span>
            </div>

            {/* Sanitized Rich Text Description (Blueprint Section 5.2) */}
            <div 
              className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-100"
              dangerouslySetInnerHTML={{ __html: sanitizeProductDescription(product.description) }}
            />

            {/* Dynamic Verified Reviews Module */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-900">Verified Customer Reviews</h3>
                  <span className="text-[11px] text-[#067CF9] font-medium">100% Authentic</span>
                </div>
                <div className="space-y-2.5">
                  {product.reviews.map((rev, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{rev.name}</span>
                          {rev.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 text-amber-400 mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic FAQ Accordion Module (Blueprint Section 5.3) */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 mb-2.5">Frequently Asked Questions</h3>
                <div className="space-y-2">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-3 text-left text-xs font-semibold text-slate-800 flex justify-between items-center bg-slate-50/60 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="p-3 text-[11px] text-slate-600 bg-white border-t border-slate-100 leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Bottom CTA (Blueprint Section 5.1 & 5.3) */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50">
            <button 
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 bg-[#067CF9] hover:bg-[#0063D1] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Get Instant Access - {product.currencySymbol}{product.price}</span>
            </button>
          </div>

        </div>

        {/* Multi-Currency Payment Orchestration Modal (Blueprint Section 5.4) */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#067CF9]" />
                  <h3 className="font-bold text-slate-900 text-sm">Secure Checkout</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order summary */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900">{product.title}</div>
                <div className="text-slate-500 text-[11px]">{product.storeName}</div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
                  <span>Total Amount</span>
                  <span className="text-[#067CF9] text-sm">{product.currencySymbol}{product.price}</span>
                </div>
              </div>

              {/* Payment Gateway Options (Blueprint Section 5.4) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment Method
                </label>
                
                {/* Stripe Direct */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('stripe')}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                    selectedGateway === 'stripe' ? 'border-[#067CF9] bg-blue-50/50 text-[#067CF9] font-bold' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#067CF9]" />
                    <div>
                      <div>Stripe Direct (Global)</div>
                      <div className="text-[10px] text-slate-400 font-normal">Cards, Apple Pay, Google Pay</div>
                    </div>
                  </div>
                  {selectedGateway === 'stripe' && <Check className="w-4 h-4 text-[#067CF9]" />}
                </button>

                {/* Razorpay Custom */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('razorpay')}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                    selectedGateway === 'razorpay' ? 'border-[#067CF9] bg-blue-50/50 text-[#067CF9] font-bold' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#067CF9]" />
                    <div>
                      <div>Razorpay Custom (India)</div>
                      <div className="text-[10px] text-slate-400 font-normal">UPI, NetBanking, Cards, Wallets</div>
                    </div>
                  </div>
                  {selectedGateway === 'razorpay' && <Check className="w-4 h-4 text-[#067CF9]" />}
                </button>

                {/* UPI Direct */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('upi')}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                    selectedGateway === 'upi' ? 'border-[#067CF9] bg-blue-50/50 text-[#067CF9] font-bold' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#067CF9]" />
                    <div>
                      <div>UPI Direct (Instant)</div>
                      <div className="text-[10px] text-slate-400 font-normal">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  {selectedGateway === 'upi' && <Check className="w-4 h-4 text-[#067CF9]" />}
                </button>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={() => {
                  alert(`Connecting to ${selectedGateway.toUpperCase()} payment engine...`);
                  setIsCheckoutOpen(false);
                }}
                className="w-full py-3 bg-[#067CF9] hover:bg-[#0063D1] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Pay {product.currencySymbol}{product.price} via {selectedGateway.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted • T+1 Direct Settlement</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default PublicStorefrontProductView;
