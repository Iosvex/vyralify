import React from 'react';
import { Step1ProductVault } from './Step1ProductVault';
import { Step2ContentEngine } from './Step2ContentEngine';
import { Step3CreatorSuccess } from './Step3CreatorSuccess';
import { Step4SmartEarnings } from './Step4SmartEarnings';

export const VyralifyLaunchpad = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden font-sans border-y border-slate-200/80" id="how-it-works">
      {/* Background Gradient Accent Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <i className="ph-bold ph-rocket-launch" /> VYRALIFY LAUNCHPAD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Let the <span className="bg-gradient-to-r from-[#2563EB] via-indigo-600 to-[#7C3AED] bg-clip-text text-transparent">3-Step System</span> fix it.
          </h2>
        </div>

        {/* 4 Cards Stack */}
        <div className="space-y-10 md:space-y-12">
          <Step1ProductVault />
          <Step2ContentEngine />
          <Step3CreatorSuccess />
          <Step4SmartEarnings />
        </div>
      </div>
    </section>
  );
};
