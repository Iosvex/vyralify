"use client";

import React, { useEffect, useState } from "react";
import { useUserProfile } from "./user-profile-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Star, ShieldAlert, Sparkles, LogOut, Lock } from "lucide-react";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";

export const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const { profile, loading } = useUserProfile();
  const router = useRouter();
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  useEffect(() => {
    // In development mode, check if we have a bypass query parameter
    const params = new URLSearchParams(window.location.search);
    if (process.env.NODE_ENV === "development" && params.get("bypass") === "member") {
      localStorage.setItem("member_bypass", "true");
    }

    const isBypassed = process.env.NODE_ENV === "development" && localStorage.getItem("member_bypass") === "true";
    if (isBypassed) return;

    // If not loading, and user is completely logged out, we redirect to landing page
    if (!loading && !profile) {
      router.push("/");
    }
  }, [profile, loading, router]);

  const isBypassed = typeof window !== "undefined" && process.env.NODE_ENV === "development" && localStorage.getItem("member_bypass") === "true";
  const hasAccess = isBypassed || (profile && (profile.role === "admin" || profile.subscriptionStatus === "active"));

  if (loading && !isBypassed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Loading your creator portal...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isBypassed && !profile) {
    return null; // Will redirect in useEffect
  }

  // Authenticated but does not have active subscription (not paid)
  if (!hasAccess) {
    const handleCheckout = async (plan: "standard" | "pro") => {
      // Simulate Stripe/Razorpay redirection
      const amt = currency === "USD" ? (plan === "standard" ? "$49" : "$99") : (plan === "standard" ? "₹499" : "₹999");
      const gateway = currency === "USD" ? "Stripe" : "Razorpay";
      alert(`Redirecting to ${gateway} checkout for ${plan.toUpperCase()} tier (${amt}/month)...`);
      
      // In production, this would call our Cloud Functions checkout session endpoint:
      // const response = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ plan, currency, email: profile.email }) });
      // const session = await response.json();
      // window.location.href = session.url;
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center bg-zinc-900 overflow-hidden font-sans text-white">
        {/* Background Decorative Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative w-full max-w-4xl mx-4 p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-pulse">
            <Lock className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent sm:text-4xl">
            Unlock Your Creator Portal
          </h2>
          <p className="mt-3 max-w-lg text-zinc-400 text-sm sm:text-base">
            Hey <span className="text-emerald-400 font-semibold">{profile?.displayName || profile?.email}</span>! Your account is set up, but you need an active membership to access the dashboard. Choose a plan to unlock your faceless IG empire.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-zinc-900 p-1 border border-zinc-800">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  currency === "USD" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-zinc-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  currency === "INR" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-zinc-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="mt-8 grid gap-6 w-full sm:grid-cols-2 max-w-3xl">
            {/* Standard Plan */}
            <div className="relative group rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700/80 transition-all p-6 text-left flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Standard Creator
                </h3>
                <p className="mt-2 text-xs text-zinc-400">Perfect for beginners launching their first page.</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-white">
                    {currency === "USD" ? "$49" : "₹499"}
                  </span>
                  <span className="ml-1 text-sm text-zinc-500">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Phase 1-3 Core Video Curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Standard Hook Vault & Audio Drops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>15% Commission Affiliate Rights</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleCheckout("standard")}
                className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
              >
                Get Started
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative group rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all p-6 text-left flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-bl-lg">
                Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Pro Growth Empire <Sparkles className="h-4 w-4 text-emerald-400" />
                </h3>
                <p className="mt-2 text-xs text-zinc-400">For scaling multiple pages & maximum monetization.</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-white">
                    {currency === "USD" ? "$99" : "₹999"}
                  </span>
                  <span className="ml-1 text-sm text-zinc-500">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>All Standard Vaults & Modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Pro-Only Advanced Scaling Guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Stripe/Beacons Checkout Templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>50% Lifetime Recurring Commission Rights</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleCheckout("pro")}
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-600/30"
              >
                Join Pro Empire
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex items-center gap-4 text-xs text-zinc-500">
            <button
              onClick={async () => {
                await logOut();
                router.push("/");
              }}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
