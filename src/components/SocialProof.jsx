import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

function CountUpMetric({ value, label, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract number from string (e.g. "900M+" -> 900, "$500K+" -> 500, "10K+" -> 10, "1M+" -> 1)
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const prefix = value.startsWith('$') ? '$' : '';
  const valueSuffix = value.replace(/[\$\d]/g, '');

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * targetNumber);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetNumber]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-300 transition-all">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neutral-900 tracking-tight mb-2">
        {prefix}{isInView ? displayValue : 0}{valueSuffix}
      </div>
      <div className="text-xs sm:text-sm font-inter font-medium text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function SocialProof() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
  ];

  // Marquee Cards from PDF Pages 4 & 5
  const marqueeCards = [
    {
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      handle: "@pagehandle",
      category: "Creator",
      result: "$4,120 in sales"
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      handle: "@clipperhandle",
      category: "Clipper",
      result: "254K views"
    },
    {
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
      handle: "Brand Name",
      category: "Brand",
      result: "12 campaigns"
    },
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      handle: "@creatorhandle",
      category: "Creator",
      result: "$2,840 earned"
    },
    {
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      handle: "@apex_cuts",
      category: "Clipper",
      result: "1.4M views"
    },
    {
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
      handle: "FinFlow Health",
      category: "Brand",
      result: "8 live sprints"
    },
    {
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      handle: "@mindset_daily",
      category: "Creator",
      result: "$6,950 in sales"
    },
    {
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      handle: "@reels_wizard",
      category: "Clipper",
      result: "890K views"
    }
  ];

  return (
    <section 
      id="creators" 
      className="relative w-full py-20 sm:py-28 bg-[#FAFAFA] text-neutral-900 border-t border-neutral-200 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. EYEBROW & 2. HEADING (PDF Page 4 - No Subheading) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7EE] border border-[#DCFCE7] text-[#16A34A] text-xs font-inter font-semibold tracking-wide uppercase mb-5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            <span>TRUSTED BY THE COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neutral-900 tracking-tight leading-tight">
            Creators, Clippers &amp; Brands — Building With Vyralify
          </h2>
        </div>

        {/* 3. CREATOR / BRAND HANDLE MARQUEE (PDF Page 4 & 5) */}
        <div className="mb-16 sm:mb-20">
          <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest text-center mb-4">
            Building with Vyralify
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4 animate-marquee whitespace-nowrap py-2">
              {[...marqueeCards, ...marqueeCards].map((card, idx) => (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* PFP / Avatar */}
                  <img 
                    src={card.avatar} 
                    alt={card.handle} 
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-200"
                  />

                  {/* Handle + Category Chip */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900 font-headline">
                        {card.handle}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                        card.category === 'Creator'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : card.category === 'Clipper'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {card.category}
                      </span>
                    </div>

                    {/* Real result / activity */}
                    <div className="text-[11px] font-inter font-medium text-neutral-500 mt-0.5">
                      {card.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. METRICS (PDF Page 5 & 6: 4 Metrics with viewport count-up) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <CountUpMetric value="900M+" label="Combined Views" />
          <CountUpMetric value="10K+" label="Creators" />
          <CountUpMetric value="$500K+" label="Creator Earnings" />
          <CountUpMetric value="1M+" label="Pieces of Content" />
        </div>

      </div>
    </section>
  );
}
