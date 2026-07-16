"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useUserProfile } from "@/components/user-profile-provider";

const standardFeatures = [
  "Access Standard Hooks & CTAs",
  "Access Standard Video Templates",
  "15% Commission Referral Rights",
  "Standard Community Access",
];

const proFeatures = [
  "Everything in Standard",
  "Access Pro Hooks & CapCut Libraries",
  "Direct Download signed storage URLs",
  "50% Lifetime Recurring Referral Rights",
  "1-on-1 Loom Video Profile Audits",
];

const pricingData = {
  standard: { USD: "$49", INR: "₹499" },
  pro: { USD: "$99", INR: "₹999" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function PricingSection() {
  const { profile } = useUserProfile();
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const handleCheckout = async (plan: "standard" | "pro") => {
    if (!profile) {
      const confirmAuth = window.confirm(
        "Please sign in with Google to proceed with checkout."
      );
      if (confirmAuth) {
        try {
          await signInWithGoogle();
        } catch (err) {
          console.error("Sign in failed:", err);
        }
      }
      return;
    }

    const price = pricingData[plan][currency];
    const gateway = currency === "USD" ? "Stripe" : "Razorpay";
    alert(
      `Initializing ${plan.toUpperCase()} checkout simulator via ${gateway} for ${price}/month...`
    );
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-slate-50">
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
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto"
          >
            Choose the plan that fits your creator journey. Switch currency
            based on your region.
          </motion.p>

          {/* Currency Toggle */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200 p-1"
          >
            <button
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                currency === "USD"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                currency === "INR"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              INR (₹)
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="relative rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Standard Tier
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900">
                  {pricingData.standard[currency]}
                </span>
                <span className="text-zinc-500 text-base">/mo</span>
              </div>
              <p className="mt-3 text-sm text-zinc-500">
                Core vault access for starting your faceless creation journey.
              </p>

              <ul className="mt-8 space-y-3">
                {standardFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("standard")}
              className="mt-8 w-full rounded-full bg-zinc-950 text-white font-semibold py-3 text-sm hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            >
              Choose Standard
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={1}
            className="relative rounded-2xl border border-blue-500 bg-white p-6 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 right-6">
              <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                Popular
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Pro Membership
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900">
                  {pricingData.pro[currency]}
                </span>
                <span className="text-zinc-500 text-base">/mo</span>
              </div>
              <p className="mt-3 text-sm text-zinc-500">
                Full access to scale your faceless brand into a real business.
              </p>

              <ul className="mt-8 space-y-3">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("pro")}
              className="mt-8 w-full rounded-full bg-blue-600 text-white font-bold py-3 text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-300 cursor-pointer"
            >
              Choose Pro Access
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
