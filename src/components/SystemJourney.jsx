import React, { useState } from 'react';
import { 
  Rocket, 
  Search, 
  PenTool, 
  Zap, 
  ShoppingBag, 
  BarChart3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SystemJourney({ onNavigateModule }) {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 'build',
      icon: Rocket,
      name: 'BUILD',
      desc: 'Set up your niche, profile and audience.',
      previewTitle: 'Page Builder',
      previewDetail: 'Niche selector with 8 official taxonomies & AI bio optimizer.'
    },
    {
      id: 'discover',
      icon: Search,
      name: 'DISCOVER',
      desc: "See what's working in your niche.",
      previewTitle: 'Discover Engine',
      previewDetail: 'Real-time trending reel feed, audio velocity & competitor tracking.'
    },
    {
      id: 'create',
      icon: PenTool,
      name: 'CREATE',
      desc: 'Turn it into hooks, scripts and captions.',
      previewTitle: 'Content Generator',
      previewDetail: '50+ viral hook formulas, 60s reel scripts & 30-day planner.'
    },
    {
      id: 'monetize',
      icon: ShoppingBag,
      name: 'MONETIZE',
      desc: 'Sell digital goods from one link in your bio.',
      previewTitle: 'Creator Storefront',
      previewDetail: 'Digital downloads, 1-on-1 consultations & automated delivery.'
    },
    {
      id: 'measure',
      icon: BarChart3,
      name: 'MEASURE',
      desc: 'Track growth and revenue in one place.',
      previewTitle: 'Home Dashboard',
      previewDetail: 'Views, followers, conversion funnel & verified metrics.'
    },
    {
      id: 'optimize',
      icon: Sparkles,
      name: 'OPTIMIZE',
      desc: 'AI co-pilot analyzing metrics & next moves.',
      previewTitle: 'Vyralify AI Assistant',
      previewDetail: 'Retention breakdown, script variations & niche recommendations.'
    }
  ];

  return (
    <section 
      id="system-section"
      className="relative w-full bg-[#0A0A0A] py-24 text-white select-none border-b border-[#1F1F1F] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20">
        
        {/* 1. SECTION LABEL: THE VYRALIFY SYSTEM */}
        <div className="text-center mb-3">
          <span className="text-[12px] font-bold text-[#23E598] uppercase tracking-[0.15em]">
            THE VYRALIFY SYSTEM
          </span>
        </div>

        {/* 2. HEADLINE & SUBHEADING */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <h2 className="text-3xl sm:text-[40px] font-bold text-white leading-tight tracking-tight">
            Every part of your Instagram business. One connected system.
          </h2>
          <p className="text-[16px] text-[#A0A0A0] leading-relaxed mt-4 max-w-[620px] mx-auto font-normal">
            Vyralify isn't a collection of random tools — it's one system where every module feeds the next, and AI sits across all of it learning what works for your specific page.
          </p>
        </div>

        {/* 3. JOURNEY FLOW (HORIZONTAL ON DESKTOP, VERTICAL ON MOBILE) */}
        <div className="relative mb-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(isHovered ? null : step.id)}
                  className="flex flex-col items-center text-center relative group cursor-pointer"
                >
                  {/* Step Circle */}
                  <div className={`w-12 h-12 rounded-full bg-[#23E598] text-black flex items-center justify-center mb-3 transition-all duration-200 shadow-md ${
                    isHovered ? 'scale-110 shadow-[0_0_20px_rgba(35,229,152,0.4)]' : ''
                  }`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* Step Name */}
                  <div className="text-[13px] font-semibold text-white tracking-wide">
                    {step.name}
                  </div>

                  {/* Step Description */}
                  <div className="text-[12px] text-[#666666] leading-snug mt-1 max-w-[150px]">
                    {step.desc}
                  </div>

                  {/* Desktop connector arrow (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-3 text-[#23E598]/60 text-xs font-mono animate-pulse">
                      &rarr;
                    </div>
                  )}

                  {/* Mini Hover Tooltip Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-3 w-52 p-3 rounded-xl bg-[#141721] border border-[#23E598]/40 shadow-2xl z-30 text-left pointer-events-none"
                      >
                        <div className="text-[11px] font-bold text-[#23E598] font-mono">
                          {step.previewTitle}
                        </div>
                        <div className="text-[11px] text-neutral-300 mt-1 leading-tight">
                          {step.previewDetail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4. AI INTEGRATION CALLOUT PILL */}
        <div className="max-w-[700px] mx-auto p-4 rounded-full bg-[rgba(35,229,152,0.06)] border border-[rgba(35,229,152,0.2)] text-center mb-4">
          <p className="text-[14px] text-[#A0A0A0] italic flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#23E598] shrink-0" />
            <span>
              Vyralify AI sits across every step — learning your page, analyzing your content, and telling you exactly what to do next.
            </span>
          </p>
        </div>

        {/* 5. EXAMPLE CHAIN CAPTION (RULE 5) */}
        <p className="text-center text-[12px] text-[#555555] font-mono">
          Save a trend in Discover &bull; Turn it into a script in Create &bull; Link your product in Store &bull; See the sale on your Dashboard &bull; Optimize with AI
        </p>

      </div>
    </section>
  );
}
