import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { 
  ArrowRight, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Star,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function Hero() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  ];

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[100dvh] flex flex-col justify-between items-center bg-black text-white overflow-hidden select-none"
    >
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND (Preserved exactly as requested) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelCanvas
          gap={8}
          speed={0.025}
          variant="glow"
          colors={["#D1FE17", "#A3E635", "#38bdf8", "#22d3ee"]}
          className="w-full h-full opacity-70"
        />
      </div>

      {/* Subtle vignette gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />

      {/* 2. HERO CORE CONTENT (Exact locked copy from master specification) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none my-auto pt-8 sm:pt-12 pb-6">
        
        {/* Eyebrow: BUILD. GROW. MONETIZE. */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11190B]/90 border border-[#273B17] text-[#D1FE17] text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-5 backdrop-blur-md pointer-events-auto shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
          <span>BUILD. GROW. MONETIZE.</span>
        </motion.div>

        {/* Heading: Everything You Need to Build, Grow & Monetize Your Instagram Business */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-display font-extrabold text-white tracking-[-0.035em] leading-[1.08] max-w-4xl mx-auto">
          Everything You Need to Build, Grow &amp; <span className="text-[#D1FE17]">Monetize</span> Your Instagram Business
        </h1>

        {/* Subheading */}
        <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mt-5 sm:mt-6 tracking-[-0.01em]">
          Build and grow your Instagram with Vyralify AI — discover what to post, create content that performs, join paid campaigns to clip and earn, and turn your attention into revenue.
        </p>

        {/* CTAs: Start Free → | Browse Campaigns */}
        <div className="pt-7 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 pointer-events-auto">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.97] transition-all font-sans shadow-lg shadow-[#D1FE17]/15 cursor-pointer"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <a
            href="#clip-and-earn"
            className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm"
          >
            Browse Campaigns
          </a>
        </div>

        {/* Below CTA: [PFPs] Loved by creators, brands and agencies */}
        <div className="pt-6 flex items-center justify-center gap-3 pointer-events-auto">
          <div className="flex -space-x-2 overflow-hidden">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Creator avatar"
                className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-black object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
            <div className="flex items-center text-[#D1FE17]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-neutral-300 font-sans text-xs">
              Loved by creators, brands and agencies
            </span>
          </div>
        </div>

        {/* REAL VYRALIFY DASHBOARD MOCKUP (Main Visual from Master Doc) */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-2xl p-4 sm:p-5 bg-[#0C0D12]/90 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto text-left backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="text-[11px] font-mono text-neutral-400 ml-2">app.vyralify.io/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D1FE17] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D1FE17] font-semibold">AI Engine Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Tile 1: AI Co-Pilot Recommendation */}
            <div className="p-3.5 rounded-xl bg-[#12141D] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#D1FE17]" />
                  Vyralify AI Co-Pilot
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#16220E] text-[#D1FE17] border border-[#2B471C]">
                  +48.2%
                </span>
              </div>
              <p className="text-xs text-white font-medium mb-2">
                Post this Reel format next 🔥
              </p>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                Your storytelling Reels are outperforming your other formats. 3 new hook variations generated.
              </p>
              <span className="text-[10px] font-mono text-[#D1FE17] hover:underline flex items-center gap-1 cursor-pointer">
                View Variations →
              </span>
            </div>

            {/* Tile 2: Active Brand Campaign Escrow */}
            <div className="p-3.5 rounded-xl bg-[#12141D] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Live Campaign Pool
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#12222E] text-[#38BDF8] border border-[#1E3E58]">
                  Verified
                </span>
              </div>
              <div className="text-xs text-white font-bold mb-0.5">
                Superhuman AI Founder Series
              </div>
              <div className="text-sm font-mono font-bold text-[#D1FE17] mb-1">
                $5.00 <span className="text-[10px] text-neutral-400 font-normal">/ 1K Views</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono text-neutral-400">
                <span>Verified Views: <strong className="text-white">12,400</strong></span>
                <span className="text-emerald-400 font-semibold">Join Campaign →</span>
              </div>
            </div>

            {/* Tile 3: Creator Wallet & Instant Cashouts */}
            <div className="p-3.5 rounded-xl bg-[#12141D] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Creator Wallet
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#102418] text-emerald-400 border border-[#1B422B]">
                  Instant
                </span>
              </div>
              <div className="text-xl font-mono font-bold text-white mb-0.5">
                ₹1,28,450.00
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                Available for withdrawal. 0% platform fee on clipping bounties.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono">
                <span className="text-neutral-500">UPI / Bank / Stripe</span>
                <span className="text-[#D1FE17] font-semibold">Instant Cashout →</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM VIEWPORT ANCHOR: 4 EXACT METRICS FROM MASTER SPECIFICATION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 pt-4 border-t border-white/[0.07] pointer-events-auto shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">900M+</span>
            <span className="text-xs text-neutral-400 font-sans mt-0.5">Combined Views</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">10K+</span>
            <span className="text-xs text-neutral-400 font-sans mt-0.5">Creators</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-mono font-bold text-[#D1FE17]">$500K+</span>
            <span className="text-xs text-neutral-400 font-sans mt-0.5">Creator Earnings</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">1M+</span>
            <span className="text-xs text-neutral-400 font-sans mt-0.5">Pieces of Content</span>
          </div>
        </div>
      </div>

    </section>
  );
}
