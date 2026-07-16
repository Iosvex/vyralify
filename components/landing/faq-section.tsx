"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What AI tools are included?",
    a: "Every paid member gets access to our full AI Studio: Caption Generator, Hook Generator, Content Ideas, Content Planner, and Growth Assistant. These tools are powered by NVIDIA and Groq AI models and are exclusive to active subscribers.",
  },
  {
    a: "A faceless page is an Instagram account centered on a specific theme (like finance, peak performance, or travel aesthetic) where you don't show your face. We provide all the reels, caption scripts, and b-roll footage to help you post anonymously.",
  },
  {
    q: "Do I need prior video editing experience?",
    a: "No editing experience is needed. We offer direct-access Canva and CapCut templates so you can import, drag, drop your text, and publish viral reels in less than 5 minutes.",
  },
  {
    q: "How does the 50% Lifetime Recurring Affiliate Program work?",
    a: "Every member gets a custom affiliate referral link. When another creator joins Vyralify via your link, you get a 50% commission of their monthly subscription fee for as long as they stay active. Refer 2 members and your own subscription is completely free!",
  },
  {
    q: "What is the difference between Standard and Pro?",
    a: "Standard unlocks the core video curriculum and basic hooks library. Pro unlocks advanced scaling guides, direct-download signed URLs for cinematic lifestyle packs, Stripe checkout templates, and custom 1-on-1 affiliate strategy consulting.",
  },
  {
    q: "Do you help set up the digital store?",
    a: "Yes! In Phase 4 (Monetisation Module), we give you detailed checklists and video walkthroughs to set up your Beacons or Payhip digital storefront and connect your payment gateways.",
  },
  {
    q: "Can I get my page audited?",
    a: "Pro creators can submit their Instagram handle directly in the dashboard and get a custom Loom video audit detailing improvements to their layout, copy, and growth strategy.",
  },
  {
    q: "What currencies are supported?",
    a: "We support INR payments via Razorpay (UPI, Netbanking, local cards) and global USD payments via Stripe (international credit cards).",
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Absolutely. You can manage or cancel your subscription at any time with a single click inside your Account Settings page.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3"
          >
            Support
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto"
          >
            Everything you need to know about Vyralify.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                className="border-b border-zinc-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full justify-between items-center text-left py-5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle
                      className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-blue-600" : "text-zinc-400"
                      }`}
                    />
                    <span
                      className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                        isOpen ? "text-blue-600" : "text-zinc-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-zinc-500 pl-8 pb-5 pr-4 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
