import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Sticky Mobile CTA Bar
 * Specification:
 * - On mobile (<768px): 56px high bar at bottom
 * - Appears after hero scrolls out of view (>500px)
 * - Hides while pricing section is visible on screen
 * - Respects device safe area
 * - "Start Free →" green pill
 */

export default function StickyMobileCTA({ onStartFree }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 450; // Hero height approximate

      const pricingElem = document.getElementById('pricing');
      let isPricingInView = false;

      if (pricingElem) {
        const rect = pricingElem.getBoundingClientRect();
        // Check if pricing section intersects viewport
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          isPricingInView = true;
        }
      }

      if (scrollY > heroThreshold && !isPricingInView) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0A0A0A]/95 border-t border-[#1F1F1F] backdrop-blur-lg shadow-2xl safe-area-pb transition-transform duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#23E598] animate-pulse" />
            <span>Vyralify Free</span>
          </span>
          <span className="text-[10px] text-[#777777]">No credit card required</span>
        </div>

        <button
          onClick={onStartFree}
          className="h-10 px-5 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#23E598]/20 cursor-pointer shrink-0"
        >
          <span>Start Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
