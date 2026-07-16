"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const avatarColors = ["bg-indigo-400", "bg-violet-500", "bg-sky-400", "bg-fuchsia-500", "bg-emerald-400"];

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.22),_transparent_40%),linear-gradient(135deg,_#111827_0%,_#1e1b4b_45%,_#312e81_100%)] px-6 py-24">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.28, 0.48, 0.28] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl" />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="rounded-[2rem] border border-white/20 bg-white/10 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-20">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Start building your
            <br />
            faceless empire today.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
            Join creators who are scaling, monetizing, and shipping content with a premium AI growth system.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="mt-10">
            <a href="#pricing">
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:scale-105">
                Get started now →
              </button>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {avatarColors.map((color, index) => (
                <div key={index} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 ${color}`}>
                  <span className="text-xs font-bold text-white">{String.fromCharCode(65 + index)}</span>
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-200">1,000+ creators joined</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
