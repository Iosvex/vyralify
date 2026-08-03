import React from 'react';

export const Step1ProductVault = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text */}
        <div className="lg:col-span-5 space-y-4">
          {/* Squircle Icon Badge & Status Pill (Same Row Compact Layout) */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <i className="ph-bold ph-rocket-launch text-base" />
              </div>
              <span className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight truncate">Product Library</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Instant access
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-sans text-2xl md:text-3xl lg:text-[34px] text-slate-900 tracking-tight leading-tight">
            <span className="font-medium text-slate-500">Step 1:</span> <span className="font-black text-slate-900">Plug in a Product</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Use our free <strong class="text-slate-900 font-bold">AI market-research tool</strong> to find a winning product from <strong class="text-slate-900 font-bold">10K+</strong> done-for-you digital products &amp; <strong class="text-slate-900 font-bold">1000+</strong> courses. Then sell through ready-made landing pages and a free store — full resell rights, keep <strong class="text-slate-900 font-bold">100%</strong> on every sale.
          </p>
        </div>

        {/* Right Graphic Card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20 group">
            <img src="assets/img/step1_canva.png" alt="10K+ Premium Products Library" className="w-full h-auto object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};
