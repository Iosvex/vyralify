"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  Lightbulb,
  CalendarDays,
  TrendingUp,
  Lock,
} from "lucide-react";

const aiTools = [
  {
    icon: Sparkles,
    emoji: "✨",
    title: "AI Caption Generator",
    description:
      "Generate scroll-stopping captions tailored to your niche, tone, and reel format in seconds.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Flame,
    emoji: "🔥",
    title: "AI Hook Generator",
    description:
      "Create high-retention opening hooks using proven viral formulas — provocative, negative, and question styles.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Lightbulb,
    emoji: "🧠",
    title: "AI Content Ideas",
    description:
      "Never run out of reel topics. Get niche-specific content ideas with angles, hooks, and CTAs included.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: CalendarDays,
    emoji: "📅",
    title: "AI Content Planner",
    description:
      "Build a 7-day or 30-day posting calendar with optimal times, content types, and growth triggers.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    emoji: "📊",
    title: "AI Growth Assistant",
    description:
      "Get personalised growth audits, algorithm tips, and scaling strategies based on your page metrics.",
    color: "from-cyan-500 to-blue-600",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function AiToolsSection() {
  return (
    <section id="ai-tools" className="relative py-24 px-6 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-3"
          >
            AI-Powered Studio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900"
          >
            Your Personal AI Content Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-zinc-500 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Five powerful AI tools built exclusively for Instagram creators. Unlock
            full access when you join Vyralify — powered by NVIDIA &amp; Groq for
            blazing-fast generation.
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
                className={`group relative rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 sm:p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${
                  isWide ? "lg:col-span-2 lg:flex lg:items-center lg:gap-8" : ""
                }`}
              >
                <div className={`${isWide ? "shrink-0" : ""}`}>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{tool.emoji}</span>
                    <h3 className="text-lg font-bold text-zinc-900">{tool.title}</h3>
                  </div>
                </div>
                <div className={isWide ? "flex-1" : ""}>
                  <p className="text-sm text-zinc-500 leading-relaxed">{tool.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Lock className="h-3 w-3" />
                    Members only
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            Unlock AI Studio — View Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
