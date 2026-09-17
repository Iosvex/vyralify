import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Bot, 
  Search, 
  PenTool, 
  BarChart3, 
  DollarSign, 
  ArrowRight, 
  Menu, 
  X,
  Sparkles,
  Zap,
  Layers,
  Coins
} from 'lucide-react';
import { ThemeToggleButton2 } from './ui/theme-toggle';

export default function DynamicIslandNavbar() {
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setProductDropdownOpen(false);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setProductDropdownOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const productsList = [
    {
      icon: Bot,
      title: "VYRALIFY AI",
      desc: "Your 24/7 viral growth co-pilot — tells you what to post and what to do next.",
      badge: "GPT-4o & Claude 3.5",
      href: "#features"
    },
    {
      icon: Search,
      title: "DISCOVER",
      desc: "Viral formats radar, trending audio velocity, and winning creator niches.",
      badge: "15K+ Reels Indexed",
      href: "#features"
    },
    {
      icon: PenTool,
      title: "CREATE",
      desc: "Synthesize 5 psychological hook archetypes, scripts, and captions in seconds.",
      badge: "94% Retention",
      href: "#features"
    },
    {
      icon: BarChart3,
      title: "SCALE",
      desc: "Multi-page scheduler, audience arbitrage, and automated content queue.",
      badge: "Multi-Account",
      href: "#features"
    },
    {
      icon: DollarSign,
      title: "MONETIZE",
      desc: "Digital product storefronts, paid community checkout, and 0% take rate wallet.",
      badge: "Instant Payouts",
      href: "#features"
    }
  ];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none select-none">
      <div 
        ref={navRef}
        className="pointer-events-auto relative w-full max-w-5xl rounded-full bg-black/85 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all"
        style={{
          boxShadow: '0 10px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Top Specular Line */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14 gap-3 sm:gap-6">
          
          {/* LEFT: Vyralify Logo */}
          <a 
            href="#hero-section" 
            onClick={() => { setProductDropdownOpen(false); setIsMobileOpen(false); }}
            className="flex items-center gap-1.5 focus:outline-none shrink-0 group"
          >
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white flex items-center">
              Vyral<span className="text-[#D1FE17]">ify</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse shrink-0" />
          </a>

          {/* CENTER: Locked Navigation Items: [Product ▾    Creators    Brands    Pricing] */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            
            {/* Dropdown: Product ▾ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                onMouseEnter={() => setProductDropdownOpen(true)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  productDropdownOpen ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span>Product</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productDropdownOpen ? 'rotate-180 text-[#D1FE17]' : 'text-neutral-400'}`} />
              </button>

              {/* Product Mega Menu Dropdown */}
              <AnimatePresence>
                {productDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setProductDropdownOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[360px] sm:w-[420px] rounded-2xl bg-[#090A0E]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-3 space-y-1.5 text-left z-50"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold border-b border-white/[0.06] mb-1 flex items-center justify-between">
                      <span>Products &amp; Intelligence</span>
                      <span className="text-[#D1FE17]">Vyralify Suite</span>
                    </div>

                    {productsList.map((prod, idx) => {
                      const Icon = prod.icon;
                      return (
                        <a
                          key={idx}
                          href={prod.href}
                          onClick={() => setProductDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#141A10] border border-[#263D18] flex items-center justify-center text-[#D1FE17] shrink-0 mt-0.5 group-hover:border-[#D1FE17]/60 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors">
                                {prod.title}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                                {prod.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">
                              {prod.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Creators */}
            <a
              href="#clip-and-earn"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:text-[#D1FE17] transition-colors cursor-pointer"
            >
              Creators
            </a>

            {/* Brands */}
            <a
              href="#features"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:text-[#D1FE17] transition-colors cursor-pointer"
            >
              Brands
            </a>

            {/* Pricing */}
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:text-[#D1FE17] transition-colors cursor-pointer"
            >
              Pricing
            </a>

          </nav>

          {/* RIGHT: Theme Toggle + Solid Green [Get Started →] Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggleButton2 className="w-7 h-7" />

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#pricing"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.97] transition-all font-sans shadow-md shadow-[#D1FE17]/20 cursor-pointer shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white border border-neutral-800 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* MOBILE SLIDE-DOWN DRAWER */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/[0.08] px-4 py-4 space-y-3 bg-[#08090C] rounded-b-3xl text-left"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold px-1">
                Products
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {productsList.map((prod, idx) => (
                  <a
                    key={idx}
                    href={prod.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 text-xs font-semibold text-white hover:text-[#D1FE17]"
                  >
                    <span>{prod.title}</span>
                    <span className="text-[9px] font-mono text-neutral-400">{prod.badge}</span>
                  </a>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex flex-col gap-2 font-medium text-xs">
                <a 
                  href="#clip-and-earn" 
                  onClick={() => setIsMobileOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-white/5 text-neutral-300"
                >
                  Creators &amp; Clipping
                </a>
                <a 
                  href="#features" 
                  onClick={() => setIsMobileOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-white/5 text-neutral-300"
                >
                  Brands &amp; Marketplace
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setIsMobileOpen(false)}
                  className="py-1.5 px-2 rounded-lg hover:bg-white/5 text-neutral-300"
                >
                  Pricing Plans
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="#pricing"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] transition-colors"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
