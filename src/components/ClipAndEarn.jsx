import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  Search, 
  DollarSign, 
  Film, 
  Check, 
  Flame, 
  TrendingUp, 
  Clock, 
  Sliders, 
  Sparkles, 
  CheckCircle2,
  Filter,
  Eye,
  Scissors,
  Layers,
  BarChart2
} from 'lucide-react';

export default function ClipAndEarn() {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'post' | 'earn'
  const [selectedFilter, setSelectedFilter] = useState('Trending');

  const campaigns = [
    {
      id: 1,
      brand: "FinFlow Wealth",
      campaign: "Episode 42: How SaaS Founders Scale",
      thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=240&auto=format&fit=crop&q=80",
      platform: "TikTok & Reels",
      rewardRate: "$5 / 1K Views",
      budgetRemaining: "$4,250",
      viewsGenerated: "850K",
      clippers: "48",
      tag: "Trending 🔥"
    },
    {
      id: 2,
      brand: "Apex Fitness",
      campaign: "High-Intensity Nutrition Protocols",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=240&auto=format&fit=crop&q=80",
      platform: "Instagram Reels",
      rewardRate: "$6 / 1K Views",
      budgetRemaining: "$6,800",
      viewsGenerated: "1.1M",
      clippers: "64",
      tag: "Highest Reward"
    },
    {
      id: 3,
      brand: "Mindset Daily",
      campaign: "The 5 AM Routine of Billionaires",
      thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=240&auto=format&fit=crop&q=80",
      platform: "All Platforms",
      rewardRate: "$4.50 / 1K Views",
      budgetRemaining: "$2,900",
      viewsGenerated: "640K",
      clippers: "32",
      tag: "New ⚡"
    }
  ];

  return (
    <section 
      id="clip-and-earn" 
      className="relative py-24 sm:py-32 bg-[#FAFAFA] text-neutral-900 border-t border-neutral-200 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER (PDF Page 18 & 19) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Eyebrow: CLIP & GET PAID */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7EE] border border-[#DCFCE7] text-[#16A34A] text-xs font-inter font-semibold tracking-wide uppercase mb-5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>CLIP &amp; GET PAID</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neutral-900 tracking-tight leading-tight mb-4">
            Get Paid to Clip.{' '}
            <span className="text-[#16A34A] sm:text-[#22C55E]">
              It's That Simple.
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-neutral-500 font-inter text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            Find paid clipping opportunities, create clips, publish them, and earn from the views you generate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-inter font-bold bg-[#3CEB75] hover:bg-[#34D368] text-black active:scale-[0.98] transition-all duration-150 shadow-[0_0_25px_rgba(60,235,117,0.35)] cursor-pointer"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#campaigns"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-inter font-medium bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 hover:border-neutral-400 transition-all duration-150 cursor-pointer shadow-2xs"
            >
              <span>Browse Campaigns</span>
              <ArrowRight className="w-4 h-4 text-neutral-500" />
            </a>
          </div>
        </div>

        {/* 01 — MAIN INTERACTIVE ELEMENT: DISCOVER → POST → EARN (PDF Page 19 & 20) */}
        <div className="max-w-5xl mx-auto mb-24 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Tabs Navigation Bar */}
          <div className="flex items-center border-b border-neutral-200/80 bg-neutral-50/70 p-2 gap-2">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-center font-headline font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeTab === 'discover'
                  ? 'bg-white text-neutral-900 shadow-xs border border-neutral-200'
                  : 'text-neutral-500 hover:text-black hover:bg-white/60'
              }`}
            >
              <Search className={`w-4 h-4 ${activeTab === 'discover' ? 'text-[#16A34A]' : 'text-neutral-400'}`} />
              <span>Discover</span>
            </button>

            <button
              onClick={() => setActiveTab('post')}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-center font-headline font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeTab === 'post'
                  ? 'bg-white text-neutral-900 shadow-xs border border-neutral-200'
                  : 'text-neutral-500 hover:text-black hover:bg-white/60'
              }`}
            >
              <Scissors className={`w-4 h-4 ${activeTab === 'post' ? 'text-[#16A34A]' : 'text-neutral-400'}`} />
              <span>Post</span>
            </button>

            <button
              onClick={() => setActiveTab('earn')}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-center font-headline font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeTab === 'earn'
                  ? 'bg-white text-neutral-900 shadow-xs border border-neutral-200'
                  : 'text-neutral-500 hover:text-black hover:bg-white/60'
              }`}
            >
              <DollarSign className={`w-4 h-4 ${activeTab === 'earn' ? 'text-[#16A34A]' : 'text-neutral-400'}`} />
              <span>Earn</span>
            </button>
          </div>

          {/* TAB PANELS */}
          <div className="p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: DISCOVER (PDF Page 19) */}
              {activeTab === 'discover' && (
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-headline font-bold text-neutral-900 tracking-tight">
                        Find Content. Find Opportunities.
                      </h3>
                      <p className="text-sm text-neutral-500 font-inter mt-1">
                        Vyralify finds high-converting campaigns you can actually clip and get paid for.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] border border-[#DCFCE7] text-[#16A34A] text-xs font-mono font-bold self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                      <span>24 Live Campaigns</span>
                    </div>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap gap-2">
                    {['Trending', 'Recommended', 'Highest Reward', 'New', 'For You'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setSelectedFilter(chip)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-inter font-medium transition-colors cursor-pointer ${
                          selectedFilter === chip
                            ? 'bg-[#16A34A] text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Campaign Cards List */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {campaigns.map((camp) => (
                      <div 
                        key={camp.id}
                        className="rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-neutral-900">
                            <img 
                              src={camp.thumbnail} 
                              alt={camp.campaign} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                              {camp.tag}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                              <div className="w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                                <Play className="w-4 h-4 fill-black translate-x-0.5" />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1 font-inter">
                            <span className="font-semibold text-neutral-900">{camp.brand}</span>
                            <span className="text-[11px] font-mono">{camp.platform}</span>
                          </div>

                          <h4 className="font-headline font-bold text-sm text-neutral-900 line-clamp-1 mb-2">
                            {camp.campaign}
                          </h4>

                          <div className="grid grid-cols-2 gap-2 bg-neutral-50 p-2.5 rounded-xl mb-3 border border-neutral-100 text-xs">
                            <div>
                              <div className="text-[10px] text-neutral-400 uppercase font-mono">Payout</div>
                              <div className="font-mono font-bold text-[#16A34A]">{camp.rewardRate}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-neutral-400 uppercase font-mono">Budget Left</div>
                              <div className="font-mono font-bold text-neutral-900">{camp.budgetRemaining}</div>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-2.5 rounded-xl bg-[#3CEB75] hover:bg-[#34D368] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs">
                          <span>Clip Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: POST (PDF Page 20) */}
              {activeTab === 'post' && (
                <motion.div
                  key="post"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-100 pb-5">
                    <h3 className="text-xl sm:text-2xl font-headline font-bold text-neutral-900 tracking-tight">
                      Create Your Clip. Post It.
                    </h3>
                    <p className="text-sm text-neutral-500 font-inter mt-1">
                      The whole clipping workflow happens right here — select your moment, trim, hook, and submit.
                    </p>
                  </div>

                  {/* Submission Studio Interface */}
                  <div className="rounded-2xl bg-[#0C0E14] text-white p-5 sm:p-6 border border-white/[0.08] shadow-inner space-y-5">
                    {/* Top video preview + waveform */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="relative aspect-[9/14] max-h-[260px] rounded-xl overflow-hidden bg-neutral-900 mx-auto border border-white/10 flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80" 
                          alt="Video Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        <div className="absolute bottom-3 left-3 right-3 text-left">
                          <span className="px-2 py-0.5 rounded bg-[#3CEB75] text-black font-mono font-bold text-[9px]">
                            00:14 - 00:38 (24s)
                          </span>
                          <p className="text-[11px] font-semibold text-white mt-1 line-clamp-2">
                            "The #1 mistake people make when building an online brand..."
                          </p>
                        </div>
                      </div>

                      {/* Editing Timeline & Meta */}
                      <div className="md:col-span-2 flex flex-col justify-between space-y-4 text-xs">
                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Selected Moment Scrubber</div>
                          <div className="h-10 rounded-xl bg-[#161822] border border-white/10 p-2 flex items-center gap-1">
                            <div className="w-16 h-6 rounded bg-white/10 flex items-center justify-center font-mono text-[10px]">00:00</div>
                            <div className="flex-1 h-3 rounded-full bg-neutral-800 relative overflow-hidden">
                              <div className="absolute left-1/4 right-1/3 top-0 bottom-0 bg-[#3CEB75]/70 rounded-full" />
                            </div>
                            <div className="w-16 h-6 rounded bg-[#3CEB75]/20 border border-[#3CEB75]/40 text-[#3CEB75] flex items-center justify-center font-mono text-[10px] font-bold">00:24</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Campaign Requirements</div>
                          <div className="space-y-1.5 text-[11px] text-neutral-300">
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3CEB75]" />
                              <span>Minimum 15 seconds duration</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3CEB75]" />
                              <span>Include brand tag #FinFlowWealth</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3CEB75]" />
                              <span>Vertical 9:16 portrait export format</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono uppercase mb-1">Your Post Link / Submission</div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              readOnly 
                              value="https://instagram.com/reel/C8kL90QxPzM/" 
                              className="flex-1 px-3 py-2 rounded-xl bg-[#161822] border border-white/10 font-mono text-neutral-200 text-xs focus:outline-none"
                            />
                            <button className="px-4 py-2 rounded-xl bg-[#3CEB75] text-black font-bold text-xs hover:bg-[#34D368] transition-colors cursor-pointer">
                              Submit Clip →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: EARN (PDF Page 20 & 21) */}
              {activeTab === 'earn' && (
                <motion.div
                  key="earn"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="border-b border-neutral-100 pb-5">
                    <h3 className="text-xl sm:text-2xl font-headline font-bold text-neutral-900 tracking-tight">
                      Track Every View. Track Every Dollar.
                    </h3>
                    <p className="text-sm text-neutral-500 font-inter mt-1">
                      See exactly how your clips are performing and what you're earning in real time.
                    </p>
                  </div>

                  {/* Real example from Page 20 & 21 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <div className="text-xs text-neutral-500 font-inter uppercase font-semibold">Total Clip Views</div>
                      <div className="text-3xl font-headline font-bold text-neutral-900 mt-1">48,290</div>
                      <div className="text-xs text-neutral-400 mt-1 font-mono">Organic Reach</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <div className="text-xs text-neutral-500 font-inter uppercase font-semibold">Verified Eligible Views</div>
                      <div className="text-3xl font-headline font-bold text-[#16A34A] mt-1">44,820</div>
                      <div className="text-xs text-neutral-400 mt-1 font-mono">92.8% Eligible Rate</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#EAF7EE] border border-[#DCFCE7]">
                      <div className="text-xs text-[#16A34A] font-inter uppercase font-bold">Earned Payout</div>
                      <div className="text-3xl font-headline font-bold text-[#16A34A] mt-1">+$44.82</div>
                      <div className="text-xs text-[#15803D] mt-1 font-mono">Instant Escrow Payout</div>
                    </div>
                  </div>

                  {/* Submitted Clips Performance Ledger */}
                  <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                    <div className="bg-neutral-100/70 px-4 py-3 border-b border-neutral-200 flex items-center justify-between text-xs font-mono font-semibold text-neutral-600">
                      <span>Submitted Clip</span>
                      <span>Verified Views</span>
                      <span>Status</span>
                      <span>Earnings</span>
                    </div>

                    <div className="divide-y divide-neutral-100 text-xs">
                      <div className="px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-[10px] font-mono">#01</span>
                          <div>
                            <div className="font-bold text-neutral-900">Ep. 42: How SaaS Founders Scale</div>
                            <div className="text-[11px] text-neutral-400">FinFlow Wealth · Instagram</div>
                          </div>
                        </div>
                        <span className="font-mono text-neutral-700">182,400</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</span>
                        <span className="font-mono font-bold text-[#16A34A]">+$182.40</span>
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-[10px] font-mono">#02</span>
                          <div>
                            <div className="font-bold text-neutral-900">High-Intensity Nutrition Protocols</div>
                            <div className="text-[11px] text-neutral-400">Apex Fitness · TikTok</div>
                          </div>
                        </div>
                        <span className="font-mono text-neutral-700">94,120</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</span>
                        <span className="font-mono font-bold text-[#16A34A]">+$94.12</span>
                      </div>

                      <div className="px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-[10px] font-mono">#03</span>
                          <div>
                            <div className="font-bold text-neutral-900">The 5 AM Routine of Billionaires</div>
                            <div className="text-[11px] text-neutral-400">Mindset Daily · YouTube Shorts</div>
                          </div>
                        </div>
                        <span className="font-mono text-neutral-700">61,080</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">In Review</span>
                        <span className="font-mono font-bold text-neutral-500">Pending</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* 02 — CLIPPING SYSTEM PROMOTIONAL CARDS (PDF Pages 21 & 22) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* CARD 01 — DISCOVER MORE */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  CARD 01
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl text-neutral-900 tracking-tight mb-2">
                A Feed Built for Clippers.
              </h3>

              <p className="text-neutral-500 font-inter text-sm leading-relaxed mb-5">
                Stop hunting for opportunities. Discover campaigns and content worth clipping in one place.
              </p>
            </div>

            {/* Visual: Filter chips list */}
            <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100 space-y-2">
              <div className="text-[10px] font-mono uppercase font-bold text-neutral-400">Curated Feed Filters</div>
              <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800">🔥 Trending</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16A34A] font-bold">Recommended</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800">Highest Reward</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800">New</span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-800">For You</span>
              </div>
            </div>
          </div>

          {/* CARD 02 — CLIP FASTER */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Film className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  CARD 02
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl text-neutral-900 tracking-tight mb-2">
                Everything You Need to Create the Clip.
              </h3>

              <p className="text-neutral-500 font-inter text-sm leading-relaxed mb-5">
                Find the content, choose the moment, create your clip, and get it ready to post — without jumping between tools.
              </p>
            </div>

            {/* Visual: Workflow pipeline */}
            <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 font-bold">
                <span>ORIGINAL</span>
                <span>→</span>
                <span className="text-[#16A34A]">SELECTED MOMENT</span>
                <span>→</span>
                <span>FINAL CLIP</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center font-mono text-[10px] text-neutral-600 pt-1 border-t border-neutral-200/60">
                <span className="p-1 rounded bg-white border border-neutral-200">Trim</span>
                <span className="p-1 rounded bg-white border border-neutral-200">Captions</span>
                <span className="p-1 rounded bg-white border border-neutral-200">Hook</span>
                <span className="p-1 rounded bg-white border border-neutral-200">Preview</span>
                <span className="p-1 rounded bg-[#3CEB75] text-black font-bold">Submit</span>
              </div>
            </div>
          </div>

          {/* CARD 03 — TRACK PERFORMANCE */}
          <div className="rounded-3xl bg-white border border-neutral-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  CARD 03
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl text-neutral-900 tracking-tight mb-2">
                Know Which Clips Are Winning.
              </h3>

              <p className="text-neutral-500 font-inter text-sm leading-relaxed mb-5">
                Track views, engagement and eligible performance across every clip and campaign you're part of.
              </p>
            </div>

            {/* Visual: Mini Clips Table */}
            <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase">
                <span>My Clips</span>
                <span>Views</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-700">Clip #01</span>
                <span className="font-bold text-neutral-900">182K Views</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-700">Clip #02</span>
                <span className="font-bold text-neutral-900">94K Views</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-700">Clip #03</span>
                <span className="font-bold text-neutral-900">61K Views</span>
              </div>
              <div className="flex items-center justify-between pt-1 font-bold text-[#16A34A]">
                <span>Total</span>
                <span>337K Views</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
