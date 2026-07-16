"use client";

import { motion } from "framer-motion";
import { Target, Download, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Join & Pick Your Niche",
    description:
      "Unlock the portal, run our interactive Niche Selection Quiz, and configure your initial faceless profile layout.",
    Icon: Target,
  },
  {
    number: "02",
    title: "Access The Vault",
    description:
      "Download HD B-Roll reels, CapCut filters, scroll-stopping hooks, and pre-written DM scripts.",
    Icon: Download,
  },
  {
    number: "03",
    title: "Scale & Monetize",
    description:
      "Deploy your store, track your 50% lifetime recurring commissions, and grow your creator empire.",
    Icon: Rocket,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.2 },
  }),
};

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
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
            The Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900">
            Three Steps to Your Faceless Empire
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Dashed connector — horizontal on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2 border-t-2 border-dashed border-zinc-200 z-0" />

          {/* Dashed connector — vertical on mobile/tablet */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-zinc-200 z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative bg-white rounded-2xl border border-zinc-100 p-8 text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* Large step number */}
                <span className="block text-6xl font-black text-blue-600/15 leading-none mb-4 select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <step.Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
