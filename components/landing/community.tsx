"use client";

import { motion } from "framer-motion";
import { Users, Video, Award, Zap } from "lucide-react";

const posts = [
  { initials: "SC", username: "@sarah_creates", message: "Just hit 50K followers on my stoicism page! Thanks to the hooks library.", time: "2h ago", reactions: "🔥 24  ❤️ 18", color: "bg-violet-500" },
  { initials: "MD", username: "@mike.digital", message: "Made my first $500 from digital products this month.", time: "4h ago", reactions: "💰 31  🙌 12", color: "bg-emerald-500" },
  { initials: "ZB", username: "@zen.builder", message: "The CapCut templates saved me hours. New reel doing 200K views.", time: "6h ago", reactions: "🚀 27  ❤️ 15", color: "bg-amber-500" },
];

const stats = [
  { Icon: Users, label: "1,000+ active members" },
  { Icon: Video, label: "Weekly live Q&A sessions" },
  { Icon: Award, label: "Personal page audits" },
  { Icon: Zap, label: "Exclusive strategy drops" },
];

export default function Community() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">The community</span>
          <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">Join creators building together.</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">Get feedback, share wins, and learn from the best faceless page operators.</p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-5">
          <motion.div className="space-y-5 rounded-[1.6rem] border border-slate-200 bg-white/90 p-6 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] lg:col-span-3" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-400">Live community feed</span>
            </div>

            {posts.map((post, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition-colors duration-200 hover:bg-slate-100">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${post.color} text-xs font-bold text-white`}>{post.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{post.username}</span>
                    <span className="text-xs text-slate-400">{post.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{post.message}</p>
                  <div className="mt-2 text-xs text-slate-400">{post.reactions}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="space-y-4 lg:col-span-2" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} className="flex items-center gap-4 rounded-[1.2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                  <stat.Icon className="h-5 w-5" />
                </div>
                <span className="text-base font-semibold text-slate-900">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
