"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Arjun M.", initials: "AM", niche: "Stoicism niche", quote: "Went from 0 to 45K followers in 3 months using the hooks library. The growth playbook is insane.", color: "bg-violet-500" },
  { name: "Emma T.", initials: "ET", niche: "Motivation niche", quote: "The CapCut templates alone are worth the subscription. I’m posting 2 reels a day in under 30 minutes.", color: "bg-pink-500" },
  { name: "Ravi K.", initials: "RK", niche: "Finance niche", quote: "Made $2,300 last month from digital products and affiliate commissions. Vyralify literally pays for itself.", color: "bg-emerald-500" },
  { name: "Sofia L.", initials: "SL", niche: "Lifestyle niche", quote: "The community is incredible. Got a page audit that doubled my engagement rate.", color: "bg-amber-500" },
  { name: "James W.", initials: "JW", niche: "Business niche", quote: "Been creating faceless pages for a year. Vyralify’s AI tools and hook database are next level.", color: "bg-indigo-500" },
  { name: "Priya S.", initials: "PS", niche: "Health niche", quote: "Referred 5 friends and my subscription has been free for 4 months. The affiliate program is real.", color: "bg-rose-500" },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">Results</span>
          <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">Real creators. Real results.</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">See what our members are achieving with Vyralify.</p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={cardVariants} className="flex flex-col rounded-[1.5rem] border border-slate-200 bg-white/90 p-6 shadow-[0_15px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">“{t.quote}”</p>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.color} text-xs font-bold text-white`}>{t.initials}</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">{t.niche}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
