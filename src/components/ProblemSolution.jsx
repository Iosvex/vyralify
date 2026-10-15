import React from 'react';
import { Puzzle, Compass, Wallet, ArrowDown } from 'lucide-react';

export default function ProblemSolution({ onSeeHowItWorks }) {
  const cards = [
    {
      icon: Puzzle,
      title: "Posting randomly and hoping something sticks",
      desc: "No strategy, no content system, no understanding of what the algorithm actually wants — just guessing every single day and getting inconsistent results."
    },
    {
      icon: Compass,
      title: "10 different tools, zero clarity",
      desc: "Analytics here, a content idea generator there, scheduling somewhere else — scattered across apps that don't talk to each other and give you no real direction."
    },
    {
      icon: Wallet,
      title: "Thousands of followers, ₹0 in revenue",
      desc: "The audience is there. The views are there. But there's no system to turn that attention into actual income — so followers stay followers."
    }
  ];

  return (
    <section className="relative w-full bg-[#FFFFFF] py-24 text-[#0A0A0A] select-none border-b border-[#EBEBEB]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20">
        
        {/* 1. SECTION LABEL: THE PROBLEM */}
        <div className="text-center mb-3">
          <span className="text-[12px] font-bold text-[#FF4D4F] uppercase tracking-[0.15em]">
            THE PROBLEM
          </span>
        </div>

        {/* 2. HEADLINE & SUBHEADING */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h2 className="text-3xl sm:text-[40px] font-bold text-[#0A0A0A] leading-tight tracking-tight">
            Most creators are doing everything wrong — and don't even know it.
          </h2>
          <p className="text-[16px] text-[#666666] leading-relaxed mt-4 max-w-[580px] mx-auto font-normal">
            They're posting without a strategy, using 10 different tools that don't talk to each other, and leaving money on the table every single day.
          </p>
        </div>

        {/* 3. THREE PROBLEM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div 
                key={i}
                className="p-7 rounded-xl bg-[#FFF5F5] border border-[#FFD6D6] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#FFD6D6] flex items-center justify-center text-[#FF4D4F] mb-5 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0A0A0A] leading-snug mb-3">
                    {c.title}
                  </h3>
                  <p className="text-[14px] text-[#666666] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. DUAL AUDIENCE REASSURANCE (RULE 3) */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5 mb-16 text-xs sm:text-[13px] text-[#666666]">
          <p>
            <strong className="text-[#0A0A0A] font-semibold">Just starting?</strong> The hardest part is knowing where to begin. Vyralify starts with your niche.
          </p>
          <p>
            <strong className="text-[#0A0A0A] font-semibold">Already growing but stuck?</strong> Vyralify shows what's working on your page and what to do next.
          </p>
        </div>

        {/* 5. TRANSITION ARROW & SOLUTION STATEMENT */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#23E598]/10 text-[#23E598] flex items-center justify-center mb-3">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-[22px] font-bold text-[#0A0A0A] mb-4">
            There's a better way.
          </span>

          <h3 className="text-3xl sm:text-[36px] font-bold text-[#0A0A0A] max-w-[620px] leading-tight tracking-tight">
            Vyralify is the complete system.
          </h3>

          <p className="text-[16px] text-[#666666] max-w-[560px] mt-3 leading-relaxed">
            One platform. AI-powered. Built specifically for Instagram creators and page owners — beginners and pros alike.
          </p>

          {/* OUTCOME LINE (RULE 2) */}
          <div className="text-[18px] font-semibold text-[#0A0A0A] mt-5">
            Know what to post. Reply automatically. Get paid.
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={() => {
              if (onSeeHowItWorks) onSeeHowItWorks();
              else {
                const el = document.getElementById('system-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mt-6 h-9 px-6 rounded-full border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-semibold text-[13px] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>See How It Works</span>
            <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}
