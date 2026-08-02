import React from 'react';

export const Step3CreatorSuccess = () => {
  return (
    <div className="space-y-4 text-center">
      <p className="text-slate-600 text-sm font-bold tracking-wide uppercase">Our Students Pages using this same content library</p>

      <div className="rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#1E3A8A] to-[#2563EB] p-6 sm:p-8 text-white shadow-2xl border border-indigo-400/20">
        <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs tracking-wide mb-6">
          ● Real Students • Real IG Pages
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Student Profile 1: aura.empire.reels */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">
                    <i className="ph-bold ph-globe" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">aura.empire.reels</h4>
                  <p className="text-slate-400 text-xs">Chris Powell</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
              <div><div className="text-white font-extrabold text-sm">35</div><div className="text-slate-400 text-[10px]">posts</div></div>
              <div><div className="text-white font-extrabold text-sm">69K</div><div className="text-slate-400 text-[10px]">followers</div></div>
              <div><div className="text-white font-extrabold text-sm">2</div><div className="text-slate-400 text-[10px]">following</div></div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-medium">Digital creator</p>
              <p className="text-slate-400 text-[11px]">💫 Luxury &amp; Discipline &amp; Mindset</p>
              <p className="text-indigo-300 font-semibold text-[11px]">1 WEEK 📈 30M+ VIEWS | 60K+ FOLLOWERS</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors">Follow back</button>
              <button className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors">Message</button>
            </div>

            <div className="pt-2 text-center border-t border-slate-800/60">
              <span className="text-blue-300 text-xs font-bold">60K+ Followers &amp; 30 Million+ Views</span>
            </div>
          </div>

          {/* Student Profile 2: aviorax */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">
                    <i className="ph-bold ph-sparkle" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">aviorax</h4>
                  <p className="text-slate-400 text-xs">AVIORAX</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
              <div><div className="text-white font-extrabold text-sm">9</div><div className="text-slate-400 text-[10px]">posts</div></div>
              <div><div className="text-white font-extrabold text-sm">25.6K</div><div className="text-slate-400 text-[10px]">followers</div></div>
              <div><div className="text-white font-extrabold text-sm">1</div><div className="text-slate-400 text-[10px]">following</div></div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-medium">Digital creator</p>
              <p className="text-slate-400 text-[11px]">💫 Luxury &amp; Wealth &amp; Lifestyle</p>
              <p className="text-purple-300 font-semibold text-[11px]">This is the future you deserve. Follow to manifest 2026 ✨</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors">Follow back</button>
              <button className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors">Message</button>
            </div>

            <div className="pt-2 text-center border-t border-slate-800/60">
              <span className="text-purple-300 text-xs font-bold">25K+ Followers &amp; 12 Million+ Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
