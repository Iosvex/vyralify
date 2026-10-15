import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight, CheckCircle2, BarChart3, Wand2 } from 'lucide-react';

/**
 * Interactive Scripted Demo Modal
 * Triggered by: Hero "Watch Demo" & Final CTA "Watch Demo"
 * Specification:
 * - Shows Vyralify AI Chat interface
 * - 3 interactive prompt chips:
 *   1. "Why did my last Reel underperform?"
 *   2. "What should I post today?"
 *   3. "What should I fix on my page?"
 * - Selecting chip shows typing indicator (600ms), then data-grounded response with numbers & highlights
 * - Action buttons with explanation note
 * - Input bar with locked tooltip: "Create a free account to ask your own questions"
 * - Primary CTA: Start Free →
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
    }, 500);
  };

  const current = scriptAnswers[activePrompt];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-[#23E598]/40 rounded-2xl shadow-[0_20px_70px_rgba(35,229,152,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="py-4 px-6 border-b border-[#1F1F1F] flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#23E598] flex items-center justify-center text-[#0A0A0A] font-extrabold text-xs shadow-xs">
              AI
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Vyralify AI Interactive Demo</span>
                <span className="px-2 py-0.5 rounded-full bg-[#23E598]/15 text-[#23E598] text-[10px] font-mono">Live Simulation</span>
              </h3>
              <p className="text-[11px] text-[#777777]">Grounding responses on real page analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Scrollable chat thread */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs md:text-sm">
          
          {/* User message bubble */}
          <div className="flex justify-end">
            <div className="bg-[#1C1C1C] border border-[#2A2A2A] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-md shadow-xs">
              <p className="font-medium">{current.question}</p>
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#23E598]/20 border border-[#23E598]/40 flex items-center justify-center text-[#23E598] shrink-0 mt-1">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 bg-[#141414] border border-[#222222] rounded-2xl rounded-tl-xs p-5 shadow-sm space-y-4">
              {isTyping ? (
                <div className="flex items-center gap-1.5 py-4 text-[#A0A0A0]">
                  <span className="w-2 h-2 rounded-full bg-[#23E598] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#23E598] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#23E598] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs ml-2 font-mono">Analyzing your account data...</span>
                </div>
              ) : (
                <>
                  {/* Performance Comparison Header */}
                  <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center gap-2.5 text-xs text-[#E5E5E5]">
                    <BarChart3 className="w-4 h-4 text-[#23E598] shrink-0" />
                    <span><strong>Analysis:</strong> {current.viewsComparison}</span>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2.5">
                    {current.reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#23E598] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white">{r.title}: </span>
                          <span className="text-[#AAAAAA]">{r.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Recommendation */}
                  <div className="p-3.5 rounded-xl bg-[#23E598]/8 border border-[#23E598]/20 text-[#D1D1D1] text-xs leading-relaxed">
                    <strong className="text-[#23E598]">Next Action: </strong>
                    {current.recommendation}
                  </div>

                  {/* Action Buttons in Demo */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        onClose();
                        onStartFree();
                      }}
                      className="px-3.5 py-2 rounded-lg bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{current.action1}</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onStartFree();
                      }}
                      className="px-3 py-2 rounded-lg bg-[#202020] hover:bg-[#282828] text-white text-xs border border-[#333333] cursor-pointer transition-colors"
                    >
                      <span>{current.action2}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#666666] italic">
                    (In the full app, clicking action buttons opens Discover & Create with this script ready to post)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer: 3 Prompt Chips & Locked Input */}
        <div className="p-4 md:p-5 border-t border-[#1F1F1F] bg-[#111111] space-y-3">
          <div className="flex items-center justify-between text-xs text-[#888888]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Test another prompt:</span>
            <span className="text-[11px] text-[#23E598]">Interactive Demo</span>
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
                    ? 'bg-[#23E598] text-[#0A0A0A] font-bold shadow-xs'
                    : 'bg-[#1C1C1C] text-[#AAAAAA] hover:text-white border border-[#2A2A2A]'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Locked Input Bar with Tooltip */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#181818] border border-[#2A2A2A] text-xs text-[#666666]">
              <span>Ask Vyralify anything about your Instagram business...</span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] text-[#23E598]/90 font-mono">
                  Locked in preview
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onStartFree();
                  }}
                  className="px-3 py-1 rounded-md bg-[#23E598] text-[#0A0A0A] text-xs font-bold hover:bg-[#1DCC84] transition-colors cursor-pointer"
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
