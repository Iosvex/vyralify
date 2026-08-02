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
            Use our free <strong className="text-slate-900 font-semibold">AI market-research tool</strong> to find a winning product from <strong class="text-slate-900 font-semibold">10K+</strong> done-for-you digital products &amp; <strong className="text-slate-900 font-semibold">1000+</strong> courses. Then sell through ready-made landing pages and a free store — full resell rights, keep <strong className="text-slate-900 font-semibold">100%</strong> on every sale.
          </p>
        </div>

        {/* Right 3D Product Box Cards Container */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#1E3A8A] to-[#2563EB] p-5 sm:p-7 text-white shadow-2xl border border-indigo-400/20 overflow-hidden group">
            <div className="text-center pb-4 border-b border-white/10 mb-5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wide">
                10K+ Premium Products Library
              </span>
              <p className="text-blue-100/80 text-[11px] mt-1 font-medium">All Ready-to-Sell • Keep 100% Profits on each sale</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/40 rounded-2xl p-2.5 text-center transition-all duration-300">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-slate-950/40">
                  <img src="assets/img/prod_cover_1.png" alt="Trending eBooks" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-white text-xs font-bold truncate">Trending eBooks</div>
                <div className="text-blue-200/80 text-[10px] mt-0.5">10K+ Products</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/40 rounded-2xl p-2.5 text-center transition-all duration-300">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-slate-950/40">
                  <img src="assets/img/prod_cover_2.png" alt="1000+ Video Courses" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-white text-xs font-bold truncate">1000+ Video Courses</div>
                <div className="text-blue-200/80 text-[10px] mt-0.5">Full HD Resell</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/40 rounded-2xl p-2.5 text-center transition-all duration-300">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-slate-950/40">
                  <img src="assets/img/prod_cover_3.png" alt="Premium Products" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-white text-xs font-bold truncate">Premium Products</div>
                <div className="text-blue-200/80 text-[10px] mt-0.5">Best Selling</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/40 rounded-2xl p-2.5 text-center transition-all duration-300">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-slate-950/40">
                  <img src="assets/img/prod_cover_4.png" alt="AI Tools & Templates" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="text-white text-xs font-bold truncate">AI Tools &amp; Templates</div>
                <div className="text-blue-200/80 text-[10px] mt-0.5">500+ Ready Packs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
