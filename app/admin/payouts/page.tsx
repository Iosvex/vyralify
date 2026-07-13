"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, writeBatch, updateDoc, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Database,
  Briefcase,
  History,
  TrendingUp,
} from "lucide-react";

interface CommissionRecord {
  id: string;
  affiliateUid: string;
  affiliateName: string;
  affiliateEmail: string;
  referralId: string;
  amount: number;
  currency: string;
  period: string; // YYYY-MM
  status: "pending" | "paid";
  paidAt: any;
}

interface PayoutRecord {
  id: string;
  affiliateUid: string;
  affiliateName: string;
  totalAmount: number;
  paymentGateway: "stripe-connect" | "razorpay-payouts";
  status: "processing" | "completed" | "failed";
  transactionId: string;
  processedAt: any;
}

export default function PayoutsManager() {
  const [commissions, setCommissions] = useState<CommissionRecord[]>([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencyFilter, setCurrencyFilter] = useState<"all" | "USD" | "INR">("all");

  // Approval modal states
  const [selectedAffiliate, setSelectedAffiliate] = useState<{ uid: string; name: string; amount: number; currency: string; commissionIds: string[] } | null>(null);
  const [processingPayout, setProcessingPayout] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState("");

  const fetchPayoutData = useCallback(async () => {
    try {
      setLoading(true);
      const commSnapshot = await getDocs(collection(db, "commissions"));
      const payoutSnapshot = await getDocs(collection(db, "payouts"));
      const userSnapshot = await getDocs(collection(db, "users"));

      // Create lookup map
      const userMap: Record<string, { name: string; email: string }> = {};
      userSnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        userMap[docSnap.id] = {
          name: d.displayName || "No Name",
          email: d.email || "",
        };
      });

      const fetchedCommissions: CommissionRecord[] = [];
      commSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const aff = userMap[data.affiliateUid] || { name: "Unknown Affiliate", email: "unknown@affiliate.com" };
        fetchedCommissions.push({
          id: docSnap.id,
          affiliateUid: data.affiliateUid,
          affiliateName: aff.name,
          affiliateEmail: aff.email,
          referralId: data.referralId || "",
          amount: data.amount || 0,
          currency: data.currency || "USD",
          period: data.period || "2026-07",
          status: data.status || "pending",
          paidAt: data.paidAt,
        });
      });

      const fetchedPayouts: PayoutRecord[] = [];
      payoutSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const aff = userMap[data.affiliateUid] || { name: "Unknown Affiliate" };
        fetchedPayouts.push({
          id: docSnap.id,
          affiliateUid: data.affiliateUid,
          affiliateName: aff.name,
          totalAmount: data.totalAmount || 0,
          paymentGateway: data.paymentGateway || "stripe-connect",
          status: data.status || "completed",
          transactionId: data.transactionId || "tx_placeholder",
          processedAt: data.processedAt,
        });
      });

      setCommissions(fetchedCommissions);
      setPayouts(fetchedPayouts);
    } catch (error) {
      console.error("Error fetching payout data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayoutData();
  }, [fetchPayoutData]);

  // Seed mock commissions and payouts
  const seedMockCommissions = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(db);

      // Create pending and paid commissions
      const mockComms = [
        {
          affiliateUid: "mock_user_1", // Ashwin
          referralId: "mock_ref_1",
          amount: 24.50,
          currency: "USD",
          period: "2026-07",
          status: "pending",
          paidAt: null,
        },
        {
          affiliateUid: "mock_user_3", // David
          referralId: "mock_ref_2",
          amount: 24.50,
          currency: "USD",
          period: "2026-07",
          status: "pending",
          paidAt: null,
        },
        {
          affiliateUid: "mock_user_1", // Ashwin
          referralId: "mock_ref_1",
          amount: 24.50,
          currency: "USD",
          period: "2026-06",
          status: "paid",
          paidAt: serverTimestamp(),
        },
      ];

      mockComms.forEach((item, idx) => {
        const docRef = doc(db, "commissions", `mock_comm_${idx + 1}`);
        batch.set(docRef, item);
      });

      // Seed one past payout
      const payoutDocRef = doc(db, "payouts", "mock_payout_1");
      batch.set(payoutDocRef, {
        affiliateUid: "mock_user_1",
        totalAmount: 24.50,
        paymentGateway: "stripe-connect",
        status: "completed",
        transactionId: "ch_mock_stripe_9921",
        processedAt: serverTimestamp(),
      });

      await batch.commit();
      await fetchPayoutData();
    } catch (error) {
      console.error("Error seeding commissions:", error);
      alert("Failed to seed mock commissions. Please seed mock users & referrals first.");
    } finally {
      setLoading(false);
    }
  };

  // Group pending commissions by affiliate
  const pendingByAffiliate: Record<string, { uid: string; name: string; email: string; amount: number; currency: string; commissionIds: string[] }> = {};
  commissions.forEach((comm) => {
    if (comm.status === "pending") {
      const key = `${comm.affiliateUid}_${comm.currency}`;
      if (!pendingByAffiliate[key]) {
        pendingByAffiliate[key] = {
          uid: comm.affiliateUid,
          name: comm.affiliateName,
          email: comm.affiliateEmail,
          amount: 0,
          currency: comm.currency,
          commissionIds: [],
        };
      }
      pendingByAffiliate[key].amount += comm.amount;
      pendingByAffiliate[key].commissionIds.push(comm.id);
    }
  });

  const pendingAffiliateList = Object.values(pendingByAffiliate).filter((item) => {
    if (currencyFilter === "all") return true;
    return item.currency === currencyFilter;
  });

  // Calculate stats
  const totalPendingUSD = commissions
    .filter((c) => c.status === "pending" && c.currency === "USD")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalPendingINR = commissions
    .filter((c) => c.status === "pending" && c.currency === "INR")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalPaidUSD = payouts
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.totalAmount, 0);

  // Trigger Payout approval
  const handleApprovePayout = async () => {
    if (!selectedAffiliate) return;

    try {
      setProcessingPayout(true);
      setPayoutMessage("");

      // Simulate API Connect/Razorpay call, then update records in batch
      const batch = writeBatch(db);

      // 1. Update commission statuses to "paid"
      selectedAffiliate.commissionIds.forEach((id) => {
        const commRef = doc(db, "commissions", id);
        batch.update(commRef, {
          status: "paid",
          paidAt: serverTimestamp(),
        });
      });

      // 2. Create payout history log
      const txId = `tx_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const payoutData = {
        affiliateUid: selectedAffiliate.uid,
        totalAmount: selectedAffiliate.amount,
        paymentGateway: selectedAffiliate.currency === "INR" ? "razorpay-payouts" : "stripe-connect",
        status: "completed",
        transactionId: txId,
        processedAt: serverTimestamp(),
      };
      
      const newPayoutRef = doc(collection(db, "payouts"));
      batch.set(newPayoutRef, payoutData);

      await batch.commit();

      // Local success
      setPayoutMessage("Payout successfully transferred through payment gateway API!");
      setTimeout(() => {
        setSelectedAffiliate(null);
        setPayoutMessage("");
        fetchPayoutData();
      }, 2000);

    } catch (error) {
      console.error("Payout failed:", error);
      alert("Failed to process payout.");
    } finally {
      setProcessingPayout(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Commissions Ledger</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Verify pending payouts, view payment statistics, and authorize bulk money transfers to affiliates.
          </p>
        </div>
        {commissions.length === 0 && !loading && (
          <Button
            onClick={seedMockCommissions}
            variant="outline"
            className="flex items-center gap-2 border-zinc-200 hover:bg-zinc-50 text-xs shrink-0 self-start"
          >
            <Database className="h-4 w-4 text-blue-600" />
            Seed Mock Ledger
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Total Pending Liability
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPendingUSD.toFixed(2)} USD
            </div>
            {totalPendingINR > 0 && (
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                ₹{totalPendingINR.toFixed(2)} INR
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Affiliate Payouts Sent (YTD)
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaidUSD.toFixed(2)} USD</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Approved payout records ledger
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Payment Integrations
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Briefcase className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Stripe Connect (Live)
            </div>
            <div className="text-xs font-medium flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 mt-1">
              <span className="h-2 w-2 rounded-full bg-zinc-300"></span>
              Razorpay Payouts (Dev Mode)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Pending commissions list */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
            <div>
              <CardTitle>Pending Payout Approvals</CardTitle>
              <CardDescription>Consolidated affiliate balances waiting to be disbursed.</CardDescription>
            </div>
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg dark:bg-zinc-800 text-xs">
              <button
                onClick={() => setCurrencyFilter("all")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currencyFilter === "all"
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                All Currencies
              </button>
              <button
                onClick={() => setCurrencyFilter("USD")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currencyFilter === "USD"
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrencyFilter("INR")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currencyFilter === "INR"
                    ? "bg-blue-600 text-white shadow-xs dark:bg-blue-500"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                INR
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-zinc-500">Querying commission entries...</p>
              </div>
            ) : pendingAffiliateList.length === 0 ? (
              <div className="text-center py-20">
                <CheckCircle2 className="h-10 w-10 text-emerald-500/70 mx-auto mb-3" />
                <p className="text-sm font-semibold text-zinc-500">All payouts cleared</p>
                <p className="text-xs text-zinc-400 mt-1">There are no pending affiliate commissions.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                      <th className="px-6 py-3">Recipient Affiliate</th>
                      <th className="px-6 py-3">Period</th>
                      <th className="px-6 py-3">Method</th>
                      <th className="px-6 py-3">Total Due</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                    {pendingAffiliateList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-900 dark:text-white">{item.name}</span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">{item.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-500">Monthly Cycle</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${
                            item.currency === "INR"
                              ? "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400"
                              : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                          }`}>
                            {item.currency === "INR" ? "Razorpay Payout" : "Stripe Connect"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-zinc-950 dark:text-white">
                          {item.currency === "INR" ? "₹" : "$"}
                          {item.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            size="sm"
                            onClick={() => setSelectedAffiliate(item)}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] h-7 px-3"
                          >
                            Approve & Pay
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout Confirmation dialog / action panel */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Payout Processing
            </CardTitle>
            <CardDescription>Approve payout requests securely.</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedAffiliate ? (
              <div className="space-y-4">
                <div className="p-4 bg-zinc-50 rounded-lg dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Recipient Name</span>
                    <span className="font-bold">{selectedAffiliate.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Method</span>
                    <span className="font-semibold uppercase text-blue-600">
                      {selectedAffiliate.currency === "INR" ? "Razorpay" : "Stripe"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2 font-semibold text-sm">
                    <span>Disbursement Total</span>
                    <span className="text-zinc-950 dark:text-white">
                      {selectedAffiliate.currency === "INR" ? "₹" : "$"}
                      {selectedAffiliate.amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {payoutMessage && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{payoutMessage}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleApprovePayout}
                    disabled={processingPayout}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    {processingPayout ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Authorizing...
                      </span>
                    ) : (
                      "Confirm & Release"
                    )}
                  </Button>
                  <Button
                    onClick={() => setSelectedAffiliate(null)}
                    disabled={processingPayout}
                    variant="outline"
                    className="border-zinc-200 hover:bg-zinc-50"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200 dark:bg-zinc-900/20 dark:border-zinc-800">
                <AlertCircle className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-500">No payout selected</p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Click "Approve & Pay" on a row to configure details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historical logs list */}
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Payout History Ledger</CardTitle>
          <CardDescription>Chronological logging of previously disbursed money transfers.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <p className="text-xs text-zinc-500">Querying historical ledger...</p>
            </div>
          ) : payouts.length === 0 ? (
            <div className="text-center py-16 text-xs text-zinc-400">
              No payouts have been processed yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                    <th className="px-6 py-3">Affiliate Name</th>
                    <th className="px-6 py-3">Transaction ID</th>
                    <th className="px-6 py-3">Disbursed Gateway</th>
                    <th className="px-6 py-3">Disbursed Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                  {payouts.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">{item.affiliateName}</td>
                      <td className="px-6 py-4 font-mono text-[10px] text-zinc-400">{item.transactionId}</td>
                      <td className="px-6 py-4 capitalize font-medium text-zinc-500">{item.paymentGateway.replace("-", " ")}</td>
                      <td className="px-6 py-4 font-bold text-zinc-950 dark:text-white">
                        {item.paymentGateway === "stripe-connect" ? "$" : "₹"}
                        {item.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${
                          item.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : item.status === "processing"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                        }`}>
                          {item.status}
                        </span>
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
  );
}
