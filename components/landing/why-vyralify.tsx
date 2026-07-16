"use client";

import { motion } from "framer-motion";

const differentiators = [
  { icon: "🎯", title: "Battle-Tested Strategies", description: "Every strategy is pulled from pages we’ve personally scaled to 100K+ and beyond." },
  { icon: "🔄", title: "Weekly Content Updates", description: "Fresh hooks, new templates, and trending audio playlists added every week." },
  { icon: "💰", title: "50% Lifetime Commissions", description: "The most generous affiliate program in the creator economy. Refer 2, your membership is free." },
  { icon: "🤝", title: "Private Creator Network", description: "Connect with elite faceless page operators in our members-only community." },
  { icon: "🚀", title: "AI-Powered Tools", description: "Caption writing, hook creation, and growth prompts all built for Instagram acceleration." },
  { icon: "📱", title: "Mobile-First Design", description: "Access everything from your phone and build your brand on the go." },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function WhyVyralify() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">Why us</span>
          <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">Built different. Built for results.</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">See why creators choose Vyralify over generic courses and scattered tools.</p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={cardVariants} className="group rounded-[1.4rem] border border-slate-200 bg-white/90 p-6 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl">{item.icon}</div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
