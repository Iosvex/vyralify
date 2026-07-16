"use client";

import { motion } from "framer-motion";

const assets = [
  { icon: "🎬", title: "Video Hooks Library", description: "250+ scroll-stopping hooks proven to retain viewers in the first 3 seconds." },
  { icon: "📝", title: "CTA Scripts", description: "Copy-paste call-to-action scripts engineered for DMs, stories, and bio links." },
  { icon: "🎨", title: "CapCut Templates", description: "Ready-to-publish templates for trending reels, just swap your content." },
  { icon: "📹", title: "B-Roll Footage", description: "Cinematic lifestyle footage packs for aesthetic overlay and background use." },
  { icon: "📊", title: "Growth Playbooks", description: "Step-by-step scaling guides from 0 to 100K followers." },
  { icon: "🤖", title: "AI Studio (5 Tools)", description: "Caption Generator, Hook Generator, Content Ideas, Content Planner & Growth Assistant." },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function EverythingInside() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700">The Vault</span>
          <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">A complete arsenal for creator success.</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">Everything you need to build, grow, and monetize faceless Instagram pages — all in one membership.</p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {assets.map((asset) => (
            <motion.div key={asset.title} variants={cardVariants} className="group relative rounded-[1.6rem] border border-slate-200 bg-white/90 p-6 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_25px_60px_-24px_rgba(34,211,238,0.3)]">
              <span className="absolute right-4 top-4 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700">Included</span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-2xl">{asset.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{asset.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{asset.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
