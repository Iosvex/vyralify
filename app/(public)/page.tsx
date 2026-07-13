"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Star, ShieldAlert, Sparkles, HelpCircle, Film, ArrowRight, DollarSign } from "lucide-react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useUserProfile } from "@/components/user-profile-provider";

export default function LandingPage() {
  const { profile } = useUserProfile();
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCheckout = async (plan: "standard" | "pro") => {
    if (!profile) {
      const confirmAuth = window.confirm("Please sign in with Google to proceed with checkout.");
      if (confirmAuth) {
        try {
          await signInWithGoogle();
        } catch (err) {
          console.error("Sign in failed:", err);
        }
      }
      return;
    }

    // Redirect to checkout simulator
    alert(`Initializing ${plan.toUpperCase()} checkout simulator in ${currency}. Redirecting you to payment gateway webhook triggers...`);
  };

  const pricing = {
    standard: currency === "USD" ? { price: "$49", period: "/mo" } : { price: "₹499", period: "/mo" },
    pro: currency === "USD" ? { price: "$99", period: "/mo" } : { price: "₹999", period: "/mo" },
  };

  const faqs = [
    {
      q: "What is a faceless Instagram page?",
      a: "A faceless page is an account focused entirely on a specific niche (e.g. finance, AI tools, motivation) where the creator remains anonymous. We teach you how to source viral content, edit premium clips, and scale without ever showing your face.",
    },
    {
      q: "Do I need editing experience to get started?",
      a: "Not at all. We provide ready-to-use Canva templates, CapCut projects, and specific hook formats that require zero advanced editing knowledge. You can generate professional shorts in under 10 minutes.",
    },
    {
      q: "How does the 50% Lifetime Affiliate Program work?",
      a: "Once you sign up, you get a unique affiliate link. If someone subscribes to Vyralify using your link, you get a recurring 50% commission on their subscription fee every single month for as long as they stay subscribed. Standard referrals earn you up to $24.50/mo, and Pro referrals earn you up to $49.50/mo recurring.",
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes. You can manage and cancel your billing directly inside the Member Dashboard with a single click. There are no long-term contracts or hidden fees.",
    },
  ];

  return (
    <div className="space-y-24 py-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The Full Business-in-a-Box for Creators
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]"
        >
          Build your faceless <br />
          <span className="text-blue-600 dark:text-blue-500">Instagram empire.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400"
        >
          Access the ultimate repository of scroll-stopping video hooks, high-converting call-to-actions, ready-to-publish assets, and a 50% recurring affiliate setup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-center gap-4"
        >
          <a href="#pricing">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 h-11">
              Start Free Trial
            </Button>
          </a>
          <Link href="/affiliates">
            <Button variant="outline" className="border-zinc-200 hover:bg-zinc-50 font-semibold px-6 h-11">
              Affiliate Program
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Access the Vault Assets</h2>
          <p className="text-sm text-zinc-500">Everything you need to launch, grow, and scale your faceless channel.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Item 1 */}
          <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 mb-2">
                <Film className="h-5 w-5" />
              </div>
              <CardTitle>500+ Scroll-Stopping Hooks</CardTitle>
              <CardDescription>Visual hooks and caption prompts engineered to maximize watch-time and trigger the algorithm.</CardDescription>
            </CardHeader>
          </Card>

          {/* Item 2 */}
          <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle>Psychological CTAs</CardTitle>
              <CardDescription>Proven call-to-action hooks that drive comment engagement, shares, and profile conversions.</CardDescription>
            </CardHeader>
          </Card>

          {/* Item 3 */}
          <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 mb-2">
                <DollarSign className="h-5 w-5" />
              </div>
              <CardTitle>50% Recurring Affiliation</CardTitle>
              <CardDescription>An built-in affiliate engine generating lifetime recurring revenue on every referred member subscription.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Flexible, Transparent Pricing</h2>
            <p className="text-sm text-zinc-500">Upgrade to unlock advanced assets and signed direct downloads.</p>
          </div>
          {/* Currency Toggle */}
          <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800 self-center">
            <Button
              size="sm"
              variant={currency === "USD" ? "default" : "ghost"}
              className="text-xs h-8 px-4"
              onClick={() => setCurrency("USD")}
            >
              USD ($)
            </Button>
            <Button
              size="sm"
              variant={currency === "INR" ? "default" : "ghost"}
              className="text-xs h-8 px-4"
              onClick={() => setCurrency("INR")}
            >
              INR (₹)
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Standard Plan */}
          <Card className="border-zinc-200 dark:border-zinc-800 relative hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <CardHeader>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Standard tier</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">{pricing.standard.price}</span>
                <span className="ml-1 text-sm text-zinc-500 font-medium">{pricing.standard.period}</span>
              </div>
              <CardDescription className="mt-2">Core vault access for starting your faceless creation journey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Access Standard Hooks & CTAs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Access Standard Video Templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  50% Recurring Affiliate Program
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Standard Support Channels
                </li>
              </ul>
              <Button
                onClick={() => handleCheckout("standard")}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 font-semibold"
              >
                Choose Standard
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-blue-500 bg-white dark:bg-zinc-900 shadow-md relative hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              <Star className="h-3 w-3 fill-white" />
              Most Popular
            </div>
            <CardHeader>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Pro membership</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">{pricing.pro.price}</span>
                <span className="ml-1 text-sm text-zinc-500 font-medium">{pricing.pro.period}</span>
              </div>
              <CardDescription className="mt-2">Full access to advanced assets, signed URLs, and priority updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Everything in Standard
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Access Pro Hooks & CTAs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Access Pro Video Templates & PDFs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  Direct Download signed storage URLs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  1-on-1 Affiliate Strategy Consults
                </li>
              </ul>
              <Button
                onClick={() => handleCheckout("pro")}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20"
              >
                Choose Pro Access
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-zinc-500">Clear doubts regarding memberships, setup, and payouts.</p>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between font-semibold text-sm sm:text-base text-left hover:text-zinc-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-zinc-400" />
                    {faq.q}
                  </span>
                  <ArrowRight className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-90 text-blue-600" : ""}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 pl-6.5 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
