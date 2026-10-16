import React, { useState } from 'react';
import { Rocket, Smartphone, Check, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Section 13: HOW IT WORKS + TWO STARTING PATHS
 * Specification:
 * - Background: #0A0A0A (dark)
 * - Section Label: "HOW IT WORKS" — 12px, #23E598, uppercase, centered
 * - Headline: "Start in minutes. See results fast." 40px, 700, #FFFFFF, centered
 * - Segmented toggle: "Starting from scratch" vs "I have a page"
 * - Two path cards side by side (desktop), toggled/stacked (mobile)
 * - Card 1: Starting from scratch (#111111, green border, "Start Building →")
 * - Card 2: Already have a page (#111111, subtle border, "Connect My Page →")
 * - Trust line: "Both paths take less than 5 minutes to set up."
 */
export default function TwoPaths({ onSelectPath, activePath: externalPath }) {
  const [selectedPath, setSelectedPath] = useState(externalPath || 'scratch');

  React.useEffect(() => {
    if (externalPath) {
      setSelectedPath(externalPath);
    }
  }, [externalPath]);

  const handleSelect = (path) => {
    setSelectedPath(path);
  };

  const handleCtaClick = (path) => {
    if (onSelectPath) {
      onSelectPath(path);
    }
  };

  return (
    <section id="two-paths" className="relative bg-[#0A0A0A] text-white py-24 px-5 md:px-10 border-t border-[#1F1F1F]">
      <div id="how-it-works" className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[12px] font-bold text-[#23E598] tracking-[0.18em] uppercase inline-block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight leading-tight mb-4">
            Start in minutes. See results fast.
          </h2>
          <p className="text-[#A0A0A0] text-sm md:text-base">
            Who is this for? Pick your starting point.
          </p>

          {/* Who is this for? Segmented Toggle */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#161616] border border-[#2A2A2A] shadow-inner">
            <button
              onClick={() => handleSelect('scratch')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedPath === 'scratch'
                  ? 'bg-[#23E598] text-[#0A0A0A] shadow-md shadow-[#23E598]/20'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>Starting from scratch</span>
            </button>
            <button
              onClick={() => handleSelect('existing')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedPath === 'existing'
                  ? 'bg-[#23E598] text-[#0A0A0A] shadow-md shadow-[#23E598]/20'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>I have a page</span>
            </button>
          </div>
        </div>

        {/* Path Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Starting from scratch */}
          <div
            id="beginner-card"
            onClick={() => handleSelect('scratch')}
            className={`rounded-2xl p-8 md:p-10 transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
              selectedPath === 'scratch'
                ? 'bg-[#111111] border-2 border-[#23E598] shadow-[0_0_30px_rgba(35,229,152,0.12)] -translate-y-1'
                : 'bg-[#111111] border border-[#222222] opacity-80 hover:opacity-100 hover:border-[#333333]'
            }`}
          >
            {selectedPath === 'scratch' && (
              <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-[#23E598] text-[#0A0A0A] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                Recommended for Beginners
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#23E598]/10 border border-[#23E598]/30 flex items-center justify-center text-[#23E598]">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">I want to build a page from scratch</h3>
                  <p className="text-xs text-[#A0A0A0]">Perfect if you have no Instagram page yet</p>
                </div>
              </div>

              {/* Numbered Steps */}
              <div className="mt-8 space-y-4">
                {[
                  { num: '1', text: 'Create your Vyralify account (free)' },
                  { num: '2', text: 'Choose your niche using our AI selector' },
                  { num: '3', text: 'Set up your page positioning and bio' },
                  { num: '4', text: 'Discover trending content and create your first posts' },
                  { num: '5', text: 'Set up automation and store to start earning' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-[#23E598] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <span className="text-sm text-[#CCCCCC] leading-relaxed">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#1F1F1F]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCtaClick('scratch');
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#23E598]/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Already have a page */}
          <div
            id="creator-card"
            onClick={() => handleSelect('existing')}
            className={`rounded-2xl p-8 md:p-10 transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
              selectedPath === 'existing'
                ? 'bg-[#111111] border-2 border-[#23E598] shadow-[0_0_30px_rgba(35,229,152,0.12)] -translate-y-1'
                : 'bg-[#111111] border border-[#222222] opacity-80 hover:opacity-100 hover:border-[#333333]'
            }`}
          >
            {selectedPath === 'existing' && (
              <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-[#23E598] text-[#0A0A0A] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                Recommended for Existing Pages
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">I already have an Instagram page</h3>
                  <p className="text-xs text-[#A0A0A0]">Perfect if you want to grow and monetize faster</p>
                </div>
              </div>

              {/* Numbered Steps */}
              <div className="mt-8 space-y-4">
                {[
                  { num: '1', text: 'Connect your existing Instagram page' },
                  { num: '2', text: 'Run your free page audit (see what to fix)' },
                  { num: '3', text: 'Get AI-powered content recommendations' },
                  { num: '4', text: 'Set up DM automation to capture leads' },
                  { num: '5', text: 'Launch your store and monetize your audience' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <span className="text-sm text-[#CCCCCC] leading-relaxed">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#1F1F1F]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCtaClick('existing');
                }}
                className="w-full py-3.5 px-6 rounded-full bg-transparent hover:bg-white/10 text-white border border-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Connect My Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-text */}
        <p className="text-center text-xs md:text-sm text-[#555555] mt-10">
          Both paths take less than 5 minutes to set up.
        </p>
      </div>
    </section>
  );
}
