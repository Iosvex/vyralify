"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserProfileProvider, useUserProfile } from "@/components/user-profile-provider";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";
import { ShieldCheck, Menu, X, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

function PublicHeader() {
  const { profile } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">Vyralify.io</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/affiliates" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Affiliate Program
          </Link>
          <Link href="/#pricing" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Profile / Auth actions */}
        <div className="hidden md:flex items-center gap-4">
          {profile ? (
            <div className="flex items-center gap-3">
              <Link href={profile.role === "admin" ? "/admin" : "/dashboard"}>
                <Button size="sm" variant="outline" className="flex items-center gap-1.5 border-zinc-200 text-xs font-semibold">
                  <LayoutDashboard className="h-4 w-4" />
                  {profile.role === "admin" ? "Admin Panel" : "Dashboard"}
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 text-xs font-semibold"
            >
              Sign In
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-zinc-600 md:hidden hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 animate-slide-in">
          <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/affiliates"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Affiliate Program
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              FAQ
            </Link>
            <hr className="border-zinc-100 dark:border-zinc-800" />
            {profile ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {profile.displayName ? profile.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white">{profile.displayName}</span>
                    <span className="text-[10px] text-zinc-500">{profile.email}</span>
                  </div>
                </div>
                <Link href={profile.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-blue-600 text-white text-xs font-semibold">
                    Dashboard
                  </Button>
                </Link>
                <Button size="sm" variant="outline" onClick={handleLogout} className="w-full border-red-200 text-red-600 text-xs font-semibold">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleLogin} className="w-full bg-blue-600 text-white text-xs font-semibold">
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 text-xs text-zinc-500">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="font-semibold text-zinc-900 dark:text-white">Vyralify.io</span>
        </div>
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Vyralify. All rights reserved. High-end tools for digital creators.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-zinc-900">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-900">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <div className="flex flex-col min-h-screen bg-zinc-50/50 dark:bg-zinc-950 font-sans">
        <PublicHeader />
        <main className="flex-1 w-full">{children}</main>
        <PublicFooter />
      </div>
    </UserProfileProvider>
  );
}
