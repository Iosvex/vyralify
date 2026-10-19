import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X,
  Bot,
  Search,
  Rocket,
  Zap,
  ShoppingBag,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onStartFree, onLogin, onSelectPath, onOpenDashboard }) {
  const { user } = useAuth();
  const [productOpen, setProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Monitor scroll for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6 Core Modules as specified in Section 01
  const modules = [
    {
      id: 'ai-spotlight',
      icon: Bot,
      title: 'Vyralify AI',
      desc: 'Analyzes your page and tells you what to do next'
    },
    {
      id: 'discover-spotlight',
      icon: Search,
      title: 'Discover & Create',
      desc: "Find what's viral, create content that performs"
    },
    {
      id: 'pagebuilder-spotlight',
      icon: Rocket,
      title: 'Page Builder',
      desc: 'Build or optimize your Instagram page from day one'
    },
    {
      id: 'store-spotlight',
      icon: ShoppingBag,
      title: 'Store & Commerce',
      desc: 'Sell products and monetize your audience'
    },
    {
      id: 'system-section',
      icon: LayoutDashboard,
      title: 'Dashboard & Analytics',
      desc: 'Track everything that matters in one place'
    }
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductOpen(false);
    }, 150);
  };

  const scrollToSection = (id) => {
    setProductOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerHighlightRing = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      element.style.boxShadow = '0 0 0 3px #23E598, 0 0 30px rgba(35,229,152,0.4)';
      setTimeout(() => {
        element.style.boxShadow = '';
      }, 500);
    }
  };

  const handleForCreators = (e) => {
    if (e) e.preventDefault();
    setProductOpen(false);
    setMobileMenuOpen(false);
    if (onSelectPath) onSelectPath('existing');
    triggerHighlightRing('creator-card');
  };

  const handleForBeginners = (e) => {
    if (e) e.preventDefault();
    setProductOpen(false);
    setMobileMenuOpen(false);
    if (onSelectPath) onSelectPath('scratch');
    triggerHighlightRing('beginner-card');
  };

  return (
    <header className={`sticky top-0 z-40 w-full h-16 bg-[#0A0A0A] border-b border-[#1F1F1F] transition-all select-none ${
      isScrolled ? 'backdrop-blur-[12px] bg-[rgba(10,10,10,0.88)] shadow-md' : ''
    }`}>
      <div className="max-w-[1200px] h-full mx-auto px-5 sm:px-10 lg:px-20 flex items-center justify-between">
        
        {/* LEFT: [Vyralify Logo] */}
        <a href="#" className="flex items-center gap-2.5 focus:outline-none shrink-0 py-1">
          <img 
            src="/vyralify-logo.png" 
            alt="Vyralify" 
            className="h-7 w-auto object-contain" 
          />
        </a>

        {/* CENTER / DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[14px]">
          
          {/* Product Dropdown Trigger */}
          <div 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button 
              onClick={() => setProductOpen(!productOpen)}
              className="flex items-center gap-1 text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors duration-150 py-2 cursor-pointer font-medium"
            >
              <span>Product</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Dropdown Popover */}
            <AnimatePresence>
              {productOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-[#111111] border border-[#2A2A2A] rounded-2xl shadow-2xl p-3 z-50 grid grid-cols-2 gap-2 mt-1"
                >
                  {modules.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => scrollToSection(m.id)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#23E598] shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs group-hover:text-[#23E598] transition-colors">
                            {m.title}
                          </div>
                          <div className="text-[11px] text-[#A0A0A0] leading-tight mt-0.5">
                            {m.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing link */}
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors duration-150 cursor-pointer font-medium"
          >
            Pricing
          </button>

          {/* Dual Audience Links (Rule 3) */}
          <button 
            onClick={handleForCreators}
            className="text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors duration-150 cursor-pointer font-medium"
          >
            For Creators
          </button>

          <button 
            onClick={handleForBeginners}
            className="text-[#A0A0A0] hover:text-[#FFFFFF] transition-colors duration-150 cursor-pointer font-medium"
          >
            For Beginners
          </button>
        </nav>

        {/* RIGHT: [Log In] [Start Free →] OR [Open Workspace →] */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              onClick={() => onOpenDashboard ? onOpenDashboard() : onStartFree()}
              className="h-9 px-4 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black text-[13px] font-bold tracking-tight transition-all duration-150 hover:shadow-[0_0_15px_rgba(35,229,152,0.3)] cursor-pointer flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Open Workspace &rarr;</span>
            </button>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="text-[14px] text-white hover:text-[#23E598] font-medium transition-colors cursor-pointer"
              >
                Log In
              </button>

              <button
                onClick={onStartFree}
                className="h-9 px-5 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-black text-[13px] font-bold tracking-tight transition-all duration-150 hover:shadow-[0_0_15px_rgba(35,229,152,0.3)] cursor-pointer flex items-center gap-1"
              >
                <span>Start Free</span>
                <span>&rarr;</span>
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* MOBILE FULL-SCREEN NAV OVERLAY (SPEC: FIXED FULL-SCREEN OVERLAY) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between px-6 pt-6 pb-10 overflow-y-auto"
          >
            {/* Top Bar with Logo and Close X */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1F1F1F]">
              <a href="#" className="flex items-center gap-2.5">
                <img 
                  src="/vyralify-logo.png" 
                  alt="Vyralify" 
                  className="h-7 w-auto object-contain" 
                />
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-300 hover:text-white cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links Stacked Vertically at 18px font size (Spec Rule) */}
            <div className="flex-1 py-8 space-y-5 font-semibold text-[18px] text-neutral-200">
              <button 
                onClick={handleForBeginners}
                className="w-full text-left py-2 hover:text-[#23E598] flex items-center justify-between text-[18px]"
              >
                <span>For Beginners</span>
                <span className="text-[12px] font-mono text-[#23E598] bg-[#23E598]/10 px-2.5 py-0.5 rounded">Start from 0</span>
              </button>

              <button 
                onClick={handleForCreators}
                className="w-full text-left py-2 hover:text-[#23E598] flex items-center justify-between text-[18px]"
              >
                <span>For Creators</span>
                <span className="text-[12px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded">Scale Page</span>
              </button>

              <button 
                onClick={() => scrollToSection('benefits')}
                className="w-full text-left py-2 hover:text-[#23E598] text-[18px]"
              >
                Products &amp; Features
              </button>

              <button 
                onClick={() => scrollToSection('pricing')}
                className="w-full text-left py-2 hover:text-[#23E598] text-[18px]"
              >
                Pricing &amp; Plans
              </button>

              <button 
                onClick={() => scrollToSection('faq')}
                className="w-full text-left py-2 hover:text-[#23E598] text-[18px]"
              >
                FAQ
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogin();
                }}
                className="w-full text-left py-2 text-white hover:text-[#23E598] text-[18px]"
              >
                Log In
              </button>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t border-[#1F1F1F]">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenDashboard) onOpenDashboard();
                    else onStartFree();
                  }}
                  className="w-full py-3.5 rounded-full bg-[#23E598] text-black font-bold text-base text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Workspace &rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartFree();
                  }}
                  className="w-full py-3.5 rounded-full bg-[#23E598] text-black font-bold text-base text-center flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Start Free</span>
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
