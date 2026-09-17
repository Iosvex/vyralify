import React, { useState } from 'react';
import { Menu, X, ChevronDown, Coins } from 'lucide-react';
import { ThemeToggleButton2 } from './ui/theme-toggle';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [systemsDropdownOpen, setSystemsDropdownOpen] = useState(false);

  const systemsList = [
    {
      title: "AI Viral Hook Engine",
      desc: "Generate 9-second hooks and viral retention frameworks.",
      tag: "GPT-4o",
      href: "#features"
    },
    {
      title: "Clip-to-Cash Bounties",
      desc: "Clip high-performing founder podcasts and earn per 1,000 views.",
      tag: "Active Pool",
      href: "#clip-and-earn"
    },
    {
      title: "High-RPM Niche Radar",
      desc: "150+ profitable creator niches with estimated RPM & monetization angles.",
      tag: "Radar",
      href: "#features"
    },
    {
      title: "Vyralify University",
      desc: "Masterclasses on editing, viral psychology, and monetization.",
      tag: "24 Modules",
      href: "#everything-inside"
    },
    {
      title: "Brand Deal Marketplace",
      desc: "Direct brand matchmaking for sponsorship deals and retainers.",
      tag: "Zero Fee",
      href: "#features"
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-200 dark:border-[#1A1A1A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Wordmark (Mockup style: Vyral + ify in volt green) */}
          <a href="#" className="flex items-center gap-2 focus:outline-none group">
            <span className="font-display font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
              Vyral<span className="text-[#D1FE17]">ify</span>
            </span>
          </a>

          {/* Desktop Nav Items (Exact items from mockup: Platform, Features, Pricing) */}
          <nav className="hidden md:flex items-center gap-9">
            <a
              href="#features"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Platform
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Animated Skiper UI Theme Toggle Button */}
            <ThemeToggleButton2 className="w-8 h-8" />

            <a
              href="/login"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Login
            </a>

            {/* Exact Mockup Pill Button: GET STARTED */}
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.98] transition-all font-display shadow-[0_0_20px_rgba(209,254,23,0.3)]"
            >
              GET STARTED
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 dark:border-[#1F1F23]">
            <div className="flex flex-col gap-2">
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg"
              >
                Systems
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg"
              >
                How It Works
              </a>
              <a
                href="#clip-and-earn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-[#D1FE17] hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg flex items-center justify-between"
              >
                <span>Clip & Earn</span>
                <span className="text-[10px] bg-[#D1FE17]/10 px-2 py-0.5 rounded border border-[#D1FE17]/20 text-[#D1FE17]">
                  ₹150/1K
                </span>
              </a>
              <a
                href="#results"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg"
              >
                Results
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#111111] rounded-lg"
              >
                FAQ
              </a>
              <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-[#1F1F23] flex items-center justify-between px-3">
                <a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
