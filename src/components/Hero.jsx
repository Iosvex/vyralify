import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-[100dvh] flex flex-col justify-between items-center bg-black text-white overflow-hidden select-none"
    >
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND */}
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      {/* Spacer for Floating Island Navbar */}
      <div className="h-20 sm:h-24 shrink-0" />

      {/* 2. HERO CORE CONTENT (1 Topic - Viewport Balanced) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-none my-auto py-2 sm:py-4">
        
        {/* Eyebrow Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12160E]/90 border border-[#27381C] text-[#D1FE17] text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 sm:mb-5 backdrop-blur-xs pointer-events-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
          <span>INSTANT ESCROW SETTLEMENT • 0% PLATFORM TAKE RATE</span>
        </motion.div>

        {/* Main Clean Headline (CreatorFlow Typography - Sized & Calibrated) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-display font-extrabold text-white tracking-[-0.035em] leading-[1.06]">
          Turn <span className="text-[#D1FE17] font-script text-[1.15em] font-normal inline-block mx-1">viral</span> views into <br className="hidden sm:inline" />
          automated creator revenue
        </h1>

        {/* Clean Subtitle */}
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto mt-4 sm:mt-5 tracking-[-0.01em]">
          Monetize your content faster with integrated tools, <br className="hidden sm:inline" />
          real-time analytics, and instant cashouts.
        </p>

        {/* CTA Actions */}
        <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.97] transition-all font-sans shadow-lg shadow-[#D1FE17]/15 cursor-pointer"
          >
            CREATE ACCOUNT
          </motion.a>

          <a
            href="#social-proof"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white px-4 py-2 transition-colors cursor-pointer"
          >
            <span>Explore Live Ledger</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D1FE17]" />
          </a>
        </div>

      </div>

      {/* 3. BOTTOM VIEWPORT ANCHOR (Eliminates the empty black void & frames the 100vh topic) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 pt-3 border-t border-white/[0.07] pointer-events-auto shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D1FE17] animate-pulse" />
            <span className="text-white font-bold font-sans text-xs sm:text-sm">$128,450</span>
            <span className="text-neutral-500 text-[11px]">Paid Out</span>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-white font-bold font-sans text-xs sm:text-sm">4,890</span>
            <span className="text-neutral-500 text-[11px]">Active Sync</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold font-sans text-xs sm:text-sm">&lt; 90 sec</span>
            <span className="text-neutral-500 text-[11px]">UPI Settlement</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D1FE17]" />
            <span className="text-[#D1FE17] font-bold font-sans text-xs sm:text-sm">0% Fee</span>
            <span className="text-neutral-500 text-[11px]">On First ₹50K</span>
          </div>

          <a 
            href="#social-proof" 
            className="hidden lg:flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
          >
            <span>Ledger</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D1FE17] animate-bounce" />
          </a>
        </div>
      </div>

    </section>
  );
}
