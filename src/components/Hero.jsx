import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Megaphone, 
  BarChart2, 
  Wallet 
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
          className="flex items-center justify-center gap-3 mb-10 sm:mb-14"
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

      {/* 3. MAIN VISUAL: 3D PERSPECTIVE TILTED REAL VYRALIFY DASHBOARD (Pure Code) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        
        {/* Soft emerald/green glow aura behind tilted dashboard */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[760px] sm:w-[950px] h-[300px] bg-[#3CEB75]/15 blur-[130px] rounded-full pointer-events-none" />

        {/* 3D Perspective Wrapper */}
        <div 
          className="w-full max-w-[880px] mx-auto"
          style={{ perspective: '1200px' }}
        >
          {/* Tilted Dashboard Frame */}
          <motion.div
            initial={{ opacity: 0, y: 35, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center'
            }}
            className="relative w-full rounded-[26px] sm:rounded-[30px] p-4 sm:p-6 bg-[#0B0C0E]/95 border border-white/[0.08] border-t-[#3CEB75]/40 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(60,235,117,0.08)] backdrop-blur-2xl text-left select-none overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
              
              {/* LEFT SIDEBAR (~22% width) */}
              <div className="w-full md:w-36 lg:w-40 shrink-0 flex md:flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06] pb-4 md:pb-0 md:pr-4">
                <div className="space-y-4 w-full">
                  {/* Brand Logo */}
                  <div className="flex items-center px-1 py-1">
                    <img 
                      src="/vyralify-logo.png" 
                      alt="Vyralify" 
                      className="h-5 sm:h-6 w-auto object-contain" 
                    />
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-wrap md:flex-col gap-1 text-xs">
                    {/* Home (Active) */}
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#181A20] text-white font-medium shadow-xs">
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
                
                {/* TOP GREETING ROW */}
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
                    {/* Search/Create Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181A20] border border-white/[0.08] text-[11px] text-neutral-300 hover:text-white transition-colors cursor-pointer">
                      <Search className="w-3 h-3 text-neutral-400" />
                      <span className="font-medium">Create</span>
                    </div>

                    {/* User Avatar */}
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                      alt="Ahmad"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-white/15"
                    />
                  </div>
                </div>

                {/* 3 CORE STAT/FEATURE CARDS (Exact match to PDF) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* CARD 1: Vyralify AI */}
                  <div className="rounded-2xl bg-[#131419] border border-white/[0.06] p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-all duration-200 group cursor-pointer">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        {/* Green Glowing Square Icon */}
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B3A23] to-[#0E2214] border border-[#2B6038] flex items-center justify-center text-[#3CEB75] shadow-[0_0_14px_rgba(60,235,117,0.3)] shrink-0">
                          <span className="text-base font-black">✦</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#3CEB75] transition-colors leading-tight">
                            Vyralify AI
                          </div>
                          <div className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                            Get viral content ideas
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                      <span>Get viral content</span>
                      <span className="text-neutral-500 group-hover:text-[#3CEB75] transition-colors">→</span>
                    </div>
                  </div>

                  {/* CARD 2: Active Campaigns */}
                  <div className="rounded-2xl bg-[#131419] border border-white/[0.06] p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-all duration-200 group cursor-pointer">
                    <div>
                      <div className="text-xs text-neutral-300 font-medium mb-1">
                        Active Campaigns
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-headline font-bold text-white leading-none">
                            12
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-1 font-medium">
                            Offers
                          </div>
                        </div>

                        {/* 2 Overlapping Creator Avatars */}
                        <div className="flex -space-x-2 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                            alt="Campaign creator" 
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-black"
                          />
                          <img 
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                            alt="Campaign creator" 
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <span className="text-neutral-500 group-hover:text-[#3CEB75] text-xs transition-colors">→</span>
                    </div>
                  </div>

                  {/* CARD 3: Total Earnings */}
                  <div className="rounded-2xl bg-[#131419] border border-white/[0.06] p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#3CEB75]/30 transition-all duration-200 group cursor-pointer">
                    <div>
                      <div className="text-xs text-neutral-300 font-medium mb-1">
                        Total Earnings
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-headline font-bold text-white leading-none">
                            $1,240
                          </div>
                          <div className="text-[11px] text-[#3CEB75] font-semibold flex items-center gap-0.5 mt-1.5">
                            <span>↑</span>
                            <span>28%</span>
                          </div>
                        </div>

                        {/* 5 Ascending Glowing Green Bars Chart */}
                        <div className="flex items-end gap-1 h-9">
                          <div className="w-1.5 sm:w-2 h-2.5 bg-[#1F6E36] rounded-t-xs" />
                          <div className="w-1.5 sm:w-2 h-4 bg-[#288D44] rounded-t-xs" />
                          <div className="w-1.5 sm:w-2 h-6 bg-[#32AB53] rounded-t-xs" />
                          <div className="w-1.5 sm:w-2 h-7.5 bg-[#3CEB75] rounded-t-xs shadow-[0_0_8px_rgba(60,235,117,0.5)]" />
                          <div className="w-1.5 sm:w-2 h-9 bg-[#3CEB75] rounded-t-xs shadow-[0_0_12px_rgba(60,235,117,0.7)]" />
                        </div>
                      </div>
                    </div>

                    <div className="h-0.5" />
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </div>

        {/* 4. HANDWRITTEN SCRIPT ANNOTATIONS WITH CURVED ARROWS (Exact Match) */}
        <div className="w-full max-w-[840px] grid grid-cols-3 pt-6 sm:pt-8 text-neutral-400 select-none">
          
          {/* Annotation 1: Create with AI */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing up-right */}
            <svg width="42" height="36" viewBox="0 0 42 36" fill="none" className="text-neutral-500 mb-1">
              <path d="M12 32 C16 16, 26 10, 36 6 M28 4 L37 6 L31 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-2xl leading-tight text-center">
              Create<br />with AI
            </span>
          </div>

          {/* Annotation 2: Join campaigns & clip */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing straight up */}
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" className="text-neutral-500 mb-1">
              <path d="M15 32 C13 20, 17 14, 15 6 M9 12 L15 5 L21 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-2xl leading-tight text-center">
              Join campaigns<br />&amp; clip
            </span>
          </div>

          {/* Annotation 3: Track your earnings */}
          <div className="flex flex-col items-center">
            {/* Curved arrow pointing up-left */}
            <svg width="42" height="36" viewBox="0 0 42 36" fill="none" className="text-neutral-500 mb-1">
              <path d="M30 32 C26 16, 16 10, 6 6 M14 4 L5 6 L11 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-script text-neutral-300 text-lg sm:text-2xl leading-tight text-center">
              Track<br />your earnings
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
