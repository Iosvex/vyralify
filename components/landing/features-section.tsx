"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Film,
  TrendingUp,
  DollarSign,
  Users2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Phase {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  colSpan?: string;
}

const phases: Phase[] = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Phase 1: Foundation",
    description:
      "Pick your niche with our checklist/quiz, set up your faceless IG aesthetics, and learn the platform rules to start on the right foot.",
  },
  {
    icon: Film,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "Phase 2: Posting & Content",
    description:
      "Access CapCut/Canva templates, high-retention hooks databases, and trending audio playlists to create scroll-stopping reels.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Phase 3: Scaling & Growth",
    description:
      "Audit algorithm ranking triggers, customize posting calendars, and study real growth case studies from successful pages.",
  },
  {
    icon: DollarSign,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Phase 4: Monetisation & Sales",
    description:
      "Configure your digital store on Beacons or Payhip. Deploy our psychological sales scripts and copy-paste DM templates to convert followers into passive income.",
    colSpan: "lg:col-span-2",
  },
  {
    icon: Users2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Phase 5: Private Community",
    description:
      "Connect with other creators, share wins, and submit your pages for personalised Loom video audits from experienced mentors.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <div className="text-center space-y-3 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 block"
          >
            PREMIUM VAULT
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-zinc-500 max-w-lg mx-auto text-sm sm:text-base"
          >
            Explore the 5 core phases of the Vyralify curriculum built to scale
            your audience.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
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
                className={`group rounded-2xl bg-white border border-zinc-100 p-6 sm:p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${
                  phase.colSpan ?? ""
                }`}
              >
                {/* Icon container */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${phase.iconBg} ${phase.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
