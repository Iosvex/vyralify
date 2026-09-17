import React from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Flame, 
  Smartphone, 
  Search, 
  ShoppingBag, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Eye, 
  DollarSign, 
  Play, 
  Bookmark, 
  Zap,
  ArrowDown
} from 'lucide-react';

export default function Features() {
  const cards = [
    {
      id: 'ai',
      icon: Bot,
      title: 'Vyralify AI',
      audience: 'For Everyone',
      priority: 'highest',
      description: 'Your 24/7 growth co-pilot — tells you what to post, why content worked or flopped, and what to do next.',
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D1FE17] animate-pulse" />
              <span className="font-mono text-[10px] text-neutral-400">AI CO-PILOT ACTIVE</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">1.2s ago</span>
          </div>

          <div className="bg-neutral-800/60 rounded-lg p-3 my-2 border border-neutral-700/50">
            <div className="flex items-center gap-1.5 text-[#D1FE17] font-semibold text-xs mb-1">
              <span>Post this Reel format next</span>
              <span>🔥</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Your storytelling Reels are outperforming your other formats by +142%. Try this 3-second pattern interrupt variation next.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button className="flex-1 py-1.5 px-2.5 rounded-md bg-[#D1FE17] text-black font-semibold text-[10px] hover:bg-[#bbf00e] transition-colors flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Create Variation</span>
            </button>
            <button className="py-1.5 px-2.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-[10px] transition-colors">
              Find Similar
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'campaigns',
      icon: Flame,
      title: 'Campaigns & Clipping',
      audience: 'For Clippers',
      priority: 'high',
      description: 'No page? No problem. Join brand campaigns, clip content, and get paid per verified view.',
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[9px] font-bold tracking-wider">
                LIVE CAMPAIGN
              </span>
              <span className="text-neutral-400 text-[11px] font-medium">FinFlow Wealth</span>
            </div>
            <span className="text-[#D1FE17] font-mono font-bold text-xs">$5 / 1K Views</span>
          </div>

          <div className="flex items-center gap-3 my-2 bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-700/40">
            <div className="w-12 h-12 rounded bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0 relative overflow-hidden">
              <Play className="w-5 h-5 text-white/80 fill-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-neutral-200 font-medium text-[11px] truncate">Ep. 42: How Fintech Brands Scale</div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400 font-mono">
                <span>Verified: <strong className="text-white">12,400 views</strong></span>
              </div>
            </div>
          </div>

          <button className="w-full py-1.5 px-3 rounded-md bg-[#D1FE17] text-black font-semibold text-[11px] hover:bg-[#bbf00e] transition-colors flex items-center justify-center gap-1.5">
            <span>Join Campaign</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      id: 'pages',
      icon: Smartphone,
      title: 'Build & Manage Pages',
      audience: 'For Beginners',
      priority: 'medium',
      description: 'Launch a faceless page from scratch or optimize an existing one — niche, setup, scheduling, all handled.',
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">CREATE YOUR PAGE</span>
            <span className="text-[10px] text-[#D1FE17] font-mono">Step 1/3</span>
          </div>

          <div className="my-1.5">
            <div className="text-[10px] text-neutral-400 mb-1.5 font-medium">Choose your niche:</div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="px-2 py-1.5 rounded bg-neutral-800 text-neutral-400 text-[10px] text-center font-medium">
                Fitness
              </div>
              <div className="px-2 py-1.5 rounded bg-[#D1FE17]/20 border border-[#D1FE17]/60 text-[#D1FE17] text-[10px] text-center font-semibold flex items-center justify-center gap-1">
                <span>Motivation</span>
                <Check className="w-2.5 h-2.5" />
              </div>
              <div className="px-2 py-1.5 rounded bg-neutral-800 text-neutral-400 text-[10px] text-center font-medium">
                Business
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="text-[10px] text-neutral-400 mb-1 font-medium">Page Handle:</div>
            <div className="w-full px-2 py-1 rounded bg-neutral-800/80 border border-neutral-700 font-mono text-neutral-300 text-[11px]">
              @mindset.velocity
            </div>
          </div>

          <button className="w-full py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black font-semibold text-[10px] transition-colors flex items-center justify-center gap-1">
            <span>Launch Page</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      id: 'discover',
      icon: Search,
      title: 'Discover & Create',
      audience: 'For Creators',
      priority: 'medium',
      description: 'Find trending formats, viral hooks, and winning niches — then generate scripts, captions, and content in seconds.',
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <span className="text-orange-400 font-bold text-[10px]">TRENDING NOW 🔥</span>
            </div>
            <span className="font-mono text-[#D1FE17] font-bold text-[11px]">2.4M Views</span>
          </div>

          <div className="my-2 bg-neutral-800/50 p-2 rounded border border-neutral-700/50">
            <p className="text-white font-medium text-[11px] italic mb-1">
              "Nobody tells you this about starting a creator agency in 2026..."
            </p>
            <div className="text-[10px] text-neutral-400">
              Why it's working: <strong className="text-neutral-200">Strong curiosity hook</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-[10px] flex items-center justify-center gap-1">
              <Bookmark className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button className="flex-1 py-1.5 rounded bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-semibold text-[10px] flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Create</span>
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'monetize',
      icon: ShoppingBag,
      title: 'Monetize Your Audience',
      audience: 'For Scaling Creators',
      priority: 'medium',
      description: "Sell digital products, run your store, and even resell Vyralify's AI under your own brand.",
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">YOUR STORE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-1.5">
            <div className="bg-neutral-800/50 p-2 rounded border border-neutral-700/40">
              <div className="text-[9px] text-neutral-400 uppercase">Revenue</div>
              <div className="text-sm font-bold text-white font-mono">₹24,950</div>
            </div>
            <div className="bg-neutral-800/50 p-2 rounded border border-neutral-700/40">
              <div className="text-[9px] text-neutral-400 uppercase">Sales</div>
              <div className="text-sm font-bold text-white font-mono">52</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-1.5 rounded bg-neutral-800/30 border border-neutral-800 text-[10px]">
            <span className="text-neutral-400">Recent Sale:</span>
            <span className="text-[#D1FE17] font-semibold">+ ₹499 Digital Product</span>
          </div>

          <button className="w-full mt-1.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-[10px] transition-colors flex items-center justify-center gap-1">
            <span>View Store</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      id: 'growth',
      icon: TrendingUp,
      title: 'Growth Intelligence',
      audience: 'For Everyone',
      priority: 'medium',
      description: "Track performance, spot what's working, and get AI-recommended next moves — automatically.",
      renderMockup: () => (
        <div className="h-full w-full bg-neutral-900/95 dark:bg-black/95 p-4 flex flex-col justify-between text-xs text-white border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">CONTENT PERFORMANCE</span>
            <span className="text-[10px] text-emerald-400 font-mono">+48.2% Views</span>
          </div>

          <div className="grid grid-cols-3 gap-1 my-1 text-center font-mono">
            <div className="bg-neutral-800/40 p-1 rounded">
              <div className="text-[9px] text-neutral-400">Views</div>
              <div className="text-[10px] font-bold text-emerald-400">+48.2%</div>
            </div>
            <div className="bg-neutral-800/40 p-1 rounded">
              <div className="text-[9px] text-neutral-400">Engage</div>
              <div className="text-[10px] font-bold text-[#D1FE17]">+31.4%</div>
            </div>
            <div className="bg-neutral-800/40 p-1 rounded">
              <div className="text-[9px] text-neutral-400">Followers</div>
              <div className="text-[10px] font-bold text-emerald-400">+12.8%</div>
            </div>
          </div>

          <div className="bg-neutral-800/40 p-1.5 rounded border border-neutral-700/40 text-[10px]">
            <div className="text-[9px] font-mono text-neutral-400 mb-1">WHY THIS REEL WORKED</div>
            <div className="flex items-center gap-1 text-neutral-300 text-[9px]">
              <Check className="w-2.5 h-2.5 text-[#D1FE17]" />
              <span>Strong first 2s · Retention &gt;74%</span>
            </div>
            <div className="text-[9px] text-[#D1FE17] font-semibold mt-1">
              Next move: Create 3 variations
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="relative py-20 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-hidden">
      
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#D1FE17]/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 01. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>What's Inside</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
            One Platform. Everything You Need.
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            From building your first page to discovering clipping opportunities and getting paid — every tool lives right here.
          </p>
        </div>

        {/* 02. FEATURE GRID (Desktop 3x2, Tablet 2x3, Mobile 1x6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isHighest = card.priority === 'highest';
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group rounded-2xl overflow-hidden bg-neutral-50 dark:bg-[#0B0B0D] border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                  isHighest 
                    ? 'border-neutral-300 dark:border-[#D1FE17]/40 hover:border-[#D1FE17]' 
                    : 'border-neutral-200 dark:border-[#202025] hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                {/* Product Screenshot / Mockup Crop (~16:9) */}
                <div className="h-48 w-full bg-neutral-900 overflow-hidden relative border-b border-neutral-200 dark:border-[#1E1E24]">
                  {card.renderMockup()}
                </div>

                {/* Card Content Anatomy */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* [ICON] FEATURE TITLE */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-[#1C1C22] text-black dark:text-[#D1FE17] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* Short benefit-focused description */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                  </div>

                  {/* Audience Tag */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 text-[11px] font-medium">
                      {card.audience}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 group-hover:text-[#D1FE17] transition-colors flex items-center gap-1">
                      Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 07. BOTTOM OF SECTION: Subtle visual transition */}
        <div className="text-center">
          <a
            href="#clip-and-earn"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-[#D1FE17] transition-colors cursor-pointer group"
          >
            <span>See Everything Inside</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
