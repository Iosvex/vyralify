"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Check, 
  Star, 
  Sparkles, 
  HelpCircle, 
  Film, 
  ArrowRight, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  Users2, 
  ChevronRight, 
  ShieldCheck, 
  Video,
  Award
} from "lucide-react";
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

    const price = currency === "USD" ? (plan === "standard" ? "$49" : "$99") : (plan === "standard" ? "₹499" : "₹999");
    const gateway = currency === "USD" ? "Stripe" : "Razorpay";
    alert(`Initializing ${plan.toUpperCase()} checkout simulator via ${gateway} for ${price}/month...`);
  };

  const pricing = {
    standard: currency === "USD" ? { price: "$49", period: "/mo" } : { price: "₹499", period: "/mo" },
    pro: currency === "USD" ? { price: "$99", period: "/mo" } : { price: "₹999", period: "/mo" },
  };

  const faqs = [
    {
      q: "What is a faceless Instagram page?",
      a: "A faceless page is an Instagram account centered on a specific theme (like finance, peak performance, or travel aesthetic) where you don't show your face. We provide all the reels, caption scripts, and b-roll footage to help you post anonymously."
    },
    {
      q: "Do I need prior video editing experience?",
      a: "No editing experience is needed. We offer direct-access Canva and CapCut templates so you can import, drag, drop your text, and publish viral reels in less than 5 minutes."
    },
    {
      q: "How does the 50% Lifetime Recurring Affiliate Program work?",
      a: "Every member gets a custom affiliate referral link. When another creator joins Vyralify via your link, you get a 50% commission of their monthly subscription fee for as long as they stay active. Refer 2 members and your own subscription is completely free!"
    },
    {
      q: "What is the difference between Standard and Pro?",
      a: "Standard unlocks the core video curriculum and basic hooks library. Pro unlocks advanced scaling guides, direct-download signed URLs for cinematic lifestyle packs, Stripe checkout templates, and custom 1-on-1 affiliate strategy consulting."
    },
    {
      q: "Do you help set up the digital store?",
      a: "Yes! In Phase 4 (Monetisation Module), we give you detailed checklists and video walkthroughs to set up your Beacons or Payhip digital storefront and connect your payment gateways."
    },
    {
      q: "Can I get my page audited?",
      a: "Pro creators can submit their Instagram handle directly in the dashboard and get a custom Loom video audit detailing improvements to their layout, copy, and growth strategy."
    },
    {
      q: "What currencies are supported?",
      a: "We support INR payments via Razorpay (UPI, Netbanking, local cards) and global USD payments via Stripe (international credit cards)."
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Absolutely. You can manage or cancel your subscription at any time with a single click inside your Account Settings page."
    }
  ];

  return (
    <div className="space-y-32 py-16 bg-white text-zinc-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-5xl px-6 text-center space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The Full Business-in-a-Box for Creators
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          Build your faceless <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Instagram empire.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-base sm:text-xl text-zinc-500 leading-relaxed"
        >
          Access the ultimate repository of scroll-stopping video hooks, high-converting call-to-actions, ready-to-publish assets, and a Dropbox-style 50% recurring affiliate setup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 pt-4"
        >
          <a href="#pricing">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-12 shadow-lg shadow-blue-500/10">
              Start Free Trial <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </a>
          <Link href="/affiliates">
            <Button variant="outline" className="border-zinc-200 hover:bg-zinc-50 font-semibold px-8 h-12">
              Affiliate Program
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 2. HOW IT WORKS (3-STEP GUIDE) */}
      <section className="mx-auto max-w-5xl px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Roadmap</span>
          <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "01", title: "Join & Pick Niche", desc: "Unlock the portal, run our interactive Niche Selection Quiz, and configure your initial faceless profile layout." },
            { step: "02", title: "Access the Vault", desc: "Download high-definition B-Roll reels, CapCut filters, scroll-stopping hooks, and pre-written DM scripts." },
            { step: "03", title: "Scale & Monetize", desc: "Deploy your store, track your 50% lifetime recurring commissions, and grow your creator empire." },
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-4">
              <span className="text-4xl font-black text-blue-600/20 block">{item.step}</span>
              <h4 className="text-lg font-bold text-zinc-900">{item.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Premium Vault</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm sm:text-base">Explore the 5 core phases of the Vyralify curriculum built to scale your audience.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Phase 1 */}
          <Card className="border-zinc-100 hover:shadow-xl hover:border-zinc-200 transition-all duration-300 bg-zinc-50/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Phase 1: Foundation</h3>
              <p className="text-xs text-zinc-500">Pick your niche with our checklist/quiz, set up your faceless IG aesthetics, and read platform rules.</p>
            </CardContent>
          </Card>

          {/* Phase 2 */}
          <Card className="border-zinc-100 hover:shadow-xl hover:border-zinc-200 transition-all duration-300 bg-zinc-50/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Film className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Phase 2: Posting & Content</h3>
              <p className="text-xs text-zinc-500">Access CapCut/Canva templates, high-retention hooks databases, and trending audio playlists.</p>
            </CardContent>
          </Card>

          {/* Phase 3 */}
          <Card className="border-zinc-100 hover:shadow-xl hover:border-zinc-200 transition-all duration-300 bg-zinc-50/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Phase 3: Scaling & Growth</h3>
              <p className="text-xs text-zinc-500">Audit your algorithm ranking triggers, customize posting calendars, and follow real growth case studies.</p>
            </CardContent>
          </Card>

          {/* Phase 4 */}
          <Card className="border-zinc-100 hover:shadow-xl hover:border-zinc-200 transition-all duration-300 bg-zinc-50/50 lg:col-span-2">
            <CardContent className="pt-6 space-y-4 flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Phase 4: Monetisation & Sales</h3>
                <p className="text-xs text-zinc-500 mt-1">Configure your digital store on Beacons or Payhip. Deploy our psychological sales scripts and copy-paste DM templates to convert followers into passive income sales.</p>
              </div>
            </CardContent>
          </Card>

          {/* Phase 5 */}
          <Card className="border-zinc-100 hover:shadow-xl hover:border-zinc-200 transition-all duration-300 bg-zinc-50/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <Users2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Phase 5: Private Community</h3>
              <p className="text-xs text-zinc-500">Connect with other creators in general lounges, share wins, and submit page URLs for Loom video audits.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. PRICING MATRIX */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 space-y-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Pricing Plans</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">Flexible, Transparent Plans</h2>
            <p className="text-sm text-zinc-500 mt-1">Select a tier below. Switch pricing depending on your region.</p>
          </div>
          {/* Currency Toggle */}
          <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800 self-center border border-zinc-200">
            <Button
              size="sm"
              variant={currency === "USD" ? "default" : "ghost"}
              className={`text-xs h-8 px-4 rounded-full transition-all ${currency === "USD" ? "bg-blue-600 text-white" : "text-zinc-500"}`}
              onClick={() => setCurrency("USD")}
            >
              USD ($)
            </Button>
            <Button
              size="sm"
              variant={currency === "INR" ? "default" : "ghost"}
              className={`text-xs h-8 px-4 rounded-full transition-all ${currency === "INR" ? "bg-blue-600 text-white" : "text-zinc-500"}`}
              onClick={() => setCurrency("INR")}
            >
              INR (₹)
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Standard Plan */}
          <Card className="border-zinc-200 relative hover:border-zinc-300 transition-colors flex flex-col justify-between p-6">
            <div>
              <CardHeader className="p-0">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Standard tier</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{pricing.standard.price}</span>
                  <span className="ml-1 text-sm text-zinc-400 font-medium">{pricing.standard.period}</span>
                </div>
                <CardDescription className="mt-2 text-xs">Core vault access for starting your faceless creation journey.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6">
                <ul className="space-y-3 text-xs text-zinc-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Access Standard Hooks & CTAs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Access Standard Video Templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>15% Commission Referral Rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Standard Community Access</span>
                  </li>
                </ul>
              </CardContent>
            </div>
            <Button
              onClick={() => handleCheckout("standard")}
              className="w-full bg-zinc-950 text-white hover:bg-zinc-800 font-semibold mt-8 h-11"
            >
              Choose Standard
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="border-blue-500 bg-white shadow-xl relative hover:shadow-2xl transition-all flex flex-col justify-between p-6 overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-bl-lg">
              Popular
            </div>
            <div>
              <CardHeader className="p-0">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pro membership</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{pricing.pro.price}</span>
                  <span className="ml-1 text-sm text-zinc-400 font-medium">{pricing.pro.period}</span>
                </div>
                <CardDescription className="mt-2 text-xs">Full access to advanced assets, signed URLs, and priority updates.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6">
                <ul className="space-y-3 text-xs text-zinc-600">
                  <li className="flex items-center gap-2 font-medium text-zinc-900">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Everything in Standard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Access Pro Hooks & CapCut Libraries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Direct Download signed storage URLs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>50% Lifetime Recurring Referral Rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>1-on-1 Loom Video Profile Audits</span>
                  </li>
                </ul>
              </CardContent>
            </div>
            <Button
              onClick={() => handleCheckout("pro")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-8 h-11 shadow-lg shadow-blue-500/20"
            >
              Choose Pro Access
            </Button>
          </Card>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="mx-auto max-w-4xl px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Got Questions?</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-zinc-500">Answering your major queries regarding our platform, support, and affiliate setup.</p>
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between font-semibold text-sm sm:text-base text-left hover:text-blue-600 transition-colors"
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
                    className="mt-3 text-xs sm:text-sm text-zinc-500 pl-6.5 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CTA BOTTOM SECTION */}
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-3xl bg-blue-600 text-white p-12 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[50px]" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Unlock your faceless empire today.</h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-md mx-auto">Join hundreds of creators who are scaling and monetizing anonymous Instagram channels.</p>
          <div className="pt-4 flex justify-center">
            <a href="#pricing">
              <Button className="bg-white text-blue-600 hover:bg-zinc-100 font-bold px-8 h-12">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
