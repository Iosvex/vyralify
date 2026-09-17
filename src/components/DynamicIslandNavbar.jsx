import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  Activity, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  X, 
  Menu, 
  SlidersHorizontal, 
  Coins,
  ArrowUp
} from 'lucide-react';
import { ThemeToggleButton2 } from './ui/theme-toggle';
import { MagneticDock } from './ui/magnetic-dock';

export default function DynamicIslandNavbar() {
  // Expanded Island State (null | 'platform' | 'features' | 'bounties' | 'telemetry')
  const [activeTab, setActiveTab] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  // Rotating telemetry pill ticker
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickers = [
    { label: '$128.4K Paid Out', icon: DollarSign, color: '#D1FE17' },
    { label: '4,890 Active Sync', icon: Activity, color: '#38BDF8' },
    { label: '12 Live Sprints', icon: Flame, color: '#F97316' },
    { label: '0% Platform Fee', icon: ShieldCheck, color: '#A3E635' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [tickers.length]);

  // Hover assist debounce timers
  const hoverTimeoutRef = useRef(null);
  const islandRef = useRef(null);

  const handleMouseEnterTab = (tabKey) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveTab(tabKey);
  };

  const handleMouseLeaveIsland = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 280);
  };

  const handleMouseEnterIsland = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (islandRef.current && !islandRef.current.contains(e.target)) {
        setActiveTab(null);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTab(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isExpanded = activeTab !== null || isMobileOpen;
  const currentTicker = tickers[tickerIndex];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none select-none">
            <motion.div
              ref={islandRef}
              layout
              onMouseEnter={handleMouseEnterIsland}
              onMouseLeave={handleMouseLeaveIsland}
              transition={{
                type: "spring",
                stiffness: 440,
                damping: 34,
                mass: 0.75
              }}
              className={`pointer-events-auto relative w-full transition-shadow duration-200 ${
                isExpanded 
                  ? 'max-w-4xl rounded-[28px] sm:rounded-[32px] bg-[#090A0E]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_24px_70px_rgba(0,0,0,0.92)]' 
                  : 'max-w-fit rounded-full bg-[#0A0B0F]/85 backdrop-blur-2xl border border-white/[0.10] shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:border-white/[0.18]'
              }`}
              style={{
                boxShadow: isExpanded 
                  ? '0 24px 70px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.12)' 
                  : '0 10px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)'
              }}
            >
              {/* Top Specular Line */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* ================================================================= */}
              {/* COMPACT SLIM 1-LINE BAR */}
              {/* ================================================================= */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 h-11 sm:h-12 gap-2.5 sm:gap-4 whitespace-nowrap">
                
                {/* LEFT: Vyralify Brand Logo (Clean, No window dots) */}
                <a 
                  href="#hero-section" 
                  onClick={() => setActiveTab(null)}
                  className="flex items-center gap-1.5 focus:outline-none shrink-0 group pl-0.5"
                >
                  <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white flex items-center">
                    Vyral<span className="text-[#D1FE17]">ify</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse shrink-0" />
                </a>

                {/* CENTER: Expandable Interactive Tabs with Hover Assist */}
                <nav className="hidden md:flex items-center gap-0.5 bg-[#12131A]/70 border border-white/[0.04] p-0.5 rounded-full relative whitespace-nowrap">
                  
                  {/* Tab: Platform */}
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnterTab('platform')}
                    onClick={() => setActiveTab(activeTab === 'platform' ? null : 'platform')}
                    className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === 'platform' 
                        ? 'text-black font-semibold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {activeTab === 'platform' && (
                      <motion.span
                        layoutId="islandActiveTab"
                        className="absolute inset-0 rounded-full bg-[#D1FE17]"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Platform</span>
                    <ChevronDown className={`relative z-10 w-3 h-3 transition-transform duration-200 ${activeTab === 'platform' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Tab: Features */}
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnterTab('features')}
                    onClick={() => setActiveTab(activeTab === 'features' ? null : 'features')}
                    className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === 'features' 
                        ? 'text-black font-semibold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {activeTab === 'features' && (
                      <motion.span
                        layoutId="islandActiveTab"
                        className="absolute inset-0 rounded-full bg-[#D1FE17]"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Features</span>
                    <ChevronDown className={`relative z-10 w-3 h-3 transition-transform duration-200 ${activeTab === 'features' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Tab: Bounties (1-Line Pill, No Wrapped Text) */}
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnterTab('bounties')}
                    onClick={() => setActiveTab(activeTab === 'bounties' ? null : 'bounties')}
                    className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap ${
                      activeTab === 'bounties' 
                        ? 'text-black font-semibold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {activeTab === 'bounties' && (
                      <motion.span
                        layoutId="islandActiveTab"
                        className="absolute inset-0 rounded-full bg-[#D1FE17]"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Bounties</span>
                    <span className={`relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold leading-none inline-flex items-center shrink-0 whitespace-nowrap ${
                      activeTab === 'bounties'
                        ? 'bg-black text-[#D1FE17]'
                        : 'bg-[#182612] text-[#D1FE17] border border-[#2B471C]'
                    }`}>
                      12 Live
                    </span>
                  </button>

                  {/* Tab: Pricing */}
                  <a
                    href="#pricing"
                    onClick={() => setActiveTab(null)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-all cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    Pricing
                  </a>
                </nav>

                {/* RIGHT: Live Telemetry Single-Line Capsule + Theme + CTA */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
                  
                  {/* Telemetry Single-Line Capsule (Hover assist / click to expand) */}
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnterTab('telemetry')}
                    onClick={() => setActiveTab(activeTab === 'telemetry' ? null : 'telemetry')}
                    title="Hover to view live telemetry ledger"
                    className={`hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all cursor-pointer shrink-0 whitespace-nowrap leading-none ${
                      activeTab === 'telemetry'
                        ? 'bg-[#151D10] border-[#D1FE17] text-[#D1FE17]'
                        : 'bg-[#12141C] border-[#222533] text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={tickerIndex}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.18 }}
                        className="inline-block font-semibold whitespace-nowrap leading-none"
                      >
                        {currentTicker.label}
                      </motion.span>
                    </AnimatePresence>
                  </button>

                  {/* Theme Toggle Button */}
                  <ThemeToggleButton2 className="w-7 h-7 shrink-0" />

                  {/* Login Link */}
                  <a
                    href="/login"
                    className="hidden lg:inline-block text-xs font-medium text-neutral-400 hover:text-white transition-colors shrink-0 whitespace-nowrap"
                  >
                    Login
                  </a>

                  {/* GET STARTED Pill Button */}
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href="#pricing"
                    className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.97] transition-all font-display shrink-0 whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    GET STARTED
                  </motion.a>

                  {/* Mobile Menu Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(!isMobileOpen);
                      if (activeTab) setActiveTab(null);
                    }}
                    aria-label="Toggle Navigation"
                    className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-[#161822] text-white border border-[#262A3B] cursor-pointer shrink-0"
                  >
                    {isMobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                  </button>

                </div>

              </div>

              {/* ================================================================= */}
              {/* EXPANDED ASSIST PANELS (Triggered on hover or click) */}
              {/* ================================================================= */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.8
                    }}
                    className="overflow-hidden border-t border-white/[0.08]"
                  >
                    
                    {/* PANEL 1: PLATFORM HUB */}
                    {activeTab === 'platform' && (
                      <div className="p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#D1FE17]" />
                            Vyralify Institutional Platform Suite
                          </span>
                          <span className="text-[10px] font-mono text-[#D1FE17] bg-[#14230E] border border-[#223B17] px-2 py-0.5 rounded-full font-bold">
                            Verified Escrow
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <a 
                            href="#features"
                            onClick={() => setActiveTab(null)}
                            className="p-3.5 rounded-2xl bg-[#10121A] border border-[#1E2230] hover:border-[#D1FE17]/40 hover:bg-[#141724] transition-all group cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-[#D1FE17]" />
                                Multi-Signature Escrow Vault
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              Campaign bounties locked securely in escrow. Payouts execute automatically with zero counterparty risk.
                            </p>
                          </a>

                          <a 
                            href="#features"
                            onClick={() => setActiveTab(null)}
                            className="p-3.5 rounded-2xl bg-[#10121A] border border-[#1E2230] hover:border-[#D1FE17]/40 hover:bg-[#141724] transition-all group cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4 text-[#D1FE17]" />
                                Instant ACH & Stripe Payouts
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              No 30-day net payment delays. Creators claim payouts directly to their bank within minutes of view milestones.
                            </p>
                          </a>

                          <a 
                            href="#features"
                            onClick={() => setActiveTab(null)}
                            className="p-3.5 rounded-2xl bg-[#10121A] border border-[#1E2230] hover:border-[#D1FE17]/40 hover:bg-[#141724] transition-all group cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors flex items-center gap-1.5">
                                <Activity className="w-4 h-4 text-[#38BDF8]" />
                                Tri-Platform Attribution Engine
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              Unified tracking across YouTube Shorts, Instagram Reels, and TikTok Viral channels in real-time.
                            </p>
                          </a>

                          <a 
                            href="#features"
                            onClick={() => setActiveTab(null)}
                            className="p-3.5 rounded-2xl bg-[#10121A] border border-[#1E2230] hover:border-[#D1FE17]/40 hover:bg-[#141724] transition-all group cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors flex items-center gap-1.5">
                                <SlidersHorizontal className="w-4 h-4 text-[#A3E635]" />
                                Agency & Enterprise API
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              Programmatic bounty creation, webhooks for CRM integrations, and automatic 1099 tax filing.
                            </p>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* PANEL 2: FEATURES SUITE */}
                    {activeTab === 'features' && (
                      <div className="p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#D1FE17]" />
                            Vyralify Core Growth Technologies
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-[#161822] border border-[#252837] px-2 py-0.5 rounded-full">
                            v2.4 Engine
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 rounded-2xl bg-[#10121A] border border-[#1E2230] space-y-1.5">
                            <div className="w-7 h-7 rounded-lg bg-[#182310] border border-[#2A3F1A] flex items-center justify-center text-[#D1FE17] mb-2">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-white">AI Viral Hook Generator</div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              GPT-4o fine-tuned on 10,000+ top viral clips. Generates retention-guaranteed opening 9-second hooks.
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-[#10121A] border border-[#1E2230] space-y-1.5">
                            <div className="w-7 h-7 rounded-lg bg-[#101D2B] border border-[#1C324A] flex items-center justify-center text-[#38BDF8] mb-2">
                              <Activity className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-white">Audio Waveform Matcher</div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              Automatic acoustic fingerprinting verifies when clippers use your authentic podcast/stream audio snippet.
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-[#10121A] border border-[#1E2230] space-y-1.5">
                            <div className="w-7 h-7 rounded-lg bg-[#251515] border border-[#442222] flex items-center justify-center text-[#F87171] mb-2">
                              <Coins className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-white">150+ High-RPM Niche Radar</div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              Proprietary intelligence ranking highest-paying creator niches from FinTech to SaaS breakdowns.
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                          <a href="#features" onClick={() => setActiveTab(null)} className="text-[#D1FE17] hover:underline flex items-center gap-1 font-semibold">
                            Explore All 6 Interactive Systems <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* PANEL 3: BOUNTIES HUB */}
                    {activeTab === 'bounties' && (
                      <div className="p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                              <Flame className="w-3.5 h-3.5 text-[#F97316]" />
                              Active Creator Bounty Hunts
                            </span>
                            <span className="text-[10px] font-mono text-[#D1FE17] bg-[#14230E] border border-[#223B17] px-2 py-0.5 rounded-full font-bold">
                              12 Live Sprints
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-neutral-400">
                            Total Escrow Pool: <strong className="text-white">$34,800.00</strong>
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { name: 'Apex Founder Clipping Sprint #12', pool: '$1,800.00', rate: '$2.65 / 1k views', status: '80% Claimed' },
                            { name: 'AI Tool Launch Campaign Sprint', pool: '$3,500.00', rate: '$3.20 / 1k views', status: '62% Claimed' },
                            { name: 'FinTech 1M Views Breakthrough Bounty', pool: '$5,000.00', rate: '$3.75 / 1k views', status: '45% Claimed' },
                          ].map((bounty, i) => (
                            <div 
                              key={i}
                              className="p-3 rounded-xl bg-[#11131C] border border-[#1E212E] flex items-center justify-between text-xs font-mono"
                            >
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  <span>{bounty.name}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#181D2A] text-neutral-300">
                                    {bounty.rate}
                                  </span>
                                </div>
                                <div className="text-[11px] text-neutral-400 mt-0.5">
                                  Available Escrow: <span className="text-[#D1FE17] font-semibold">{bounty.pool}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-neutral-400 text-[11px] hidden sm:inline">{bounty.status}</span>
                                <a
                                  href="#clip-and-earn"
                                  onClick={() => setActiveTab(null)}
                                  className="px-3 py-1.5 rounded-lg bg-[#D1FE17] text-black font-bold text-[10px] uppercase tracking-wider hover:bg-[#BBF00E] transition-all cursor-pointer"
                                >
                                  CLAIM CLIP
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PANEL 4: TELEMETRY HUD */}
                    {activeTab === 'telemetry' && (
                      <div className="p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-[#D1FE17]" />
                            Real-Time Institutional Escrow Ledger
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-[#161822] border border-[#252837] px-2 py-0.5 rounded-full">
                            Latency: 14ms
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono">
                          <div className="p-3 rounded-xl bg-[#11131C] border border-[#1E212E]">
                            <span className="text-[10px] text-neutral-500 uppercase">24H Verified Volume</span>
                            <span className="text-sm font-bold text-white block mt-0.5">$128,450.00</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#11131C] border border-[#1E212E]">
                            <span className="text-[10px] text-neutral-500 uppercase">Instant Cashouts</span>
                            <span className="text-sm font-bold text-[#D1FE17] block mt-0.5">382 Today</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#11131C] border border-[#1E212E]">
                            <span className="text-[10px] text-neutral-500 uppercase">Active Creators</span>
                            <span className="text-sm font-bold text-white block mt-0.5">4,890 Syncing</span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#11131C] border border-[#1E212E]">
                            <span className="text-[10px] text-neutral-500 uppercase">Counterparty Risk</span>
                            <span className="text-sm font-bold text-[#38BDF8] block mt-0.5">0.00%</span>
                          </div>
                        </div>

                        {/* Recent Payout Feed */}
                        <div className="space-y-1.5 text-xs font-mono pt-1">
                          <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Live Transaction Feed:</div>
                          {[
                            { creator: '@arjun_vfx', amt: '$1,420.00', campaign: 'Apex Founder #12', time: '1m ago' },
                            { creator: '@neha_reels', amt: '$2,100.00', campaign: 'AI Tool Launch', time: '4m ago' },
                            { creator: '@karan_media', amt: '$3,850.00', campaign: 'FinTech 1M Sprint', time: '7m ago' },
                          ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-[#0E1017]">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1FE17]" />
                                <span className="text-white font-semibold">{tx.creator}</span>
                                <span className="text-neutral-500 hidden sm:inline">{tx.campaign}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[#D1FE17] font-bold">{tx.amt}</span>
                                <span className="text-neutral-500 text-[10px]">{tx.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MOBILE DRAWER */}
                    {isMobileOpen && (
                      <div className="p-4 space-y-3 md:hidden">
                        <div className="space-y-1.5">
                          <a
                            href="#features"
                            onClick={() => setIsMobileOpen(false)}
                            className="block p-2.5 rounded-xl bg-[#12141D] text-xs font-semibold text-white"
                          >
                            Platform & Systems
                          </a>
                          <a
                            href="#features"
                            onClick={() => setIsMobileOpen(false)}
                            className="block p-2.5 rounded-xl bg-[#12141D] text-xs font-semibold text-white"
                          >
                            AI Features & Radar
                          </a>
                          <a
                            href="#clip-and-earn"
                            onClick={() => setIsMobileOpen(false)}
                            className="block p-2.5 rounded-xl bg-[#12141D] text-xs font-semibold text-white flex items-center justify-between"
                          >
                            <span>Creator Bounties</span>
                            <span className="text-[9px] font-mono text-[#D1FE17] bg-[#14230E] px-2 py-0.5 rounded-full font-bold">
                              12 Live
                            </span>
                          </a>
                          <a
                            href="#pricing"
                            onClick={() => setIsMobileOpen(false)}
                            className="block p-2.5 rounded-xl bg-[#12141D] text-xs font-semibold text-white"
                          >
                            Pricing Plans
                          </a>
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
    </header>
  );
}
