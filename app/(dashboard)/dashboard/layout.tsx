"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserProfileProvider, useUserProfile } from "@/components/user-profile-provider";
import { DashboardGuard } from "@/components/dashboard-guard";
import { logOut } from "@/lib/firebase/auth";
import {
  Home,
  TrendingUp,
  FolderOpen,
  Sparkles,
  DollarSign,
  Briefcase,
  Download,
  Users2,
  Share2,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

// 10 tabs navigation items
const navItems = [
  { name: "Home Hub", id: "home", icon: Home },
  { name: "Growth Systems", id: "growth", icon: TrendingUp },
  { name: "Content Vault", id: "vault", icon: FolderOpen },
  { name: "Hook Vault", id: "hooks", icon: Sparkles },
  { name: "Monetisation", id: "monetization", icon: DollarSign },
  { name: "Resources", id: "resources", icon: Briefcase },
  { name: "Downloads", id: "downloads", icon: Download },
  { name: "Community Hub", id: "community", icon: Users2 },
  { name: "Affiliate Hub", id: "affiliates", icon: Share2 },
  { name: "Profile & Billing", id: "profile", icon: Settings },
];

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";
  const { profile } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getHref = (id: string) => `/dashboard?tab=${id}`;

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
              <span className="font-bold text-lg">V</span>
            </div>
            <span className="font-bold tracking-tight text-lg">Vyralify.io</span>
          </div>
          {profile && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              profile.tier === "pro" 
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-500/20" 
                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
            }`}>
              {profile.tier}
            </span>
          )}
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={getHref(item.id)}
                className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500"}`} />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer User Details */}
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              {profile?.displayName?.charAt(0) || profile?.email?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                {profile?.displayName || "Member"}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {profile?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
              title="Logout"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex md:hidden h-16 items-center justify-between border-b border-zinc-200 px-6 bg-white dark:border-zinc-800 dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-zinc-500 focus:outline-none dark:text-zinc-400"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-bold tracking-tight text-md">Vyralify.io</span>
          </div>
          {profile && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
              profile.tier === "pro" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30" : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800"
            }`}>
              {profile.tier}
            </span>
          )}
        </header>

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-zinc-900/60 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 animate-slide-in">
            <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-bold tracking-tight text-lg">Vyralify.io</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={getHref(item.id)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </a>
                );
              })}
            </nav>
            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-[140px]">
                    {profile?.displayName || "Member"}
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[140px]">
                    {profile?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-red-500"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Page Inner Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-6 dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <DashboardGuard>
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          </div>
        }>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </Suspense>
      </DashboardGuard>
    </UserProfileProvider>
  );
}
