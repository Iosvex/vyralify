"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    icon: "🎯",
    title: "Battle-Tested Strategies",
    description:
      "Not theory — every strategy is pulled from pages we've personally scaled to 100K+.",
  },
  {
    icon: "🔄",
    title: "Weekly Content Updates",
    description:
      "Fresh hooks, new templates, and trending audio playlists added every week.",
  },
  {
    icon: "💰",
    title: "50% Lifetime Commissions",
    description:
      "The most generous affiliate program in the creator economy. Refer 2, your subscription is free.",
  },
  {
    icon: "🤝",
    title: "Private Creator Network",
    description:
      "Connect with elite faceless page operators in our members-only community.",
  },
  {
    icon: "🚀",
    title: "AI-Powered Tools",
    description:
      "Caption writer, hashtag optimizer, and posting scheduler built for Instagram growth.",
  },
  {
    icon: "📱",
    title: "Mobile-First Design",
    description:
      "Access everything from your phone. Create and schedule reels on the go.",
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyVyralify() {
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
            Why Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
            Built Different. Built For Results.
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            See why thousands of creators chose Vyralify over generic courses.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="bg-white rounded-xl border-l-4 border-l-blue-600 border border-zinc-100 p-6 hover:shadow-lg hover:translate-x-1 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
