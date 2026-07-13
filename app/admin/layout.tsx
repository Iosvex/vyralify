"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfileProvider } from "@/components/user-profile-provider";
import { AdminGuard } from "@/components/admin-guard";
import { useUserProfile } from "@/components/user-profile-provider";
import { logOut } from "@/lib/firebase/auth";
import {
  LayoutDashboard,
  FolderLock,
  Users,
  Share2,
  DollarSign,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Content Vault", href: "/admin/content", icon: FolderLock },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Affiliates", href: "/admin/affiliates", icon: Share2 },
  { name: "Payouts", href: "/admin/payouts", icon: DollarSign },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">Vyralify</span>
            <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Admin Control</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                {profile?.displayName || "Admin User"}
              </span>
              <span className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                {profile?.email || "admin@vyralify.io"}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">Vyralify Panel</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-zinc-950/50 backdrop-blur-xs">
            <div className="flex w-64 flex-col bg-white dark:bg-zinc-900 h-full border-r border-zinc-200 dark:border-zinc-800 animate-slide-in">
              <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">Vyralify</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 px-4 py-6">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "A"}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                      {profile?.displayName || "Admin User"}
                    </span>
                    <span className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                      {profile?.email || "admin@vyralify.io"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <AdminGuard>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminGuard>
    </UserProfileProvider>
  );
}
