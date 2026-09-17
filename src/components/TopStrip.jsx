import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function TopStrip() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-50 bg-[#070908] border-b border-white/[0.08] text-[11px] sm:text-xs text-neutral-300 py-1.5 px-4 transition-all shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Centered Announcement Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#16220E] border border-[#2B471C] text-[#D1FE17] text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
            NEW RELEASE
          </span>
          <span className="font-normal text-neutral-200">
            Join Paid Brand Campaigns &amp; Clip to Earn with <strong className="text-white font-semibold">0% Platform Fee</strong>
          </span>
          <a
            href="#clip-and-earn"
            className="inline-flex items-center gap-1 font-semibold text-[#D1FE17] hover:text-[#BBF00E] transition-colors ml-1 group"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-neutral-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5 cursor-pointer shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
}
