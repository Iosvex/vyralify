import React from 'react';
import { ShieldCheck, Lock, Sliders, FileText } from 'lucide-react';

export default function TrustStrip() {
  const marqueeItems = [
    { handle: '@thewealthmindset', niche: 'Finance', views: '2.4M views this month', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { handle: '@growth.daily', niche: 'Self-Improvement', views: '1.8M views this month', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    { handle: '@ai.business.vault', niche: 'AI & Tech', views: '3.1M views this month', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
    { handle: '@fitness.edge', niche: 'Fitness', views: '950K views this month', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80' },
    { handle: '@luxury.escapes', niche: 'Travel & Lifestyle', views: '4.2M views this month', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80' },
    { handle: '@supercar.culture', niche: 'Automotive', views: '2.7M views this month', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' }
  ];

  const safetyItems = [
    {
      icon: ShieldCheck,
      title: "Official Instagram login",
      desc: "Connect through Meta's own login."
    },
    {
      icon: Lock,
      title: "You stay in control",
      desc: "Nothing posts or messages unless you set it up."
    },
    {
      icon: Sliders,
      title: "Built for Meta's limits",
      desc: "Automation is designed to follow Meta's messaging limits."
    },
    {
      icon: FileText,
      title: "Your data, your choice",
      desc: "Export or delete your data anytime."
    }
  ];

  return (
    <section className="relative w-full bg-[#FFFFFF] py-12 border-y border-[#EBEBEB] text-[#0A0A0A] select-none overflow-hidden">
      
      {/* 1. LABEL */}
      <div className="text-center mb-6">
        <span className="text-[12px] font-bold text-[#999999] uppercase tracking-[0.12em]">
          TRUSTED BY CREATORS AND PAGE OWNERS WORLDWIDE
        </span>
      </div>

      {/* 2. INFINITE MARQUEE ROW */}
      <div className="relative w-full overflow-hidden mask-fade py-2">
        {/* Gradient edge masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 bg-[#F9F9F9] border border-[#EBEBEB] rounded-full px-4 py-2 text-[13px] text-[#444444] shadow-xs"
            >
              <img
                src={item.avatar}
                alt={item.handle}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#EBEBEB]"
              />
              <span className="font-semibold text-[#0A0A0A]">{item.handle}</span>
              <span className="px-2 py-0.5 rounded-full bg-white border border-[#EBEBEB] text-[10px] font-mono text-[#888888]">
                {item.niche}
              </span>
              <span className="text-neutral-300">&bull;</span>
              <span className="font-medium text-[#16A34A]">{item.views}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. METRIC ROW (4 STATS) */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y-0 md:divide-x divide-[#EBEBEB]">
          
          <div className="text-center md:px-6">
            <div className="text-[28px] font-bold text-[#0A0A0A] tracking-tight font-mono">10K+</div>
            <div className="text-[13px] text-[#888888] mt-1 font-medium">Creators</div>
          </div>

          <div className="text-center md:px-6">
            <div className="text-[28px] font-bold text-[#0A0A0A] tracking-tight font-mono">900M+</div>
            <div className="text-[13px] text-[#888888] mt-1 font-medium">Combined Views</div>
          </div>

          <div className="text-center md:px-6">
            <div className="text-[28px] font-bold text-[#0A0A0A] tracking-tight font-mono">1M+</div>
            <div className="text-[13px] text-[#888888] mt-1 font-medium">Content Created</div>
          </div>

          <div className="text-center md:px-6">
            <div className="text-[28px] font-bold text-[#0A0A0A] tracking-tight font-mono">₹50L+</div>
            <div className="text-[13px] text-[#888888] mt-1 font-medium">Creator Earnings</div>
          </div>

        </div>

        {/* 4. SAFETY ROW (RULE 1 RISK REMOVAL) */}
        <div className="mt-12 pt-8 border-t border-[#EBEBEB] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {safetyItems.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#EBEBEB] flex items-center justify-center text-[#16A34A] shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0A0A0A]">{s.title}</h4>
                  <p className="text-[12px] text-[#666666] leading-snug mt-0.5">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
