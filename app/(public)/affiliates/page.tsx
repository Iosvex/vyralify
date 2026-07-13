"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useUserProfile } from "@/components/user-profile-provider";
import {
  TrendingUp,
  Percent,
  Calendar,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function AffiliatesMarketingPage() {
  const { profile } = useUserProfile();
  const [referralsCount, setReferralsCount] = useState<number>(25);
  const [planType, setPlanType] = useState<"standard" | "pro">("standard");

  const planPrice = planType === "pro" ? 99 : 49;
  const monthlyCommission = referralsCount * (planPrice * 0.5);
  const yearlyCommission = monthlyCommission * 12;

  const handleJoin = async () => {
    if (!profile) {
      const confirmAuth = window.confirm("Please sign in with Google to generate your affiliate code.");
      if (confirmAuth) {
        try {
          await signInWithGoogle();
        } catch (err) {
          console.error("Sign in failed:", err);
        }
      }
      return;
    }
    // Redirect to dashboard where affiliate details are listed
    window.location.href = profile.role === "admin" ? "/admin" : "/dashboard";
  };

  const topEarners = [
    { rank: 1, name: "David M.", earnings: "$4,280/mo", referrals: "172 active", code: "DAVID50" },
    { rank: 2, name: "Ashwin P.", earnings: "$2,990/mo", referrals: "122 active", code: "ASHWIN50" },
    { rank: 3, name: "Gwen S.", earnings: "$1,840/mo", referrals: "75 active", code: "GWEN50" },
  ];

  return (
    <div className="space-y-24 py-16">
      {/* Hero Marketing */}
      <section className="mx-auto max-w-4xl px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        >
          <Percent className="h-3.5 w-3.5" />
          50% Lifetime Recurring Affiliate Program
        </motion.div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
          Share Vyralify.<br />
          <span className="text-blue-600 dark:text-blue-500">Earn lifetime passive income.</span>
        </h1>

        <p className="mx-auto max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
          Promote the leading faceless Instagram SaaS. Receive 50% recurring commissions every month for as long as your referrals stay subscribed.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-12 flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            {profile ? "Go to your dashboard" : "Generate Affiliate Link"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Commission Calculator */}
      <section className="mx-auto max-w-4xl px-6">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Affiliate Earnings Calculator</CardTitle>
            <CardDescription>Estimate your recurring monthly and yearly commission revenue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Plan selection */}
            <div className="flex justify-center gap-3">
              <Button
                variant={planType === "standard" ? "default" : "outline"}
                onClick={() => setPlanType("standard")}
                className="text-xs h-9 px-4 font-semibold border-zinc-200"
              >
                Standard Referrals ($49/mo)
              </Button>
              <Button
                variant={planType === "pro" ? "default" : "outline"}
                onClick={() => setPlanType("pro")}
                className="text-xs h-9 px-4 font-semibold border-zinc-200"
              >
                Pro Referrals ($99/mo)
              </Button>
            </div>

            {/* Slider */}
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex justify-between text-sm font-semibold">
                <span>Active Referred Members:</span>
                <span className="text-blue-600 font-bold">{referralsCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={referralsCount}
                onChange={(e) => setReferralsCount(Number(e.target.value))}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 accent-blue-600 focus:outline-hidden"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>1 member</span>
                <span>250 members</span>
                <span>500 members</span>
              </div>
            </div>

            {/* Outcome */}
            <div className="grid gap-4 md:grid-cols-2 max-w-xl mx-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <div className="p-4 bg-zinc-50 rounded-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-semibold text-zinc-500">Monthly Payouts</span>
                <p className="text-3xl font-extrabold text-zinc-950 dark:text-white mt-1">
                  ${monthlyCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-xl dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Yearly Total</span>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  ${yearlyCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How it Works Flowchart */}
      <section className="mx-auto max-w-5xl px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Four Simple Steps to Cash Flow</h2>
          <p className="text-sm text-zinc-500">From code generation to recurring bank account payouts.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 text-center">
          <div className="space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 text-sm font-bold">
              1
            </div>
            <h4 className="font-semibold text-sm">Join the Program</h4>
            <p className="text-xs text-zinc-500">Create an account and instantly generate your unique referral link.</p>
          </div>

          <div className="space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 text-sm font-bold">
              2
            </div>
            <h4 className="font-semibold text-sm">Share & Promote</h4>
            <p className="text-xs text-zinc-500">Post your affiliate link on social media, blogs, or newsletters.</p>
          </div>

          <div className="space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 text-sm font-bold">
              3
            </div>
            <h4 className="font-semibold text-sm">Converts & Logs</h4>
            <p className="text-xs text-zinc-500">Referred sign-ups are tracked automatically in our Firestore ledger.</p>
          </div>

          <div className="space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 text-sm font-bold">
              4
            </div>
            <h4 className="font-semibold text-sm">Get Paid Monthly</h4>
            <p className="text-xs text-zinc-500">Payouts are sent to your Stripe Connect account on the 1st of every month.</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Mockup */}
      <section className="mx-auto max-w-4xl px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Top Earning Affiliates</h2>
          <p className="text-sm text-zinc-500">Real performance statistics of our top referring accounts.</p>
        </div>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {topEarners.map((earner) => (
                <div key={earner.rank} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/50 dark:text-blue-400">
                      {earner.rank}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">{earner.name}</span>
                      <span className="text-xs text-zinc-400 block">Code: {earner.code}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">
                      {earner.earnings}
                    </div>
                    <span className="text-xs text-zinc-400 block">{earner.referrals}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
