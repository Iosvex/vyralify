import React from 'react';
import { Star, CheckCircle, Users, DollarSign, Award, ArrowUpRight } from 'lucide-react';

export const Step3CreatorSuccess = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      {/* Header pill & badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Creator Success</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Verified Results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: 2 Original Creator Profile Cards */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-2xl bg-[#0F111E] border border-slate-800 p-4 sm:p-5 shadow-2xl overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Creator Profile 1 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-indigo-500/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-sm">
                        RC
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-400/20 absolute -bottom-0.5 -right-0.5 bg-slate-950 rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Active Creator
                  </span>
                </div>

                <div>
                  <h5 className="text-white font-bold text-sm flex items-center gap-1">
                    Ryan Carter
                  </h5>
                  <p className="text-slate-400 text-xs font-mono">@growth.with.ryan</p>
                </div>

                <div className="grid grid-cols-3 gap-1 py-2 border-y border-slate-800/80 text-center">
                  <div>
                    <div className="text-white text-xs font-extrabold">47</div>
                    <div className="text-slate-400 text-[9px]">Posts</div>
                  </div>
                  <div>
                    <div className="text-indigo-400 text-xs font-extrabold">82K</div>
                    <div className="text-slate-400 text-[9px]">Followers</div>
                  </div>
                  <div>
                    <div className="text-white text-xs font-extrabold">3</div>
                    <div className="text-slate-400 text-[9px]">Following</div>
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] leading-snug">
                  Digital Marketer ⚡ Scaling faceless digital stores with Vyralify AI tools.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold hover:bg-indigo-500 transition-colors">
                    Follow
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-bold hover:bg-slate-700 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              {/* Creator Profile 2 */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-sm">
                        AM
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-400/20 absolute -bottom-0.5 -right-0.5 bg-slate-950 rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    Top Earner
                  </span>
                </div>

                <div>
                  <h5 className="text-white font-bold text-sm flex items-center gap-1">
                    Alex Morgan
                  </h5>
                  <p className="text-slate-400 text-xs font-mono">@the.dreambuilder</p>
                </div>

                <div className="grid grid-cols-3 gap-1 py-2 border-y border-slate-800/80 text-center">
                  <div>
                    <div className="text-white text-xs font-extrabold">62</div>
                    <div className="text-slate-400 text-[9px]">Posts</div>
                  </div>
                  <div>
                    <div className="text-purple-400 text-xs font-extrabold">135K</div>
                    <div className="text-slate-400 text-[9px]">Followers</div>
                  </div>
                  <div>
                    <div className="text-white text-xs font-extrabold">5</div>
                    <div className="text-slate-400 text-[9px]">Following</div>
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] leading-snug">
                  Entrepreneur 🚀 Building 4 automated digital product stores.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-lg bg-purple-600 text-white text-[11px] font-bold hover:bg-purple-500 transition-colors">
                    Follow
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-bold hover:bg-slate-700 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="space-y-3">
            <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Real Creators. <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Real Growth.</span>
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Thousands of creators are growing with <strong className="text-slate-900 font-semibold">Vyralify</strong> using our AI automation platform. Join the movement and turn audience reach into predictable revenue.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Users</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                220K+
              </div>
              <p className="text-xs text-slate-500 mt-1">Creators scaling daily</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Creator Revenue</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                $35M+
              </div>
              <p className="text-xs text-slate-500 mt-1">Paid out to users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
