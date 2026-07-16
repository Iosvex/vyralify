"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Instagram page card data ── */
const igCards = [
  { handle: "@wealth.insider", followers: "234K", gradient: "from-amber-400 to-orange-500" },
  { handle: "@business.mastery", followers: "189K", gradient: "from-blue-500 to-indigo-600" },
  { handle: "@mindset.growth", followers: "312K", gradient: "from-emerald-400 to-teal-600" },
  { handle: "@motivation.daily", followers: "456K", gradient: "from-rose-400 to-pink-600" },
  { handle: "@luxury.lifestyle", followers: "523K", gradient: "from-violet-400 to-purple-600" },
  { handle: "@marketing.hq", followers: "178K", gradient: "from-sky-400 to-indigo-600" },
  { handle: "@stoicism.world", followers: "267K", gradient: "from-zinc-500 to-zinc-800" },
  { handle: "@quotes.empire", followers: "891K", gradient: "from-yellow-400 to-amber-600" },
  { handle: "@cars.premium", followers: "345K", gradient: "from-red-400 to-rose-600" },
  { handle: "@finance.hub", followers: "412K", gradient: "from-green-400 to-emerald-600" },
  { handle: "@health.guru", followers: "156K", gradient: "from-lime-400 to-green-600" },
  { handle: "@travel.aesthetic", followers: "634K", gradient: "from-sky-400 to-cyan-600" },
];

const row1 = igCards.slice(0, 6);
const row2 = igCards.slice(6, 12);

/* ── Stats data ── */
const stats = [
  { emoji: "📄", value: 120, suffix: "+", label: "Pages Built", desc: "Creators have launched over 120 Instagram pages using Vyralify systems." },
  { emoji: "🚀", value: 83, suffix: "", label: "Active Pages", desc: "Pages consistently posting and growing using our frameworks." },
  { emoji: "👀", value: 500, suffix: "M+", label: "Views Generated", desc: "Organic reach generated across our Instagram pages." },
  { emoji: "💰", value: 10, suffix: "K+", prefix: "$", label: "Revenue Generated", desc: "Generated through digital products, affiliates and monetisation strategies." },
  { emoji: "🛒", value: 1500, suffix: "+", label: "Digital Product Sales", desc: "Successfully sold through Instagram pages." },
];

/* ── Animated counter hook ── */
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  inView,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000; // ms
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── IG Card Component ── */
function IgCard({ handle, followers, gradient }: { handle: string; followers: string; gradient: string }) {
  return (
    <div
      className={`shrink-0 w-48 h-28 rounded-2xl bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between text-white shadow-lg mx-3`}
    >
      <div className="flex items-center justify-between">
        {/* Instagram icon */}
        <svg className="h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
        <span className="text-xs font-bold bg-white/20 rounded-full px-2 py-0.5">
          {followers}
        </span>
      </div>
      <p className="text-sm font-bold truncate">{handle}</p>
    </div>
  );
}

export default function SocialProof() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-white/70 backdrop-blur-sm">
      {/* ── Section header ── */}
      <div className="mx-auto max-w-4xl text-center space-y-4 mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900"
        >
          Helping Creators Build The Next Generation Of{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
            Instagram Pages.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto"
        >
          Vyralify combines AI-powered tools with proven strategies from
          experienced creators to help you build high-performing Instagram
          pages, generate millions of organic views, and monetise your
          audience.
        </motion.p>
      </div>

      {/* ── Floating IG cards (Row 1 → right) ── */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div
          className="flex"
          style={{ animation: "scrollLeft 40s linear infinite" }}
        >
          {[...row1, ...row1, ...row1].map((card, i) => (
            <IgCard key={`r1-${i}`} {...card} />
          ))}
        </div>
      </div>

      {/* ── Floating IG cards (Row 2 ← left) ── */}
      <div className="relative mb-16 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div
          className="flex"
          style={{ animation: "scrollRight 45s linear infinite" }}
        >
          {[...row2, ...row2, ...row2].map((card, i) => (
            <IgCard key={`r2-${i}`} {...card} />
          ))}
        </div>
      </div>

      {/* ── Statistics Grid ── */}
      <div ref={statsRef} className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-white border border-zinc-100 p-6 text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <span className="text-2xl block mb-2">{stat.emoji}</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </p>
              <p className="text-sm font-semibold text-zinc-700 mt-1">
                {stat.label}
              </p>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CSS animations for marquee ── */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
