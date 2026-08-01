import React from 'react';
import { DollarSign, CheckCircle2, TrendingUp, Moon, Zap, ShieldCheck } from 'lucide-react';

export const Step4SmartEarnings = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      {/* Header pill & badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Smart Earnings</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
          <Moon className="w-3 h-3 text-purple-600" />
          <span>Passive Income</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Step 3: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Earn While You Sleep</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Once your products and content are live, Vyralify <strong className="text-slate-900 font-semibold">automates delivery, instant payments and customer access</strong> while you focus on scaling. Your digital store runs 24/7 on complete autopilot.
          </p>

          {/* Feature Pills */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Auto Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Instant Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>100% Profit</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Global Customers</span>
            </div>
          </div>
        </div>

        {/* Right Analytics Dashboard Mockup */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-[#0F111E] border border-indigo-500/20 p-5 md:p-6 shadow-2xl overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-white text-xs font-bold tracking-wide">Earnings While You Sleep ✦</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                ● Live Auto-Sync
              </span>
            </div>

            {/* 3 Metric Cards Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {/* Today */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-indigo-500/40 transition-all">
                <div className="text-slate-400 text-[11px] font-medium">Today's Sales</div>
                <div className="text-xl md:text-2xl font-black text-white">$1,243</div>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18% vs yesterday</span>
                </div>
                {/* SVG Sparkline */}
                <div className="pt-2">
                  <svg className="w-full h-8 text-indigo-500" viewBox="0 0 100 30" fill="none">
                    <path d="M0 25 Q 25 15, 50 18 T 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Weekly */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-purple-500/40 transition-all">
                <div className="text-slate-400 text-[11px] font-medium">Weekly Revenue</div>
                <div className="text-xl md:text-2xl font-black text-white">$8,756</div>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+22% vs last week</span>
                </div>
                {/* SVG Sparkline */}
                <div className="pt-2">
                  <svg className="w-full h-8 text-purple-500" viewBox="0 0 100 30" fill="none">
                    <path d="M0 22 Q 25 28, 50 12 T 100 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Monthly */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-emerald-500/40 transition-all">
                <div className="text-slate-400 text-[11px] font-medium">Monthly Total</div>
                <div className="text-xl md:text-2xl font-black text-emerald-400">$34,621</div>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+28% vs last month</span>
                </div>
                {/* SVG Sparkline */}
                <div className="pt-2">
                  <svg className="w-full h-8 text-emerald-400" viewBox="0 0 100 30" fill="none">
                    <path d="M0 28 Q 25 18, 50 10 T 100 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Status Strip */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto Payment Gateway Connected</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Payout Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
