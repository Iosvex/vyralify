import React from 'react';

export const Step2ContentEngine = () => {
  const clips = [
    { src: 'assets/img/clips/clip-1.png', views: '1.2M' },
    { src: 'assets/img/clips/clip-2.png', views: '856K' },
    { src: 'assets/img/clips/clip-3.png', views: '940K' },
    { src: 'assets/img/clips/clip-4.png', views: '2.3M' },
    { src: 'assets/img/clips/clip-5.png', views: '1.1M' },
    { src: 'assets/img/clips/clip-6.png', views: '3.9M' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Text */}
        <div className="md:col-span-6 space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Step 2: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Publish Viral Content</span>
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Generate scroll-stopping reels, TikToks and Shorts using our <strong className="text-slate-900 font-semibold">AI content engine</strong>. Captions, hooks, visuals and ideas generated instantly with <strong class="text-slate-900 font-semibold">zero video editing required</strong>.
          </p>
        </div>

        {/* Right Minimal Content Grid */}
        <div className="md:col-span-6">
          <div className="grid grid-cols-6 gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
            {clips.map((clip, idx) => (
              <div key={idx} className="aspect-[9/14] rounded-lg overflow-hidden relative">
                <img src={clip.src} alt={`Clip ${idx + 1}`} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 text-[7px] font-bold text-white bg-black/60 px-1 rounded">
                  {clip.views}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
