import React from 'react';

export const Step2ContentEngine = () => {
  const clips = [
    { src: 'assets/img/clips/clip-1.png', label: 'POV Beach', views: '1.2M' },
    { src: 'assets/img/clips/clip-2.png', label: 'Trading', views: '856K' },
    { src: 'assets/img/clips/clip-3.png', label: 'Motivation', views: '940K' },
    { src: 'assets/img/clips/clip-4.png', label: 'Villa Pool', views: '2.3M' },
    { src: 'assets/img/clips/clip-5.png', label: 'Neon City', views: '1.1M' },
    { src: 'assets/img/clips/clip-6.png', label: 'Gym POV', views: '3.9M' },
    { src: 'assets/img/clips/clip-7.png', label: 'Desert Drive', views: '935K' },
    { src: 'assets/img/clips/clip-8.png', label: 'Rooftop', views: '955K' },
    { src: 'assets/img/clips/clip-9.png', label: 'Desk Flatlay', views: '2.5M' },
    { src: 'assets/img/clips/clip-10.png', label: 'Misty Hike', views: '2.2M' },
    { src: 'assets/img/clips/clip-11.png', label: 'Luxury Car', views: '1.8M' },
    { src: 'assets/img/clips/clip-12.png', label: 'Starry Sky', views: '2.3M' }
  ];

  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 12 Phone Matrix Grid (Visual on LEFT) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-3xl bg-[#0B0D19] border border-purple-500/20 p-4 sm:p-5 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-slate-400 text-xs font-semibold ml-2">15K+ Faceless Video Matrix</span>
              </div>
              <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md">UGC Content Ready</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {clips.map((clip, idx) => (
                <div key={idx} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-slate-700/60 p-1 bg-black flex flex-col justify-between hover:border-purple-400/60 hover:scale-[1.03] transition-all">
                  <img src={clip.src} alt={clip.label} className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
                  <span className="relative z-10 text-[8px] font-bold bg-black/70 text-white px-1 py-0.5 rounded self-start">{clip.label}</span>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center mx-auto"><i class="ph-bold ph-play text-[8px]" /></div>
                  <div className="relative z-10 text-[9px] font-bold text-white truncate drop-shadow">{clip.views}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold">
              <i className="ph-bold ph-video-camera text-purple-500" /> Content Library
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Instant access
            </span>
          </div>
          <h3 className="font-sans text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Step 2: <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Post Viral Content</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Create a new IG account &amp; start posting these <strong className="text-slate-900 font-semibold">15K+</strong> ready-made viral marketing content — no face, no filming, no editing. Just download &amp; post.
          </p>
        </div>
      </div>
    </div>
  );
};
