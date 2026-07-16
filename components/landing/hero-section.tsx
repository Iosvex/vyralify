"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Play, ShieldCheck, Sparkles } from "lucide-react";
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
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,_#f7efe7_0%,_#f4efe6_42%,_#f8f8f3_100%)] px-4 py-20 sm:px-6 lg:py-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,113,108,0.16),_transparent_35%)]" />
      <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl items-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[0_26px_90px_-30px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-700">
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-stone-300 bg-white p-0.5">
                  <Image src={logo} alt="Vyralify logo" fill sizes="24px" className="object-cover" />
                </div>
                Premium creator operating system
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-stone-950 sm:text-5xl lg:text-[3.8rem]">
                Build a faceless brand that feels
                <span className="mt-2 block text-stone-700">intentional, polished, and profitable.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                Vyralify brings together AI content creation, growth systems, monetization tools, and a premium member experience — all designed to help creators move faster without feeling rushed.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]">
                  Unlock the studio <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/affiliates" className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50">
                  <Play className="h-4 w-4" />
                  See affiliate model
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-stone-800">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(120,113,108,0.14),_transparent_70%)] blur-3xl" />
              <div className="relative rounded-[2rem] border border-stone-200 bg-[linear-gradient(135deg,_#ffffff_0%,_#f6efe6_100%)] p-6 shadow-[0_22px_60px_-28px_rgba(15,23,42,0.3)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Member workspace</p>
                    <h2 className="mt-2 text-2xl font-semibold text-stone-900">From idea to publish-ready content.</h2>
                  </div>
                  <div className="rounded-2xl border border-stone-300 bg-stone-100 p-2 text-stone-700 shadow-sm">
                    <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-stone-200 bg-white">
                      <Image src={logo} alt="Vyralify logo" fill sizes="36px" className="object-cover" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { title: "AI captions & hooks", note: "Fast, polished, editor-ready" },
                    { title: "Content planner", note: "Weekly flow built around your niche" },
                    { title: "Monetization vault", note: "Products, affiliates, and assets" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-stone-200 bg-white/90 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-stone-100 p-2 text-stone-700">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                          <p className="mt-1 text-sm text-stone-500">{item.note}</p>
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
