"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users as UsersIcon,
  Share2,
  DollarSign,
  ArrowUpRight,
  FolderOpen,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function AdminOverview() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const stats = {
    MRR: currency === "USD" ? "$12,450" : "₹1,033,350",
    MRRChange: "+18.2% from last month",
    subscribers: "428",
    subscribersChange: "310 Standard • 118 Pro",
    affiliates: "142",
    affiliatesChange: "28 new this week",
    payouts: currency === "USD" ? "$2,840" : "₹235,720",
    payoutsChange: "14 affiliates pending review",
  };

  const recentSignups = [
    { name: "John Doe", email: "john@example.com", tier: "Pro", date: "10 mins ago" },
    { name: "Sarah Connor", email: "sarah@sky.net", tier: "Standard", date: "1 hour ago" },
    { name: "Bruce Wayne", email: "bruce@wayne.corp", tier: "Pro", date: "3 hours ago" },
    { name: "Clark Kent", email: "clark@dailyplanet.com", tier: "Standard", date: "5 hours ago" },
  ];

  const recentReferrals = [
    { referrer: "Ashwin (Product)", referred: "Tony Stark", commission: currency === "USD" ? "$24.50" : "₹2,033", date: "20 mins ago" },
    { referrer: "Jane Doe", referred: "Peter Parker", commission: currency === "USD" ? "$14.50" : "₹1,203", date: "2 hours ago" },
    { referrer: "Gwen Stacy", referred: "Miles Morales", commission: currency === "USD" ? "$24.50" : "₹2,033", date: "4 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time platform metrics and administrative insights.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800 self-start">
          <Button
            size="sm"
            variant={currency === "USD" ? "default" : "ghost"}
            className="text-xs h-8"
            onClick={() => setCurrency("USD")}
          >
            USD ($)
          </Button>
          <Button
            size="sm"
            variant={currency === "INR" ? "default" : "ghost"}
            className="text-xs h-8"
            onClick={() => setCurrency("INR")}
          >
            INR (₹)
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Monthly Recurring Revenue
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.MRR}</div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                {stats.MRRChange}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Active Subscribers
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <UsersIcon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.subscribers}</div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {stats.subscribersChange}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Total Affiliates
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                <Share2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.affiliates}</div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {stats.affiliatesChange}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Pending Payouts
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{stats.payouts}</div>
              <p className="mt-1 text-xs text-rose-500 dark:text-rose-400 font-medium">
                {stats.payoutsChange}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* SVG Interactive Chart Block */}
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Revenue & growth trajectory</CardTitle>
          <CardDescription>Visual stats comparing the last 6 months of subscriptions.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex flex-col justify-end">
          <div className="flex-1 w-full flex items-end justify-between gap-2 h-44 pb-2">
            {[45, 60, 52, 75, 90, 120].map((val, idx) => {
              const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 130) * 100}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="w-full max-w-[48px] bg-emerald-600 dark:bg-emerald-500 rounded-t-sm hover:opacity-90 transition-opacity cursor-pointer relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                      {currency === "USD" ? `$${val * 100}` : `₹${val * 8300}`}
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-zinc-500 font-medium">{months[idx]}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs & Quick Links */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Signups */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Member Signups</CardTitle>
              <CardDescription>List of new accounts created recently.</CardDescription>
            </div>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentSignups.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      user.tier === "Pro"
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400"
                        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}>
                      {user.tier}
                    </span>
                    <span className="text-xs text-zinc-400">{user.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Referral Signups</CardTitle>
              <CardDescription>Track affiliate referrals as they convert.</CardDescription>
            </div>
            <Link href="/admin/affiliates">
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentReferrals.map((ref, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">{ref.referred}</span>
                      <span className="text-xs text-zinc-400">by {ref.referrer}</span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Commission: {ref.commission}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{ref.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Administrative Shortcuts</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Link href="/admin/content" className="block">
            <Button variant="outline" className="w-full h-20 flex flex-col justify-center items-center gap-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <FolderOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold">Upload Content</span>
            </Button>
          </Link>
          <Link href="/admin/users" className="block">
            <Button variant="outline" className="w-full h-20 flex flex-col justify-center items-center gap-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <UsersIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold">Manage Users</span>
            </Button>
          </Link>
          <Link href="/admin/affiliates" className="block">
            <Button variant="outline" className="w-full h-20 flex flex-col justify-center items-center gap-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold">Affiliates Summary</span>
            </Button>
          </Link>
          <Link href="/admin/payouts" className="block">
            <Button variant="outline" className="w-full h-20 flex flex-col justify-center items-center gap-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold">Approve Payouts</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
