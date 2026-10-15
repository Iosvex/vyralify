import React from 'react';
import { 
  Bot, 
  Search, 
  Zap, 
  ShoppingBag, 
  Rocket, 
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function BenefitsGrid({ onExploreAll }) {
  const cards = [
    {
      id: 'ai',
      icon: Bot,
      name: 'Vyralify AI Assistant',
      desc: 'Your personal Instagram growth co-pilot — analyzes your real metrics, tells you what to post next, and explains why every Reel worked or flopped.',
      chip: 'For Everyone',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="flex items-center justify-between text-neutral-400 pb-1.5 border-b border-white/[0.06]">
            <span className="flex items-center gap-1 text-[#23E598]">
              <Sparkles className="w-3 h-3" /> Growth Co-Pilot
            </span>
            <span>Live Analysis</span>
          </div>
          <div className="space-y-1 text-neutral-300">
            <div className="text-white font-semibold">User: "Why did my last reel stall at 1.2K?"</div>
            <div className="text-[#23E598] font-sans text-[11px]">
              &bull; Hook dropped retention at 0:03. Switched to curiosity angle (+180% forecast).
            </div>
          </div>
          <div className="bg-[#1A1D28] px-2 py-1 rounded text-neutral-400 text-[10px] flex items-center justify-between">
            <span>[Create Variation]</span>
            <span className="text-[#23E598] font-bold">&rarr;</span>
          </div>
        </div>
      )
    },
    {
      id: 'discover',
      icon: Search,
      name: 'Discover & Create',
      desc: "Find what's going viral in your niche right now — then generate hooks, scripts, and captions that actually perform, in seconds.",
      chip: 'For Creators',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-white font-bold">Niche: Finance &amp; Wealth</span>
            <span className="text-[#23E598] text-[10px] bg-[#23E598]/10 px-1.5 py-0.5 rounded">Trending 48h</span>
          </div>
          <div className="space-y-1 text-neutral-300">
            <div className="text-neutral-400 text-[10px]">Top Hook Formula #04:</div>
            <div className="text-white font-sans text-[11px] leading-tight font-medium">
              "Stop saving money in a traditional bank in 2026..."
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/[0.06]">
            <span>6 Variations Ready</span>
            <span className="text-[#23E598] font-semibold">Generate Script &rarr;</span>
          </div>
        </div>
      )
    },
    {
      id: 'automation',
      icon: Zap,
      name: 'Instagram Automation',
      desc: "Comment LINK, get a DM — automatically. Set up once and watch Vyralify turn every comment and story reply into a lead or sale while you're not watching.",
      chip: 'For Everyone',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="flex items-center justify-between text-neutral-400 pb-1.5 border-b border-white/[0.06]">
            <span className="text-[#23E598] font-bold">Trigger: "BLUEPRINT"</span>
            <span className="text-[10px] text-emerald-400">Meta Safe 30/hr</span>
          </div>
          <div className="space-y-1 text-neutral-300 font-sans">
            <div className="text-neutral-400 text-[10px] font-mono">Follower: "BLUEPRINT"</div>
            <div className="text-white text-[11px] bg-white/[0.05] p-1.5 rounded">
              "Hey! Here is your private access link: vyralify.in/blueprint"
            </div>
          </div>
          <div className="text-[10px] text-[#23E598] font-bold flex items-center justify-between">
            <span>Sale Converted (+₹499)</span>
            <span>2s ago</span>
          </div>
        </div>
      )
    },
    {
      id: 'store',
      icon: ShoppingBag,
      name: 'Store & Commerce',
      desc: 'One link in your bio — your full storefront. Sell digital products, guides, and services directly to your audience with zero extra tools or monthly fees.',
      chip: 'For Scaling Creators',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="flex items-center justify-between text-neutral-400 pb-1.5 border-b border-white/[0.06]">
            <span className="text-white font-bold">vyralify.me/creator</span>
            <span className="text-[#23E598] text-[10px]">1-Click Checkout</span>
          </div>
          <div className="space-y-1 text-neutral-300 font-sans">
            <div className="flex items-center justify-between bg-white/[0.04] p-1.5 rounded text-[11px]">
              <span className="text-white font-medium">Faceless Playbook 2026</span>
              <span className="text-[#23E598] font-bold font-mono">₹499</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
            <span>Instant Digital Delivery</span>
            <span className="text-[#23E598]">100% Margin</span>
          </div>
        </div>
      )
    },
    {
      id: 'builder',
      icon: Rocket,
      name: 'Page Builder',
      desc: 'Build the right page from day one — pick a niche, set up your bio and positioning, or audit the page you already have.',
      chip: 'For Beginners',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="flex items-center justify-between text-neutral-400 pb-1.5 border-b border-white/[0.06]">
            <span className="text-white font-bold">Niche Radar Score</span>
            <span className="text-[#23E598] font-bold">96/100 Profitability</span>
          </div>
          <div className="space-y-1 text-neutral-300 font-sans">
            <div className="text-[11px] text-white">Selected: Business &amp; Wealth (High CPM)</div>
            <div className="text-[10px] text-neutral-400">Bio generated: "Stoic wealth models &amp; internet leverage."</div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
            <span>Page Health: 84/100</span>
            <span className="text-[#23E598]">Audit Passed &rarr;</span>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      name: 'Dashboard & Analytics',
      desc: 'See followers, views and revenue in one place, with AI suggestions on what to do next.',
      chip: 'For Everyone',
      renderPreview: () => (
        <div className="w-full h-36 bg-[#0E1017] rounded-lg p-3 border border-white/[0.08] flex flex-col justify-between text-[11px] font-mono">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/[0.04] p-1.5 rounded">
              <span className="text-[9px] text-neutral-400 block">7d Views</span>
              <span className="text-sm font-bold text-white">184.5K</span>
            </div>
            <div className="bg-white/[0.04] p-1.5 rounded">
              <span className="text-[9px] text-neutral-400 block">30d Revenue</span>
              <span className="text-sm font-bold text-[#23E598]">₹42,850</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/[0.06]">
            <span>Meta Graph Active</span>
            <span className="text-[#23E598]">Verified Data &rarr;</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      id="benefits"
      className="relative w-full bg-[#F9F9F9] py-24 text-[#0A0A0A] select-none border-b border-[#EBEBEB]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20">
        
        {/* 1. SECTION LABEL: WHAT'S INSIDE */}
        <div className="text-center mb-3">
          <span className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em]">
            WHAT'S INSIDE
          </span>
        </div>

        {/* 2. HEADLINE & SUBHEADING */}
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <h2 className="text-3xl sm:text-[40px] font-bold text-[#0A0A0A] leading-tight tracking-tight">
            One Platform. Everything You Need.
          </h2>
          <p className="text-[16px] text-[#666666] leading-relaxed mt-4 font-normal">
            From building your first page to automating your DMs and selling your products — every tool lives right here, connected.
          </p>
        </div>

        {/* 3. CARDS: 3x2 GRID DESKTOP, 1 COL MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="p-7 rounded-xl bg-[#FFFFFF] border border-[#EBEBEB] hover:border-[#D0D0D0] hover:-translate-y-1 transition-all duration-150 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Real Product Screenshot Mockup on Top (16:9 crop) */}
                  <div className="mb-5 overflow-hidden rounded-lg shadow-inner">
                    {c.renderPreview()}
                  </div>

                  {/* Icon + Module Name */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#23E598]/10 text-[#23E598] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#0A0A0A]">
                      {c.name}
                    </h3>
                  </div>

                  {/* Description (Rule 2 Outcome-first) */}
                  <p className="text-[14px] text-[#666666] leading-relaxed line-clamp-2">
                    {c.desc}
                  </p>
                </div>

                {/* Audience Tag Chip */}
                <div className="mt-5 pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#666666] border border-[#E5E5E5]">
                    {c.chip}
                  </span>
                  <span className="text-[11px] font-semibold text-[#16A34A] flex items-center gap-1">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. BOTTOM LINK */}
        <div className="text-center">
          <button
            onClick={() => {
              if (onExploreAll) onExploreAll();
              else {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[14px] font-bold text-[#16A34A] hover:underline cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Explore all features &amp; comparison</span>
            <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}
