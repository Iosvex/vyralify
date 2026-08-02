import React from 'react';

export const Step4SmartEarnings = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Analytics Dashboard */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-2xl bg-[#0F111E] border border-indigo-500/20 p-5 md:p-6 shadow-2xl overflow-hidden group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <i className="ph-bold ph-moon text-indigo-400" />
                <span className="text-white text-xs font-bold">Earnings while you sleep ✦</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">● Live Auto-Sync</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-slate-400 text-[10px]">Today's Sales</div>
                <div className="text-lg md:text-xl font-black text-white">$1,243</div>
                <div className="text-emerald-400 text-[9px] font-semibold">↗ +18% vs yesterday</div>
                <svg className="w-full h-6 text-indigo-500 pt-1" viewBox="0 0 100 30" fill="none"><path d="M0 25 Q 25 15, 50 18 T 100 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-slate-400 text-[10px]">Weekly Revenue</div>
                <div className="text-lg md:text-xl font-black text-white">$8,756</div>
                <div className="text-emerald-400 text-[9px] font-semibold">↗ +22% vs last week</div>
                <svg className="w-full h-6 text-purple-500 pt-1" viewBox="0 0 100 30" fill="none"><path d="M0 22 Q 25 28, 50 12 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-slate-400 text-[10px]">Monthly Total</div>
                <div className="text-lg md:text-xl font-black text-emerald-400">$34,621</div>
                <div className="text-emerald-400 text-[9px] font-semibold">↗ +28% vs last month</div>
                <svg className="w-full h-6 text-emerald-400 pt-1" viewBox="0 0 100 30" fill="none"><path d="M0 28 Q 25 18, 50 10 T 100 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-[10px] text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <i className="ph-bold ph-lightning text-amber-400" />
                <span>Auto Payment Gateway Connected</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <i className="ph-bold ph-shield-check" />
                <span>100% Payout Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
          <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Step 3: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Earn While You Sleep</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Once your products and content are live, Vyralify <strong className="text-slate-900 font-semibold">automates delivery, payments and customer access</strong> while you focus on scaling.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
              <i className="ph-bold ph-check-circle text-emerald-500 text-sm" /> <span>✓ Auto Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
              <i className="ph-bold ph-check-circle text-emerald-500 text-sm" /> <span>✓ Instant Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
              <i className="ph-bold ph-check-circle text-emerald-500 text-sm" /> <span>✓ 100% Profit</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
              <i className="ph-bold ph-check-circle text-emerald-500 text-sm" /> <span>✓ Global Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
