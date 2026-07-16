"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun M.",
    initials: "AM",
    niche: "Stoicism Niche",
    quote:
      "Went from 0 to 45K followers in 3 months using the hooks library. The growth playbook is insane.",
    color: "bg-violet-500",
  },
  {
    name: "Emma T.",
    initials: "ET",
    niche: "Motivation Niche",
    quote:
      "The CapCut templates alone are worth the subscription. I'm posting 2 reels a day in under 30 minutes.",
    color: "bg-pink-500",
  },
  {
    name: "Ravi K.",
    initials: "RK",
    niche: "Finance Niche",
    quote:
      "Made $2,300 last month from digital products + affiliate commissions. Vyralify literally pays for itself.",
    color: "bg-emerald-500",
  },
  {
    name: "Sofia L.",
    initials: "SL",
    niche: "Lifestyle Niche",
    quote:
      "The community is incredible. Got a personal page audit that doubled my engagement rate.",
    color: "bg-amber-500",
  },
  {
    name: "James W.",
    initials: "JW",
    niche: "Business Niche",
    quote:
      "Been creating faceless pages for a year. Vyralify's AI tools and hook database are next level.",
    color: "bg-blue-500",
  },
  {
    name: "Priya S.",
    initials: "PS",
    niche: "Health Niche",
    quote:
      "Referred 5 friends and my subscription has been free for 4 months. The affiliate program is real.",
    color: "bg-rose-500",
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

export default function Testimonials() {
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
            Results
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
            Real Creators. Real Results.
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            See what our members are achieving with Vyralify.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-zinc-600 italic leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {t.initials}
                </div>

                <div>
                  <p className="text-sm font-bold text-zinc-900">{t.name}</p>
                  <span className="inline-block mt-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                    {t.niche}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
