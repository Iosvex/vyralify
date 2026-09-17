import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  Share2, 
  Wallet, 
  Clock, 
  Zap, 
  Layers
} from 'lucide-react';

export default function ClipAndEarn() {
  // Views in thousands (e.g. 500 = 500,000 views)
  const [viewsInK, setViewsInK] = useState(750);
  const rewardRate = 150; // ₹150 per 1,000 views

  const totalViews = viewsInK * 1000;
  const estimatedEarnings = (viewsInK * rewardRate).toLocaleString('en-IN');

  const steps = [
    {
      step: "01",
      title: "Claim Active Bounty",
      desc: "Browse verified brand campaigns. Pick high-yield founder interviews and product launches with escrow-locked pools.",
      icon: Layers,
    },
    {
      step: "02",
      title: "Source 4K Raw Cut",
      desc: "Download timestamped podcast footage, B-roll clips, and lossless audio directly from the Vyralify media vault.",
      icon: Download,
    },
    {
      step: "03",
      title: "Inject Viral AI Hooks",
      desc: "Use our Hook Engine to generate 94%+ retention openers and animated captions in under 60 seconds.",
      icon: Sparkles,
    },
    {
      step: "04",
      title: "Post & Auto-Verify",
      desc: "Publish to Instagram Reels and YouTube Shorts. Our API tracker automatically logs verified organic views in real time.",
      icon: Share2,
    },
    {
      step: "05",
      title: "Instant 1-Click Payout",
      desc: "Earnings credit directly to your Vyralify Wallet. Withdraw to UPI, IMPS, or Stripe with 0% platform take rate.",
      icon: Wallet,
    }
  ];

  const activeBounties = [
    {
      brand: "Superhuman AI",
      category: "AI & Automation",
      pool: "₹3,50,000",
      rate: "₹160 / 1K",
      slots: "14 slots left",
      badge: "High RPM"
    },
    {
      brand: "FinFlow Wealth",
      category: "Personal Finance",
      pool: "₹5,00,000",
      rate: "₹180 / 1K",
      slots: "8 slots left",
      badge: "Priority Escrow"
    },
    {
      brand: "ZeroToScale Founders",
      category: "Startup Interviews",
      pool: "₹2,50,000",
      rate: "₹140 / 1K",
      slots: "21 slots left",
      badge: "Beginner Friendly"
    }
  ];

  return (
    <section id="clip-and-earn" className="relative py-12 sm:py-16 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#D1FE17]/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Compact, Calibrated 1-Topic Hierarchy) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>CLIPPING BOUNTY PROTOCOL // 05</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-3">
            Can I make money here? <br />
            <span className="text-black dark:text-white">The Clip-to-Cash Engine.</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            You don't need a following, personal brand, or camera. Clip verified founder podcasts, post on faceless pages, and get automated cash deposited per 1,000 views.
          </p>
        </div>

        {/* Skiper UI Interactive Earnings Calculator */}
        <div className="rounded-3xl p-5 sm:p-8 lg:p-10 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-2xl mb-10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Slider Controls */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">Live Bounty Calculator</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white mt-1">
                  Simulate Your Monthly Clipping Income
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  Drag the slider to project your earnings based on average verified Reels & Shorts views.
                </p>
              </div>

              {/* Slider Component */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500 uppercase">Monthly Views</span>
                  <span className="text-lg sm:text-xl font-bold font-display text-neutral-900 dark:text-white">
                    {(totalViews).toLocaleString('en-IN')} Views
                  </span>
                </div>

                {/* Range Slider Styled with Tailwind */}
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={viewsInK}
                  onChange={(e) => setViewsInK(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-[#202026] rounded-lg appearance-none cursor-pointer accent-black dark:accent-[#D1FE17]"
                />

                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>50k Views</span>
                  <span>1.5M Views</span>
                  <span>3.0M+ Views</span>
                </div>
              </div>

              {/* Benchmark stats */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24]">
                  <span className="text-neutral-500 text-[10px]">Guaranteed Base Rate</span>
                  <div className="text-black dark:text-[#D1FE17] font-bold text-sm mt-0.5">₹150.00 / 1K</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24]">
                  <span className="text-neutral-500 text-[10px]">Payout Settlement</span>
                  <div className="text-neutral-900 dark:text-white font-bold text-sm mt-0.5">Instant Automated</div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Projected Earnings Display */}
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-black text-white border border-[#222228] shadow-xl flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
                  <span className="text-xs font-mono uppercase text-neutral-400">Estimated Cashout</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D1FE17]/15 text-[#D1FE17] font-bold">
                    0% TAKE RATE
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-neutral-400">Projected Monthly Earnings</div>
                  <div className="text-4xl sm:text-5xl font-display font-bold text-[#D1FE17] tracking-tight">
                    ₹{estimatedEarnings}
                  </div>
                  <div className="text-xs text-neutral-400 pt-1">
                    Deposited directly to your bank account / UPI ID.
                  </div>
                </div>

                <div className="mt-6 p-3.5 rounded-xl bg-[#121216] border border-[#222228] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Average clips needed:</span>
                    <span className="text-white font-mono font-semibold">{Math.ceil(viewsInK / 75)} clips/mo</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Avg time required:</span>
                    <span className="text-white font-mono font-semibold">45 min / day</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Escrow status:</span>
                    <span className="text-[#D1FE17] font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Guaranteed
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#pricing"
                className="w-full mt-6 py-3.5 rounded-xl bg-[#D1FE17] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#BBF00E] transition-all font-display group"
              >
                <span>Join Live Bounty Pool Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>

        {/* 5-Step Workflow Cards */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white">
              The 5-Step Execution Loop
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Zero cold outreach. Zero manual negotiations. Strictly performance-based.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] flex flex-col justify-between text-left shadow-xs hover:border-neutral-300 dark:hover:border-[#33333A] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-black dark:text-[#D1FE17]">{item.step}</span>
                      <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-[#16161B] flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Live Campaigns Available Right Now */}
        <div className="rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-[#1C1C20] pb-4">
            <div>
              <h4 className="text-lg font-bold font-display text-neutral-900 dark:text-white">
                Live Escrow Bounties Available Today
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Funded by verified companies. Payouts reserved in smart escrow.
              </p>
            </div>
            <span className="text-xs font-mono text-black dark:text-[#D1FE17] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              3 Verified Campaigns Open
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeBounties.map((bounty, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#202025] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#1C1C22] text-neutral-700 dark:text-neutral-300">
                      {bounty.category}
                    </span>
                    <span className="text-[10px] font-mono text-black dark:text-[#D1FE17] font-semibold">
                      {bounty.badge}
                    </span>
                  </div>
                  <h5 className="font-semibold text-sm text-neutral-900 dark:text-white">{bounty.brand}</h5>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-neutral-500">Pool</span>
                      <div className="font-bold text-neutral-900 dark:text-white">{bounty.pool}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500">Rate</span>
                      <div className="font-bold text-black dark:text-[#D1FE17]">{bounty.rate}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500 font-mono">{bounty.slots}</span>
                  <a href="#pricing" className="text-black dark:text-[#D1FE17] font-semibold hover:underline flex items-center gap-1">
                    Apply <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
