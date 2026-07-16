"use client";

import { motion } from "framer-motion";

const assets = [
  {
    icon: "🎬",
    title: "Video Hooks Library",
    description:
      "250+ scroll-stopping hooks proven to retain viewers in the first 3 seconds",
  },
  {
    icon: "📝",
    title: "CTA Scripts",
    description:
      "Copy-paste call-to-action scripts engineered for DMs, stories, and bio links",
  },
  {
    icon: "🎨",
    title: "CapCut Templates",
    description:
      "Ready-to-publish templates for trending reels, just swap your content",
  },
  {
    icon: "📹",
    title: "B-Roll Footage",
    description:
      "Cinematic lifestyle footage packs for aesthetic overlay and background use",
  },
  {
    icon: "📊",
    title: "Growth Playbooks",
    description:
      "Step-by-step scaling guides from 0 to 100K followers",
  },
  {
    icon: "🤖",
    title: "AI Content Tools",
    description:
      "AI-powered caption writer, hashtag generator, and posting scheduler",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function EverythingInside() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            The Vault
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
            A Complete Arsenal For Creator Success
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Everything you need to build, grow, and monetize faceless Instagram
            pages — all in one membership.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {assets.map((asset) => (
            <motion.div
              key={asset.title}
              variants={cardVariants}
              className="relative bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Included Badge */}
              <span className="absolute top-4 right-4 text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                Included
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
                {asset.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                {asset.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {asset.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
