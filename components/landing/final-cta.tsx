"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const avatarColors = [
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-300",
  "bg-blue-600",
  "bg-blue-200",
];

export default function FinalCta() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Floating gradient blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-400/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 sm:px-12 py-16 sm:py-20 text-center"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Start Building Your
            <br />
            Faceless Empire Today
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-blue-100 max-w-2xl mx-auto"
          >
            Join hundreds of creators who are scaling and monetizing anonymous
            Instagram channels.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="mt-10">
            <button className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-zinc-100 font-bold px-8 h-12 rounded-full text-sm hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
              Get Started Now →
            </button>
          </motion.div>

          {/* Avatar stack */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-3">
              {avatarColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-9 h-9 rounded-full ${color} border-2 border-white/30 flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-blue-100 font-medium">
              1,000+ creators joined
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
