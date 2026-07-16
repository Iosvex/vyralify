"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const highlights = [
  { label: "AI Studio", detail: "5 tools for modern creators" },
  { label: "Growth Systems", detail: "Proven playbooks" },
  { label: "Revenue Engine", detail: "Affiliate + product monetization" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_40%),linear-gradient(135deg,_#07111f_0%,_#0f172a_45%,_#111827_100%)] px-4 py-20 sm:px-6 lg:py-0">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,transparent_40%,rgba(255,255,255,0.05)_100%)]" />
      <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl items-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_24px_80px_-20px_rgba(14,165,233,0.5)] backdrop-blur-2xl sm:p-8 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="z-10">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered growth OS for faceless creators
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[3.8rem]">
                Build the next viral brand
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                  without showing your face.
                </span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Vyralify gives creators a premium operating system for AI content, growth systems, monetization, and affiliate leverage — all in one place.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
                  Unlock the studio <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/affiliates" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
                  <Play className="h-4 w-4" />
                  See affiliate model
                </Link>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-white">{item.detail}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-transparent blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Member cockpit</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">From idea → content → cashflow</h2>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
                    <Rocket className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { title: "AI captions & hooks", note: "NVIDIA + Groq powered" },
                    { title: "Content planner & growth prompts", note: "Built for weekly execution" },
                    { title: "Monetization vault", note: "Products, affiliates, and assets" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-cyan-500/15 p-2 text-cyan-300">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
