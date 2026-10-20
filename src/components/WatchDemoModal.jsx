import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight, CheckCircle2, BarChart3, Wand2 } from 'lucide-react';

/**
 * Interactive Scripted Demo Modal - Electric Light Blueprint
 * - Frosted pure white glass container (#FFFFFF) with 1px ice border (rgba(6, 124, 249, 0.12))
 * - Single Electric Blue (#067CF9) brand accent
 * - Obsidian Navy (#0F172A) & Slate (#64748B) text
 * - Typography: Plus Jakarta Sans for headings, Inter for controls
 */

export default function WatchDemoModal({ isOpen, onClose, onStartFree }) {
  const [activePrompt, setActivePrompt] = useState('underperform');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const scriptAnswers = {
    underperform: {
      question: "Why did my last Reel underperform?",
      viewsComparison: "Your last Reel got 12.4K views vs your 34.2K average (64% drop).",
      reasons: [
        {
          title: "Weak Hook Drop-off",
          desc: "42% of viewers swiped away before second 3 (your benchmark is under 22%). The visual hook was static."
        },
        {
          title: "Audio Saturation",
          desc: "The audio you used peaked 9 days ago in the Business niche; algorithm push slowed down by 40%."
        },
        {
          title: "CTA Placement",
          desc: "Your save CTA appeared at second 48 — only 14% of viewers reached the end."
        }
      ],
      recommendation: "Re-edit with a text hook in the first 0.8s, switch to the 'Morning Motivation' trending track, and place your DM keyword trigger in the first 5 seconds.",
      action1: "Create Similar Reel (AI Optimized)",
      action2: "View Retention Breakdown"
    },
    postToday: {
      question: "What should I post today?",
      viewsComparison: "Top trending format in your niche right now: Problem-Solution Carousel & Fast-Paced Reel.",
      reasons: [
        {
          title: "High Opportunity Topic",
          desc: "'How to automate DMs while sleeping' has +180% search interest this week with low competition."
        },
        {
          title: "Proven Hook Structure",
          desc: "'Stop doing [Mistake] if you want to hit [Desired Outcome] in 2026.' (89/100 viral score)."
        },
        {
          title: "Best Posting Window",
          desc: "Your audience is most active today between 6:30 PM – 8:15 PM IST."
        }
      ],
      recommendation: "We prepared a ready-to-use 7-slide carousel script and a 15-second Reel caption targeting beginner creators.",
      action1: "Open Ready-to-Post Script",
      action2: "Schedule for 6:30 PM"
    },
    fixPage: {
      question: "What should I fix on my page?",
      viewsComparison: "Current Page Health Score: 74/100 (+18 potential score boost).",
      reasons: [
        {
          title: "Bio Missing Clear Value Prop",
          desc: "Your bio explains what you do, but not what the follower gets. Add: 'Helping you launch theme pages from scratch'."
        },
        {
          title: "No Automated Lead Magnet",
          desc: "You have a direct store link, but zero freebie capture. Adding a free guide in bio increases conversion by 3.2x."
        },
        {
          title: "Highlight Covers Inconsistent",
          desc: "Covers lack clear labels; followers don't know where to click for proof or products."
        }
      ],
      recommendation: "Apply our one-click optimized bio formula and deploy the 'FREE' DM keyword trigger.",
      action1: "Apply One-Click Bio Fix",
      action2: "Set Up Lead Magnet DM"
    }
  };

  const handlePromptSelect = (key) => {
    if (key === activePrompt) return;
    setIsTyping(true);
    setActivePrompt(key);
    setTimeout(() => {
      setIsTyping(false);
    }, 450);
  };

  const current = scriptAnswers[activePrompt];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-blue-200/80 rounded-2xl shadow-[0_20px_70px_rgba(6,124,249,0.18)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="py-4 px-6 border-b border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-50/60 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#067CF9] flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-blue-500/20">
              AI
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 font-headline">
                <span>Vyralify AI Interactive Demo</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100/80 text-[#067CF9] text-[10px] font-mono font-semibold">Live Simulation</span>
              </h3>
              <p className="text-[11px] text-slate-500">Grounding responses on real page analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Scrollable chat thread */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs md:text-sm bg-[#F8FAFC]">
          
          {/* User message bubble */}
          <div className="flex justify-end">
            <div className="bg-[#067CF9] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-md shadow-sm">
              <p className="font-medium">{current.question}</p>
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[#067CF9] shrink-0 mt-1">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-5 shadow-sm space-y-4">
              {isTyping ? (
                <div className="flex items-center gap-1.5 py-4 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#067CF9] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#067CF9] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#067CF9] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs ml-2 font-mono">Analyzing your account data...</span>
                </div>
              ) : (
                <>
                  {/* Performance Comparison Header */}
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5 text-xs text-[#0F172A]">
                    <BarChart3 className="w-4 h-4 text-[#067CF9] shrink-0" />
                    <span><strong>Analysis:</strong> {current.viewsComparison}</span>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2.5">
                    {current.reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#067CF9] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0F172A]">{r.title}: </span>
                          <span className="text-slate-600">{r.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Recommendation */}
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/70 text-slate-700 text-xs leading-relaxed">
                    <strong className="text-[#067CF9]">Next Action: </strong>
                    {current.recommendation}
                  </div>

                  {/* Action Buttons in Demo */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        onClose();
                        onStartFree();
                      }}
                      className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20 transition-all"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{current.action1}</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onStartFree();
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 cursor-pointer transition-colors"
                    >
                      <span>{current.action2}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    (In the full app, clicking action buttons opens Discover & Create with this script ready to post)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer: 3 Prompt Chips & Locked Input */}
        <div className="p-4 md:p-5 border-t border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Test another prompt:</span>
            <span className="text-[11px] text-[#067CF9] font-medium">Interactive Simulation</span>
          </div>

          {/* 3 Prompt Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'underperform', label: 'Why did my last Reel underperform?' },
              { id: 'postToday', label: 'What should I post today?' },
              { id: 'fixPage', label: 'What should I fix on my page?' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => handlePromptSelect(chip.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activePrompt === chip.id
                    ? 'bg-[#067CF9] text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Locked Input Bar with Tooltip */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
              <span>Ask Vyralify anything about your Instagram business...</span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] text-[#067CF9] font-mono">
                  Locked in preview
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onStartFree();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#067CF9] text-white text-xs font-semibold hover:bg-[#056AD6] transition-colors cursor-pointer shadow-xs"
                >
                  Start Free
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
