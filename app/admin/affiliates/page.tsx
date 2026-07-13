"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  Award,
  DollarSign,
  Loader2,
  Database,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface ReferralRecord {
  id: string;
  referrerUid: string;
  referrerName: string;
  referrerCode: string;
  referredUid: string;
  referredName: string;
  referredEmail: string;
  status: "pending" | "active" | "churned";
  commissionRate: number;
  startDate: any;
}

interface LeaderboardRecord {
  uid: string;
  name: string;
  email: string;
  code: string;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: string;
}

export default function AffiliatesManager() {
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchAffiliateData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch referrals
      const refSnapshot = await getDocs(collection(db, "referrals"));
      const userSnapshot = await getDocs(collection(db, "users"));

      // Create a lookup map for user names and codes
      const userMap: Record<string, { name: string; email: string; code: string }> = {};
      userSnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        userMap[docSnap.id] = {
          name: d.displayName || "No Name",
          email: d.email || "",
          code: d.affiliateCode || "",
        };
      });

      const fetchedReferrals: ReferralRecord[] = [];
      refSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const referrer = userMap[data.referrerUid] || { name: "Unknown", email: "", code: "N/A" };
        const referred = userMap[data.referredUid] || { name: "Unknown User", email: "unknown@example.com", code: "" };
        
        fetchedReferrals.push({
          id: docSnap.id,
          referrerUid: data.referrerUid,
          referrerName: referrer.name,
          referrerCode: data.referrerCode || referrer.code,
          referredUid: data.referredUid,
          referredName: referred.name,
          referredEmail: referred.email,
          status: data.status || "pending",
          commissionRate: data.commissionRate || 0.50,
          startDate: data.startDate,
        });
      });

      // Calculate leaderboard stats
      const leaderboardMap: Record<string, LeaderboardRecord> = {};
      
      // Seed leaderboard from all users who are affiliates or admins or have referred someone
      userSnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.role === "affiliate" || d.role === "admin" || d.affiliateCode) {
          leaderboardMap[docSnap.id] = {
            uid: docSnap.id,
            name: d.displayName || "No Name",
            email: d.email || "",
            code: d.affiliateCode || "CODE",
            totalReferrals: 0,
            activeReferrals: 0,
            conversionRate: "0%",
          };
        }
      });

      fetchedReferrals.forEach((ref) => {
        const r = leaderboardMap[ref.referrerUid];
        if (r) {
          r.totalReferrals += 1;
          if (ref.status === "active") {
            r.activeReferrals += 1;
          }
        }
      });

      // Sort and calculate rates
      const leaderboardData = Object.values(leaderboardMap)
        .map((entry) => {
          const rateNum = entry.totalReferrals > 0 ? (entry.activeReferrals / entry.totalReferrals) * 100 : 0;
          return {
            ...entry,
            conversionRate: `${Math.round(rateNum)}%`,
          };
        })
        .filter((entry) => entry.totalReferrals > 0)
        .sort((a, b) => b.activeReferrals - a.activeReferrals);

      setReferrals(fetchedReferrals);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching affiliate data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAffiliateData();
  }, [fetchAffiliateData]);

  // Seed mock referrals database
  const seedMockReferrals = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(db);

      // Create referrals links between mock users
      const mockRefs = [
        {
          referrerUid: "mock_user_1", // Ashwin
          referredUid: "mock_user_2", // Sarah
          status: "active",
          commissionRate: 0.50,
        },
        {
          referrerUid: "mock_user_3", // David
          referredUid: "mock_user_4", // Rebecca
          status: "active",
          commissionRate: 0.50,
        },
        {
          referrerUid: "mock_user_3", // David
          referredUid: "mock_user_5", // Michael (canceled)
          status: "churned",
          commissionRate: 0.50,
        },
      ];

      mockRefs.forEach((item, idx) => {
        const docRef = doc(db, "referrals", `mock_ref_${idx + 1}`);
        batch.set(docRef, {
          ...item,
          startDate: serverTimestamp(),
        });
      });

      await batch.commit();
      await fetchAffiliateData();
    } catch (error) {
      console.error("Error seeding referrals:", error);
      alert("Failed to seed mock referrals. Make sure you seeded users first on the Users page.");
    } finally {
      setLoading(false);
    }
  };

  const filteredReferrals = referrals.filter((ref) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      ref.referrerName.toLowerCase().includes(search) ||
      ref.referrerCode.toLowerCase().includes(search) ||
      ref.referredName.toLowerCase().includes(search);

    const matchesStatus = statusFilter === "all" || ref.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Affiliate Hub Overview</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Monitor the 50% lifetime recurring referral system and high-performing affiliates.
          </p>
        </div>
        {referrals.length === 0 && !loading && (
          <Button
            onClick={seedMockReferrals}
            variant="outline"
            className="flex items-center gap-2 border-zinc-200 hover:bg-zinc-50 text-xs shrink-0 self-start"
          >
            <Database className="h-4 w-4 text-blue-600" />
            Seed Mock Referrals
          </Button>
        )}
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Referred Subscriptions
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.filter(r => r.status === "active").length}</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {referrals.length} referrals total registered
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Affiliate Commission Rate
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Lifetime recurring payouts
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Affiliate Share (MRR)
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Roughly count referred active standard($49/mo) and pro($99/mo) * 0.50 */}
              ${referrals.filter(r => r.status === "active").length * 24.5} / mo
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Payout liabilities generated
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Top Referrer Active
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <Award className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">
              {leaderboard[0] ? leaderboard[0].name.split(" ")[0] : "N/A"}
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Code: {leaderboard[0] ? leaderboard[0].code : "None"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Leaderboard panel */}
        <Card className="lg:col-span-1 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Affiliate Leaderboard</CardTitle>
            <CardDescription>Top referrers based on active conversions.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <p className="text-xs text-zinc-500">Calculating rank tables...</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-400">
                No active affiliates yet.
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {leaderboard.map((rank, idx) => (
                  <div key={rank.uid} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold dark:bg-blue-950/50 dark:text-blue-400">
                        {idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white">{rank.name}</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Code: {rank.code}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">
                        {rank.activeReferrals} Active
                      </div>
                      <div className="text-[9px] text-zinc-400">{rank.totalReferrals} total ({rank.conversionRate} conv)</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Referrals Logs */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
            <div>
              <CardTitle>Referral Log Book</CardTitle>
              <CardDescription>Track accounts created using referral link codes.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search code/user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 rounded-lg border border-zinc-200 pl-9 pr-3 py-1.5 text-xs bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Status Filters */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden"
              >
                <option value="all">All States</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="churned">Churned</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-zinc-500">Retrieving referrals database...</p>
              </div>
            ) : filteredReferrals.length === 0 ? (
              <div className="text-center py-20">
                <Users className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-zinc-500">No referral logs found</p>
                <p className="text-xs text-zinc-400 mt-1">Simulate referrals via mock seeding.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                      <th className="px-6 py-3">Affiliate Referrer</th>
                      <th className="px-6 py-3">Referred User</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Comm. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                    {filteredReferrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-900 dark:text-white">{ref.referrerName}</span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">Code: {ref.referrerCode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-900 dark:text-white">{ref.referredName}</span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">{ref.referredEmail}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            ref.status === "active"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : ref.status === "pending"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                          }`}>
                            {ref.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold text-zinc-600 dark:text-zinc-300">
                          {(ref.commissionRate * 100).toFixed(0)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
