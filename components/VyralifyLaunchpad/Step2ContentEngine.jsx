import React from 'react';
import { Sparkles, Play, Eye } from 'lucide-react';

export const Step2ContentEngine = () => {
  // 14 custom thumbnail cards with rich colorful gradient backgrounds & view stats
  const thumbnails = [
    { title: "Luxury Aesthetics", views: "1.2M", bg: "from-amber-600 via-yellow-700 to-indigo-950", tag: "AI Hook" },
    { title: "Mindset Hacks", views: "950K", bg: "from-blue-600 via-indigo-800 to-slate-950", tag: "Viral Reel" },
    { title: "Financial Freedom", views: "2.8M", bg: "from-emerald-600 via-teal-800 to-slate-950", tag: "100% Faceless" },
    { title: "Cyberpunk Vibes", views: "1.5M", bg: "from-purple-600 via-pink-700 to-slate-950", tag: "AI Video" },
    { title: "Supercar Dreams", views: "1.1M", bg: "from-red-600 via-orange-700 to-slate-950", tag: "Trending" },
    { title: "Stoic Quotes", views: "1.8M", bg: "from-slate-700 via-gray-800 to-slate-950", tag: "AI Script" },
    { title: "SaaS Blueprint", views: "3.2M", bg: "from-indigo-600 via-blue-800 to-slate-950", tag: "High CTR" },
    { title: "AI Avatar Reel", views: "870K", bg: "from-pink-600 via-purple-800 to-slate-950", tag: "Auto Generated" },
    { title: "Crypto Trends", views: "2.1M", bg: "from-cyan-600 via-blue-900 to-slate-950", tag: "Viral Audio" },
    { title: "Fitness Motivation", views: "1.4M", bg: "from-orange-600 via-red-800 to-slate-950", tag: "Top Performing" },
    { title: "Ecom Secrets", views: "1.9M", bg: "from-violet-600 via-indigo-900 to-slate-950", tag: "AI Captions" },
    { title: "Tech Innovations", views: "1.3M", bg: "from-blue-500 via-sky-800 to-slate-950", tag: "Instant Export" },
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(91,91,255,0.08)] transition-all duration-300">
      {/* Header pill & badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Content Engine</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Step 2: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Publish Viral Content</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Generate scroll-stopping reels, TikToks and Shorts using our <strong className="text-slate-900 font-semibold">AI content engine</strong>. Captions, hooks, visuals and ideas generated instantly with <strong className="text-slate-900 font-semibold">zero video editing required</strong>.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50/70 border border-indigo-100 px-3.5 py-2 rounded-xl">
              <span>✨ 15,000+ Ready-Made Viral Video Templates</span>
            </div>
          </div>
        </div>

        {/* Right Custom Content Grid Mockup */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-[#0B0D19] border border-purple-500/20 p-4 sm:p-5 shadow-2xl overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-slate-400 text-xs font-semibold ml-2">AI Content Matrix v3.0</span>
              </div>
              <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                12 Auto Generators Active
              </span>
            </div>

            {/* Custom 12 Vertical Thumbnails Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[310px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {thumbnails.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-[9/16] rounded-xl bg-gradient-to-b ${item.bg} border border-white/10 p-2 flex flex-col justify-between overflow-hidden group/thumb cursor-pointer hover:border-purple-400/60 hover:scale-[1.03] transition-all duration-300 shadow-lg`}
                >
                  {/* Top Pill */}
                  <span className="self-start text-[8px] font-bold bg-black/60 backdrop-blur-md text-white/90 px-1.5 py-0.5 rounded-full border border-white/10">
                    {item.tag}
                  </span>

                  {/* Play Icon Glow */}
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center mx-auto group-hover/thumb:scale-125 group-hover/thumb:bg-white group-hover/thumb:text-slate-950 transition-all duration-300 shadow-md">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>

                  {/* Bottom Stats */}
                  <div>
                    <div className="text-[10px] font-bold text-white leading-tight truncate">{item.title}</div>
                    <div className="flex items-center gap-1 text-[9px] text-white/80 mt-0.5 font-mono">
                      <Eye className="w-2.5 h-2.5" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
