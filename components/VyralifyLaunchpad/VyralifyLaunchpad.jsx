import React from 'react';
import { Step1ProductVault } from './Step1ProductVault';
import { Step2ContentEngine } from './Step2ContentEngine';
import { Step3CreatorSuccess } from './Step3CreatorSuccess';
import { Step4SmartEarnings } from './Step4SmartEarnings';

export const VyralifyLaunchpad = () => {
  return (
    <section className="relative bg-white py-14 md:py-20 overflow-hidden font-sans border-y border-slate-200/80" id="how-it-works">
      {/* Background Gradient Accent Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header: 2-Line Headline, No Subheading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Launch Your Digital Business in <span className="bg-gradient-to-r from-[#5B5BFF] via-indigo-600 to-[#7C3AED] bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
        </div>

        {/* 4 Cards Stack with Alternating Layout */}
        <div className="space-y-8 md:space-y-10">
          <Step1ProductVault />
          <Step2ContentEngine />
          <Step3CreatorSuccess />
          <Step4SmartEarnings />
        </div>
      </div>
    </section>
  );
};
