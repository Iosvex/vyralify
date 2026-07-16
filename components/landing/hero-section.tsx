"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const featurePills = [
  "✓ AI Powered",
  "✓ Beginner Friendly",
  "✓ Weekly Updates",
  "✓ Active Community",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* ── Background gradient blobs ── */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-400/30 via-blue-500/20 to-transparent blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-300/20 via-blue-200/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(to right, #2563EB 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-7xl w-full px-6 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column: Text ── */}
          <div className="space-y-8">
            {/* Trust Badge Pill */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 border border-blue-100"
            >
              <span>✨</span>
              The #1 AI-Powered Platform Built For Instagram Creators
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-zinc-900"
            >
              Build, Grow &amp;{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Monetise
              </span>{" "}
              Viral Instagram Pages.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-xl text-base sm:text-lg text-zinc-500 leading-relaxed"
            >
              An AI-powered all-in-one platform built to help you launch viral
              Instagram pages, create high-performing content, master proven
              growth strategies, and monetise your audience with high-demand
              digital products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 text-sm shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                Join Vyralify
                <ChevronRight className="h-4 w-4" />
              </a>
              <button className="inline-flex items-center gap-2 rounded-full border border-zinc-200 hover:border-blue-200 bg-white hover:bg-blue-50/50 text-zinc-700 font-semibold px-8 py-3.5 text-sm transition-all duration-300 hover:scale-[1.02]">
                <Play className="h-4 w-4 text-blue-600" />
                View Platform
              </button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {featurePills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-zinc-50 border border-zinc-100 px-4 py-1.5 text-xs font-medium text-zinc-600"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Trusted By */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 pt-2"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {[
                  "bg-gradient-to-br from-blue-400 to-blue-600",
                  "bg-gradient-to-br from-indigo-400 to-indigo-600",
                  "bg-gradient-to-br from-purple-400 to-purple-600",
                  "bg-gradient-to-br from-sky-400 to-sky-600",
                  "bg-gradient-to-br from-cyan-400 to-cyan-600",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 rounded-full ${gradient} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {["A", "M", "S", "J", "K"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-3.5 w-3.5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Join <span className="font-semibold text-zinc-700">1,000+</span> creators building with Vyralify
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glassmorphism card wrapper */}
            <div className="relative rounded-3xl shadow-2xl border border-white/20 overflow-hidden backdrop-blur-xl bg-white/10">
              {/* Inner glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 via-transparent to-blue-600/5 pointer-events-none" />

              <Image
                src="/dashboard-mockup.jpg"
                alt="Vyralify dashboard preview"
                width={720}
                height={480}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Decorative floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white shadow-xl border border-zinc-100 px-5 py-3 flex items-center gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-bold">
                🚀
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">+234%</p>
                <p className="text-[11px] text-zinc-500">Avg. Growth Rate</p>
              </div>
            </motion.div>

            {/* Decorative floating badge top-right */}
            <motion.div
              className="absolute -top-4 -right-4 rounded-2xl bg-white shadow-xl border border-zinc-100 px-4 py-2.5 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-sm">
                💰
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900">$10K+</p>
                <p className="text-[10px] text-zinc-500">Revenue</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
