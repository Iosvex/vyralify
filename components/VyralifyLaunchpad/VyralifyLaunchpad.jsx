import React from 'react';
import { Step1ProductVault } from './Step1ProductVault';
import { Step2ContentEngine } from './Step2ContentEngine';
import { Step3CreatorSuccess } from './Step3CreatorSuccess';
import { Step4SmartEarnings } from './Step4SmartEarnings';

export const VyralifyLaunchpad = () => {
  return (
    <section className="relative bg-white py-10 md:py-16 overflow-hidden font-sans border-y border-slate-200/80" id="how-it-works">
      {/* Background Soft Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-indigo-50/50 via-purple-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Compact Section Header (Fits 2 lines, No subheading) */}
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Launch Your Digital Business in <span className="bg-gradient-to-r from-[#5B5BFF] via-indigo-600 to-[#7C3AED] bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
        </div>

        {/* Clean Step Cards Stack (No Badges, No CTA Buttons, Minimal Images) */}
        <div className="space-y-4 md:space-y-6">
          <Step1ProductVault />
          <Step2ContentEngine />
          <Step4SmartEarnings />
          <Step3CreatorSuccess />
        </div>
      </div>
    </section>
  );
};
