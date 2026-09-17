import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Globe, 
  Check,
  Play,
  MessageSquare,
  Send,
  Mail,
  CornerDownLeft,
  Video,
  Link2,
  GraduationCap,
  Calendar
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'EN', name: 'English', flag: '🇬🇧' });

  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  const timeoutRef = useRef(null);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'HI', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'PT', name: 'Português', flag: '🇧🇷' },
    { code: 'AR', name: 'العربية', flag: '🇦🇪' }
  ];

  // Handle smooth hover open/close
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const useCases = [
    { title: "Comment-to-DM", icon: MessageSquare, href: "#features" },
    { title: "Auto-Send Links", icon: Send, href: "#features" },
    { title: "Lead Capture", icon: Mail, href: "#features" },
    { title: "Story Replies", icon: CornerDownLeft, href: "#features" }
  ];

  const creatorTypes = [
    { title: "Content Creators", icon: Video, href: "#features" },
    { title: "Affiliate Creators", icon: Link2, href: "#clip-and-earn" },
    { title: "Coaches & Educators", icon: GraduationCap, href: "#features" },
    { title: "Service Businesses", icon: Calendar, href: "#features" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#1C1C20] transition-colors duration-200 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          
          {/* LEFT: [Vyralify] Brand Logo */}
          <a href="#" className="font-display font-bold text-2xl tracking-tight text-white focus:outline-none hover:opacity-90 transition-opacity shrink-0">
            Vyralify
          </a>

          {/* CENTER: Solutions ▾ | Agencies | Pricing | Resources */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            
            {/* Solutions Dropdown Trigger */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  solutionsOpen ? 'text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-white' : 'text-neutral-400'}`} />
              </button>

              {/* MINIMAL WHITE MEGA DROPDOWN (Exact CreatorFlow Reference) */}
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2.5 p-6 sm:p-7 rounded-[26px] bg-white text-black shadow-[0_25px_70px_rgba(0,0,0,0.4),0_0_1px_rgba(0,0,0,0.15)] z-50 border border-neutral-100/80 w-[780px] select-none before:absolute before:-top-3 before:left-0 before:w-full before:h-3"
                  >
                    <div className="flex items-stretch gap-8">
                      
                      {/* Left: Featured Visual Box (260px fixed width) */}
                      <div className="w-[260px] shrink-0 bg-[#F6F7F9] rounded-2xl p-5 flex flex-col justify-between border border-neutral-200/50">
                        {/* Mini Feature Card */}
                        <div>
                          <div className="bg-white rounded-xl p-3.5 shadow-xs border border-neutral-200/60 mb-3.5">
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white">
                                  <Play className="w-2.5 h-2.5 fill-white" />
                                </div>
                                <div className="w-14 h-1.5 bg-neutral-200 rounded-full" />
                              </div>
                              <span className="px-1.5 py-0.5 rounded bg-[#D1FE17] text-black font-extrabold text-[9px] font-mono tracking-wider">
                                LINK
                              </span>
                            </div>

                            <div className="flex justify-end">
                              <div className="bg-black text-white text-[10px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-sm">
                                <span>yourshop.link</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </div>
                            </div>
                          </div>

                          <h4 className="font-display font-bold text-sm text-neutral-900 leading-snug mb-1">
                            Comment to DM, automatically
                          </h4>
                          <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                            See how a single reel turns into emails and sales, automatically.
                          </p>
                        </div>

                        <a 
                          href="#features" 
                          onClick={() => setSolutionsOpen(false)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-black mt-4 hover:underline"
                        >
                          <span>Watch it work</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Middle: BY USE CASE (200px fixed width, no-wrap) */}
                      <div className="w-[200px] shrink-0 flex flex-col">
                        <div className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase mb-4 whitespace-nowrap">
                          BY USE CASE
                        </div>
                        <div className="space-y-4">
                          {useCases.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={() => setSolutionsOpen(false)}
                                className="flex items-center gap-3 text-sm font-semibold text-neutral-800 hover:text-black transition-colors group cursor-pointer whitespace-nowrap"
                              >
                                <Icon className="w-4 h-4 text-neutral-600 group-hover:text-black group-hover:scale-110 transition-transform shrink-0" />
                                <span>{item.title}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: BY CREATOR TYPE (200px fixed width, no-wrap) */}
                      <div className="w-[200px] shrink-0 flex flex-col">
                        <div className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase mb-4 whitespace-nowrap">
                          BY CREATOR TYPE
                        </div>
                        <div className="space-y-4">
                          {creatorTypes.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                onClick={() => setSolutionsOpen(false)}
                                className="flex items-center gap-3 text-sm font-semibold text-neutral-800 hover:text-black transition-colors group cursor-pointer whitespace-nowrap"
                              >
                                <Icon className="w-4 h-4 text-neutral-600 group-hover:text-black group-hover:scale-110 transition-transform shrink-0" />
                                <span>{item.title}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Agencies Link */}
            <a
              href="#clip-and-earn"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Agencies
            </a>

            {/* Pricing Link */}
            <a
              href="#pricing"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Pricing
            </a>

            {/* Resources Link */}
            <a
              href="#resources"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Resources
            </a>
          </nav>

          {/* RIGHT: Language Toggle, Login, [Get Started] */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Interactive Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white cursor-pointer transition-colors font-medium py-1.5 px-2 rounded-lg hover:bg-neutral-900"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedLang.code}</span>
                <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${langOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-44 p-1.5 rounded-xl bg-[#0F0F12] border border-[#24242A] shadow-2xl shadow-black/90 z-50 backdrop-blur-xl"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                      Language
                    </div>
                    <div className="space-y-0.5">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                            selectedLang.code === lang.code
                              ? 'bg-neutral-800 text-[#D1FE17] font-semibold'
                              : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                          {selectedLang.code === lang.code && (
                            <Check className="w-3.5 h-3.5 text-[#D1FE17]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login Link */}
            <a
              href="#login"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Login
            </a>

            {/* Get Started Button (Solid volt green) */}
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-[#D1FE17] text-black hover:bg-[#bbf00e] active:scale-[0.98] transition-all shadow-sm"
            >
              Get Started
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href="#pricing"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D1FE17] text-black hover:bg-[#bbf00e] transition-colors"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:text-[#D1FE17] hover:bg-neutral-900 transition-colors"
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
              Solutions
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {[...useCases, ...creatorTypes].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-2.5 px-2">
              <a
                href="#clip-and-earn"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Agencies
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Pricing
              </a>
              <a
                href="#resources"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Resources
              </a>
            </div>

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-neutral-800 px-2">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
                Language
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {languages.slice(0, 4).map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                      selectedLang.code === lang.code
                        ? 'bg-neutral-800 text-[#D1FE17] font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-[#D1FE17] text-black font-bold text-sm flex items-center justify-center gap-2"
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
