import React from 'react';
import { ArrowRight, Play, Sparkles, Shield, Zap } from 'lucide-react';

/**
 * Section 16: FINAL CTA
 * Specification:
 * - Background: #0A0A0A (dark)
 * - Padding: 120px 0
 * - Headline: "Your Instagram business starts today." 48px desktop / 36px mobile, 700, #FFFFFF, centered. "today" in #23E598
 * - Subheading: "Build your page, grow with AI, automate your DMs, and start earning — free." 18px, #A0A0A0, centered, max 560px
 * - CTA Row: [Start Free →] (green pill) [Watch Demo ▶] (white outline)
 * - Below CTA: "Free plan · No credit card required · Join 10K+ creators" — 13px, #555555, centered
 * - Background: Subtle centered green radial glow
 */

export default function FinalCTA({ onStartFree, onWatchDemo }) {
  return (
    <section className="relative bg-[#0A0A0A] text-white py-28 px-5 md:px-10 overflow-hidden border-t border-[#1F1F1F]">
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(35, 229, 152, 0.4) 0%, rgba(35, 229, 152, 0.05) 50%, transparent 70%)'
        }}
      />

      {/* Faint blurred floating mock cards for ambient depth */}
      <div className="absolute -left-12 top-1/3 w-64 p-4 rounded-xl bg-[#111111]/40 border border-white/5 backdrop-blur-xl rotate-[-8deg] opacity-20 hidden lg:block pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#23E598]/20 flex items-center justify-center text-[#23E598] text-[10px]">✨</div>
          <span className="text-[11px] text-white/80 font-mono">Hook generated</span>
        </div>
        <p className="text-[10px] text-neutral-400">"5 secrets theme pages won't tell you..."</p>
      </div>

      <div className="absolute -right-12 bottom-1/4 w-64 p-4 rounded-xl bg-[#111111]/40 border border-white/5 backdrop-blur-xl rotate-[8deg] opacity-20 hidden lg:block pointer-events-none">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono text-[#23E598]">💳 Sale: ₹299</span>
          <span className="text-[10px] text-neutral-500">Just now</span>
        </div>
        <p className="text-[10px] text-neutral-300">Instagram Growth Blueprint</p>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-semibold text-[#23E598] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Today in 5 Minutes</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
          Your Instagram business starts <span className="text-[#23E598]">today.</span>
        </h2>

        {/* Subheading */}
        <p className="text-[#A0A0A0] text-base md:text-lg max-w-[560px] mx-auto leading-relaxed mb-8">
          Build your page, grow with AI, automate your DMs, and start earning — free.
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-6">
          <button
            onClick={onStartFree}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-extrabold text-sm md:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#23E598]/25 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onWatchDemo}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:border-white/40 font-semibold text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Trust microcopy */}
        <p className="text-xs md:text-sm text-[#555555]">
          Free plan · No credit card required · Join 10K+ creators
        </p>
      </div>
    </section>
  );
}
