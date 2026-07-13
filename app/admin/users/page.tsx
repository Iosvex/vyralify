"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, doc, updateDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserCheck,
  Edit2,
  AlertTriangle,
  Loader2,
  Database,
  Shield,
  CreditCard,
} from "lucide-react";

interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "member" | "affiliate";
  tier: "standard" | "pro";
  subscriptionStatus: "active" | "canceled" | "past_due" | null;
  affiliateCode: string;
  referredBy: string | null;
  createdAt: any;
}

export default function UsersManager() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected user edit states
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editRole, setEditRole] = useState<"admin" | "member" | "affiliate">("member");
  const [editTier, setEditTier] = useState<"standard" | "pro">("standard");
  const [editStatus, setEditStatus] = useState<"active" | "canceled" | "past_due" | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch users from Firestore
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers: UserRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetchedUsers.push({
          uid: docSnap.id,
          email: data.email || "",
          displayName: data.displayName || "",
          role: data.role || "member",
          tier: data.tier || "standard",
          subscriptionStatus: data.subscriptionStatus || null,
          affiliateCode: data.affiliateCode || "",
          referredBy: data.referredBy || null,
          createdAt: data.createdAt,
        });
      });
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Seed mock database for easy testing
  const seedMockUsers = async () => {
    try {
      setLoading(true);
      const mockData = [
        {
          displayName: "Ashwin Product",
          email: "ashwin@vyralify.io",
          role: "admin",
          tier: "pro",
          subscriptionStatus: "active",
          affiliateCode: "ASHWIN50",
          referredBy: null,
        },
        {
          displayName: "Sarah Jenkins",
          email: "sarah@gmail.com",
          role: "member",
          tier: "standard",
          subscriptionStatus: "active",
          affiliateCode: "SARAH98",
          referredBy: "ASHWIN50",
        },
        {
          displayName: "David Miller",
          email: "david.miller@yahoo.com",
          role: "affiliate",
          tier: "pro",
          subscriptionStatus: "active",
          affiliateCode: "DAVID50",
          referredBy: null,
        },
        {
          displayName: "Rebecca Vance",
          email: "rebecca@vance.io",
          role: "member",
          tier: "pro",
          subscriptionStatus: "past_due",
          affiliateCode: "REB332",
          referredBy: "DAVID50",
        },
        {
          displayName: "Michael Scott",
          email: "michael@dundermifflin.com",
          role: "member",
          tier: "standard",
          subscriptionStatus: "canceled",
          affiliateCode: "MICHAEL",
          referredBy: null,
        },
      ];

      const batch = writeBatch(db);
      mockData.forEach((item, idx) => {
        // Create deterministic UIDs
        const uid = `mock_user_${idx + 1}`;
        const docRef = doc(db, "users", uid);
        batch.set(docRef, {
          ...item,
          createdAt: serverTimestamp(),
        });
      });

      await batch.commit();
      await fetchUsers();
    } catch (error) {
      console.error("Error seeding mock users:", error);
      alert("Failed to seed mock users in Firestore.");
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Dialog
  const startEdit = (user: UserRecord) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditTier(user.tier);
    setEditStatus(user.subscriptionStatus);
  };

  // Update user in Firestore
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setUpdating(true);
      const userRef = doc(db, "users", editingUser.uid);
      const updates = {
        role: editRole,
        tier: editTier,
        subscriptionStatus: editStatus,
      };
      await updateDoc(userRef, updates);

      // Local state update
      setUsers((prev) =>
        prev.map((u) =>
          u.uid === editingUser.uid ? { ...u, ...updates } : u
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user profile.");
    } finally {
      setUpdating(false);
    }
  };

  const toggleUserTier = async (user: UserRecord) => {
    try {
      const newTier = user.tier === "pro" ? "standard" : "pro";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { tier: newTier });
      
      setUsers((prev) =>
        prev.map((u) => (u.uid === user.uid ? { ...u, tier: newTier } : u))
      );
    } catch (error) {
      console.error("Error toggling tier:", error);
    }
  };

  const toggleUserRole = async (user: UserRecord) => {
    try {
      const newRole = user.role === "admin" ? "member" : "admin";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { role: newRole });
      
      setUsers((prev) =>
        prev.map((u) => (u.uid === user.uid ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error("Error toggling role:", error);
    }
  };

  const toggleUserStatus = async (user: UserRecord) => {
    try {
      const newStatus = user.subscriptionStatus === "active" ? null : "active";
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { subscriptionStatus: newStatus });
      
      setUsers((prev) =>
        prev.map((u) => (u.uid === user.uid ? { ...u, subscriptionStatus: newStatus } : u))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Filter users based on query and status selectors
  const filteredUsers = users.filter((user) => {
    const nameStr = (user.displayName || "").toLowerCase();
    const emailStr = (user.email || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = nameStr.includes(query) || emailStr.includes(query) || user.uid.includes(query);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesTier = tierFilter === "all" || user.tier === tierFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "none" && user.subscriptionStatus === null) ||
      user.subscriptionStatus === statusFilter;

    return matchesSearch && matchesRole && matchesTier && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Search accounts, edit roles, configure access tiers, and manage subscription statuses.
          </p>
        </div>
        {users.length === 0 && !loading && (
          <Button
            onClick={seedMockUsers}
            variant="outline"
            className="flex items-center gap-2 border-zinc-200 hover:bg-zinc-50 text-xs shrink-0 self-start"
          >
            <Database className="h-4 w-4 text-emerald-600" />
            Seed Mock Users
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Table/Directory view */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
            <div>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Listing all registered profiles.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 max-w-full">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search user email/name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 rounded-lg border border-zinc-200 pl-9 pr-3 py-1.5 text-xs bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>
          </CardHeader>

          {/* Quick Filter Bar */}
          <div className="px-6 pb-4 flex flex-wrap gap-3 border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span>Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 border-none font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="affiliate">Affiliate</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 border-none font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="standard">Standard</option>
                <option value="pro">Pro</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 border-none font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="canceled">Canceled</option>
                <option value="past_due">Past Due</option>
                <option value="none">No Subscription</option>
              </select>
            </div>
          </div>

          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <p className="text-sm text-zinc-500">Downloading accounts list...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20">
                <UserCheck className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-zinc-500">No users match filters</p>
                <p className="text-xs text-zinc-400 mt-1">Try clearing query or filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                      <th className="px-6 py-3">Account Details</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Access Tier</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                    {filteredUsers.map((user) => (
                      <tr key={user.uid} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-900 dark:text-white">{user.displayName || "No Name"}</span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">{user.email}</span>
                            {user.referredBy && (
                              <span className="text-[9px] text-zinc-400 mt-1 italic">
                                Referred by UID: {user.referredBy}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleUserRole(user)}
                            title="Click to toggle role (admin/member)"
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase cursor-pointer hover:opacity-85 transition-all ${
                              user.role === "admin"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                                : user.role === "affiliate"
                                ? "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
                                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                            }`}
                          >
                            {user.role === "admin" && <Shield className="h-2.5 w-2.5" />}
                            {user.role}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleUserTier(user)}
                            title="Click to toggle access tier (pro/standard)"
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase cursor-pointer hover:opacity-85 transition-all ${
                              user.tier === "pro"
                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
                                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                            }`}
                          >
                            {user.tier}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleUserStatus(user)}
                            title="Click to toggle subscription status (active/none)"
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold cursor-pointer hover:opacity-85 transition-all ${
                              user.subscriptionStatus === "active"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                : user.subscriptionStatus === "canceled"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                                : user.subscriptionStatus === "past_due"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                            }`}
                          >
                            {user.subscriptionStatus || "none"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(user)}
                            className="p-1 hover:text-emerald-600 hover:bg-zinc-100"
                          >
                            <Edit2 className="h-4 w-4" />
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

        {/* Editing Sidebar panel */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              Configure Account
            </CardTitle>
            <CardDescription>Manually overwrite access properties and sub roles.</CardDescription>
          </CardHeader>
          <CardContent>
            {editingUser ? (
              <form onSubmit={handleUpdateUser} className="space-y-5">
                <div className="p-3 bg-zinc-50 rounded-lg dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-500">Selected Profile</p>
                  <p className="text-sm font-bold text-zinc-950 dark:text-white mt-1">
                    {editingUser.displayName || "No Name"}
                  </p>
                  <p className="text-[10px] text-zinc-400 break-all">{editingUser.email}</p>
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">User Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as any)}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="member">Member</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                {/* Tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Content Tier</label>
                  <select
                    value={editTier}
                    onChange={(e) => setEditTier(e.target.value as any)}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="standard">Standard Access</option>
                    <option value="pro">Pro Membership</option>
                  </select>
                </div>

                {/* Subscription Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Payment Status</label>
                  <select
                    value={editStatus || "none"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditStatus(val === "none" ? null : (val as any));
                    }}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="none">No Subscription</option>
                    <option value="active">Active</option>
                    <option value="canceled">Canceled (Refunded/Ended)</option>
                    <option value="past_due">Past Due (Delinquent)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    {updating ? "Saving Changes..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    variant="outline"
                    className="border-zinc-200 hover:bg-zinc-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-16 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200 dark:bg-zinc-900/20 dark:border-zinc-800">
                <AlertTriangle className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-500">No account selected</p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Click the edit pencil icon on a user row to adjust settings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
