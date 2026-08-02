import React from 'react';

export const Step1ProductVault = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
              <i className="ph-bold ph-rocket-launch text-red-500" /> Product Library
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Instant access
            </span>
          </div>
          <h3 className="font-sans text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Step 1: <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Plug in a Product</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Use our free <strong className="text-slate-900 font-semibold">AI market-research tool</strong> to find a winning product from <strong className="text-slate-900 font-semibold">10K+</strong> done-for-you digital products &amp; <strong className="text-slate-900 font-semibold">1000+</strong> courses. Then sell through ready-made landing pages and a free store — full resell rights, keep <strong className="text-slate-900 font-semibold">100%</strong> on every sale.
          </p>
        </div>

        {/* Right Canva Graphic */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20 group">
            <img src="assets/img/step1_canva.png" alt="10K+ Premium Products Library" className="w-full h-auto object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};
