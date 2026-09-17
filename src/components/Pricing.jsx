import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  return (
    <section id="pricing" className="relative py-20 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-[#D1FE17]/[0.02] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
            Simple Pricing. Start Free.
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Clipping and campaigns are free — always. Upgrade only when you're ready to scale your AI, growth and business tools.
          </p>

          {/* BILLING TOGGLE */}
          <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-[#121215] border border-neutral-200 dark:border-[#24242A]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-black text-white dark:bg-[#D1FE17] dark:text-black shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-black text-white dark:bg-[#D1FE17] dark:text-black shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#D1FE17] text-black text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS (FREE vs PRO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 items-stretch">
          
          {/* FREE PLAN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border border-neutral-200 dark:border-[#202025] flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  FREE
                </span>
                <span className="text-xl">🆓</span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 dark:text-white">
                    $0
                  </span>
                  <span className="text-neutral-500 text-sm font-medium">/ forever</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-1">₹0 / forever</div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                For creators and clippers just getting started.
              </p>

              <div className="space-y-3.5 mb-8">
                {[
                  'Basic platform access',
                  'Limited AI credits',
                  'Basic growth & content tools',
                  'Full Campaigns & Clipping access',
                  'Community access'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <Check className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#signup"
              className="w-full py-3 px-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold text-sm transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* PRO PLAN (Most Popular + Green Border) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-8 rounded-2xl bg-neutral-50 dark:bg-[#0B0B0D] border-2 border-[#D1FE17] relative flex flex-col justify-between shadow-xl"
          >
            {/* Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D1FE17] text-black font-semibold text-xs flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Most Popular</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D1FE17]">
                  PRO
                </span>
                <span className="text-xl">💎</span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 dark:text-white">
                    {billingCycle === 'yearly' ? '$7' : '$9'}
                  </span>
                  <span className="text-neutral-500 text-sm font-medium">/ month</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-1">
                  {billingCycle === 'yearly' ? '₹399 / month (billed yearly)' : '₹499 / month'}
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                For creators ready to scale their page and business.
              </p>

              <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider mb-3">
                Everything in Free, plus:
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  'Advanced AI + higher usage',
                  'Advanced Growth Intelligence',
                  'Advanced Analytics',
                  'Content Intelligence',
                  'Full Monetization Suite',
                  'White Label AI Tool',
                  'Priority Support'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-neutral-900 dark:text-white font-medium">
                    <Check className="w-4 h-4 text-[#D1FE17] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#upgrade"
              className="w-full py-3 px-4 rounded-xl bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-bold text-sm transition-colors text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* TRUST LINE */}
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-mono">
            No credit card required · Cancel anytime · Clipping always free
          </p>
        </div>

      </div>
    </section>
  );
}
