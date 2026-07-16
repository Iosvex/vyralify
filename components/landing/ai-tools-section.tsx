"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Lightbulb, CalendarDays, TrendingUp, Lock } from "lucide-react";

const aiTools = [
  {
    icon: Sparkles,
    emoji: "✨",
    title: "AI Caption Generator",
    description: "Generate scroll-stopping captions tailored to your niche, tone, and reel format in seconds.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: Flame,
    emoji: "🔥",
    title: "AI Hook Generator",
    description: "Create high-retention opening hooks using proven viral formulas — provocative, negative, and question styles.",
    color: "from-orange-500 to-rose-600",
  },
  {
    icon: Lightbulb,
    emoji: "🧠",
    title: "AI Content Ideas",
    description: "Never run out of reel topics. Get niche-specific content ideas with angles, hooks, and CTAs included.",
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    icon: CalendarDays,
    emoji: "📅",
    title: "AI Content Planner",
    description: "Build a 7-day or 30-day posting calendar with optimal times, content types, and growth triggers.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    emoji: "📊",
    title: "AI Growth Assistant",
    description: "Get personalised growth audits, algorithm tips, and scaling strategies based on your page metrics.",
    color: "from-blue-500 to-indigo-600",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AiToolsSection() {
  return (
    <section id="ai-tools" className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.span initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 block text-xs font-bold uppercase tracking-[0.32em] text-indigo-600">
            AI-Powered Studio
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Calm, premium tools for creators who want velocity.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Five refined AI tools built for Instagram creators who want less friction and more output.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool, idx) => {
            const Icon = tool.icon;
            const isWide = idx === 4;
            return (
              <motion.div
                key={tool.title}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`group relative rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_30px_70px_-28px_rgba(79,70,229,0.35)] sm:p-8 ${isWide ? "lg:col-span-2 lg:flex lg:items-center lg:gap-8" : ""}`}
              >
                <div className={`${isWide ? "shrink-0" : ""}`}>
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-white transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">{tool.emoji}</span>
                    <h3 className="text-lg font-bold text-slate-900">{tool.title}</h3>
                  </div>
                </div>
                <div className={isWide ? "flex-1" : ""}>
                  <p className="text-sm leading-relaxed text-slate-600">{tool.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <Lock className="h-3 w-3" />
                    Members only
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition-all hover:scale-[1.02]">
            Unlock AI Studio — View Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
