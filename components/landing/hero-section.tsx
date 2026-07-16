"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, ShieldCheck, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/vyralifylogo.jpeg";

const highlights = [
  { label: "AI Studio", detail: "Five tools that ship fast" },
  { label: "Growth Systems", detail: "Playbooks that scale" },
  { label: "Revenue Engine", detail: "Affiliate + product monetization" },
];

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_34%),linear-gradient(135deg,_#f8fbff_0%,_#eff6ff_52%,_#f8fafc_100%)]" />
      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(17,24,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl items-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-sky-100 bg-white/85 p-6 shadow-[0_32px_100px_-32px_rgba(37,99,235,0.25)] backdrop-blur-2xl sm:p-8 lg:p-12">
          <div className="absolute -right-12 top-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
                <motion.div initial={{ opacity: 0, scale: 0.94, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
                  <Image src={logo} alt="Vyralify logo" width={24} height={24} className="h-6 w-6 object-contain" />
                </motion.div>
                Premium creator operating system
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.7rem]">
                Create a faceless brand that feels
                <span className="mt-2 block bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  intentional, polished, and profitable.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Vyralify brings together AI creation, growth systems, and monetization in one calm, high-conviction workspace built for modern creators.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5">
                  Unlock the studio <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/affiliates" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  <Play className="h-4 w-4" />
                  See affiliate model
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_70%)] blur-3xl" />
              <div className="relative rounded-[1.8rem] border border-sky-100 bg-[linear-gradient(135deg,_#ffffff_0%,_#f0f8ff_100%)] p-5 shadow-[0_24px_70px_-28px_rgba(37,99,235,0.28)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}>
                      <Image src={logo} alt="Vyralify logo" width={32} height={32} className="h-8 w-8 object-contain" />
                    </motion.div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Gemini-style workspace</p>
                      <h2 className="text-lg font-semibold text-slate-900">Launch with clarity.</h2>
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-700">Live</div>
                </div>

                <div className="mt-5 rounded-[1.35rem] border border-slate-200/80 bg-slate-950 p-4 text-white">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    AI assistant ready
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-slate-200">
                    “Draft a 7-day content plan for a luxury travel faceless page with warm hooks and a product pitch.”
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Wand2 className="h-4 w-4 text-sky-300" />
                        Hook stack
                      </div>
                      <p className="mt-2 text-sm text-slate-300">3 angles, 5 captions, 1 CTA.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Zap className="h-4 w-4 text-cyan-300" />
                        Growth pulse
                      </div>
                      <p className="mt-2 text-sm text-slate-300">Best post windows for next week.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "Polished", note: "ready to publish" },
                    { title: "Fast", note: "ship in minutes" },
                    { title: "Monetized", note: "built for revenue" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                      <div className="flex items-center gap-2 text-slate-700">
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold">{item.title}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{item.note}</p>
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
