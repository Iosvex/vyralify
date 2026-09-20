import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { 
  ArrowRight, 
  Home, 
  Sparkles, 
  Megaphone, 
  BarChart2, 
  Wallet, 
  Search, 
  TrendingUp 
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

      {/* 2. HERO COPY & CTAs (Exact PDF Page 2 & User Image) */}
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

        {/* Subheading */}
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

        {/* CTAs: Start Free → & Browse Campaigns */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-7"
        >
          {/* Primary CTA */}
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-inter font-bold bg-[#3CEB75] hover:bg-[#34D368] text-black active:scale-[0.98] transition-all duration-150 shadow-[0_0_25px_rgba(60,235,117,0.35)] hover:shadow-[0_0_35px_rgba(60,235,117,0.5)] cursor-pointer"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA */}
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
          className="flex items-center justify-center gap-3 mb-10 sm:mb-12"
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

      {/* 3. MAIN VISUAL: EXACT VYRALIFY DASHBOARD MOCKUP (PDF Page 3 & User Screenshot) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        
        {/* Soft emerald/green glow aura behind dashboard */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[720px] h-[260px] bg-[#3CEB75]/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Dashboard Frame (Exact match to screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="relative w-full rounded-[28px] p-5 sm:p-6 bg-[#0B0C0E]/95 border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(60,235,117,0.08)] backdrop-blur-2xl text-left select-none overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-5 lg:gap-7 items-stretch">
            
            {/* LEFT SIDEBAR */}
            <div className="w-full md:w-36 lg:w-40 shrink-0 flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06] pb-4 md:pb-0 md:pr-4">
              <div className="space-y-4 w-full">
                {/* Logo */}
                <div className="flex items-center gap-1.5 px-1 py-0.5">
                  <span className="font-headline font-bold text-base text-white tracking-tight">
                    Vyralify
                  </span>
                </div>

                {/* Nav Links */}
                <div className="flex flex-wrap md:flex-col gap-1 text-xs">
                  {/* Home (Active) */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#16181D] text-white font-medium shadow-xs">
                    <span className="text-[#3CEB75] text-sm">🏠</span>
                    <span className="text-xs">Home</span>
                  </div>

                  {/* AI Assistant */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs">AI Assistant</span>
                  </div>

                  {/* Campaigns */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <Megaphone className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs">Campaigns</span>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <BarChart2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs">Analytics</span>
                  </div>

                  {/* Earnings */}
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <Wallet className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs">Earnings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              
              {/* TOP HEADER: Greeting + Create button + Avatar */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-headline font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Good morning, Ahmad</span>
                    <span>👋</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-inter">
                    Let's make something viral today.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Search/Create pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16181D] border border-white/[0.06] text-[11px] text-neutral-300 hover:text-white transition-colors cursor-pointer">
                    <Search className="w-3 h-3 text-neutral-400" />
                    <span className="font-medium">Create</span>
                  </div>

                  {/* Avatar */}
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                    alt="Ahmad"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                  />
                </div>
              </div>

              {/* THREE MAIN FEATURE CARDS (Exact match to screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* CARD 1: Vyralify AI */}
                <div className="rounded-2xl bg-[#121317] border border-white/[0.05] p-3.5 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-colors group cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      {/* Green glowing square icon */}
                      <div className="w-8 h-8 rounded-xl bg-[#16291C] border border-[#23502C] flex items-center justify-center text-[#3CEB75] shadow-[0_0_12px_rgba(60,235,117,0.25)] shrink-0">
                        <span className="text-sm font-black">✦</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#3CEB75] transition-colors leading-tight">
                          Vyralify AI
                        </div>
                        <div className="text-[10px] text-neutral-400 leading-tight">
                          Get viral content ideas
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400 group-hover:text-white">
                    <span>Get viral content</span>
                    <span className="text-neutral-500 group-hover:text-[#3CEB75] transition-colors">→</span>
                  </div>
                </div>

                {/* CARD 2: Active Campaigns */}
                <div className="rounded-2xl bg-[#121317] border border-white/[0.05] p-3.5 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-colors group cursor-pointer">
                  <div>
                    <div className="text-xs text-neutral-300 font-medium mb-1">
                      Active Campaigns
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-headline font-bold text-white leading-none">
                          12
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">
                          Offers
                        </div>
                      </div>

                      {/* 2 Overlapping creator avatars */}
                      <div className="flex -space-x-1.5 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" 
                          alt="Campaign creator" 
                          className="w-7 h-7 rounded-lg object-cover ring-1 ring-black"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80" 
                          alt="Campaign creator" 
                          className="w-7 h-7 rounded-lg object-cover ring-1 ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <span className="text-neutral-500 group-hover:text-[#3CEB75] text-[10px] transition-colors">→</span>
                  </div>
                </div>

                {/* CARD 3: Total Earnings */}
                <div className="rounded-2xl bg-[#121317] border border-white/[0.05] p-3.5 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-colors group cursor-pointer">
                  <div>
                    <div className="text-xs text-neutral-300 font-medium mb-1">
                      Total Earnings
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xl font-headline font-bold text-white leading-none">
                          $1,240
                        </div>
                        <div className="text-[10px] text-[#3CEB75] font-semibold flex items-center gap-0.5 mt-1">
                          <span>↑</span>
                          <span>28%</span>
                        </div>
                      </div>

                      {/* 5 Ascending glowing green vertical bars */}
                      <div className="flex items-end gap-1 h-8">
                        <div className="w-1.5 h-2 bg-[#257A3E] rounded-t-xs" />
                        <div className="w-1.5 h-3.5 bg-[#2E994E] rounded-t-xs" />
                        <div className="w-1.5 h-5 bg-[#36B85E] rounded-t-xs" />
                        <div className="w-1.5 h-6.5 bg-[#3CEB75] rounded-t-xs shadow-[0_0_6px_rgba(60,235,117,0.4)]" />
                        <div className="w-1.5 h-8 bg-[#3CEB75] rounded-t-xs shadow-[0_0_8px_rgba(60,235,117,0.6)]" />
                      </div>
                    </div>
                  </div>

                  <div className="h-0.5" />
                </div>

              </div>

            </div>

          </div>
        </motion.div>

        {/* 4. HANDWRITTEN SCRIPT ANNOTATIONS WITH CURVED ARROWS (Exact match to screenshot) */}
        <div className="w-full grid grid-cols-3 pt-6 sm:pt-8 text-neutral-400 select-none">
          
          {/* Annotation 1: Create with AI */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing up-right */}
            <svg width="40" height="34" viewBox="0 0 40 34" fill="none" className="text-neutral-500 mb-1">
              <path d="M12 30 C15 14, 25 8, 33 6 M26 4 L34 6 L29 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-xl leading-tight text-center">
              Create<br />with AI
            </span>
          </div>

          {/* Annotation 2: Join campaigns & clip */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing up */}
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none" className="text-neutral-500 mb-1">
              <path d="M14 30 C12 18, 16 12, 14 5 M9 10 L14 4 L19 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-xl leading-tight text-center">
              Join campaigns<br />&amp; clip
            </span>
          </div>

          {/* Annotation 3: Track your earnings */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing up-left */}
            <svg width="40" height="34" viewBox="0 0 40 34" fill="none" className="text-neutral-500 mb-1">
              <path d="M28 30 C25 14, 15 8, 7 6 M14 4 L6 6 L11 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-xl leading-tight text-center">
              Track<br />your earnings
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
