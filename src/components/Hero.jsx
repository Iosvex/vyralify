import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  ];

  return (
    <section 
      id="hero-section" 
      className="relative w-full min-h-screen flex flex-col justify-start bg-black text-white select-none overflow-x-hidden pt-8 sm:pt-12 lg:pt-16 pb-24"
    >
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelCanvas
          gap={10}
          speed={0.02}
          variant="glow"
          colors={["#3CEB75", "#D1FE17", "#38bdf8"]}
          className="w-full h-full opacity-30"
        />
      </div>

      {/* Subtle vignette gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />

      {/* 2. HERO COPY & CTAs (Exact PDF Page 2) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Eyebrow: BUILD. GROW. MONETIZE. */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11190C] border border-[#2B471C] text-[#3CEB75] text-xs font-mono font-bold tracking-[0.24em] uppercase mb-5 shadow-[0_0_15px_rgba(60,235,117,0.18)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3CEB75] animate-pulse" />
          <span>BUILD. GROW. MONETIZE.</span>
        </motion.div>

        {/* Heading: Everything You Need to Build, Grow & Monetize Your Instagram Business */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-headline font-bold tracking-[-0.035em] leading-[1.08] text-white max-w-4xl mx-auto mb-5"
        >
          Everything You Need to<br className="hidden sm:inline" />
          {' '}
          <span className="text-[#3CEB75] drop-shadow-[0_0_25px_rgba(60,235,117,0.25)]">
            Build, Grow &amp; Monetize Your Instagram Business
          </span>
        </motion.h1>

        {/* Subheading (Exact copy from PDF Page 2) */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-neutral-400 font-inter font-normal text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Build and grow your Instagram with Vyralify AI — discover what to post, create
          content that performs, join paid campaigns to clip and earn, and turn your attention
          into revenue.
        </motion.p>

        {/* CTAs: Start Free → & Browse Campaigns (Exact PDF Page 2) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-7"
        >
          {/* Primary CTA: Start Free → */}
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-inter font-bold bg-[#3CEB75] hover:bg-[#34D368] text-black active:scale-[0.98] transition-all duration-150 shadow-[0_0_25px_rgba(60,235,117,0.35)] hover:shadow-[0_0_35px_rgba(60,235,117,0.5)] cursor-pointer"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA: Browse Campaigns */}
          <a
            href="#clip-and-earn"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-2xl text-base font-inter font-medium bg-black hover:bg-neutral-900 text-white border border-[#2B2B33] hover:border-neutral-500 transition-all duration-150 cursor-pointer"
          >
            Browse Campaigns
          </a>
        </motion.div>

        {/* Below CTA: [PFPs] Loved by creators, brands and agencies */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
        >
          <div className="flex -space-x-2 overflow-hidden shrink-0">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Creator avatar"
                className="inline-block h-7 w-7 rounded-full ring-2 ring-black object-cover"
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-inter font-medium text-neutral-400">
            Loved by creators, brands and agencies
          </span>
        </motion.div>

      </div>

      {/* 3. MAIN VISUAL: EXACT TILTED VYRALIFY DASHBOARD MOCKUP (PDF Page 3 & Reference) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        
        {/* Soft emerald/green glow aura behind dashboard */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[720px] sm:w-[920px] h-[300px] bg-[#3CEB75]/15 blur-[140px] rounded-full pointer-events-none" />

        {/* The Exact Tilted Dashboard Mockup Image with annotations */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="relative w-full flex items-center justify-center select-none"
        >
          <img
            src="/dashboard-mockup-2x.png"
            srcSet="/dashboard-mockup.png 1x, /dashboard-mockup-2x.png 2x"
            alt="Vyralify Dashboard - Good morning, Ahmad"
            className="w-full h-auto max-w-[960px] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
          />
        </motion.div>

      </div>

    </section>
  );
}
