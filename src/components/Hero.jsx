import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  Plus, 
  Bell, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Film, 
  Play, 
  Target, 
  BarChart3,
  Home,
  Settings,
  Layers,
  Zap,
  Flame,
  ArrowUpRight
} from 'lucide-react';

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
      className="relative w-full min-h-screen flex flex-col justify-start bg-black text-white select-none overflow-x-hidden pt-10 sm:pt-14 lg:pt-16 pb-20"
    >
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelCanvas
          gap={10}
          speed={0.02}
          variant="glow"
          colors={["#D1FE17", "#A3E635", "#38bdf8"]}
          className="w-full h-full opacity-35"
        />
      </div>

      {/* Subtle vignette gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />

      {/* 2. HERO COPY & CTAs (Exact PDF Page 2) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Eyebrow: BUILD. GROW. MONETIZE. */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11190C] border border-[#2B471C] text-[#D1FE17] text-xs font-mono font-bold tracking-[0.24em] uppercase mb-5 sm:mb-6 shadow-[0_0_18px_rgba(209,254,23,0.18)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
          <span>BUILD. GROW. MONETIZE.</span>
        </motion.div>

        {/* Heading: Everything You Need to Build, Grow & Monetize Your Instagram Business */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[74px] font-headline font-bold tracking-[-0.035em] leading-[1.06] text-white max-w-5xl mx-auto mb-5 sm:mb-6"
        >
          Everything You Need to<br className="hidden sm:inline" />
          {' '}
          <span className="text-[#D1FE17] inline-block drop-shadow-[0_0_25px_rgba(209,254,23,0.25)]">
            Build, Grow &amp; Monetize Your Instagram Business
          </span>
        </motion.h1>

        {/* Subheading (Exact copy from PDF Page 2) */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="text-neutral-300 sm:text-neutral-400 font-inter font-normal text-base sm:text-lg lg:text-[18px] leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-9"
        >
          Build and grow your Instagram with Vyralify AI — discover what to post, create
          content that performs, join paid campaigns to clip and earn, and turn your attention
          into revenue.
        </motion.p>

        {/* CTAs: Start Free → & Browse Campaigns (Exact PDF Page 2) */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-7 sm:mb-8"
        >
          {/* Primary CTA: Start Free → */}
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-inter font-bold bg-[#D1FE17] text-black hover:bg-[#bbf00e] active:scale-[0.98] transition-all duration-150 shadow-[0_0_28px_rgba(209,254,23,0.35)] hover:shadow-[0_0_40px_rgba(209,254,23,0.55)] cursor-pointer"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA: Browse Campaigns */}
          <a
            href="#clip-and-earn"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-inter font-semibold bg-[#121216] hover:bg-neutral-800 text-white border border-[#2B2B36] hover:border-neutral-500 transition-all duration-150 cursor-pointer"
          >
            Browse Campaigns
          </a>
        </motion.div>

        {/* Below CTA: [PFPs] Loved by creators, brands and agencies (Exact PDF Page 2) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12 sm:mb-16"
        >
          <div className="flex -space-x-2.5 overflow-hidden shrink-0">
            {avatars.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Creator avatar"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
              />
            ))}
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#1F1F24] ring-2 ring-black font-inter font-bold text-[10px] text-white">
              10K+
            </div>
          </div>
          <span className="text-xs sm:text-sm font-inter font-medium text-neutral-400">
            Loved by creators, brands and agencies
          </span>
        </motion.div>

      </div>

      {/* 3. MAIN VISUAL: REAL VYRALIFY DASHBOARD MOCKUP (Exact PDF Page 3) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Ambient volt glow behind dashboard */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[350px] bg-[#D1FE17]/12 blur-[130px] rounded-full pointer-events-none" />

        {/* Dashboard Outer Container */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-[22px] sm:rounded-[26px] p-2 sm:p-3.5 bg-gradient-to-b from-[#2A2A32] via-[#16161A] to-[#0A0A0C] border border-[#2E2E38] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_45px_rgba(209,254,23,0.09)] backdrop-blur-2xl overflow-hidden"
        >
          
          {/* Dashboard Window Header (Browser Bar) */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#22222A] bg-[#0E0E12]/80 rounded-t-[18px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="text-[11px] font-mono text-neutral-500 ml-2 hidden sm:inline">
                app.vyralify.in/dashboard
              </span>
            </div>
            
            {/* Live Sync Status */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ECOSYSTEM SYNC</span>
            </div>
          </div>

          {/* Dashboard Inner Canvas */}
          <div className="bg-[#09090C] rounded-b-[18px] p-3 sm:p-5 sm:flex gap-5 text-left">
            
            {/* LEFT MINI SIDEBAR */}
            <div className="hidden md:flex flex-col justify-between w-44 shrink-0 border-r border-[#1C1C22] pr-4">
              <div className="space-y-4">
                {/* Logo */}
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="w-6 h-6 rounded-md bg-[#D1FE17] text-black font-black flex items-center justify-center text-xs">
                    V
                  </div>
                  <span className="font-headline font-bold text-sm text-white">Vyralify</span>
                </div>

                {/* Nav Links */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-neutral-800 text-[#D1FE17] font-semibold">
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-2 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Campaigns</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#D1FE17] text-black font-mono font-bold text-[9px]">12</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-[#D1FE17]" />
                    <span>Vyralify AI</span>
                  </div>
                </div>
              </div>

              {/* User badge */}
              <div className="pt-4 border-t border-[#1C1C22] flex items-center gap-2.5 px-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D1FE17] to-emerald-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-[10px] font-bold text-white">
                    AH
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">Ahmad M.</div>
                  <div className="text-[10px] text-neutral-500 truncate">Pro Creator</div>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD CONTENT AREA */}
            <div className="flex-1 space-y-4">
              
              {/* Dashboard Top Header Bar (Greeting + Action) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1C1C22]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-headline font-bold text-white tracking-tight">
                      Good morning, Ahmad 👋
                    </h2>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#16220E] text-[#D1FE17] text-[10px] font-mono font-bold border border-[#2B471C]">
                      Top 2% Creator
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-inter">
                    Let's create something viral today.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141418] border border-[#22222A] text-xs text-neutral-400 w-52">
                    <Search className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Search campaigns...</span>
                    <span className="ml-auto text-[10px] font-mono text-neutral-600 bg-neutral-800 px-1 rounded">⌘K</span>
                  </div>
                  <button 
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D1FE17] text-black font-inter font-bold text-xs hover:bg-[#bbf00e] transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create</span>
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-[#141418] border border-[#22222A] flex items-center justify-center text-neutral-400 relative">
                    <Bell className="w-3.5 h-3.5" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
                  </div>
                </div>
              </div>

              {/* 3 CORE STAT CARDS (Page 3 Mockup) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* CARD 1: Vyralify AI */}
                <div className="p-3.5 rounded-xl bg-[#111115] border border-[#22222A] hover:border-[#D1FE17]/40 transition-colors relative group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#D1FE17]" />
                      <span>Vyralify AI</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Co-Pilot
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mb-1 group-hover:text-[#D1FE17] transition-colors line-clamp-1">
                    Next Recommended Reel 🔥
                  </div>
                  <div className="text-[11px] text-neutral-400 leading-snug mb-3">
                    "Storytelling Reels outperforming by 48%. Try this hook variation..."
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                    <span className="text-[10px] text-[#D1FE17] font-semibold flex items-center gap-1">
                      <span>Generate Script</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">94% Fit</span>
                  </div>
                </div>

                {/* CARD 2: Active Campaigns */}
                <div className="p-3.5 rounded-xl bg-[#111115] border border-[#22222A] hover:border-[#D1FE17]/40 transition-colors relative group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Active Campaigns</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Clipping
                    </span>
                  </div>
                  <div className="text-2xl font-headline font-bold text-white mb-0.5 flex items-baseline gap-2">
                    <span>12</span>
                    <span className="text-[11px] font-normal text-neutral-400">4 brand offers</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mb-3 truncate">
                    Nike ($8/1K) · Spotify ($10/1K) · Gymshark
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                    <span className="text-[10px] text-[#D1FE17] font-semibold flex items-center gap-1">
                      <span>Clip &amp; Earn</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">$5-$12/1K</span>
                  </div>
                </div>

                {/* CARD 3: Total Earnings */}
                <div className="p-3.5 rounded-xl bg-[#111115] border border-[#22222A] hover:border-[#D1FE17]/40 transition-colors relative group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold">
                      <DollarSign className="w-3.5 h-3.5 text-[#D1FE17]" />
                      <span>Total Earnings</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#D1FE17]/10 text-[#D1FE17] border border-[#D1FE17]/30">
                      +28.4%
                    </span>
                  </div>
                  <div className="text-2xl font-headline font-bold text-white mb-0.5 flex items-baseline gap-2">
                    <span>$1,240</span>
                    <span className="text-[10px] font-mono text-neutral-400 font-normal">this month</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mb-3 truncate">
                    182,420 Verified Views tracked
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Ready for Payout</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">Auto-payout</span>
                  </div>
                </div>

              </div>

              {/* LOWER LIVE ACTIVITY BAR IN MOCKUP */}
              <div className="p-3.5 rounded-xl bg-[#111115] border border-[#22222A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D1FE17]">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Nike Spring Launch · Clip #04</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold">
                        Verified
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      48,290 Views generated · Earned +$48.20
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[11px] text-neutral-400 font-inter">Live campaign progress</span>
                  <div className="w-28 sm:w-36 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D1FE17] to-emerald-400 rounded-full w-[76%]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D1FE17]">76%</span>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

        {/* 4. ANNOTATED THREE FEATURE CALLOUTS (Direct from PDF Page 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 sm:pt-8 text-center max-w-4xl mx-auto">
          
          {/* Callout 1: Create with AI */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0F0F14]/90 border border-neutral-800/80 text-xs font-inter font-semibold text-neutral-300 shadow-sm hover:border-[#D1FE17]/50 hover:text-white transition-colors">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[#D1FE17]">Create with AI</span>
            <span className="text-neutral-500">↗</span>
          </div>

          {/* Callout 2: Join campaigns & clip */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0F0F14]/90 border border-neutral-800/80 text-xs font-inter font-semibold text-neutral-300 shadow-sm hover:border-[#D1FE17]/50 hover:text-white transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D1FE17]">Join campaigns &amp; clip</span>
            <span className="text-neutral-500">↗</span>
          </div>

          {/* Callout 3: Track your earnings */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0F0F14]/90 border border-neutral-800/80 text-xs font-inter font-semibold text-neutral-300 shadow-sm hover:border-[#D1FE17]/50 hover:text-white transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#D1FE17] animate-pulse" />
            <span className="text-[#D1FE17]">Track your earnings</span>
            <span className="text-neutral-500">↗</span>
          </div>

        </div>

      </div>

    </section>
  );
}
