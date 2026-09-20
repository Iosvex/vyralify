import React from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Target, 
  Smartphone, 
  Search, 
  ShoppingBag, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Sparkles, 
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
      priority: 'Highest',
      description: 'Your 24/7 growth co-pilot — tells you what to post, why content worked or flopped, and what to do next.',
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3CEB75] animate-pulse" />
              <span className="font-mono text-[10px] text-neutral-400">AI CO-PILOT ACTIVE</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">1.2s ago</span>
          </div>

          <div className="bg-[#16181F] rounded-xl p-3 my-2 border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[#3CEB75] font-semibold text-xs mb-1">
              <span>Post this Reel format next</span>
              <span>🔥</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Your storytelling Reels are outperforming your other formats by +142%. Try this 3-second pattern interrupt variation next...
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#3CEB75] text-black font-bold text-[10px] hover:bg-[#34D368] transition-colors flex items-center justify-center gap-1 cursor-pointer">
              <Sparkles className="w-3 h-3" />
              <span>Create Variation</span>
            </button>
            <button className="py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-300 font-medium text-[10px] transition-colors cursor-pointer">
              Find Similar
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'campaigns',
      icon: Target,
      title: 'Campaigns & Clipping',
      audience: 'For Clippers',
      priority: 'High',
      description: 'No page? No problem. Join brand campaigns, clip content, and get paid per verified view.',
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[9px] font-bold tracking-wider">
                LIVE CAMPAIGN
              </span>
              <span className="text-neutral-300 text-[11px] font-medium">FinFlow Wealth</span>
            </div>
            <span className="text-[#3CEB75] font-mono font-bold text-xs">$5 / 1K Views</span>
          </div>

          <div className="flex items-center gap-3 my-2 bg-[#16181F] p-2.5 rounded-xl border border-white/[0.06]">
            <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0 relative overflow-hidden">
              <Play className="w-5 h-5 text-white/80 fill-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-neutral-200 font-medium text-[11px] truncate">Ep. 42: How Fintech Brands Scale</div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400 font-mono">
                <span>Verified: <strong className="text-white">12,400 views</strong></span>
              </div>
            </div>
          </div>

          <button className="w-full py-1.5 px-3 rounded-lg bg-[#3CEB75] text-black font-bold text-[11px] hover:bg-[#34D368] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
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
      priority: 'Medium',
      description: 'Launch a faceless page from scratch or optimize an existing one — niche, setup, scheduling, all handled.',
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">CREATE YOUR PAGE</span>
            <span className="text-[10px] text-[#3CEB75] font-mono">Step 1/3</span>
          </div>

          <div className="my-1.5">
            <div className="text-[10px] text-neutral-400 mb-1.5 font-medium">Choose your niche:</div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="px-2 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-[10px] text-center font-medium">
                Fitness
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-[#3CEB75]/15 border border-[#3CEB75]/50 text-[#3CEB75] text-[10px] text-center font-bold flex items-center justify-center gap-1">
                <span>Motivation</span>
                <Check className="w-2.5 h-2.5" />
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-[10px] text-center font-medium">
                Business
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="text-[10px] text-neutral-400 mb-1 font-medium">Page Name:</div>
            <div className="w-full px-2.5 py-1.5 rounded-lg bg-[#16181F] border border-white/[0.08] font-mono text-neutral-300 text-[11px]">
              @mindset.velocity
            </div>
          </div>

          <button className="w-full py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
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
      priority: 'Medium',
      description: 'Find trending formats, viral hooks, and winning niches — then generate scripts, captions, and content in seconds.',
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <span className="text-orange-400 font-bold text-[10px]">TRENDING NOW 🔥</span>
            </div>
            <span className="font-mono text-[#3CEB75] font-bold text-[11px]">2.4M Views</span>
          </div>

          <div className="my-2 bg-[#16181F] p-2.5 rounded-xl border border-white/[0.06]">
            <p className="text-white font-medium text-[11px] italic mb-1">
              "Nobody tells you this about starting a creator agency in 2026..."
            </p>
            <div className="text-[10px] text-neutral-400">
              Why it's working: <strong className="text-[#3CEB75]">Strong curiosity hook</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-300 font-medium text-[10px] flex items-center justify-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-[#3CEB75] hover:bg-[#34D368] text-black font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer">
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
      priority: 'Medium',
      description: "Sell digital products, run your store, and even resell Vyralify's AI under your own brand.",
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">YOUR STORE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-1.5">
            <div className="bg-[#16181F] p-2 rounded-xl border border-white/[0.06]">
              <div className="text-[9px] text-neutral-400 uppercase font-mono">Revenue</div>
              <div className="text-sm font-bold text-white font-mono">₹24,950</div>
            </div>
            <div className="bg-[#16181F] p-2 rounded-xl border border-white/[0.06]">
              <div className="text-[9px] text-neutral-400 uppercase font-mono">Sales</div>
              <div className="text-sm font-bold text-white font-mono">52</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-[10px]">
            <span className="text-neutral-400">Recent Sale:</span>
            <span className="text-[#3CEB75] font-semibold">+ ₹499 Digital Product</span>
          </div>

          <button className="w-full mt-1.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
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
      priority: 'Medium',
      description: "Track performance, spot what's working, and get AI-recommended next moves — automatically.",
      renderMockup: () => (
        <div className="h-full w-full bg-[#0D0E12] p-4 flex flex-col justify-between text-xs text-white select-none">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">CONTENT PERFORMANCE</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">+48.2%</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 my-1 text-center font-mono">
            <div className="bg-[#16181F] p-1.5 rounded-lg">
              <div className="text-[8px] text-neutral-400">Views</div>
              <div className="text-[10px] font-bold text-emerald-400">+48.2%</div>
            </div>
            <div className="bg-[#16181F] p-1.5 rounded-lg">
              <div className="text-[8px] text-neutral-400">Engage</div>
              <div className="text-[10px] font-bold text-[#3CEB75]">+31.4%</div>
            </div>
            <div className="bg-[#16181F] p-1.5 rounded-lg">
              <div className="text-[8px] text-neutral-400">Followers</div>
              <div className="text-[10px] font-bold text-emerald-400">+12.8%</div>
            </div>
          </div>

          <div className="bg-[#16181F] p-2 rounded-xl border border-white/[0.06] text-[10px]">
            <div className="text-[9px] font-mono text-neutral-400 mb-0.5">WHY THIS REEL WORKED</div>
            <div className="text-neutral-300 text-[9px] flex items-center gap-1">
              <Check className="w-2.5 h-2.5 text-[#3CEB75]" />
              <span>Strong first 2 seconds · High retention</span>
            </div>
          </div>

          <button className="w-full mt-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
            <span>Next Move: Create 3 Variations</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )
    }
  ];

  return (
    <section 
      id="features" 
      className="relative py-24 sm:py-32 bg-white text-neutral-900 border-t border-neutral-200 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 01. SECTION HEADER (PDF Page 7 & 8) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3CEB75]" />
            <span>What's Inside</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neutral-900 tracking-tight leading-tight mb-5">
            One Platform. Everything You Need.
          </h2>

          <p className="text-neutral-500 font-inter text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From building your first page to discovering clipping opportunities and getting paid — every tool lives right here.
          </p>
        </div>

        {/* 02. FEATURE GRID (PDF Page 8: 3×2 Desktop, 2×3 Tablet, 1×6 Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Real Product Screenshot Area (~16:9 crop) */}
                <div className="h-[210px] w-full border-b border-neutral-100 relative overflow-hidden bg-[#0D0E12]">
                  {card.renderMockup()}
                </div>

                {/* Card Content Anatomy (Icon + Title + Description + Audience Tag) */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Icon + Title */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 group-hover:bg-[#3CEB75] group-hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-headline font-bold text-lg text-neutral-900 tracking-tight group-hover:text-black">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-500 font-inter text-xs sm:text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                  </div>

                  {/* Audience Tag */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                      {card.audience}
                    </span>
                    <span className="text-xs text-neutral-400 group-hover:text-black transition-colors">
                      Learn more →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 07. BOTTOM OF SECTION (PDF Page 16: Visual transition into next section) */}
        <div className="text-center pt-4">
          <a
            href="#clip-and-earn"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-inter font-semibold text-neutral-600 hover:text-black group transition-colors cursor-pointer"
          >
            <span className="group-hover:underline underline-offset-4">See Everything Inside</span>
            <ArrowDown className="w-4 h-4 text-emerald-600 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
