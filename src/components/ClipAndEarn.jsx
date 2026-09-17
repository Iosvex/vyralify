import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ArrowRight, 
  Play, 
  Search, 
  UploadCloud, 
  DollarSign, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Film, 
  TrendingUp, 
  Clock, 
  Check, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function ClipAndEarn() {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'post' | 'earn'

  return (
    <section id="clip-and-earn" className="relative py-20 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#D1FE17]/[0.025] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>CLIP & GET PAID</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
            Get Paid to Clip. It's That Simple.
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Find paid clipping opportunities, create clips, publish them, and earn from the views you generate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#pricing"
              className="px-6 py-3 rounded-full bg-[#D1FE17] text-black font-semibold text-sm hover:bg-[#bbf00e] transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#campaigns"
              className="px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-800 font-semibold text-sm transition-all duration-200 flex items-center gap-2"
            >
              <span>Browse Campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 01 — MAIN INTERACTIVE TABBED ELEMENT: DISCOVER → POST → EARN */}
        <div className="max-w-5xl mx-auto mb-20 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] shadow-xl overflow-hidden">
          {/* Tabs Bar */}
          <div className="flex items-center border-b border-neutral-200 dark:border-[#202025] bg-neutral-100/70 dark:bg-[#0F0F12]">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-4 px-6 text-center font-display font-bold text-sm sm:text-base transition-all relative flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'discover'
                  ? 'text-black dark:text-white bg-white dark:bg-[#0B0B0D]'
                  : 'text-neutral-500 hover:text-black dark:hover:text-neutral-300'
              }`}
            >
              <Search className="w-4 h-4 text-[#D1FE17]" />
              <span>Discover</span>
              {activeTab === 'discover' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D1FE17]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('post')}
              className={`flex-1 py-4 px-6 text-center font-display font-bold text-sm sm:text-base transition-all relative flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'post'
                  ? 'text-black dark:text-white bg-white dark:bg-[#0B0B0D]'
                  : 'text-neutral-500 hover:text-black dark:hover:text-neutral-300'
              }`}
            >
              <Film className="w-4 h-4 text-[#D1FE17]" />
              <span>Post</span>
              {activeTab === 'post' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D1FE17]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('earn')}
              className={`flex-1 py-4 px-6 text-center font-display font-bold text-sm sm:text-base transition-all relative flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'earn'
                  ? 'text-black dark:text-white bg-white dark:bg-[#0B0B0D]'
                  : 'text-neutral-500 hover:text-black dark:hover:text-neutral-300'
              }`}
            >
              <DollarSign className="w-4 h-4 text-[#D1FE17]" />
              <span>Earn</span>
              {activeTab === 'earn' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D1FE17]" />
              )}
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'discover' && (
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
                        Find Content. Find Opportunities.
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Vyralify connects you with verified campaigns that pay for organic reach.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FE17]/15 border border-[#D1FE17]/40 text-black dark:text-[#D1FE17] text-xs font-mono font-semibold self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-ping" />
                      18 Active Campaigns
                    </span>
                  </div>

                  {/* Mock Discovery Feed Table / Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-white/70 font-mono font-bold text-sm shrink-0">
                            FH
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-neutral-900 dark:text-white">FinFlow Wealth</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">Trending</span>
                            </div>
                            <div className="text-xs text-neutral-500">How Micro-SaaS Scale Fast</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#D1FE17] bg-[#D1FE17]/10 px-2 py-0.5 rounded">
                          $5 / 1K
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 border-t border-neutral-200 dark:border-neutral-800/60 text-center font-mono text-[11px] mb-3">
                        <div>
                          <div className="text-neutral-400 text-[10px]">Pool Remaining</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">$4,200</div>
                        </div>
                        <div>
                          <div className="text-neutral-400 text-[10px]">Clippers</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">42 active</div>
                        </div>
                        <div>
                          <div className="text-neutral-400 text-[10px]">Views Generated</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">1.8M</div>
                        </div>
                      </div>

                      <button className="w-full py-2 rounded-lg bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                        <span>Clip Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-white/70 font-mono font-bold text-sm shrink-0">
                            SH
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-neutral-900 dark:text-white">Superhuman AI</span>
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-mono">New</span>
                            </div>
                            <div className="text-xs text-neutral-500">Autonomous Workflow Suite</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#D1FE17] bg-[#D1FE17]/10 px-2 py-0.5 rounded">
                          $4.5 / 1K
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 border-t border-neutral-200 dark:border-neutral-800/60 text-center font-mono text-[11px] mb-3">
                        <div>
                          <div className="text-neutral-400 text-[10px]">Pool Remaining</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">$6,800</div>
                        </div>
                        <div>
                          <div className="text-neutral-400 text-[10px]">Clippers</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">28 active</div>
                        </div>
                        <div>
                          <div className="text-neutral-400 text-[10px]">Views Generated</div>
                          <div className="font-bold text-neutral-800 dark:text-neutral-200">920K</div>
                        </div>
                      </div>

                      <button className="w-full py-2 rounded-lg bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                        <span>Clip Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'post' && (
                <motion.div
                  key="post"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
                      Create Your Clip. Post It.
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      The whole clipping workflow happens inside Vyralify — trim, hook, caption, submit.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-xs font-mono text-neutral-400 uppercase mb-2">1. Selected Cut</div>
                      <div className="aspect-[9/12] rounded-lg bg-neutral-800 relative flex items-center justify-center text-white/60 mb-2">
                        <Play className="w-8 h-8 fill-white/60 text-white/60" />
                        <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/70 font-mono text-[10px] text-[#D1FE17] flex justify-between">
                          <span>00:14</span>
                          <span>00:42 (28s)</span>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        Ep. 42 FinFlow Masterclass
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono text-neutral-400 uppercase mb-2">2. Hook & Captions</div>
                        <div className="p-3 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                          "Nobody realizes this secret when investing in early-stage SaaS..."
                        </div>
                        <div className="space-y-1.5 text-xs text-neutral-500 font-mono">
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <Check className="w-3.5 h-3.5" />
                            <span>Brand watermark included</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <Check className="w-3.5 h-3.5" />
                            <span>High-retention font synced</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <Check className="w-3.5 h-3.5" />
                            <span>Audio bitrate certified</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-800 font-mono">
                        Platform: Instagram Reels & Shorts
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono text-neutral-400 uppercase mb-2">3. Submission Link</div>
                        <div className="p-2.5 rounded bg-neutral-200/70 dark:bg-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300 break-all mb-3">
                          instagram.com/reel/C89xK20...
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Status: Ready for verification</span>
                        </div>
                      </div>

                      <button className="w-full py-2.5 rounded-lg bg-[#D1FE17] text-black font-semibold text-xs hover:bg-[#bbf00e] transition-colors flex items-center justify-center gap-1.5">
                        <UploadCloud className="w-4 h-4" />
                        <span>Submit Clip</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'earn' && (
                <motion.div
                  key="earn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
                        Track Every View. Track Every Dollar.
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Real-time audit ledger logging verified views and instantaneous wallet credits.
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-xs self-start sm:self-auto">
                      Available to Withdraw: $182.42
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">Your Submitted Clip</span>
                        <span className="text-xs text-neutral-500 font-mono">@finflow_clips</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                        Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4 font-mono">
                      <div>
                        <div className="text-xs text-neutral-400">Total Views</div>
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">48,290</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">Verified Views</div>
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">44,820</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">Reward Rate</div>
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">$5 / 1K</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">Net Earned</div>
                        <div className="text-lg font-bold text-[#D1FE17] bg-black px-2 py-0.5 rounded inline-block">
                          +$44.82
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                      <span className="text-neutral-500 font-mono">Payout Route: UPI / Stripe (0% Take Rate)</span>
                      <button className="font-semibold text-black dark:text-[#D1FE17] hover:underline flex items-center gap-1">
                        <span>Withdraw to Wallet</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 02 — CLIPPING SYSTEM PROMOTIONAL CARDS (4 Cards Only About Clipping) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 01: 🔎 DISCOVER MORE */}
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-black dark:text-[#D1FE17] flex items-center justify-center font-bold text-base mb-4">
                🔎
              </div>
              <h4 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-2">
                A Feed Built for Clippers.
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Stop hunting for opportunities. Discover campaigns and content worth clipping in one place.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-200/50 dark:bg-neutral-900 font-mono text-[10px] space-y-1 text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between"><span>🔥 Trending</span> <strong className="text-neutral-900 dark:text-white">Active</strong></div>
              <div className="flex justify-between"><span>💎 Highest Reward</span> <strong className="text-emerald-500">$6/1K</strong></div>
              <div className="flex justify-between"><span>⚡ For You</span> <strong className="text-neutral-900 dark:text-white">Matched</strong></div>
            </div>
          </div>

          {/* Card 02: 🎬 CLIP FASTER */}
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-black dark:text-[#D1FE17] flex items-center justify-center font-bold text-base mb-4">
                🎬
              </div>
              <h4 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-2">
                Everything You Need to Create.
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Find the content, choose the moment, create your clip, and get it ready to post — without jumping between tools.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-200/50 dark:bg-neutral-900 font-mono text-[10px] text-center text-neutral-500 dark:text-neutral-400">
              <span className="text-[#D1FE17] font-semibold">Trim</span> → Captions → Hook → <span className="text-white font-semibold">Submit</span>
            </div>
          </div>

          {/* Card 03: 📊 TRACK PERFORMANCE */}
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-black dark:text-[#D1FE17] flex items-center justify-center font-bold text-base mb-4">
                📊
              </div>
              <h4 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-2">
                Know Which Clips Are Winning.
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Track views, engagement and eligible performance across every clip and campaign you're part of.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-200/50 dark:bg-neutral-900 font-mono text-[10px] space-y-1 text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between"><span>Clip #01</span> <strong className="text-neutral-900 dark:text-white">182K views</strong></div>
              <div className="flex justify-between"><span>Clip #02</span> <strong className="text-neutral-900 dark:text-white">94K views</strong></div>
              <div className="flex justify-between border-t border-neutral-300 dark:border-neutral-800 pt-1 font-bold text-emerald-500">
                <span>Total</span> <span>337K views</span>
              </div>
            </div>
          </div>

          {/* Card 04: 💸 GET PAID */}
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#D1FE17]/40 hover:border-[#D1FE17] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#D1FE17]/20 text-black dark:text-[#D1FE17] flex items-center justify-center font-bold text-base mb-4">
                💸
              </div>
              <h4 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-2">
                Turn Your Views Into Earnings.
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                See your eligible views, campaign rewards and earnings as your clips perform.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900 text-white font-mono text-[11px] flex items-center justify-between">
              <div>
                <div className="text-[9px] text-neutral-400">182,420 Verified</div>
                <div className="text-sm font-bold text-[#D1FE17]">$182.42</div>
              </div>
              <span className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                View Earnings →
              </span>
            </div>
          </div>
        </div>

        {/* 03 — CLOSING LINE: DISCOVER → CLIP → POST → TRACK → EARN */}
        <div className="text-center py-6 border-y border-neutral-200 dark:border-[#1E1E24] mb-12">
          <p className="text-sm sm:text-base font-display font-medium text-neutral-600 dark:text-neutral-400 mb-3">
            Everything you need to clip, track and earn.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white">
            <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">DISCOVER</span>
            <span className="text-neutral-400">→</span>
            <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">CLIP</span>
            <span className="text-neutral-400">→</span>
            <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">POST</span>
            <span className="text-neutral-400">→</span>
            <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">TRACK</span>
            <span className="text-neutral-400">→</span>
            <span className="px-2.5 py-1 rounded bg-[#D1FE17] text-black font-bold">EARN</span>
          </div>
        </div>

        {/* 04 — FINAL CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
            Ready to start clipping?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5">
            Find your next opportunity and turn your views into earnings.
          </p>
          <a
            href="#campaigns"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <span>Browse Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
