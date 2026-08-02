import React from 'react';

export const Step1ProductVault = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Text */}
        <div className="md:col-span-6 space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Step 1: <span className="bg-gradient-to-r from-[#5B5BFF] to-[#7C3AED] bg-clip-text text-transparent">Pick a Winning Product</span>
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Browse over <strong className="text-slate-900 font-semibold">15,000 digital products</strong>, templates, ebooks, AI tools and courses. Import any product into your store with one click and keep <strong className="text-slate-900 font-semibold">100% of every sale</strong>.
          </p>
        </div>

        {/* Right Minimal Image */}
        <div className="md:col-span-6">
          <div className="rounded-xl overflow-hidden border border-slate-200/60 bg-slate-50 shadow-inner max-h-[180px] flex items-center justify-center">
            <img 
              src="assets/img/hiw_step1_banner_1785611670904.png" 
              alt="Step 1 Product Vault" 
              className="w-full h-full object-cover rounded-xl" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
