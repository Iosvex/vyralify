"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfileProvider, useUserProfile } from "@/components/user-profile-provider";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";
import { Menu, X, ArrowRight, LogOut, LayoutDashboard, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopStrip } from "@/components/landing/top-strip";

function PublicHeader() {
  const { profile } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-zinc-100"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <span className="text-sm font-black">V</span>
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-900">
            Vyralify<span className="text-blue-600">.io</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          <Link
            href="/#ai-tools"
            className="hover:text-zinc-900 transition-colors"
          >
            AI Tools
          </Link>
          <Link
            href="/#features"
            className="hover:text-zinc-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#everything-inside"
            className="hover:text-zinc-900 transition-colors"
          >
            Everything Inside
          </Link>
          <Link
            href="/#community"
            className="hover:text-zinc-900 transition-colors"
          >
            Community
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-zinc-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="hover:text-zinc-900 transition-colors"
          >
            FAQs
          </Link>
        </nav>

        {/* Profile / Auth actions */}
        <div className="hidden md:flex items-center gap-3">
          {profile ? (
            <div className="flex items-center gap-3">
              <Link
                href={profile.role === "admin" ? "/admin" : "/dashboard"}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1.5 border-zinc-200 text-xs font-semibold rounded-full"
                >
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
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogin}
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
              >
                Login
              </Button>
              <a href="#pricing">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 text-xs font-semibold rounded-full px-5 shadow-md shadow-blue-500/15"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-zinc-600 md:hidden hover:bg-zinc-100"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 animate-slide-in">
          <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-600">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              Features
            </Link>
            <Link
              href="/#everything-inside"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              Everything Inside
            </Link>
            <Link
              href="/#community"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              Community
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              FAQs
            </Link>
            <Link
              href="/affiliates"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-900"
            >
              Affiliate Program
            </Link>
            <hr className="border-zinc-100" />
            {profile ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600 text-xs">
                    {profile.displayName
                      ? profile.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-900">
                      {profile.displayName}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <Link
                  href={
                    profile.role === "admin" ? "/admin" : "/dashboard"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 text-white text-xs font-semibold rounded-full"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-red-200 text-red-600 text-xs font-semibold rounded-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogin}
                  className="w-full text-xs font-semibold rounded-full"
                >
                  Login
                </Button>
                <a href="#pricing">
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 text-white text-xs font-semibold rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-zinc-100 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-sm font-black">V</span>
              </div>
              <span className="font-bold text-white">
                Vyralify<span className="text-blue-400">.io</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              The #1 AI-powered platform built for faceless Instagram
              creators. Build, grow, and monetize your audience.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-blue-600/20 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-blue-600/20 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-blue-600/20 hover:text-blue-400 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 hover:bg-blue-600/20 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#everything-inside"
                  className="hover:text-white transition-colors"
                >
                  The Vault
                </Link>
              </li>
              <li>
                <Link
                  href="/#community"
                  className="hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliates"
                  className="hover:text-white transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@vyralify.io"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Vyralify. All rights reserved.
            Built for creators, by creators.
          </p>
          <p className="text-xs text-zinc-700 font-mono">
            SCALE &middot; MONETIZE &middot; REPEAT
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProfileProvider>
      <div className="flex flex-col min-h-screen bg-white font-sans">
        <TopStrip />
        <PublicHeader />
        <main className="flex-1 w-full">{children}</main>
        <PublicFooter />
      </div>
    </UserProfileProvider>
  );
}
