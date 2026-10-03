import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { usePlanGating, FEATURE_GATES } from '../../context/PlanGatingContext';

export default function SoftLockWrapper({ 
  featureKey, 
  title, 
  description, 
  minTier = 'pro',
  children,
  className = "" 
}) {
  const { canAccess, openUpgradeModal } = usePlanGating();
  const hasAccess = canAccess(featureKey || { minTier });

  if (hasAccess) {
    return <>{children}</>;
  }

  const gateConfig = Object.values(FEATURE_GATES).find(g => g.key === featureKey) || {
    title: title || 'Upgrade to Unlock This Feature',
    description: description || 'This module is reserved for Pro and Elite creators.',
    minTier: minTier
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
      {/* Blurred Preview */}
      <div className="filter blur-[6px] opacity-25 pointer-events-none select-none overflow-hidden transition-all duration-300">
        {children}
      </div>

      {/* Centered Soft-Lock Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-neutral-900/30 backdrop-blur-[3px]">
        <div className="max-w-sm w-full rounded-2xl bg-white dark:bg-[#0F1117] border border-neutral-200 dark:border-white/[0.1] p-6 text-center shadow-xl text-neutral-900 dark:text-white">
          {/* Lock Icon */}
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-white/[0.06] border border-emerald-200 dark:border-white/[0.08] flex items-center justify-center text-emerald-700 dark:text-neutral-300 mx-auto mb-3.5">
            <Lock className="w-4 h-4" />
          </div>

          {/* Heading */}
          <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight mb-1.5">
            {title || gateConfig.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">
            {description || gateConfig.description}
          </p>

          {/* Upgrade Button */}
          <button
            onClick={() => openUpgradeModal(featureKey, description, gateConfig.minTier)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Upgrade to Unlock ({gateConfig.minTier === 'elite' ? 'Elite' : 'Pro ₹499/mo'})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-2.5">
            Instant activation &bull; Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
