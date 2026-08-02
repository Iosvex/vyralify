import React from 'react';

export const Step4SmartEarnings = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Text */}
        <div className="md:col-span-6 space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Step 3: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Earn While You Sleep</span>
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Once your products and content are live, Vyralify <strong className="text-slate-900 font-semibold">automates delivery, payments and customer access</strong> while you focus on scaling.
          </p>
        </div>

        {/* Right Minimal Graphic */}
        <div className="md:col-span-6">
          <div className="rounded-xl overflow-hidden border border-slate-200/60 bg-slate-50 shadow-inner max-h-[180px] flex items-center justify-center">
            <img 
              src="assets/img/hiw_step4_sales_1785611768510.png" 
              alt="Step 3 Passive Income" 
              className="w-full h-full object-cover rounded-xl" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
