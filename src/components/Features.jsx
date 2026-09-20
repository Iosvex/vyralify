import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Flame, 
  Bookmark, 
  TrendingUp,
  Search,
  Filter,
  Plus
} from 'lucide-react';

export default function Features() {
  const cards = [
    {
      number: '01',
      title: 'Vyralify AI',
      tagline: 'Chat. Plan. Grow.',
      audience: 'For Everyone',
      audienceBadgeClass: 'bg-[#EAF7EE] text-[#16A34A] border-[#DCFCE7]',
      description: 'Your 24/7 growth co-pilot — tells you what to post, why content worked or flopped, and what to do next.',
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-[#3CEB75] font-bold text-[10px]">
                <span>✦</span>
                <span className="text-white text-[9px]">Vyralify AI</span>
              </div>
              <div className="px-2 py-1 rounded-md bg-[#3CEB75] text-black font-bold text-[9px] flex items-center justify-center gap-1 shadow-xs cursor-pointer">
                <Plus className="w-2.5 h-2.5" />
                <span>New Chat</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="flex items-center gap-1 hover:text-white cursor-pointer">🔎 Discover</div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer">📊 Analyze</div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer">✍️ Create</div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer">💰 Monetize</div>
              </div>
            </div>
            <div className="text-[8px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer">
              <span>⚡ Upgrade</span>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            {/* User message */}
            <div className="flex justify-end mb-1.5">
              <div className="bg-[#181A22] border border-white/[0.08] rounded-xl px-2.5 py-1 text-[9px] text-neutral-200">
                What should I post next?
              </div>
            </div>

            {/* AI response box */}
            <div className="bg-[#12141C] border border-white/[0.06] rounded-xl p-2 space-y-1.5">
              <p className="text-[9px] text-neutral-300 leading-tight">
                Based on your recent performance, your storytelling Reels are getting <strong className="text-[#3CEB75]">2.4x more reach</strong> than average.
              </p>
              <div className="text-[8px] text-neutral-400 space-y-0.5">
                <div>1. Create a variation of your "day in the life" format</div>
                <div>2. Use a stronger 2-second hook</div>
                <div>3. Post at 7:30 PM (best time for your audience)</div>
              </div>

              {/* Storytelling Hook Card */}
              <div className="bg-[#1A1D27] rounded-lg p-1.5 flex items-center justify-between border border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-neutral-400">
                    0:28
                  </div>
                  <div>
                    <div className="text-[8px] text-neutral-400 font-medium">Storytelling Hook</div>
                    <div className="text-[8px] text-white font-semibold italic">"Nobody talks about this..."</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <button className="flex-1 py-1 rounded-md bg-[#3CEB75] text-black font-bold text-[9px] hover:bg-[#34D368] transition-colors cursor-pointer text-center">
                Create Variation
              </button>
              <button className="py-1 px-2 rounded-md bg-white/10 hover:bg-white/15 text-neutral-300 text-[9px] transition-colors cursor-pointer">
                Find Similar
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'Campaigns & Clipping',
      tagline: 'Clip. Post. Get Paid.',
      audience: 'For Clippers',
      audienceBadgeClass: 'bg-[#FEFCE8] text-[#CA8A04] border-[#FEF08A]',
      description: 'No page? No problem. Join brand campaigns, clip content, and get paid per verified view.',
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-white font-bold text-[9px]">
                <span>Vyralify</span>
              </div>
              <div className="px-1.5 py-1 rounded-md bg-[#3CEB75]/15 text-[#3CEB75] font-bold text-[9px] flex items-center gap-1">
                <span>🎯 Campaigns</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="hover:text-white cursor-pointer">📁 My Submissions</div>
                <div className="hover:text-white cursor-pointer">💰 Earnings</div>
                <div className="hover:text-white cursor-pointer">🏆 Leaderboard</div>
                <div className="hover:text-white cursor-pointer">📖 Resources</div>
              </div>
            </div>
          </div>

          {/* Main Marketplace Area */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <div className="font-bold text-[10px] text-white">Live Campaigns</div>
              <span className="text-[9px] text-neutral-400 hover:text-white cursor-pointer">View All →</span>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 py-1">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[8px]">All</span>
              <span className="px-1.5 py-0.5 rounded bg-[#3CEB75]/20 text-[#3CEB75] border border-[#3CEB75]/40 text-[8px] font-bold">Trending</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 text-[8px]">High Payout</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 text-[8px]">New</span>
            </div>

            {/* Two Campaign Cards */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Card 1: Nike */}
              <div className="bg-[#141620] border border-white/[0.06] rounded-xl p-1.5 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[7px] font-bold mb-1">
                    🔥 Trending
                  </span>
                  <div className="font-bold text-[9px] text-white leading-tight">Nike</div>
                  <div className="text-[8px] text-neutral-400 truncate">Motivation Reels</div>
                  <div className="text-[10px] font-mono font-bold text-[#3CEB75] mt-0.5">$5 / 1K Views</div>
                </div>
                <div className="pt-1 border-t border-white/[0.04] mt-1 flex items-center justify-between text-[7px] text-neutral-400">
                  <span>12,400 views</span>
                  <button className="py-0.5 px-1.5 rounded bg-[#3CEB75] text-black font-bold text-[8px] hover:bg-[#34D368]">
                    Join
                  </button>
                </div>
              </div>

              {/* Card 2: Spotify */}
              <div className="bg-[#141620] border border-white/[0.06] rounded-xl p-1.5 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[7px] font-bold mb-1">
                    Spotify
                  </span>
                  <div className="font-bold text-[9px] text-white leading-tight">Spotify</div>
                  <div className="text-[8px] text-neutral-400 truncate">Music Vibes</div>
                  <div className="text-[10px] font-mono font-bold text-[#3CEB75] mt-0.5">$8 / 1K Views</div>
                </div>
                <div className="pt-1 border-t border-white/[0.04] mt-1 flex items-center justify-between text-[7px] text-neutral-400">
                  <span>34,200 views</span>
                  <button className="py-0.5 px-1.5 rounded bg-[#3CEB75] text-black font-bold text-[8px] hover:bg-[#34D368]">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'Build & Manage Pages',
      tagline: 'Launch. Optimize. Scale.',
      audience: 'For Beginners',
      audienceBadgeClass: 'bg-[#EAF7EE] text-[#16A34A] border-[#DCFCE7]',
      description: 'Launch a faceless page from scratch or optimize an existing one — niche, setup, scheduling, all handled.',
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-white font-bold text-[9px]">
                <span>Vyralify</span>
              </div>
              <div className="px-1.5 py-1 rounded-md bg-[#3CEB75]/15 text-[#3CEB75] font-bold text-[9px] flex items-center gap-1">
                <span>📱 Create Page</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="hover:text-white cursor-pointer">📄 My Pages</div>
                <div className="hover:text-white cursor-pointer">📅 Content Planner</div>
                <div className="hover:text-white cursor-pointer">🤖 Auto Post</div>
                <div className="hover:text-white cursor-pointer">⚙️ Settings</div>
              </div>
            </div>
          </div>

          {/* Main Setup View + Phone Mockup Preview */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <span className="font-bold text-[10px] text-white">Create Your Page</span>
              <span className="text-[8px] text-[#3CEB75] font-mono">1 Niche · 2 Setup</span>
            </div>

            <div className="flex gap-2 my-1">
              {/* Niche choices */}
              <div className="flex-1">
                <div className="text-[8px] text-neutral-400 mb-1">Choose your niche:</div>
                <div className="grid grid-cols-2 gap-1 text-[8px]">
                  <div className="px-1.5 py-1 rounded bg-[#3CEB75]/20 border border-[#3CEB75] text-[#3CEB75] font-bold flex items-center justify-between">
                    <span>Motivation</span>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <div className="px-1.5 py-1 rounded bg-white/5 text-neutral-400 text-center">Fitness</div>
                  <div className="px-1.5 py-1 rounded bg-white/5 text-neutral-400 text-center">Business</div>
                  <div className="px-1.5 py-1 rounded bg-white/5 text-neutral-400 text-center">Finance</div>
                </div>
              </div>

              {/* Phone Preview */}
              <div className="w-24 shrink-0 rounded-lg bg-[#141620] border border-white/[0.1] p-1.5 text-center flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto mb-0.5 ring-1 ring-white/20" />
                  <div className="text-[8px] font-bold text-white truncate">@daily.motivation</div>
                  <div className="text-[6px] text-neutral-400">125K Followers</div>
                </div>
                <div className="grid grid-cols-3 gap-0.5 mt-1">
                  <div className="aspect-square bg-neutral-800 rounded-xs" />
                  <div className="aspect-square bg-neutral-800 rounded-xs" />
                  <div className="aspect-square bg-neutral-800 rounded-xs" />
                </div>
              </div>
            </div>

            <button className="w-full py-1 rounded-md bg-[#3CEB75] text-black font-bold text-[9px] hover:bg-[#34D368] transition-colors cursor-pointer text-center">
              Next Step →
            </button>
          </div>
        </div>
      )
    },
    {
      number: '04',
      title: 'Discover & Create',
      tagline: 'Find Trends. Create Content.',
      audience: 'For Creators',
      audienceBadgeClass: 'bg-[#FEFCE8] text-[#CA8A04] border-[#FEF08A]',
      description: 'Find trending formats, viral hooks, and winning niches — then generate scripts, captions, and content in seconds.',
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-white font-bold text-[9px]">
                <span>Vyralify</span>
              </div>
              <div className="px-1.5 py-1 rounded-md bg-[#3CEB75]/15 text-[#3CEB75] font-bold text-[9px] flex items-center gap-1">
                <span>🔍 Discover</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="hover:text-white cursor-pointer">🔥 Trending</div>
                <div className="hover:text-white cursor-pointer">📦 Viral Database</div>
                <div className="hover:text-white cursor-pointer">🤖 AI Generator</div>
                <div className="hover:text-white cursor-pointer">🔖 Saved</div>
              </div>
            </div>
          </div>

          {/* Viral Discovery Reel Cards */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-[#3CEB75]/20 text-[#3CEB75] text-[8px] font-bold">For You</span>
                <span className="text-[8px] text-neutral-400">Trending</span>
                <span className="text-[8px] text-neutral-400">Most Viral</span>
              </div>
              <span className="text-[8px] text-neutral-400 flex items-center gap-0.5">
                <Filter className="w-2.5 h-2.5" /> Filter
              </span>
            </div>

            {/* 4 Viral Reel Cards */}
            <div className="grid grid-cols-4 gap-1.5 my-1">
              <div className="bg-[#141620] border border-white/[0.06] rounded-lg p-1 flex flex-col justify-between">
                <div className="h-10 rounded bg-neutral-800 flex items-center justify-center text-[8px] text-white/50">
                  <Play className="w-3 h-3 fill-white/80" />
                </div>
                <div className="text-[8px] font-bold text-[#3CEB75] mt-1">2.4M</div>
                <div className="text-[6px] text-neutral-400 truncate">Motivation</div>
              </div>
              <div className="bg-[#141620] border border-white/[0.06] rounded-lg p-1 flex flex-col justify-between">
                <div className="h-10 rounded bg-neutral-800 flex items-center justify-center text-[8px] text-white/50">
                  <Play className="w-3 h-3 fill-white/80" />
                </div>
                <div className="text-[8px] font-bold text-[#3CEB75] mt-1">1.8M</div>
                <div className="text-[6px] text-neutral-400 truncate">Lifestyle</div>
              </div>
              <div className="bg-[#141620] border border-white/[0.06] rounded-lg p-1 flex flex-col justify-between">
                <div className="h-10 rounded bg-neutral-800 flex items-center justify-center text-[8px] text-white/50">
                  <Play className="w-3 h-3 fill-white/80" />
                </div>
                <div className="text-[8px] font-bold text-[#3CEB75] mt-1">890K</div>
                <div className="text-[6px] text-neutral-400 truncate">Mindset</div>
              </div>
              <div className="bg-[#141620] border border-white/[0.06] rounded-lg p-1 flex flex-col justify-between">
                <div className="h-10 rounded bg-neutral-800 flex items-center justify-center text-[8px] text-white/50">
                  <Play className="w-3 h-3 fill-white/80" />
                </div>
                <div className="text-[8px] font-bold text-[#3CEB75] mt-1">1.2M</div>
                <div className="text-[6px] text-neutral-400 truncate">Business</div>
              </div>
            </div>

            <div className="text-[8px] text-neutral-400 bg-white/5 p-1 rounded border border-white/5 flex items-center justify-between">
              <span className="truncate">"Nobody tells you this about success..."</span>
              <button className="px-1.5 py-0.5 rounded bg-[#3CEB75] text-black font-bold text-[7px]">Create</button>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '05',
      title: 'Monetize Your Audience',
      tagline: 'Sell. Earn. Scale.',
      audience: 'For Scaling Creators',
      audienceBadgeClass: 'bg-[#EAF7EE] text-[#16A34A] border-[#DCFCE7]',
      description: "Sell digital products, run your store, and even resell Vyralify's AI under your own brand.",
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-white font-bold text-[9px]">
                <span>Vyralify</span>
              </div>
              <div className="px-1.5 py-1 rounded-md bg-[#3CEB75]/15 text-[#3CEB75] font-bold text-[9px] flex items-center gap-1">
                <span>🛍️ Store</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="hover:text-white cursor-pointer">📦 Products</div>
                <div className="hover:text-white cursor-pointer">🛒 Orders</div>
                <div className="hover:text-white cursor-pointer">👥 Customers</div>
                <div className="hover:text-white cursor-pointer">🤝 Affiliate</div>
              </div>
            </div>
          </div>

          {/* Revenue & Sales Stream */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <div>
                <div className="text-[8px] text-neutral-400 uppercase font-mono">Total Revenue</div>
                <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                  <span>₹24,950</span>
                  <span className="text-[9px] text-[#3CEB75]">↑ 34%</span>
                </div>
              </div>
              <span className="text-[8px] text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">Last 30 days ▾</span>
            </div>

            {/* Recent Sales Table */}
            <div className="space-y-1 my-1">
              <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Recent Sales</div>
              <div className="bg-[#141620] p-1.5 rounded-lg border border-white/[0.04] flex items-center justify-between text-[8px]">
                <div>
                  <div className="text-white font-medium">The Faceless Creator Guide</div>
                  <div className="text-neutral-400 text-[7px]">₹499 · 2 min ago</div>
                </div>
                <div className="text-[#3CEB75] font-mono font-bold">+ ₹499</div>
              </div>
              <div className="bg-[#141620] p-1.5 rounded-lg border border-white/[0.04] flex items-center justify-between text-[8px]">
                <div>
                  <div className="text-white font-medium">Vyralify AI Access (Resell)</div>
                  <div className="text-neutral-400 text-[7px]">₹999 · 14 min ago</div>
                </div>
                <div className="text-[#3CEB75] font-mono font-bold">+ ₹999</div>
              </div>
            </div>

            <button className="w-full py-1 rounded-md bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold text-[8px] transition-colors flex items-center justify-center gap-1 cursor-pointer">
              <span>View Store Dashboard</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )
    },
    {
      number: '06',
      title: 'Growth Intelligence',
      tagline: 'Track. Understand. Grow.',
      audience: 'For Everyone',
      audienceBadgeClass: 'bg-[#FEFCE8] text-[#CA8A04] border-[#FEF08A]',
      description: "Track performance, spot what's working, and get AI-recommended next moves — automatically.",
      renderMockup: () => (
        <div className="h-full w-full flex text-[10px] text-white font-inter select-none">
          {/* Mini Sidebar */}
          <div className="w-24 shrink-0 border-r border-white/[0.08] pr-2 flex flex-col justify-between py-0.5">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-white font-bold text-[9px]">
                <span>Vyralify</span>
              </div>
              <div className="px-1.5 py-1 rounded-md bg-[#3CEB75]/15 text-[#3CEB75] font-bold text-[9px] flex items-center gap-1">
                <span>📊 Analytics</span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[9px]">
                <div className="hover:text-white cursor-pointer">📈 Content</div>
                <div className="hover:text-white cursor-pointer">👥 Audience</div>
                <div className="hover:text-white cursor-pointer">🚀 Growth</div>
                <div className="hover:text-white cursor-pointer">🤖 AI Insights</div>
              </div>
            </div>
          </div>

          {/* Performance Dashboard */}
          <div className="flex-1 pl-3 flex flex-col justify-between py-0.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <div className="flex items-center gap-1 text-[8px]">
                <span className="text-neutral-400">7D</span>
                <span className="px-1 rounded bg-[#3CEB75]/20 text-[#3CEB75] font-bold">30D</span>
                <span className="text-neutral-400">90D</span>
              </div>
              <span className="text-[7px] text-neutral-400">Apr 1 - Apr 30, 2026 ▾</span>
            </div>

            {/* 4 Metrics Tiles */}
            <div className="grid grid-cols-4 gap-1 text-center font-mono text-[7px] my-1">
              <div className="bg-[#141620] p-1 rounded">
                <div className="text-neutral-400">Views</div>
                <div className="font-bold text-white text-[9px]">1.2M</div>
                <div className="text-[#3CEB75] text-[7px]">↑ 48.2%</div>
              </div>
              <div className="bg-[#141620] p-1 rounded">
                <div className="text-neutral-400">Engage</div>
                <div className="font-bold text-white text-[9px]">86.4K</div>
                <div className="text-[#3CEB75] text-[7px]">↑ 31.4%</div>
              </div>
              <div className="bg-[#141620] p-1 rounded">
                <div className="text-neutral-400">Followers</div>
                <div className="font-bold text-white text-[9px]">+12.4K</div>
                <div className="text-[#3CEB75] text-[7px]">↑ 28.1%</div>
              </div>
              <div className="bg-[#141620] p-1 rounded">
                <div className="text-neutral-400">Score</div>
                <div className="font-bold text-white text-[9px]">92/100</div>
                <div className="text-[#3CEB75] text-[7px]">↑ 16%</div>
              </div>
            </div>

            {/* Why this reel worked */}
            <div className="bg-[#141620] p-1.5 rounded-lg border border-white/[0.04] text-[8px] flex items-center justify-between">
              <div>
                <div className="text-[7px] text-neutral-400 font-bold uppercase">Why this Reel worked</div>
                <div className="text-[#3CEB75] text-[7px] flex items-center gap-1">
                  <span>✓ Strong hook</span>
                  <span>✓ High retention</span>
                </div>
              </div>
              <button className="px-2 py-0.5 rounded bg-[#3CEB75] text-black font-bold text-[8px]">
                Create Similar →
              </button>
            </div>
          </div>
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
        
        {/* 01. SECTION HEADER (Matching PDF Page 18 Exactly) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Eyebrow: What's Inside (Soft green pill) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7EE] border border-[#DCFCE7] text-[#16A34A] text-xs font-inter font-semibold tracking-wide mb-5 shadow-2xs">
            <span>What's Inside</span>
          </div>

          {/* Heading: One Platform. Everything You Need. */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neutral-900 tracking-tight leading-tight mb-4">
            One Platform. Everything{' '}
            <span className="text-[#16A34A] sm:text-[#22C55E]">
              You Need.
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-neutral-500 font-inter text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            From building your first page to discovering clipping opportunities and getting paid — every tool lives right here.
          </p>
        </div>

        {/* 02. FEATURE GRID: 3×2 Desktop, 2×3 Tablet, 1×6 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="rounded-3xl bg-white border border-neutral-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-300 transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group"
            >
              {/* TOP BAR OF CARD (Number + Title + Sub-tagline) */}
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-neutral-600 text-[11px] font-mono font-bold">
                    {card.number}
                  </span>
                  <span className="font-headline font-bold text-sm sm:text-base text-neutral-900 tracking-tight">
                    {card.title}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 font-inter">
                  {card.tagline}
                </span>
              </div>

              {/* MOCKUP CONTAINER (Dark framed UI with interactive components) */}
              <div className="rounded-2xl border border-neutral-800/80 bg-[#0B0D13] p-3 sm:p-3.5 h-[230px] w-full overflow-hidden shadow-inner">
                {card.renderMockup()}
              </div>

              {/* BOTTOM OF CARD (Title + Description + Audience Tag) */}
              <div className="pt-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline font-bold text-base sm:text-lg text-neutral-900 tracking-tight mb-1.5 group-hover:text-black transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-neutral-500 font-inter text-xs sm:text-sm leading-relaxed mb-3">
                    {card.description}
                  </p>
                </div>
                <div className="pt-1">
                  <span className={`inline-block text-xs font-inter font-semibold px-3 py-1 rounded-full border ${card.audienceBadgeClass}`}>
                    {card.audience}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 07. BOTTOM SECTION TRANSITION (Exact matching PDF Page 18: Centered with divider lines) */}
        <div className="flex items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
          <div className="flex-1 h-px bg-neutral-200" />
          <a
            href="#clip-and-earn"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-neutral-500 hover:text-black group transition-colors cursor-pointer px-2"
          >
            <span>See Everything Inside</span>
            <span className="text-neutral-400 group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

      </div>
    </section>
  );
}
