import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Shield, ArrowRight, Zap, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlanGating } from '../../context/PlanGatingContext';

export default function UpgradeModal() {
  const { user, tier, updateTier } = useAuth();
  const { modalState, closeUpgradeModal } = usePlanGating();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [selectedTier, setSelectedTier] = useState(modalState.targetTier || 'pro');
  const [upgrading, setUpgrading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!modalState.isOpen) return null;

  const handleSimulateUpgrade = (tierToSet) => {
    setUpgrading(true);
    setTimeout(() => {
      updateTier(tierToSet);
      setUpgrading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeUpgradeModal();
      }, 1400);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeUpgradeModal}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0B0D13] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-white z-10 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={closeUpgradeModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
            aria-label="Close upgrade modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Context Trigger */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-white/[0.04] border border-emerald-200 dark:border-white/[0.08] text-emerald-700 dark:text-neutral-300 text-[11px] font-mono mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-400" />
              <span>Creator Plans</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {modalState.title || "Upgrade Your Vyralify Plan"}
            </h2>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              {modalState.description || "Get deep algorithm insights, 300+ daily AI credits, full automation, and unlimited bio storefront products."}
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] mt-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-white text-emerald-700 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'yearly' ? 'bg-white text-emerald-700 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-700 font-mono font-bold">Save 25%</span>
              </button>
            </div>
          </div>

          {/* 3 Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            
            {/* TIER 1: FREE (STARTER) */}
            <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
              tier === 'free' 
                ? 'bg-neutral-50 border-neutral-300 dark:bg-neutral-900/50 dark:border-neutral-700' 
                : 'bg-neutral-50/60 dark:bg-[#10121A]/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
            }`}>
              <div>
                <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Starter
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mb-2">
                  ₹0 <span className="text-xs font-normal text-neutral-500">/ month</span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                  For creators testing the waters and exploring the AI tools.
                </p>

                <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-neutral-400" /> 1 Connected Page</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-neutral-400" /> 20 AI Credits / day</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-neutral-400" /> Basic AI Q&A</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-neutral-400" /> 7-Day Content Planner</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-neutral-400" /> 1 Link-in-Bio Product</div>
                  <div className="flex items-center gap-2 text-neutral-400 line-through">Automations Locked</div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                <span className="block text-center text-xs font-mono text-neutral-400 font-medium">
                  {tier === 'free' ? 'Current Active Plan' : 'Free Tier'}
                </span>
              </div>
            </div>

            {/* TIER 2: PRO (₹499/mo) - RECOMMENDED (WHITE & GREEN HIGHLIGHT) */}
            <div className="rounded-2xl p-5 bg-emerald-50/50 dark:bg-white/[0.04] border-2 border-emerald-500 relative flex flex-col justify-between shadow-md">
              {/* Most Popular Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[9px] tracking-wider uppercase shadow-xs">
                Most Popular
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-800 dark:text-white uppercase tracking-wider">
                    PRO CREATOR
                  </span>
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 font-mono">
                  {billingCycle === 'yearly' ? '₹375' : '₹499'}
                  <span className="text-xs font-normal text-neutral-500"> / mo</span>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-neutral-400 font-mono mb-2 font-medium">
                  {billingCycle === 'yearly' ? 'Billed ₹4,500 / year' : 'Billed monthly'}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                  For creators scaling pages, automating DMs, and selling products.
                </p>

                <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-200 pt-3 border-t border-emerald-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">Up to 3 Pages</span></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">300 AI Credits / day</span></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">Strategy &amp; Analysis</span></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">30-Day Content Planner</span></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">Instagram Automations</span></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> <span className="font-medium">Unlimited Store Products</span></div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-emerald-200 dark:border-white/[0.08]">
                <button
                  onClick={() => handleSimulateUpgrade('pro')}
                  disabled={upgrading || tier === 'pro'}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {tier === 'pro' ? (
                    <span>Active Plan</span>
                  ) : upgrading ? (
                    <span>Processing Upgrade...</span>
                  ) : success ? (
                    <span>Upgrade Confirmed!</span>
                  ) : (
                    <>
                      <span>Upgrade to Pro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>


            {/* TIER 3: ELITE (₹1,499/mo) */}
            <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
              tier === 'elite' 
                ? 'bg-amber-50 border-amber-500' 
                : 'bg-neutral-50/60 dark:bg-[#10121A]/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    ELITE / SCALE
                  </span>
                  <Crown className="w-4 h-4 text-amber-500" />
                </div>

                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mb-1">
                  {billingCycle === 'yearly' ? '₹1,125' : '₹1,499'}
                  <span className="text-xs font-normal text-neutral-500"> / month</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mb-2">
                  {billingCycle === 'yearly' ? 'Billed ₹13,500 / year' : 'Billed monthly'}
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                  For agencies, multi-page empires, and white-label AI reselling.
                </p>

                <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> <strong>Unlimited Pages</strong></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> <strong>Unlimited AI Credits</strong></div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> Priority Response Speed</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> Unlimited Automations & CRM</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> Bulk Content Auto-Scheduling</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-500 font-bold" /> <strong>White-Label AI Resale</strong></div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                <button
                  onClick={() => handleSimulateUpgrade('elite')}
                  disabled={upgrading || tier === 'elite'}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {tier === 'elite' ? 'Active Plan' : 'Upgrade to Elite'}
                </button>
              </div>
            </div>

          </div>

          {/* Trust footer */}
          <div className="text-center text-xs text-neutral-400 font-mono pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-6">
            <span>✓ Instant activation</span>
            <span>✓ Cancel anytime with 1 click</span>
            <span>✓ 7-day money-back guarantee</span>
            <span>✓ Secure 256-bit encryption</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
