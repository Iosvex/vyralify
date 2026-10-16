import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

export default function Hero({ onStartFree, onWatchDemo, onSelectPath }) {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Tilt straightens smoothly as user scrolls down (disabled if user prefers reduced motion)
  const rotateX = useTransform(scrollYProgress, [0, 0.4], shouldReduceMotion ? [0, 0] : [6, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], shouldReduceMotion ? [1, 1] : [1, 1.02]);

  const handleBeginnerClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('beginner-card') || document.getElementById('two-paths');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      target.style.boxShadow = '0 0 0 3px #23E598, 0 0 30px rgba(35,229,152,0.4)';
      setTimeout(() => {
        target.style.boxShadow = '';
      }, 500);
      if (onSelectPath) onSelectPath('scratch');
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-start pt-16 sm:pt-20 pb-24 px-5 sm:px-10 lg:px-20 overflow-hidden select-none"
    >
      {/* BACKGROUND TREATMENT: Fine dot grid at exact 4% opacity (Rule 4 spec) + subtle green radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(35,229,152,0.08) 0%, transparent 70%)'
        }}
      />

      {/* CENTERED CONTENT */}
      <div className="relative z-10 max-w-[820px] mx-auto text-center flex flex-col items-center">
        
        {/* EYEBROW WITH FLANKING THIN LINES */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-10 h-[1px] bg-[#23E598]" />
          <span className="text-[12px] font-bold text-[#23E598] tracking-[0.18em] uppercase">
            BUILD. GROW. MONETIZE.
          </span>
          <span className="w-10 h-[1px] bg-[#23E598]" />
        </div>

        {/* HEADLINE */}
        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.15] max-w-[800px]">
          Everything You Need to Build, Grow &amp; Monetize Your{' '}
          <span className="text-[#23E598]">Instagram Business</span>
        </h1>

        {/* SUBHEADING */}
        <p className="text-[#A0A0A0] text-base sm:text-[18px] leading-relaxed max-w-[620px] mt-5 font-normal">
          Build and grow your Instagram with Vyralify AI — discover what to post, create content that performs, automate your DMs, and turn your attention into real revenue.
        </p>

        {/* BEGINNER LINE (RULE 1 HOOK) */}
        <div className="mt-3">
          <button
            onClick={handleBeginnerClick}
            className="text-[14px] text-[#23E598] hover:underline font-medium inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>No page yet? We'll help you pick a niche and start from zero</span>
            <span className="font-bold">&rarr;</span>
          </button>
        </div>

        {/* CTA ROW */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={onStartFree}
            className="w-full sm:w-auto h-11 px-7 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black font-bold text-sm tracking-tight transition-all duration-150 hover:shadow-[0_0_20px_rgba(35,229,152,0.35)] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Start Free</span>
            <span>&rarr;</span>
          </button>

          <button
            onClick={onWatchDemo}
            className="w-full sm:w-auto h-11 px-6 rounded-full border border-white hover:bg-white/[0.08] text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Watch a 2-min Demo</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* TRUST MICROCOPY (RULE 1) */}
        <p className="text-[13px] text-[#555555] mt-3 font-mono">
          Free plan &bull; No credit card required &bull; Cancel anytime
        </p>
      </div>

      {/* MAIN VISUAL: REAL DASHBOARD MOCKUP — CLEAN FRAME WITHOUT BROWSER CHROME, NO FLOATING CARDS (SPEC RULE 4) */}
      <div className="relative w-full max-w-[1040px] mt-14 z-10 px-2 sm:px-0">
        <motion.div
          style={{ rotateX, scale, transformPerspective: 1200 }}
          className="relative rounded-2xl bg-[#0F1117] border border-[#2A2A2A] shadow-2xl overflow-hidden p-3 sm:p-4"
        >
          {/* Real Dashboard Body Layout — Pure Product UI, No Browser Chrome */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3.5">
            <div className="p-3.5 rounded-xl bg-[#141721] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Followers</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">48.2K</div>
              <div className="text-[11px] text-[#23E598] font-mono mt-0.5">+1.2K (30d)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141721] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Reel Views (7d)</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">184.5K</div>
              <div className="text-[11px] text-[#23E598] font-mono mt-0.5">+44.8% organic</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141721] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Store Revenue</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">₹42,850</div>
              <div className="text-[11px] text-[#23E598] font-mono mt-0.5">+32.4% sales</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141721] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Engagement</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">4.8%</div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">Niche avg: 2.8%</div>
            </div>
          </div>

          {/* Lower Chart + Recommendations Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 p-4 rounded-xl bg-[#141721] border border-white/[0.06] flex flex-col justify-between h-48">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">30-Day Growth &amp; Algorithmic Distribution</span>
                <span className="text-[10px] font-mono text-[#23E598]">+142% reach velocity</span>
              </div>
              <div className="h-28 flex items-end justify-between gap-1.5 px-2 pt-2">
                {[35, 42, 38, 55, 62, 58, 74, 82, 79, 91, 105, 118, 134, 150, 168, 184].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full rounded-t bg-gradient-to-t from-[#23E598]/20 to-[#23E598] transition-all"
                      style={{ height: `${(v / 184) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141721] border border-white/[0.06] space-y-2.5">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#23E598]" />
                <span>AI Next Best Action</span>
              </div>
              <p className="text-xs text-neutral-300 leading-snug">
                "Reel drop-off at 0:04 observed in your niche. Generate 3 high-retention audio hook variations now."
              </p>
              <button
                onClick={onStartFree}
                className="w-full py-1.5 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-[#23E598] border border-white/10 transition-colors cursor-pointer"
              >
                Apply AI Script &rarr;
              </button>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
