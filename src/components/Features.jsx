import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Flame, 
  Coins, 
  ShoppingBag, 
  Layers, 
  Calendar, 
  GraduationCap, 
  Wallet, 
  Users, 
  Smartphone,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldAlert,
  Sliders,
  Check
} from 'lucide-react';

export default function Features() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeHookVariant, setActiveHookVariant] = useState('A');

  const filterTabs = [
    { id: 'all', label: 'All 10 Systems' },
    { id: 'ai', label: 'AI & Intelligence' },
    { id: 'monetize', label: 'Clipping & Cashouts' },
    { id: 'commerce', label: 'Storefronts & Sales' },
  ];

  const niches = [
    { name: "AI SaaS & Productivity", erpm: "₹340 eRPM", delta: "+52%", score: 96 },
    { name: "Personal Wealth & FinTech", erpm: "₹290 eRPM", delta: "+38%", score: 92 },
    { name: "E-Commerce Arbitrage", erpm: "₹240 eRPM", delta: "+45%", score: 89 },
    { name: "Creator Economy Tools", erpm: "₹210 eRPM", delta: "+64%", score: 87 },
  ];

  const leaderboard = [
    { rank: 1, creator: "@speedcuts", views: "4.2M views", earned: "₹63,000" },
    { rank: 2, creator: "@zenith_clips", views: "3.1M views", earned: "₹46,500" },
    { rank: 3, creator: "@apex_edits", views: "2.4M views", earned: "₹36,000" },
  ];

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-hidden">
      
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#D1FE17]/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-xs font-mono font-medium tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>10-SYSTEM CORE ARCHITECTURE // 05</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-5">
            What can it do? <br />
            <span className="text-black dark:text-white">Automate your entire empire.</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
            Engineered from our locked 10-system master architecture: hook generation, audience arbitrage, high-RPM niche radar, and automated bounty payouts.
          </p>

          {/* Interactive Filter Pills */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-100 dark:bg-[#0E0E11] border border-neutral-200 dark:border-[#202025]">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-black text-white dark:bg-[#D1FE17] dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10-System Interactive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* Bento Card 1 (Large - 7 cols): AI Viral Hook Engine (System 01 / 03) */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D1FE17]/15 text-black dark:text-[#D1FE17] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500">System 03 • Intelligence</span>
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">AI Viral Hook Engine</h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black dark:bg-[#16161A] text-white dark:text-[#D1FE17] font-semibold border border-neutral-800 dark:border-[#2A2A32]">
                  GPT-4o & Claude 3.5
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Pre-trained on 15,000+ Reels exceeding 1M+ views. Synthesizes psychological retention triggers across 5 viral archetypes in under 3 seconds.
              </p>

              {/* Interactive Hook Variant Switcher */}
              <div className="rounded-xl p-4 bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24] mb-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#1C1C20] pb-3 mb-3">
                  <span className="text-xs font-mono text-neutral-500 uppercase">A/B Retention Framework</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveHookVariant('A')}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors ${
                        activeHookVariant === 'A'
                          ? 'bg-black text-white dark:bg-[#D1FE17] dark:text-black'
                          : 'bg-neutral-100 dark:bg-[#1A1A1E] text-neutral-500'
                      }`}
                    >
                      Variant A
                    </button>
                    <button
                      onClick={() => setActiveHookVariant('B')}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors ${
                        activeHookVariant === 'B'
                          ? 'bg-black text-white dark:bg-[#D1FE17] dark:text-black'
                          : 'bg-neutral-100 dark:bg-[#1A1A1E] text-neutral-500'
                      }`}
                    >
                      Variant B
                    </button>
                  </div>
                </div>

                <div className="text-sm font-medium text-neutral-900 dark:text-white mb-3">
                  {activeHookVariant === 'A' ? (
                    <span>"If you're still relying on 1 client to pay your rent in 2026, you're 1 email away from broke."</span>
                  ) : (
                    <span>"99% of creators are sleeping on this 2-minute clipping loop generating ₹45,000/week on autopilot."</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100 dark:border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 text-[10px]">Predicted Hold Rate</span>
                    <div className="text-black dark:text-[#D1FE17] font-bold text-base mt-0.5">
                      {activeHookVariant === 'A' ? '94.2% (Top 1%)' : '91.8% (Top 5%)'}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500 text-[10px]">Archetype Class</span>
                    <div className="text-neutral-700 dark:text-neutral-300 font-bold text-base mt-0.5">
                      {activeHookVariant === 'A' ? 'Negative Friction' : 'Curiosity Arbitrage'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-200 dark:border-[#1C1C20]">
              <span className="flex items-center gap-1.5 text-black dark:text-[#D1FE17] font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Generates 5 script variations instantly
              </span>
              <span className="font-mono">Avg Virality Delta: +340%</span>
            </div>
          </div>

          {/* Bento Card 2 (5 cols): High-RPM Niche Radar (System 02) */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D1FE17]/15 text-black dark:text-[#D1FE17] flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500">System 02 • Radar</span>
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">High-RPM Niche Radar</h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Live Feed
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                Scan 150+ creator categories. Uncovers monetization gaps where sponsors pay premium payouts per 1,000 views.
              </p>

              {/* Niche List */}
              <div className="space-y-2.5">
                {niches.map((n, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">{n.name}</div>
                      <div className="text-[10px] font-mono text-neutral-500 mt-0.5">Opportunity Index: {n.score}/100</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-mono text-black dark:text-[#D1FE17]">{n.erpm}</div>
                      <span className="text-[10px] font-mono text-emerald-500">{n.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-[#1C1C20] text-xs text-neutral-500 flex items-center justify-between">
              <span>Updated real-time from Meta API</span>
              <a href="#clip-and-earn" className="text-black dark:text-[#D1FE17] font-semibold hover:underline flex items-center gap-1">
                Explore Niches <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Bento Card 3 (5 cols): Creator Clipping Challenges (System 06) */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D1FE17]/15 text-black dark:text-[#D1FE17] flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500">System 06 • Marketplace</span>
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">Clipping Challenges</h3>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D1FE17]/15 text-black dark:text-[#D1FE17] font-mono font-bold">
                  ₹5L POOL
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                Clip verified podcasts from top founders and venture funds. Get paid directly per 1,000 verified views with zero client outreach.
              </p>

              {/* Leaderboard snippet */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24] space-y-2.5 mb-4">
                <div className="text-[11px] font-mono text-neutral-500 uppercase flex items-center justify-between pb-1.5 border-b border-neutral-100 dark:border-[#1C1C20]">
                  <span>Sprint Leaderboard</span>
                  <span>Payout Earned</span>
                </div>
                {leaderboard.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-[#1C1C22] flex items-center justify-center font-mono font-bold text-[10px] text-neutral-700 dark:text-neutral-300">
                        #{item.rank}
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-white">{item.creator}</span>
                      <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">({item.views})</span>
                    </div>
                    <span className="font-bold font-mono text-black dark:text-[#D1FE17]">{item.earned}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-[#1C1C20] flex items-center justify-between text-xs">
              <span className="text-neutral-500">Instant UPI & Stripe escrow</span>
              <span className="text-black dark:text-[#D1FE17] font-semibold">₹150 / 1K Views</span>
            </div>
          </div>

          {/* Bento Card 4 (Large - 7 cols): Whop-Style Commerce & Storefront (System 05) */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D1FE17]/15 text-black dark:text-[#D1FE17] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500">System 05 • Commerce</span>
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">Whop-Style Creator Storefront</h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black dark:bg-[#16161A] text-white dark:text-[#D1FE17] font-semibold border border-neutral-800 dark:border-[#2A2A32]">
                  0% Fee Under ₹50K
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Sell digital guides, Notion templates, paid communities, and coaching without leaving Instagram. 1-click checkout with instant digital delivery.
              </p>

              {/* Checkout Preview Mockup */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200 dark:border-[#1F1F24] grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Live Digital Product</span>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">The 90-Day Faceless Empire Blueprint</h4>
                  <div className="text-xs text-neutral-500 mt-1">Includes 500+ Viral Hooks & B-Roll Vault</div>
                  <div className="text-lg font-bold font-display text-black dark:text-[#D1FE17] mt-3">₹1,999.00</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#D1FE17]" />
                    <span>Instant Discord / WhatsApp role delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#D1FE17]" />
                    <span>UPI, Credit Card & Apple Pay</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#D1FE17]" />
                    <span>Built-in Affiliate Commission tracking</span>
                  </div>
                  <button className="w-full py-2 mt-2 rounded-lg bg-black text-white dark:bg-[#D1FE17] dark:text-black font-semibold text-xs transition-colors">
                    1-Click Fast Checkout Preview
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-[#1C1C20] flex items-center justify-between text-xs text-neutral-500">
              <span>Automatic invoice generation & tax compliance</span>
              <span className="text-black dark:text-[#D1FE17] font-semibold">Stripe & Razorpay integrated</span>
            </div>
          </div>

        </div>

        {/* Systems 5 to 10 Micro-Architecture Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <Calendar className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">04. Publish</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">Multi-Account Scheduler & Best Time Engine.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <GraduationCap className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">07. University</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">24 Masterclasses on Viral Editing & Retention.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <Wallet className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">08. Wallet</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">Unified earnings, auto-ledger & fast payouts.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <Users className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">09. Community</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">Page reviews, collaboration & creator syndicate.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <Smartphone className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">10. Mobile OS</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">Discover → Create → Apply → Earn on mobile.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#1C1C20] text-left hover:border-neutral-300 dark:hover:border-[#33333A] transition-colors">
            <ShieldAlert className="w-4 h-4 text-black dark:text-[#D1FE17] mb-2" />
            <div className="text-xs font-bold text-neutral-900 dark:text-white">Fraud Shield</div>
            <p className="text-[11px] text-neutral-500 mt-1 leading-snug">Bot detection & automated view verification.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
