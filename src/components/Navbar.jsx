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

export default function Navbar({ onStartFree, onLogin, onSelectPath }) {
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
      desc: 'Your 24/7 Instagram growth co-pilot'
    },
    {
      id: 'discover-spotlight',
      icon: Search,
      title: 'Discover & Create',
      desc: 'Find what works, create what wins'
    },
    {
      id: 'pagebuilder-spotlight',
      icon: Rocket,
      title: 'Page Builder',
      desc: 'Build your page the right way'
    },
    {
      id: 'automation-spotlight',
      icon: Zap,
      title: 'Instagram Automation',
      desc: 'Turn engagement into leads'
    },
    {
      id: 'store-spotlight',
      icon: ShoppingBag,
      title: 'Store & Commerce',
      desc: 'Monetize your audience'
    },
    {
      id: 'system-section',
      icon: LayoutDashboard,
      title: 'Dashboard & Analytics',
      desc: 'Track everything in one place'
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

  const handleForCreators = (e) => {
    e.preventDefault();
    scrollToSection('two-paths');
    if (onSelectPath) onSelectPath('existing');
  };

  const handleForBeginners = (e) => {
    e.preventDefault();
    scrollToSection('two-paths');
    if (onSelectPath) onSelectPath('scratch');
  };

  return (
    <header className={`sticky top-0 z-40 w-full h-16 bg-[#0A0A0A] border-b border-[#1F1F1F] transition-all select-none ${
      isScrolled ? 'backdrop-blur-md bg-[#0A0A0A]/90 shadow-md' : ''
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

        {/* RIGHT: [Log In] [Start Free →] */}
        <div className="hidden md:flex items-center gap-5">
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
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE FULL-SCREEN NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#1F1F1F] px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="space-y-3 font-semibold text-base text-neutral-200">
              <button 
                onClick={handleForBeginners}
                className="w-full text-left py-2 hover:text-[#23E598] flex items-center justify-between"
              >
                <span>For Beginners</span>
                <span className="text-[11px] font-mono text-[#23E598] bg-[#23E598]/10 px-2 py-0.5 rounded">Start from 0</span>
              </button>

              <button 
                onClick={handleForCreators}
                className="w-full text-left py-2 hover:text-[#23E598] flex items-center justify-between"
              >
                <span>For Creators</span>
                <span className="text-[11px] font-mono text-neutral-400">Scale Page</span>
              </button>

              <button 
                onClick={() => scrollToSection('benefits')}
                className="w-full text-left py-2 hover:text-[#23E598]"
              >
                Products &amp; Features
              </button>

              <button 
                onClick={() => scrollToSection('pricing')}
                className="w-full text-left py-2 hover:text-[#23E598]"
              >
                Pricing &amp; Plans
              </button>

              <button 
                onClick={() => scrollToSection('faq')}
                className="w-full text-left py-2 hover:text-[#23E598]"
              >
                FAQ
              </button>

              <button 
                onClick={onLogin}
                className="w-full text-left py-2 text-white hover:text-[#23E598]"
              >
                Log In
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartFree();
                }}
                className="w-full py-3 rounded-full bg-[#23E598] text-black font-bold text-sm text-center flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Start Free</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
