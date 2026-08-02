import React from 'react';

export const Step3CreatorSuccess = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Text */}
        <div className="md:col-span-6 space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Real Creators. <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Real Growth.</span>
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Join over <strong className="text-slate-900 font-semibold">220K+ creators</strong> generating over <strong className="text-slate-900 font-semibold">$35M+ in creator revenue</strong> using our automated system.
          </p>
        </div>

        {/* Right Minimal Image Banner */}
        <div className="md:col-span-6">
          <div className="rounded-xl overflow-hidden border border-slate-200/60 bg-slate-50 shadow-inner max-h-[180px] flex items-center justify-center">
            <img 
              src="assets/img/hiw_step3_growth_1785611737240.png" 
              alt="Creator Growth & Stats" 
              className="w-full h-full object-cover rounded-xl" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
