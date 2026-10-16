import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

export default function TopStrip({ onStartFree }) {
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem('vyralify_hide_top_strip') !== 'true';
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('vyralify_hide_top_strip', 'true');
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Announcement"
      className="relative z-50 h-10 bg-[#23E598] text-black px-4 flex items-center justify-between text-[13px] font-semibold transition-all shrink-0 select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        {/* Centered Message */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-center truncate">
          <span className="truncate">
            🚀 Vyralify is live — Build, Grow &amp; Monetize your Instagram business.
          </span>
          <button
            onClick={onStartFree}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80 transition-opacity ml-1 cursor-pointer shrink-0 font-bold"
          >
            <span>Start free &rarr;</span>
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="text-black/70 hover:text-black transition-colors p-1 rounded-md hover:bg-black/10 cursor-pointer shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
