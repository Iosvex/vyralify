import React from 'react';

export const Step2ContentEngine = () => {
  return (
    <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Graphic Card (Visual on LEFT) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 group">
            <img src="assets/img/step2_canva.jpg" alt="Content Library - Post Viral Content" className="w-full h-auto object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          </div>
        </div>

        {/* Right Text */}
        <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
          {/* Squircle Icon Badge & Status Pill */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-sm">
                <i className="ph-bold ph-video-camera text-base" />
              </div>
              <span className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">Content Library</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Instant access
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-sans text-2xl md:text-3xl lg:text-[34px] text-slate-900 tracking-tight leading-tight">
            <span className="font-medium text-slate-500">Step 2:</span> <span className="font-black text-slate-900">Post Viral Content</span>
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Create a new IG account &amp; start posting these <strong class="text-slate-900 font-bold">15K+</strong> ready-made viral marketing content — no face, no filming, no editing. Just download &amp; post.
          </p>
        </div>
      </div>
    </div>
  );
};
