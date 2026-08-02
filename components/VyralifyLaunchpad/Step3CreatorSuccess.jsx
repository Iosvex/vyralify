import React from 'react';

export const Step3CreatorSuccess = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: 2 Creator Profile Cards */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-2xl bg-[#0F111E] border border-slate-800 p-4 sm:p-5 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Profile 1 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5 hover:border-indigo-500/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">RC</div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Active Creator</span>
                </div>
                <div>
                  <h5 className="text-white font-bold text-xs">Ryan Carter</h5>
                  <p className="text-slate-400 text-[11px] font-mono">@growth.with.ryan</p>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-slate-800/80 text-center">
                  <div><div className="text-white text-xs font-extrabold">47</div><div className="text-slate-400 text-[8px]">Posts</div></div>
                  <div><div className="text-indigo-400 text-xs font-extrabold">82K</div><div className="text-slate-400 text-[8px]">Followers</div></div>
                  <div><div className="text-white text-xs font-extrabold">3</div><div className="text-slate-400 text-[8px]">Following</div></div>
                </div>
                <p className="text-slate-300 text-[10px]">Digital Marketer ⚡ Scaling faceless digital stores.</p>
              </div>

              {/* Profile 2 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">AM</div>
                  </div>
                  <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">Top Earner</span>
                </div>
                <div>
                  <h5 className="text-white font-bold text-xs">Alex Morgan</h5>
                  <p className="text-slate-400 text-[11px] font-mono">@the.dreambuilder</p>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-slate-800/80 text-center">
                  <div><div className="text-white text-xs font-extrabold">62</div><div className="text-slate-400 text-[8px]">Posts</div></div>
                  <div><div className="text-purple-400 text-xs font-extrabold">135K</div><div className="text-slate-400 text-[8px]">Followers</div></div>
                  <div><div className="text-white text-xs font-extrabold">5</div><div class="text-slate-400 text-[8px]">Following</div></div>
                </div>
                <p className="text-slate-300 text-[10px]">Entrepreneur 🚀 Building automated digital stores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text & Stats */}
        <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
          <div className="space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Real Creators. <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Real Growth.</span>
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Thousands of creators are growing with <strong className="text-slate-900 font-semibold">Vyralify</strong> using our AI automation platform.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Active Users</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">220K+</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Creator Revenue</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">$35M+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
