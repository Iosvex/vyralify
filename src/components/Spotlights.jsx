import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Rocket, 
  Zap, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Spotlights({ onStartFree }) {
  // 1. Scripted Interactive AI Demo State (Section 08)
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    {
      chip: "Why did my last Reel underperform?",
      question: "Why did my last Reel underperform?",
      answer: {
        headline: "Your last Reel got 12,400 views — 64% below your 34,200 average. Here's why:",
        points: [
          "Hook: Your opening line didn't create a pattern interrupt (0:01-0:03).",
          "Retention dropped at 0:04 — before your main value point.",
          "Format: Tutorial format is currently underperforming in Motivation niche (+320% for Voiceover formats this week)."
        ],
        actionText: "What to do next:",
        actionBtns: ["Create a Voiceover Variation", "View Full Analytics"]
      }
    },
    {
      chip: "What should I post today?",
      question: "What should I post today for maximum reach?",
      answer: {
        headline: "High-velocity opportunity in your niche detected in the last 18 hours:",
        points: [
          "Topic: '3 banking rules changing in 2026' (High comment-to-view ratio).",
          "Recommended Audio: 'Metamorphosis (Sped Up)' — velocity +240% today.",
          "Predicted 3-Second Retention: 78% if opening with a contrarian hook."
        ],
        actionText: "What to do next:",
        actionBtns: ["Generate Reel Script Now", "Add to 30-Day Planner"]
      }
    },
    {
      chip: "What should I fix on my page?",
      question: "What should I fix on my Instagram bio and profile?",
      answer: {
        headline: "Page Health Audit Score: 74/100. 3 immediate conversion gaps:",
        points: [
          "Bio CTA is vague ('DM for info' loses 82% of interested viewers).",
          "No automated comment trigger active on your pinned top reel.",
          "Link-in-bio needs a dedicated digital download to capture follower emails."
        ],
        actionText: "What to do next:",
        actionBtns: ["Generate High-Converting Bio", "Launch Link-in-Bio Store"]
      }
    }
  ];

  const handleSelectPrompt = (index) => {
    if (selectedPrompt === index) return;
    setIsTyping(true);
    setSelectedPrompt(index);
    setTimeout(() => {
      setIsTyping(false);
    }, 550);
  };

  const launchNiches = [
    'Business & Money',
    'Self-Improvement',
    'Health & Fitness',
    'Fashion & Beauty',
    'Cars & Automotive',
    'Travel & Lifestyle',
    'Entertainment',
    'Sports'
  ];

  return (
    <div className="w-full select-none">
      
      {/* ============================================================== */}
      {/* 08. VYRALIFY AI SPOTLIGHT (DARK #0A0A0A) */}
      {/* ============================================================== */}
      <section 
        id="ai-spotlight"
        className="w-full bg-[#0A0A0A] py-24 text-white border-b border-[#1F1F1F] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY */}
          <div className="max-w-[480px]">
            <div className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em] mb-3">
              VYRALIFY AI ASSISTANT
            </div>

            <h2 className="text-3xl sm:text-[36px] font-bold text-white leading-tight tracking-tight mb-4">
              Your 24/7 Instagram growth expert — powered by your real data.
            </h2>

            {/* Differentiator chip (Rule 5) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#23E598]/30 bg-[#23E598]/5 text-[#23E598] text-[12px] font-mono mb-4">
              <span>&bull;</span>
              <span>Not generic AI. It works from your real Instagram data.</span>
            </div>

            <p className="text-[16px] text-[#A0A0A0] leading-relaxed mb-4 font-normal">
              Stop guessing what to post, why a Reel flopped, or how to grow. Vyralify AI knows your actual page data — metrics, content history, niche benchmarks — and gives you specific, actionable answers. Not generic advice.
            </p>

            {/* Outcome line (Rule 2) */}
            <div className="text-[15px] font-semibold text-white mb-5">
              Know exactly what to post, and why, from your own numbers.
            </div>

            {/* Feature List */}
            <ul className="space-y-3 mb-6 text-[14px] text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Analyzes your actual reach, engagement, and follower data — not averages</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Tells you exactly what to post, when to post, and why it will work</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Explains why each Reel over- or underperformed in your specific niche</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Suggests the next best action — and links you there in one click</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Upload screenshots or video for visual analysis (Pro+)</span>
              </li>
            </ul>

            {/* Differentiation Callout Card (Rule 5) */}
            <div className="p-3.5 rounded-xl bg-[rgba(35,229,152,0.06)] border-l-4 border-[#23E598] border border-[rgba(35,229,152,0.15)] text-[13px] text-[#A0A0A0] leading-relaxed mb-6">
              "Not a generic AI. Vyralify AI is trained on Instagram growth patterns and connected to your real account data — it knows your page, not just Instagram in general."
            </div>

            {/* Plan Note */}
            <p className="text-[12px] text-[#666666] mb-5 font-mono">
              Free includes basic Q&amp;A. Pro adds deep analysis and strategy plans.
            </p>

            {/* CTA */}
            <div>
              <button
                onClick={onStartFree}
                className="h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Try Vyralify AI Free</span>
                <span>&rarr;</span>
              </button>
              <div className="text-[12px] text-[#555555] font-mono mt-2">
                No credit card required
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE SCRIPTED CHAT DEMO (RULE 4) */}
          <div className="relative w-full max-w-[500px] mx-auto">
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-[#2A2A2A] shadow-2xl space-y-4">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#23E598]/20 text-[#23E598] flex items-center justify-center font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Vyralify AI Co-Pilot</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Connected to @thewealthmindset</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded border border-[#23E598]/20">
                  Live Context
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 min-h-[260px]">
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="bg-white/[0.08] text-white text-xs px-3.5 py-2 rounded-2xl rounded-tr-xs max-w-[85%]">
                    {prompts[selectedPrompt].question}
                  </div>
                </div>

                {/* AI Response Bubble */}
                <div className="flex justify-start">
                  <div className="bg-[#151822] border border-white/[0.08] text-neutral-200 text-xs p-4 rounded-2xl rounded-tl-xs space-y-2.5 max-w-[95%]">
                    {isTyping ? (
                      <div className="flex items-center gap-1.5 py-2 text-neutral-400 font-mono text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#23E598] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#23E598] animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#23E598] animate-bounce [animation-delay:0.4s]" />
                        <span className="ml-1">Analyzing account metrics...</span>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-white leading-snug">
                          {prompts[selectedPrompt].answer.headline}
                        </p>
                        <ul className="space-y-1.5 text-[11px] text-neutral-300">
                          {prompts[selectedPrompt].answer.points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#23E598] font-bold">&bull;</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-white/[0.06]">
                          <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1.5">
                            {prompts[selectedPrompt].answer.actionText}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {prompts[selectedPrompt].answer.actionBtns.map((btn, i) => (
                              <button
                                key={i}
                                onClick={onStartFree}
                                className="px-2.5 py-1 rounded-md bg-[#23E598]/10 hover:bg-[#23E598]/20 text-[#23E598] text-[10px] font-semibold border border-[#23E598]/30 transition-colors cursor-pointer"
                              >
                                {btn} &rarr;
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Disabled Demo Input */}
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Ask Vyralify anything..."
                  className="w-full bg-[#08090D] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-400 cursor-not-allowed"
                />
                <span className="absolute right-3 top-2 text-[10px] font-mono text-neutral-500">
                  Demo Mode
                </span>
              </div>

              {/* 3 Interactive Prompt Chips */}
              <div className="pt-2 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-neutral-400 mb-2">
                  Click a question to test live reasoning:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {prompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(idx)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        selectedPrompt === idx
                          ? 'bg-[#23E598] text-black border-[#23E598] font-bold shadow-xs'
                          : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {p.chip}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 09. DISCOVER & CREATE SPOTLIGHT (WHITE #FFFFFF) */}
      {/* ============================================================== */}
      <section 
        id="discover-spotlight"
        className="w-full bg-[#FFFFFF] py-24 text-[#0A0A0A] border-b border-[#EBEBEB] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: SPLIT VISUAL (DISCOVER -> CREATE) */}
          <div className="order-2 lg:order-1 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-[#2A2A2A] shadow-xl text-white space-y-4">
              
              {/* Top Half: Trending Discovery Feed */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs mb-3">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Search className="w-3.5 h-3.5 text-[#23E598]" />
                    <span>Viral Feed &bull; Finance &amp; Business</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#23E598]">Live Radar</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400">Reel &bull; 842K Views</div>
                    <div className="font-semibold text-white mt-0.5 line-clamp-1">"Why high-yield cash beats rental property"</div>
                    <div className="text-[9px] text-[#23E598] font-mono mt-1">+480% share velocity</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400">Reel &bull; 1.4M Views</div>
                    <div className="font-semibold text-white mt-0.5 line-clamp-1">"The 3-step digital flywheel in 2026"</div>
                    <div className="text-[9px] text-[#23E598] font-mono mt-1">+610% save rate</div>
                  </div>
                </div>
              </div>

              {/* Connecting Element: Discover -> Create */}
              <div className="flex items-center justify-center gap-2 py-1 text-xs font-mono font-bold text-[#23E598]">
                <span>Discover</span>
                <span>&rarr;</span>
                <span>Turn into Hooks &amp; Scripts</span>
              </div>

              {/* Bottom Half: Hook Generator Output */}
              <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-neutral-400">
                  Generated Hooks for your page:
                </div>
                {[
                  { tag: 'Curiosity', text: 'Stop keeping your emergency fund in a bank account in 2026.' },
                  { tag: 'Controversy', text: 'Real estate is no longer the best passive income vehicle for solo creators.' },
                  { tag: 'Story', text: 'I spent 6 months testing 4 different monetization funnels on Instagram. Here are the exact numbers.' }
                ].map((hk, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono font-bold text-[#23E598] uppercase">
                        [{hk.tag} Hook]
                      </span>
                      <p className="text-neutral-200 text-[11px] font-medium leading-tight">
                        "{hk.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* 8 Launch Niche Chips */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-neutral-500 block mb-2 font-mono">
                Launch Niches Analyzed in Real-Time:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {launchNiches.map((niche, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5F5F5] text-[#333333] border border-[#E0E0E0] font-medium"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: COPY */}
          <div className="order-1 lg:order-2 max-w-[480px]">
            <div className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em] mb-3">
              DISCOVER &amp; CREATE
            </div>

            <h2 className="text-3xl sm:text-[36px] font-bold text-[#0A0A0A] leading-tight tracking-tight mb-4">
              Find what's going viral in your niche. Create it in seconds.
            </h2>

            {/* Daily use hook line (Rule 5) */}
            <div className="text-[15px] font-semibold text-[#0A0A0A] mb-3">
              Open it every day to see what's working in your niche, then make your next post in minutes.
            </div>

            <p className="text-[16px] text-[#666666] leading-relaxed mb-6 font-normal">
              Vyralify scans your niche in real-time — trending formats, viral hooks, winning audio — then turns what's working into ready-to-post content written for your specific page and audience.
            </p>

            {/* Feature List (Rule 2 Outcomes) */}
            <ul className="space-y-3 mb-6 text-[14px] text-[#444444]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Real-time viral feed filtered to your exact niche — never browse blindly again</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>50+ proven hook structures — generate 6 variations in under 10 seconds</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Full Reel scripts, captions, and CTAs written by AI that knows your niche</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>30-Day Content Planner — auto-fill an entire month of ideas in one click (Pro)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Track up to 10 competitors and see exactly what's working for them</span>
              </li>
            </ul>

            {/* Daily use angle italic */}
            <p className="text-[13px] text-[#888888] italic mb-5">
              "This is the reason creators open Vyralify every morning — it tells them exactly what to create before the day starts."
            </p>

            {/* Plan Note */}
            <p className="text-[12px] text-[#888888] mb-5 font-mono">
              Free has limited filters, 1 tracked competitor and a 7-day planner. Pro unlocks the full set.
            </p>

            {/* CTA */}
            <div>
              <button
                onClick={onStartFree}
                className="h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Start Creating Free</span>
                <span>&rarr;</span>
              </button>
              <div className="text-[12px] text-[#666666] font-mono mt-2">
                No credit card required
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. PAGE BUILDER SPOTLIGHT (LIGHT #F9F9F9) */}
      {/* ============================================================== */}
      <section 
        id="pagebuilder-spotlight"
        className="w-full bg-[#F9F9F9] py-24 text-[#0A0A0A] border-b border-[#EBEBEB] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY */}
          <div className="max-w-[480px]">
            {/* Audience Chips (Rule 3) */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#23E598]/15 text-[#16A34A] border border-[#23E598]/30">
                For Beginners
              </span>
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white text-[#666666] border border-[#E0E0E0]">
                For Existing Pages
              </span>
            </div>

            <div className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em] mb-2">
              PAGE BUILDER
            </div>

            <h2 className="text-3xl sm:text-[36px] font-bold text-[#0A0A0A] leading-tight tracking-tight mb-4">
              Start from zero. Build the right page from day one.
            </h2>

            {/* Outcome line (Rule 2) */}
            <div className="text-[15px] font-semibold text-[#0A0A0A] mb-3">
              Know your niche, your bio and your next move before you post.
            </div>

            <p className="text-[16px] text-[#666666] leading-relaxed mb-6 font-normal">
              Never built an Instagram page before? Vyralify's AI guides you through choosing a profitable niche, writing your bio, setting up your positioning, and launching a page that's built to grow — not just look good.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-6 text-[14px] text-[#444444]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>AI niche selector — find a profitable niche in your interest area in under 5 minutes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Bio generator — get a bio that attracts followers and converts profile visitors</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Automatic page audit for existing pages — see exactly what to fix and how</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Content pillars setup — know what to post about before you create your first Reel</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Manage multiple pages from one dashboard (Pro — up to 3 pages, Elite — unlimited)</span>
              </li>
            </ul>

            {/* Beginner Reassurance Callout Card (Rule 1 + 3) */}
            <div className="p-4 rounded-xl bg-[rgba(35,229,152,0.08)] border-l-4 border-[#23E598] border border-[rgba(35,229,152,0.2)] text-[13px] text-[#1DC884] font-medium leading-relaxed mb-6">
              "🚀 Zero experience needed. Vyralify walks you through every step — from picking your niche to publishing your first post."
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onStartFree}
                className="h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Build Your Page Free</span>
                <span>&rarr;</span>
              </button>
              <div className="text-[12px] text-[#666666] font-mono mt-2">
                No credit card required
              </div>
            </div>
          </div>

          {/* RIGHT: PHONE MOCKUP (NICHE SELECTOR + 74/100 AUDIT CARD) */}
          <div className="relative w-full max-w-[420px] mx-auto">
            <div className="p-5 rounded-3xl bg-[#0F1117] border border-[#2A2A2A] shadow-2xl text-white space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs">
                <span className="font-bold text-white">Niche Opportunity Radar</span>
                <span className="text-[#23E598] text-[10px] font-mono">Step 1 of 3</span>
              </div>

              {/* 4 Niche Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.04] border-2 border-[#23E598] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-[11px]">Business &amp; Wealth</span>
                    <Check className="w-3.5 h-3.5 text-[#23E598]" />
                  </div>
                  <div className="text-[10px] text-[#23E598] font-mono">Profitability: 96%</div>
                  <div className="text-[9px] text-neutral-400">High CPM</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1 opacity-70">
                  <div className="font-bold text-white text-[11px]">Self-Improvement</div>
                  <div className="text-[10px] text-neutral-300 font-mono">Profitability: 92%</div>
                  <div className="text-[9px] text-neutral-400">High Volume</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1 opacity-70">
                  <div className="font-bold text-white text-[11px]">AI Tools &amp; SaaS</div>
                  <div className="text-[10px] text-neutral-300 font-mono">Profitability: 94%</div>
                  <div className="text-[9px] text-neutral-400">Affiliate Hot</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-1 opacity-70">
                  <div className="font-bold text-white text-[11px]">Luxury Lifestyle</div>
                  <div className="text-[10px] text-neutral-300 font-mono">Profitability: 88%</div>
                  <div className="text-[9px] text-neutral-400">Sponsorships</div>
                </div>
              </div>

              {/* FLOATING PAGE HEALTH SCORE CARD (74/100) */}
              <div className="p-4 rounded-xl bg-[#151822] border border-[#23E598]/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Automated Page Audit</span>
                    <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
                      <span>Page Health:</span>
                      <span className="text-[#23E598]">74/100</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-4 border-[#23E598] border-t-transparent flex items-center justify-center font-bold text-[11px] text-[#23E598]">
                    74%
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#23E598]" />
                    <span>Bio Hook: Weak CTA &bull; Add store link</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#23E598]" />
                    <span>Pillars: 3 content highlights configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#23E598]" />
                    <span>Average Hook Retention: 6.2s optimal</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. INSTAGRAM AUTOMATION SPOTLIGHT (DARK #0A0A0A) */}
      {/* ============================================================== */}
      <section 
        id="automation-spotlight"
        className="w-full bg-[#0A0A0A] py-24 text-white border-b border-[#1F1F1F] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: VISUAL (PHONE FRAME DM AUTOMATION FLOW + SALE CARD) */}
          <div className="order-2 lg:order-1 relative w-full max-w-[420px] mx-auto">
            
            {/* Flow strip above phone (Rule 5) */}
            <div className="mb-4 text-center">
              <div className="text-xs font-mono font-bold text-[#23E598] flex items-center justify-center gap-1.5">
                <span>Comment</span>
                <span>&rarr;</span>
                <span>Auto DM</span>
                <span>&rarr;</span>
                <span>Product Delivery</span>
                <span>&rarr;</span>
                <span>Sale</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Set it up once. It keeps working while you sleep.
              </p>
            </div>

            {/* Phone Frame */}
            <div className="p-5 rounded-3xl bg-[#0F1117] border border-[#2A2A2A] shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs">
                <span className="font-bold text-white">Instagram Direct Message</span>
                <span className="text-[10px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded">
                  Automated Trigger
                </span>
              </div>

              {/* Simulated Post Caption */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 block">Your Reel Caption:</span>
                <p className="text-white font-medium">
                  "Comment 'FREE' for my full Instagram growth guide 📥"
                </p>
                <div className="text-[11px] text-[#23E598] font-mono font-semibold pt-1">
                  Follower comments: "FREE"
                </div>
              </div>

              {/* Instant Auto-DM Message */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono text-neutral-400">Auto-DM dispatched (0.4s):</div>
                <div className="p-3 rounded-2xl bg-[#151822] border border-white/[0.08] text-xs space-y-1 text-neutral-200">
                  <p>
                    "Hey! Here's your free guide as promised: <span className="text-[#23E598] underline">vyralify.me/guide</span>"
                  </p>
                  <p className="text-neutral-400 text-[11px]">
                    "Also — want the full system I used to grow to 50K? [Check it out here] ⚡"
                  </p>
                </div>
              </div>

              {/* Floating Sale Notification */}
              <div className="p-3.5 rounded-xl bg-[#111111] border-l-4 border-[#23E598] border border-[#2A2A2A] shadow-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-[#23E598]" />
                  <div>
                    <span className="font-bold text-white block">New Sale: ₹299</span>
                    <span className="text-[10px] text-neutral-400">Instagram Growth Guide &bull; 2s ago</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded">
                  PAID
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT: COPY */}
          <div className="order-1 lg:order-2 max-w-[480px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em]">
                INSTAGRAM AUTOMATION
              </span>
              <span className="text-[10px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded border border-[#23E598]/20 font-bold">
                PRO FEATURE
              </span>
            </div>

            <h2 className="text-3xl sm:text-[36px] font-bold text-white leading-tight tracking-tight mb-4">
              Turn every comment into a lead. Every DM into a sale. Automatically.
            </h2>

            <p className="text-[16px] text-[#A0A0A0] leading-relaxed mb-6 font-normal">
              Set up a trigger once — then watch Vyralify automatically reply to comments, deliver links via DM, and convert your followers into customers. Even at 3am. Even when you're on holiday.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-6 text-[14px] text-neutral-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Comment &rarr; DM automation: someone comments a keyword, they get a DM instantly</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Story Reply triggers: reply to your story, they get your product link automatically</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>AI Auto-Conversations: AI qualifies and converts leads in full multi-turn DM conversations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Follow &amp; Lead Collector: auto-DM every new follower with your best offer</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                <span>Full conversation logs — always see and control what the AI says</span>
              </li>
            </ul>

            {/* Trust Line */}
            <p className="text-[13px] text-[#888888] italic mb-4">
              "Creators using Vyralify Automation never miss a lead — the system works while they sleep."
            </p>

            {/* Compliance Guarantee (Rule 1 Risk Removal) */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-300 leading-snug mb-6 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
              <span>
                <strong>Built to stay within Instagram's official guidelines</strong> — same approach used by ManyChat, used safely by millions of creators worldwide.
              </span>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onStartFree}
                className="h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Set Up Automation Free</span>
                <span>&rarr;</span>
              </button>
              <div className="text-[12px] text-[#666666] font-mono mt-2">
                No credit card required
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. STORE & MONETISATION SPOTLIGHT (WHITE #FFFFFF) */}
      {/* ============================================================== */}
      <section 
        id="store-spotlight"
        className="w-full bg-[#FFFFFF] py-24 text-[#0A0A0A] border-b border-[#EBEBEB] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY */}
          <div className="max-w-[480px]">
            <div className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em] mb-3">
              STORE &amp; COMMERCE
            </div>

            <h2 className="text-3xl sm:text-[36px] font-bold text-[#0A0A0A] leading-tight tracking-tight mb-4">
              One link. Your full business. Start earning from your audience today.
            </h2>

            {/* Outcome line (Rule 2) */}
            <div className="text-[15px] font-semibold text-[#0A0A0A] mb-3">
              One link in your bio, and your audience can buy from you today.
            </div>

            <p className="text-[16px] text-[#666666] leading-relaxed mb-6 font-normal">
              Vyralify gives you a complete link-in-bio storefront where you can list and sell digital products, guides, coaching, and subscriptions — directly from your Instagram bio. No Shopify. No extra fees. No setup headache.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-6 text-[14px] text-[#444444]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Link-in-bio storefront at <span className="font-mono text-[#0A0A0A]">vyralify.io/your-username</span> — set up in under 10 minutes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Sell digital products, guides, templates, coaching calls, and subscriptions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Automatic delivery — product sent the moment payment clears, zero manual work</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Winning Products Library — sell proven products instantly, no creation needed (Pro)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Revenue dashboard — see exactly where every rupee comes from</span>
              </li>
            </ul>

            {/* Revenue Callout Card */}
            <div className="p-3.5 rounded-xl bg-[rgba(35,229,152,0.08)] border-l-4 border-[#23E598] border border-[rgba(35,229,152,0.2)] text-[13px] text-[#1DC884] font-medium leading-relaxed mb-6">
              "💰 The average Vyralify creator earns their first sale within 7 days of setting up their store."
            </div>

            {/* Plan Note */}
            <p className="text-[12px] text-[#888888] mb-5 font-mono">
              Free includes 1 product. Pro unlocks unlimited products and the full library.
            </p>

            {/* CTA */}
            <div>
              <button
                onClick={onStartFree}
                className="h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Set Up Your Store Free</span>
                <span>&rarr;</span>
              </button>
              <div className="text-[12px] text-[#666666] font-mono mt-2">
                No credit card required
              </div>
            </div>
          </div>

          {/* RIGHT: PHONE MOCKUP (LINK-IN-BIO STOREFRONT) */}
          <div className="relative w-full max-w-[420px] mx-auto">
            <div className="p-5 rounded-3xl bg-[#0F1117] border border-[#2A2A2A] shadow-2xl text-white space-y-4">
              
              {/* Creator Profile Header */}
              <div className="text-center space-y-2 pb-3 border-b border-white/[0.06]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Creator"
                  className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-[#23E598]"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">@thewealthmindset</h4>
                  <p className="text-[11px] text-neutral-400 max-w-xs mx-auto">
                    Daily mental models, stoicism &amp; wealth leverage. 48K+ creators.
                  </p>
                </div>
              </div>

              {/* 3 Product Cards */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-white text-[12px]">Instagram Growth Guide</h5>
                    <span className="text-[10px] text-neutral-400">42-page PDF &bull; Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#23E598] font-mono">₹299</span>
                    <button onClick={onStartFree} className="px-2.5 py-1 rounded bg-[#23E598] text-black font-bold text-[10px] cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-white text-[12px]">150+ Reel Hook Templates</h5>
                    <span className="text-[10px] text-neutral-400">Notion Swipe File</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#23E598] font-mono">₹199</span>
                    <button onClick={onStartFree} className="px-2.5 py-1 rounded bg-[#23E598] text-black font-bold text-[10px] cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-white text-[12px]">1-on-1 Growth Consultation</h5>
                    <span className="text-[10px] text-neutral-400">30-min strategy call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#23E598] font-mono">₹1,999</span>
                    <button onClick={onStartFree} className="px-2.5 py-1 rounded bg-[#23E598] text-black font-bold text-[10px] cursor-pointer">
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Revenue Notification */}
              <div className="p-3 rounded-xl bg-[#151822] border border-[#23E598]/30 shadow-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block">Total Revenue this month:</span>
                  <span className="text-sm font-bold text-white font-mono">₹24,800</span>
                </div>
                <span className="text-[10px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded font-bold">
                  &uarr; 6.2%
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
