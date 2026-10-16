import React from 'react';
import { 
  Bot, 
  Search, 
  Zap, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

/**
 * Section 07: WHAT'S INSIDE / BENEFITS GRID
 * Specification:
 * - Background: #F9F9F9
 * - Section Label: "WHAT'S INSIDE" — 12px, #23E598, uppercase, centered
 * - Headline: "One Platform. Everything You Need." — 40px, 700, #0A0A0A, centered
 * - Subheading: "From building your first page to automating your DMs and selling your products — every tool lives right here, connected." — 16px, #666666, centered, max 600px
 * - 4 Cards — 2x2 grid desktop, 1 column mobile
 * - Card Background: #FFFFFF, Border: 1px #EBEBEB, Radius: 12px, Padding: 28px
 * - Real product screenshot top (16:9, radius 8px, actual UI screenshot — Rule 4)
 * - Icon (20px) + Module name (16px, 600, #0A0A0A)
 * - Outcome-first description (Rule 2): 14px, #666666, 2 lines
 * - Audience chip: "For Everyone" / "For Creators" / "For Scaling Creators" (12px chip, bottom)
 * - Hover: translateY(-4px), box-shadow appears, border lightens to #D0D0D0, 150ms ease
 * - Bottom Text: "Explore all features →" — 14px, #23E598, centered text link (links smoothly to Pricing)
 */

export default function BenefitsGrid({ onExploreAll }) {
  const cards = [
    {
      id: 'ai',
      icon: Bot,
      name: 'Vyralify AI Assistant',
      desc: 'Your personal Instagram growth co-pilot — analyzes your real metrics, tells you what to post next, and explains why every Reel worked or flopped.',
      chip: 'For Everyone',
      renderScreenshot: () => (
        <div className="w-full aspect-video bg-[#0D1017] rounded-lg p-3 sm:p-4 border border-white/[0.08] flex flex-col justify-between overflow-hidden shadow-inner text-[11px] font-mono select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[#23E598] font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vyralify AI Assistant</span>
            </div>
            <span className="text-[10px] text-neutral-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/5">
              Synced with Meta API
            </span>
          </div>

          {/* Chat Stream Simulation */}
          <div className="space-y-2 my-auto">
            {/* User Bubble */}
            <div className="flex justify-end">
              <div className="bg-[#1C2130] text-neutral-200 px-2.5 py-1.5 rounded-lg rounded-tr-none text-[11px] max-w-[85%] font-sans">
                "Why did my last Reel underperform?"
              </div>
            </div>

            {/* AI Response Card */}
            <div className="bg-[#131722] border border-white/[0.08] text-neutral-300 p-2.5 rounded-lg rounded-tl-none space-y-1 font-sans text-[11px] leading-tight">
              <div className="text-white font-medium">
                Last Reel: <span className="text-[#23E598] font-mono">12.4K views</span> (64% below your 34.2K average).
              </div>
              <div className="text-[10px] text-neutral-400 space-y-0.5">
                <div>• Retention dropped at 0:04 before payoff</div>
                <div>• Voiceover format up <span className="text-[#23E598] font-bold">+320%</span> in your niche this week</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
            <span className="px-2 py-1 rounded bg-[#23E598]/15 text-[#23E598] border border-[#23E598]/30 font-semibold text-[10px]">
              Create Voiceover Variation
            </span>
            <span className="px-2 py-1 rounded bg-white/[0.05] text-neutral-400 text-[10px]">
              View Full Analytics
            </span>
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
      renderScreenshot: () => (
        <div className="w-full aspect-video bg-[#0D1017] rounded-lg p-3 sm:p-4 border border-white/[0.08] flex flex-col justify-between overflow-hidden shadow-inner text-[11px] font-mono select-none">
          {/* Top Filter Chips */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#23E598] text-black font-bold">
                Finance &amp; Wealth
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-neutral-400">
                Top 1% Reels
              </span>
            </div>
            <span className="text-[10px] text-[#23E598]">Trending 48h</span>
          </div>

          {/* Side-by-Side: Trending Post + Hook Generator */}
          <div className="grid grid-cols-2 gap-2 my-auto">
            {/* Viral Sample Card */}
            <div className="p-2 rounded bg-[#131722] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="text-[9px] text-neutral-400 uppercase">Viral Score: 98/100</div>
                <div className="text-white font-sans text-[11px] font-semibold mt-0.5 line-clamp-2">
                  "Stop saving money in a traditional bank in 2026..."
                </div>
              </div>
              <div className="text-[10px] text-[#23E598] font-bold mt-1">1.2M views &bull; 8.4% share</div>
            </div>

            {/* Generated Hook Output */}
            <div className="p-2 rounded bg-[#131722] border border-[#23E598]/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#23E598] uppercase font-bold">Hook #04</span>
                  <span className="text-[9px] bg-white/[0.05] text-neutral-300 px-1 rounded">Curiosity</span>
                </div>
                <div className="text-neutral-200 font-sans text-[11px] mt-0.5 leading-snug">
                  "The banking trick high-earners use to protect liquid cash..."
                </div>
              </div>
              <div className="text-[10px] text-[#23E598] font-semibold mt-1 flex items-center justify-between">
                <span>Copy Script</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px] text-neutral-400">
            <span>Discover &rarr; Create Hook Pipeline</span>
            <span className="text-white font-semibold">4 Hooks Generated</span>
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
      renderScreenshot: () => (
        <div className="w-full aspect-video bg-[#0D1017] rounded-lg p-3 sm:p-4 border border-white/[0.08] flex flex-col justify-between overflow-hidden shadow-inner text-[11px] font-mono select-none">
          {/* Top Automation Status */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#23E598] animate-pulse inline-block" />
              <span className="text-[11px]">Workflow: Auto DM &amp; Link</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              Meta Safe Active
            </span>
          </div>

          {/* Trigger → Action Flow UI */}
          <div className="space-y-1.5 my-auto">
            <div className="flex items-center gap-2 p-2 rounded bg-[#131722] border border-white/[0.06]">
              <span className="text-[10px] bg-white/[0.08] text-white px-1.5 py-0.5 rounded font-bold">TRIGGER</span>
              <span className="text-white font-sans text-[11px]">Comment contains keyword:</span>
              <span className="text-[#23E598] font-bold bg-[#23E598]/10 px-1.5 py-0.5 rounded">"BLUEPRINT"</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded bg-[#131722] border border-[#23E598]/20">
              <span className="text-[10px] bg-[#23E598]/20 text-[#23E598] px-1.5 py-0.5 rounded font-bold">ACTION</span>
              <span className="text-neutral-200 font-sans text-[11px] truncate">
                Instant DM: "Hey! Here is your private blueprint link: vyralify.me/blueprint 🚀"
              </span>
            </div>
          </div>

          {/* Conversion Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px]">
            <span className="text-neutral-400">Pace: 30 DMs/hr (Anti-Spam)</span>
            <span className="text-[#23E598] font-bold font-sans">⚡ New Sale: ₹499 (Just now)</span>
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
      renderScreenshot: () => (
        <div className="w-full aspect-video bg-[#0D1017] rounded-lg p-3 sm:p-4 border border-white/[0.08] flex flex-col justify-between overflow-hidden shadow-inner text-[11px] font-mono select-none">
          {/* Top Profile Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#23E598] to-emerald-400 flex items-center justify-center text-black font-bold text-[9px]">
                V
              </div>
              <span className="text-white font-bold text-[11px]">vyralify.me/creator</span>
            </div>
            <span className="text-[10px] text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded">
              1-Click UPI / Card
            </span>
          </div>

          {/* Storefront Product Preview */}
          <div className="grid grid-cols-2 gap-2 my-auto">
            <div className="p-2 rounded bg-[#131722] border border-white/[0.06]">
              <div className="text-[9px] text-neutral-400 uppercase">Featured Guide</div>
              <div className="text-white font-sans text-[11px] font-semibold mt-0.5">
                Faceless Playbook 2026
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-[#23E598] font-bold">₹499</span>
                <span className="text-neutral-400">PDF + Audio</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#131722] border border-white/[0.06]">
              <div className="text-[9px] text-neutral-400 uppercase">30-Min Strategy</div>
              <div className="text-white font-sans text-[11px] font-semibold mt-0.5">
                1-on-1 Page Audit Call
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-[#23E598] font-bold">₹2,499</span>
                <span className="text-neutral-400">Calendly Synced</span>
              </div>
            </div>
          </div>

          {/* Revenue Performance Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px]">
            <span className="text-neutral-400">Total Store Volume:</span>
            <span className="text-[#23E598] font-bold">₹42,850 (30d) &bull; 100% Margin</span>
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

        {/* 3. CARDS: 4 CARDS — 2x2 GRID DESKTOP, 1 COL MOBILE (SPEC RULE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1040px] mx-auto mb-12">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="p-7 rounded-xl bg-[#FFFFFF] border border-[#EBEBEB] hover:border-[#D0D0D0] hover:-translate-y-1 hover:shadow-lg transition-all duration-150 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  {/* Real Product Screenshot Mockup on Top (16:9 aspect ratio, Rule 4) */}
                  <div className="mb-5 overflow-hidden rounded-lg shadow-sm">
                    {c.renderScreenshot()}
                  </div>

                  {/* Icon (20px) + Module Name (16px, 600, #0A0A0A) */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#23E598]/10 text-[#23E598] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
                      {c.name}
                    </h3>
                  </div>

                  {/* Outcome-First Description (Rule 2): 14px, #666666, 2 lines */}
                  <p className="text-[14px] text-[#666666] leading-relaxed line-clamp-2">
                    {c.desc}
                  </p>
                </div>

                {/* Audience Tag Chip (12px chip, bottom) */}
                <div className="mt-6 pt-3.5 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-[12px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#555555] border border-[#E5E5E5]">
                    {c.chip}
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById(`${c.id}-spotlight`) || document.getElementById('pricing');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[12px] font-bold text-[#16A34A] group-hover:text-[#23E598] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. BOTTOM TEXT LINK: "Explore all features →" — 14px, #23E598, centered text link */}
        <div className="text-center">
          <button
            onClick={() => {
              if (onExploreAll) {
                onExploreAll();
              } else {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[14px] font-bold text-[#23E598] hover:underline cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Explore all features</span>
            <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}
