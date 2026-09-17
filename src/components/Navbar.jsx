import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productList = [
    {
      icon: "🤖",
      title: "VYRALIFY AI",
      desc: "Your 24/7 growth co-pilot for viral Instagram reach",
      href: "#features"
    },
    {
      icon: "🔎",
      title: "DISCOVER",
      desc: "Find trending formats, viral hooks & winning niches",
      href: "#features"
    },
    {
      icon: "✍️",
      title: "CREATE",
      desc: "Generate scripts, hooks, and content in seconds",
      href: "#features"
    },
    {
      icon: "📊",
      title: "SCALE",
      desc: "Growth intelligence and automated next moves",
      href: "#features"
    },
    {
      icon: "💰",
      title: "MONETIZE",
      desc: "Clipping campaigns, store & digital products",
      href: "#clip-and-earn"
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#1C1C20] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* LEFT: [Vyralify] Brand Logo */}
          <a href="#" className="font-display font-bold text-2xl tracking-tight text-white focus:outline-none hover:opacity-90 transition-opacity">
            Vyralify
          </a>

          {/* CENTER: Product ▾ | Creators | Brands | Pricing */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Product Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductOpen(!productOpen)}
                onMouseEnter={() => setProductOpen(true)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  productOpen ? 'text-[#D1FE17]' : 'text-neutral-300 hover:text-[#D1FE17]'
                }`}
              >
                <span>Product</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180 text-[#D1FE17]' : 'text-neutral-400'}`} />
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setProductOpen(false)}
                    className="absolute top-full left-0 mt-1 w-80 p-2.5 rounded-2xl bg-[#0B0B0E] border border-[#24242A] shadow-2xl shadow-black/80 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                      Products
                    </div>
                    <div className="space-y-1">
                      {productList.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setProductOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-900/90 transition-all group"
                        >
                          <span className="text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#D1FE17] transition-colors flex items-center gap-1">
                              <span>{item.title}</span>
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Creators Link */}
            <a
              href="#clip-and-earn"
              className="text-neutral-300 hover:text-[#D1FE17] transition-colors"
            >
              Creators
            </a>

            {/* Brands Link */}
            <a
              href="#features"
              className="text-neutral-300 hover:text-[#D1FE17] transition-colors"
            >
              Brands
            </a>

            {/* Pricing Link */}
            <a
              href="#pricing"
              className="text-neutral-300 hover:text-[#D1FE17] transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* RIGHT: Language Toggle, Login, [Get Started] */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white cursor-pointer transition-colors font-medium">
              <span>🌐</span>
              <span>EN</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </div>

            <a
              href="#login"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Login
            </a>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-[#D1FE17] text-black hover:bg-[#bbf00e] active:scale-[0.98] transition-all shadow-sm"
            >
              Get Started
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#D1FE17] text-black hover:bg-[#bbf00e] transition-colors"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#D1FE17] hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#1C1C20] bg-black px-4 py-6 space-y-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold px-2">
              Products
            </div>
            <div className="grid grid-cols-1 gap-2">
              {productList.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-300 hover:text-[#D1FE17] hover:bg-neutral-900 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="font-semibold">{item.title}</span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-3 px-2">
              <a
                href="#clip-and-earn"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-300 hover:text-[#D1FE17]"
              >
                Creators
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-300 hover:text-[#D1FE17]"
              >
                Brands
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-300 hover:text-[#D1FE17]"
              >
                Pricing
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#D1FE17] text-black font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
