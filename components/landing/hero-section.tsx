"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const panelLabels = [
  "AI Caption Engine",
  "Viral Hook Library",
  "Content Planner",
  "Growth Systems",
  "Monetisation Vault",
];

const annotations = [
  { text: "Experienced growth systems", position: "top-[18%] left-[8%]" },
  { text: "Modern AI content tools", position: "top-[42%] right-[6%]" },
  { text: "Individual niche strategy", position: "bottom-[22%] left-[12%]" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F5F3EF] px-4 sm:px-6 py-20 lg:py-0">
      <div className="mx-auto w-full max-w-7xl">
        {/* CRUNCHY-inspired rounded container */}
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#FAFAF8] border border-zinc-200/80 shadow-[0_24px_80px_-20px_rgba(37,99,235,0.15)]">
          <div className="grid lg:grid-cols-2 min-h-[85vh] lg:min-h-[88vh]">
            {/* ── Left: Typography ── */}
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-14 lg:py-16 z-10">
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-6"
              >
                Welcome to Vyralify
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-black uppercase tracking-tight leading-[1.08] text-zinc-950"
              >
                Build, Grow &amp;
                <br />
                Monetise Viral
                <br />
                Instagram Pages
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-md text-sm sm:text-base text-zinc-500 leading-relaxed"
              >
                An AI-powered all-in-one platform built to help you launch faceless
                Instagram pages, create high-performing content, and monetise with
                digital products — the full business-in-a-box for creators.
              </motion.p>

              <motion.p
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-4 max-w-md text-sm text-zinc-400 leading-relaxed"
              >
                Copy proven products, deploy battle-tested marketing, and scale with
                weekly updates, premium vault assets, and a 50% lifetime affiliate program.
              </motion.p>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-8 py-3.5 text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  Join Vyralify
                  <ChevronRight className="h-4 w-4" />
                </a>
                <Link
                  href="/affiliates"
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Affiliate program →
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Glass panel visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative hidden lg:flex items-center justify-center overflow-hidden"
            >
              {/* Blue radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[75%] rounded-full bg-gradient-radial from-blue-500/50 via-blue-600/30 to-transparent blur-2xl" />
              </div>

              {/* Floating annotations */}
              {annotations.map((note) => (
                <span
                  key={note.text}
                  className={`absolute ${note.position} text-[10px] font-medium text-white/70 tracking-wide z-20 hidden xl:block`}
                >
                  {note.text}
                </span>
              ))}

              {/* Vertical glass panels */}
              <div className="relative flex items-stretch justify-center gap-1 h-[70%] w-[85%] z-10">
                {panelLabels.map((label, i) => (
                  <div
                    key={label}
                    className="relative flex-1 rounded-sm overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(37,99,235,0.08) 100%)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : undefined,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-blue-900/10" />
                  </div>
                ))}

                {/* Brand text across panels */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-5xl xl:text-6xl font-black uppercase tracking-[0.15em] text-white drop-shadow-[0_2px_20px_rgba(37,99,235,0.5)] select-none">
                    Vyralify
                  </span>
                </div>
              </div>

              {/* Panel label strip */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {["✨ AI", "🔥 Hooks", "📅 Planner"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
