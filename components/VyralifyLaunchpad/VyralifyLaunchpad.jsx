import React from 'react';
import { Step1ProductVault } from './Step1ProductVault';
import { Step2ContentEngine } from './Step2ContentEngine';
import { Step3CreatorSuccess } from './Step3CreatorSuccess';
import { Step4SmartEarnings } from './Step4SmartEarnings';
import { Zap, ArrowRight } from 'lucide-react';

export const VyralifyLaunchpad = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-black text-slate-900 tracking-tight text-lg">
              VYRALIFY <span className="text-[#5B5BFF] font-bold text-sm tracking-widest ml-1">LAUNCHPAD</span>
            </span>
          </div>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] text-white text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            🚀 The Complete Creator Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Launch Your Digital Business in{' '}
            <span className="bg-gradient-to-r from-[#5B5BFF] via-indigo-600 to-[#7C3AED] bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Let the 3-step system fix it. From importing winning digital products to generating viral content and automating payout delivery.
          </p>
        </div>

        {/* 4 Cards Stack */}
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

export default VyralifyLaunchpad;
