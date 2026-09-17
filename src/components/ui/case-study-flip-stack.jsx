"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    number: "01",
    eyebrow: "FinTech & SaaS Bounty",
    badge: "14.2M Views Verified",
    title: "Scaled Clipper Payouts from ₹15K to ₹3.84 Lakh in 28 Days",
    description:
      "Rohan Edits eliminated manual brand sponsorship pitches by deploying automated view verification with real-time UPI escrow settlement.",
    metrics: [
      { label: "Net Payout", value: "₹3,84,200" },
      { label: "Verified Reach", value: "14.2M" },
      { label: "Settlement Speed", value: "< 45 sec" },
    ],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Video editing timeline in creative suite",
    background: "#08150D",
    borderColor: "rgba(209, 254, 23, 0.25)",
    foreground: "#F4FFF7",
  },
  {
    number: "02",
    eyebrow: "High-RPM PodClip Alpha",
    badge: "31.4M Reach Tracked",
    title: "Turning 3-Hour Longform Podcasts into 48 High-Velocity Hooks",
    description:
      "ApexClips synchronized 8 clippers across TikTok, Shorts, and Instagram Reels simultaneously, unlocking ₹5.62 Lakh in verified creator bounties.",
    metrics: [
      { label: "Net Payout", value: "₹5,62,000" },
      { label: "Avg Clipper RPM", value: "$9.20" },
      { label: "Bounty Rank", value: "#1 Overall" },
    ],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Professional podcast studio with audio setup",
    background: "#0A0F21",
    borderColor: "rgba(56, 189, 248, 0.25)",
    foreground: "#F0F4FF",
  },
  {
    number: "03",
    eyebrow: "Documentary Virality",
    badge: "21.4M Organic Views",
    title: "From Solo Clipper to a 12-Person Media Agency via Audio Radar",
    description:
      "CreatorForge scaled organic tech documentaries with zero copyright strikes, leveraging Vyralify's pre-cleared audio radar and instant payout contracts.",
    metrics: [
      { label: "Net Payout", value: "₹8,91,400" },
      { label: "Campaign Sprint", value: "Founder Series" },
      { label: "Dispute Rate", value: "0.00%" },
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Cinema camera lens on set",
    background: "#161009",
    borderColor: "rgba(251, 146, 60, 0.25)",
    foreground: "#FFFBF5",
  },
  {
    number: "04",
    eyebrow: "Global E-Commerce Sprint",
    badge: "840 Reels Coordinated",
    title: "Coordinated Multi-Creator Blitz Driving 18.3M Impressions in 72h",
    description:
      "Direct marketplace matching deployed clipping bounties across creators in 6 countries with automated multi-currency settlement and zero friction.",
    metrics: [
      { label: "Net Payout", value: "₹4,12,000" },
      { label: "Launch Window", value: "72 Hours" },
      { label: "Escrow Fulfillment", value: "100% On-Chain" },
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Abstract digital waves and data rendering",
    background: "#160914",
    borderColor: "rgba(244, 63, 94, 0.25)",
    foreground: "#FFF5FA",
  },
];

export function CaseStudyFlipStack({
  items = DEFAULT_ITEMS,
  className = "",
  heading = "Verified Creator Breakdowns.",
  endLabel = "The Ledger Never Lies.",
}) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  const safeItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const total = safeItems.length;

  useEffect(() => {
    if (!containerRef.current || cardRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Create a pinned ScrollTrigger timeline
      // Page WILL NOT scroll until all cards finish flipping!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(total - 1) * 600}`, // 600px of scroll per flip
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const stepIndex = Math.min(total - 1, Math.floor(p * total));
            setActiveStep(stepIndex);
          },
        },
      });

      // 2. Set initial resting state for stacked cards
      for (let i = 1; i < total; i++) {
        const card = cardRefs.current[i];
        if (card) {
          gsap.set(card, {
            scale: 1 - i * 0.035,
            y: i * 14,
            transformOrigin: "50% 100%",
          });
        }
      }

      // 3. Sequentially flip cards upward
      for (let i = 0; i < total - 1; i++) {
        const currentCard = cardRefs.current[i];
        const nextCard = cardRefs.current[i + 1];

        if (currentCard && nextCard) {
          const startTime = i * 1.5;

          // Flip current card upward with 3D perspective
          tl.to(
            currentCard,
            {
              yPercent: -125,
              rotateX: 25,
              opacity: 0,
              ease: "power1.inOut",
              duration: 1.0,
            },
            startTime
          );

          // Elevate next card into foreground
          tl.to(
            nextCard,
            {
              scale: 1,
              y: 0,
              ease: "power1.out",
              duration: 0.8,
            },
            startTime + 0.15
          );
        }
      }

      // Brief dwell time on the final card before releasing the pin
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [total]);

  return (
    <div className={cn("relative w-full bg-black text-white", className)}>
      {/* PINNED CARD STAGE: Locks in place until slides finish */}
      <div
        ref={containerRef}
        className="w-full h-screen min-h-[640px] max-h-[960px] flex flex-col justify-between items-center bg-black px-4 sm:px-8 pt-16 sm:pt-20 pb-6 select-none overflow-hidden"
      >
        {/* Stage Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11190B] border border-[#273B17] text-[#D1FE17] text-xs font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
            <span>SCROLL TO FLIP CARDS • CASE {activeStep + 1} OF {total}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            {heading}
          </h2>
        </div>

        {/* 3D Stack Stage */}
        <div className="relative w-full max-w-[920px] aspect-[3/4] sm:aspect-[1.85/1] max-h-[480px] [perspective:1200px] my-auto">
          {safeItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full will-change-transform"
              style={{
                zIndex: total - index,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transformOrigin: "50% 50%",
              }}
            >
              <div
                className="grid h-full overflow-hidden rounded-3xl border shadow-[0_24px_60px_rgba(0,0,0,0.8)] sm:grid-cols-[1.18fr_0.82fr]"
                style={{
                  backgroundColor: item.background,
                  borderColor: item.borderColor || "rgba(255,255,255,0.12)",
                  color: item.foreground ?? "white",
                }}
              >
                {/* Left Card Info */}
                <div className="flex min-w-0 flex-col p-6 sm:p-8 md:p-9 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-mono font-bold leading-none tracking-tight text-[#D1FE17]">
                      {item.number ?? String(index + 1).padStart(2, "0")}
                    </span>
                    {item.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/10 border border-white/15 text-[#D1FE17]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="max-w-[46rem] pt-3 sm:pt-4">
                    <p className="mb-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#D1FE17]">
                      {item.eyebrow}
                    </p>
                    <h3 className="text-balance text-lg sm:text-2xl md:text-3xl font-display font-bold leading-[1.1] tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-300 opacity-90 line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    {item.metrics && (
                      <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
                        {item.metrics.map((m, mi) => (
                          <span key={mi} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
                            <strong className="text-neutral-400 font-normal">{m.label}:</strong>
                            <span className="text-white font-semibold">{m.value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Card Media */}
                <div className="relative m-3 sm:m-4 min-h-[170px] overflow-hidden rounded-2xl sm:ml-0 border border-white/10 bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stage Progress Indicators */}
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          {safeItems.map((_, i) => (
            <div
              key={i}
              className={cn(
                "transition-all duration-300 rounded-full",
                activeStep === i
                  ? "w-8 h-1.5 bg-[#D1FE17]"
                  : "w-2 h-1.5 bg-neutral-800"
              )}
            />
          ))}
        </div>
      </div>

      {/* CLOSING STAMP: Appears immediately after unpinning with ZERO blank space */}
      <div className="relative z-10 py-10 sm:py-14 px-5 sm:px-10 border-t border-[#1C1C20] bg-black text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11190B] border border-[#273B17] text-[#D1FE17] text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
            <span>AUDITED ESCROW LEDGER</span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
            {endLabel}
          </h3>
          <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mt-2">
            ● Verified On-Chain &amp; Bank Settlement Across 1,480+ Creators
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyFlipStack;
