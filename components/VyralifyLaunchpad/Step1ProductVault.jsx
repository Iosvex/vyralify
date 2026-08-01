import React from 'react';
import { Rocket, ArrowRight, BookOpen, Video, Briefcase, LayoutGrid } from 'lucide-react';

export const Step1ProductVault = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      {/* Header pill & badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>Product Vault</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Instant Access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Step 1: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Pick a Winning Product</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Browse over <strong className="text-slate-900 font-semibold">15,000 digital products</strong>, templates, ebooks, AI tools and courses. Import any product into your store with one click and keep <strong className="text-slate-900 font-semibold">100% of every sale</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] text-white text-xs font-bold shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
              <span>Browse Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200/70 transition-all">
              Import Product
            </button>
          </div>
        </div>

        {/* Right Dashboard Mockup */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-[#0F111E] border border-indigo-500/20 p-5 md:p-6 shadow-2xl overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar Header */}
            <div className="text-center pb-5 border-b border-slate-800/80 mb-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-[#5B5BFF]/20 to-[#7C3AED]/20 border border-indigo-400/30 text-indigo-300 font-bold text-sm tracking-wide mb-1">
                15K+ Digital Products Library
              </span>
              <p className="text-slate-400 text-xs font-medium">Done-for-you • High Quality • Keep 100% Profit</p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 text-center transition-all duration-300 group/card">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-2 group-hover/card:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-white text-xs font-bold">Trending Ebooks</div>
                <div className="text-slate-400 text-[10px] mt-0.5">15K+ Items</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3.5 text-center transition-all duration-300 group/card">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-2 group-hover/card:scale-110 transition-transform">
                  <Video className="w-4 h-4" />
                </div>
                <div className="text-white text-xs font-bold">Video Courses</div>
                <div className="text-slate-400 text-[10px] mt-0.5">2K+ Courses</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-xl p-3.5 text-center transition-all duration-300 group/card">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-2 group-hover/card:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-white text-xs font-bold">AI Tools</div>
                <div className="text-slate-400 text-[10px] mt-0.5">1K+ Tools</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 rounded-xl p-3.5 text-center transition-all duration-300 group/card">
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mx-auto mb-2 group-hover/card:scale-110 transition-transform">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div className="text-white text-xs font-bold">Templates</div>
                <div className="text-slate-400 text-[10px] mt-0.5">500+ Packs</div>
              </div>
            </div>

            {/* Bottom Inner Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
                Browse Library
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">
                Import Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
