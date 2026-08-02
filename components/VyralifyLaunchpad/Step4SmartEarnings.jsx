import React from 'react';

export const Step4SmartEarnings = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold">
              <i className="ph-bold ph-lightning text-purple-500" /> Start Earning
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Quick Setup
            </span>
          </div>
          <h3 className="font-sans text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Step 3: <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Sales While You Sleep</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Your reels pull <strong className="text-slate-900 font-semibold">free Organic traffic</strong>; your page <strong className="text-slate-900 font-semibold">sells on autopilot</strong>. And it doesn't stop at digital products — as you grow, so do your income streams: <strong className="text-slate-900 font-semibold">brand deals, paid promos, affiliate offers</strong>, and more. Multiple ways to get paid, all from one faceless page.
          </p>
        </div>

        {/* Right Notifications Visual Card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#1E3A8A] to-[#2563EB] p-6 sm:p-8 text-white shadow-2xl border border-indigo-400/20 overflow-hidden">
            <div className="text-center pb-4 border-b border-white/10 mb-5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wide">
                Wake Up to these Notifications
              </span>
            </div>

            {/* Notifications Stack Mockup */}
            <div className="space-y-3 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <i className="ph-bold ph-bell-simple text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Payment Received</span>
                    <span className="text-[10px] text-blue-200">Just now</span>
                  </div>
                  <p className="text-[11px] text-blue-100/90 truncate mt-0.5">You received a payment of <strong>$147.00</strong> from alex@gmail.com</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <i className="ph-bold ph-bell-simple text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Payment Received</span>
                    <span className="text-[10px] text-blue-200">2m ago</span>
                  </div>
                  <p className="text-[11px] text-blue-100/90 truncate mt-0.5">You received a payment of <strong>$297.00</strong> from marco@yahoo.com</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <i className="ph-bold ph-bell-simple text-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Payment Received</span>
                    <span className="text-[10px] text-blue-200">5m ago</span>
                  </div>
                  <p className="text-[11px] text-blue-100/90 truncate mt-0.5">You received a payment of <strong>$497.00</strong> from sarah@outlook.com</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-3.5 py-1.5 rounded-full">
                <i className="ph-bold ph-chart-line-up" /> Live Sales Dashboard Auto-Sync Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
