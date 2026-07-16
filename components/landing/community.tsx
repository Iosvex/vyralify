"use client";

import { motion } from "framer-motion";
import { Users, Video, Award, Zap } from "lucide-react";

const posts = [
  {
    initials: "SC",
    username: "@sarah_creates",
    message:
      "Just hit 50K followers on my stoicism page! 🎉 Thanks to the hooks library",
    time: "2h ago",
    reactions: "🔥 24  ❤️ 18",
    color: "bg-purple-500",
  },
  {
    initials: "MD",
    username: "@mike.digital",
    message:
      "Made my first $500 from digital products this month",
    time: "4h ago",
    reactions: "💰 31  🙌 12",
    color: "bg-emerald-500",
  },
  {
    initials: "ZB",
    username: "@zen.builder",
    message:
      "The CapCut templates saved me hours. New reel doing 200K views",
    time: "6h ago",
    reactions: "🚀 27  ❤️ 15",
    color: "bg-amber-500",
  },
];

const stats = [
  {
    Icon: Users,
    label: "1,000+ Active Members",
  },
  {
    Icon: Video,
    label: "Weekly Live Q&A Sessions",
  },
  {
    Icon: Award,
    label: "Personal Page Audits",
  },
  {
    Icon: Zap,
    label: "Exclusive Strategy Drops",
  },
];

export default function Community() {
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
            The Community
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
            Join 1,000+ Creators Building Together
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Get feedback, share wins, and learn from the best faceless page
            operators.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left — Community Feed */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl border border-zinc-100 p-6 space-y-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-400">
                Live Community Feed
              </span>
            </div>

            {posts.map((post, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${post.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {post.initials}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-zinc-900">
                      {post.username}
                    </span>
                    <span className="text-xs text-zinc-400">{post.time}</span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {post.message}
                  </p>
                  <div className="mt-2 text-xs text-zinc-400">
                    {post.reactions}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — Stats & Features */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-4 bg-white rounded-xl border border-zinc-100 p-5 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <stat.Icon className="w-5 h-5" />
                </div>
                <span className="text-base font-semibold text-zinc-900">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
