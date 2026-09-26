import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X,
  Sparkles,
  Compass,
  PenTool,
  BarChart3,
  Wallet
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Products per Page 1 specifications with professional SVG vector icons
  const products = [
    {
      icon: Sparkles,
      title: "VYRALIFY AI",
      desc: "24/7 AI growth co-pilot and viral scripting",
      href: "#features"
    },
    {
      icon: Compass,
      title: "DISCOVER",
      desc: "Viral content feeds, trending hooks and formats",
      href: "#features"
    },
    {
      icon: PenTool,
      title: "CREATE",
      desc: "Instant script, hook and caption generation",
      href: "#features"
    },
    {
      icon: BarChart3,
      title: "SCALE",
      desc: "Growth intelligence and performance tracking",
      href: "#features"
    },
    {
      icon: Wallet,
      title: "MONETIZE",
      desc: "Brand clipping campaigns and digital store",
      href: "#clip-and-earn"
    }
  ];

  // Smooth hover handlers for dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductOpen(false);
    }, 150);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#1C1C20] transition-colors duration-200 shrink-0 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          
          {/* LEFT: [Vyralify] Official Brand Logo */}
          <a href="#" className="flex items-center focus:outline-none shrink-0 group py-1">
            <img 
              src="/vyralify-logo.png" 
              alt="Vyralify" 
              className="h-7 sm:h-8 w-auto object-contain hover:opacity-90 transition-opacity" 
            />
          </a>

          {/* CENTER: Minimal, spacious layout (Product ▾ | Creators | Brands | Pricing) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
            
            {/* Product Dropdown Trigger */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setProductOpen(!productOpen)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer py-2 font-inter font-medium text-sm ${
                  productOpen ? 'text-[#3CEB75]' : 'text-neutral-300 hover:text-[#3CEB75]'
                }`}
                aria-expanded={productOpen}
              >
                <span>Product</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180 text-[#3CEB75]' : 'text-neutral-400'}`} />
              </button>

              {/* PRODUCT DROPDOWN (Clean dark minimal aesthetic per Page 1) */}
              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 p-3 rounded-2xl bg-[#0D0D10]/98 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(60,235,117,0.12)] z-50 border border-[#24242A] w-[350px] select-none backdrop-blur-xl before:absolute before:-top-3 before:left-0 before:w-full before:h-3"
                  >
                    <div className="px-3 pt-1 pb-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center justify-between border-b border-neutral-800/80 mb-2">
                      <span>PRODUCTS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3CEB75] animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      {products.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={() => setProductOpen(false)}
                            className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-900/90 transition-all duration-150 border border-transparent hover:border-neutral-800 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#3CEB75] group-hover:scale-110 group-hover:border-[#3CEB75]/50 group-hover:bg-[#3CEB75]/10 transition-all shrink-0">
                                <IconComponent className="w-4 h-4 text-[#3CEB75]" />
                              </span>
                              <div>
                                <div className="font-headline font-bold text-sm text-white group-hover:text-[#3CEB75] transition-colors tracking-tight">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-neutral-400 font-inter font-normal leading-tight mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#3CEB75] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Creators Link */}
            <a
              href="#creators"
              className="font-inter font-medium text-sm text-neutral-300 hover:text-[#3CEB75] transition-colors duration-150"
            >
              Creators
            </a>

            {/* Brands Link */}
            <a
              href="#brands"
              className="font-inter font-medium text-sm text-neutral-300 hover:text-[#3CEB75] transition-colors duration-150"
            >
              Brands
            </a>

            {/* Pricing Link */}
            <a
              href="#pricing"
              className="font-inter font-medium text-sm text-neutral-300 hover:text-[#3CEB75] transition-colors duration-150"
            >
              Pricing
            </a>
          </nav>

          {/* RIGHT: [Get Started →] (Solid Vyralify Green; No Login in main navbar) */}
          <div className="hidden md:flex items-center">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-inter font-bold bg-[#3CEB75] text-black hover:bg-[#34D368] active:scale-[0.98] transition-all duration-150 shadow-[0_0_20px_rgba(60,235,117,0.25)] hover:shadow-[0_0_30px_rgba(60,235,117,0.45)] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href="#pricing"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-inter font-bold bg-[#3CEB75] text-black hover:bg-[#34D368] transition-colors cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:text-[#3CEB75] hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
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
            className="md:hidden border-t border-[#1C1C20] bg-black px-4 py-5 space-y-4"
          >
            {/* Products header */}
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold px-2">
              PRODUCTS
            </div>
            <div className="grid grid-cols-1 gap-1">
              {products.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-[#3CEB75] hover:bg-neutral-900 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center text-[#3CEB75] border border-neutral-800">
                      <IconComponent className="w-3.5 h-3.5 text-[#3CEB75]" />
                    </span>
                    <div>
                      <div className="text-white text-xs font-bold">{item.title}</div>
                      <div className="text-[10px] text-neutral-500 font-normal">{item.desc}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Standard Nav links */}
            <div className="pt-3 border-t border-neutral-800 space-y-2 px-2">
              <a
                href="#creators"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-neutral-300 hover:text-[#3CEB75]"
              >
                Creators
              </a>
              <a
                href="#brands"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-neutral-300 hover:text-[#3CEB75]"
              >
                Brands
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-neutral-300 hover:text-[#3CEB75]"
              >
                Pricing
              </a>
            </div>

            {/* Login kept inside menu per Page 1 spec */}
            <div className="pt-3 border-t border-neutral-800 px-2">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-neutral-400 hover:text-white"
              >
                Already have an account? <span className="text-[#3CEB75] underline underline-offset-2">Log in</span>
              </a>
            </div>

            {/* Full width CTA */}
            <div className="pt-2">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#3CEB75] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3CEB75]/20 cursor-pointer"
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
