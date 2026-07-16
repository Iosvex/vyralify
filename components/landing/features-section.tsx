"use client";

import { motion } from "framer-motion";
import { BookOpen, Film, TrendingUp, DollarSign, Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Phase {
  icon: LucideIcon;
  title: string;
  description: string;
  colSpan?: string;
}

const phases: Phase[] = [
  {
    icon: BookOpen,
    title: "Phase 1: Foundation",
    description: "Pick your niche, lock your positioning, and design a faceless brand that feels premium from day one.",
  },
  {
    icon: Film,
    title: "Phase 2: Posting & Content",
    description: "Access CapCut and Canva systems, viral hooks, and repeatable formats that make publishing feel effortless.",
  },
  {
    icon: TrendingUp,
    title: "Phase 3: Scaling & Growth",
    description: "Learn the growth loops that actually increase reach, retention, and repeatability over time.",
  },
  {
    icon: DollarSign,
    title: "Phase 4: Monetisation & Sales",
    description: "Turn attention into revenue through digital products, affiliate flows, and conversion-focused copies.",
    colSpan: "lg:col-span-2",
  },
  {
    icon: Users2,
    title: "Phase 5: Private Community",
    description: "Get support from serious creators and submit pages for live feedback, audits, and strategy support.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-white/70 px-6 py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-4 block text-xs font-bold uppercase tracking-[0.32em] text-indigo-600">
            Premium vault
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            The full operating system for building a modern creator brand.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Explore the five core phases of the Vyralify curriculum built to scale attention and revenue on autopilot.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.title}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`group rounded-[1.6rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_25px_60px_-24px_rgba(34,211,238,0.3)] sm:p-8 ${phase.colSpan ?? ""}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{phase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
