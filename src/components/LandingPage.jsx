import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  Home, 
  Bot, 
  Lightbulb, 
  Compass, 
  Film, 
  BarChart2, 
  DollarSign, 
  ShoppingBag, 
  Settings, 
  Menu, 
  X,
  TrendingUp,
  MessageCircle,
  Zap,
  FileText,
  Calendar,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import WatchDemoModal from './WatchDemoModal';
import AuthModal from './auth/AuthModal';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * VYRALIFY — "ELECTRIC LIGHT" RADIANT LANDING PAGE
 * Pixel-for-Pixel match to Image 2 (media_1792522365514.png) & Blueprint (media_1792522352349.pdf)
 * 
 * Strict Color & Style Rules:
 * - Background: Soft clean light gradient #F0F6FE to #FFFFFF with subtle blue mesh glow
 * - Primary Brand Accent: Single Electric Blue (#067CF9)
 * - Card Surface: Pure frosted glass white (#FFFFFF) with 1px ice border (rgba(6, 124, 249, 0.12))
 * - Typography: Plus Jakarta Sans for headings, Inter for UI controls, JetBrains Mono for stats
 */

export default function LandingPage({ onLoginSuccess }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const handleStartFree = () => {
    // If onLoginSuccess provided, trigger auth or launch dashboard directly
    if (onLoginSuccess) {
      onLoginSuccess({ mode: 'open', plan: 'free' });
    } else {
      setAuthMode('signup');
      setIsAuthOpen(true);
    }
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleOpenDashboard = () => {
    if (onLoginSuccess) {
      onLoginSuccess({ mode: 'open' });
    } else {
      setAuthMode('login');
      setIsAuthOpen(true);
    }
  };

  const toggleFaq = (idx) => {
    setFaqOpenIndex(faqOpenIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F6FE] via-[#F8FAFF] to-[#FFFFFF] text-[#0F172A] font-sans antialiased selection:bg-[#067CF9]/20 selection:text-[#067CF9] relative overflow-x-hidden">
      
      {/* AMBIENT MESH GLOWS */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-br from-[#067CF9]/10 via-[#818CF8]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] bg-[#067CF9]/06 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-[#A855F7]/05 blur-[140px] rounded-full" />
      </div>

      {/* ========================================================================= */}
      {/* 01. STICKY TOP NAVBAR                                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-blue-100/60 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Winged Blue Checkmark SVG Logo */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#067CF9] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#0F172A] font-headline">
              Vyralify
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-[#067CF9] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#067CF9] transition-colors">How It Works</a>
            <a href="#analytics" className="hover:text-[#067CF9] transition-colors">Analytics</a>
            <a href="#pricing" className="hover:text-[#067CF9] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#067CF9] transition-colors">FAQ</a>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleLogin}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-[#067CF9] px-3 py-2 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            {/* Solid Electric Blue CTA Button */}
            <button
              onClick={handleStartFree}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-100 bg-white/95 rounded-2xl p-4 shadow-xl space-y-3">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-[#067CF9] py-1"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-[#067CF9] py-1"
            >
              How It Works
            </a>
            <a 
              href="#analytics" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-[#067CF9] py-1"
            >
              Analytics
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-[#067CF9] py-1"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-[#067CF9] py-1"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogin();
                }}
                className="text-xs font-semibold text-slate-600 hover:text-[#067CF9]"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartFree();
                }}
                className="px-4 py-2 rounded-xl bg-[#067CF9] text-white text-xs font-semibold shadow-xs"
              >
                Get Started Free &rarr;
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 02. HERO SECTION (DITTO TO IMAGE 2)                                      */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* SOCIAL PROOF PILL (Overlapping Avatars + 150K+ Creators) */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs mb-5 transition-transform hover:scale-102">
          <div className="flex items-center -space-x-2 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Creator" 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="Creator" 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
              alt="Creator" 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" 
              alt="Creator" 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" 
            />
          </div>
          <span className="text-xs font-medium text-slate-600">
            Trusted by <strong className="font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">150K+</strong> creators
          </span>
        </div>

        {/* KICKER / EYEBROW */}
        <p className="text-[11px] sm:text-xs font-bold text-[#067CF9] tracking-[0.22em] uppercase mb-3 sm:mb-4">
          B U I L D &nbsp;.&nbsp; G R O W &nbsp;.&nbsp; M O N E T I Z E &nbsp;.
        </p>

        {/* MAIN HEADLINE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.12] max-w-4xl mx-auto font-headline">
          Everything You Need to <br className="hidden sm:inline" />
          Build, Grow &amp; Monetize <br className="hidden sm:inline" />
          Your{' '}
          <span className="bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
            Instagram Business
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-5 font-normal">
          Get content ideas, analyze performance, automate your DMs, discover niches and turn your Instagram pages into real revenue with Vyralify AI.
        </p>

        {/* DUAL CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md">
          <button
            onClick={handleStartFree}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#067CF9] hover:bg-[#056AD6] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsDemoOpen(true)}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/95 hover:bg-white text-[#0F172A] font-semibold text-sm sm:text-base border border-slate-200/90 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-slate-800 fill-slate-800 ml-0.5" />
            </div>
            <span>Watch 2-min Demo</span>
          </button>
        </div>

        {/* TRUST MICROCOPY */}
        <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-2 mt-4">
          <span>Free plan</span>
          <span>•</span>
          <span>No credit card required</span>
          <span>•</span>
          <span>Cancel anytime</span>
        </p>

        {/* ========================================================================= */}
        {/* 03. FLOATING GLASSY DASHBOARD SHOWCASE CARD (DITTO TO IMAGE 2)           */}
        {/* ========================================================================= */}
        <div 
          onClick={handleOpenDashboard}
          title="Click to explore interactive dashboard"
          className="relative w-full max-w-4xl mx-auto mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-200/70 shadow-[0_20px_70px_-15px_rgba(6,124,249,0.18)] p-3 sm:p-5 md:p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_25px_80px_-10px_rgba(6,124,249,0.25)] cursor-pointer text-left group"
        >
          {/* Subtle click me badge on top right */}
          <div className="absolute top-2 right-4 hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono text-[#067CF9] group-hover:bg-[#067CF9] group-hover:text-white transition-colors">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Interactive Live Preview</span>
          </div>

          {/* TOP HEADER INSIDE SHOWCASE CARD */}
          <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#067CF9] to-[#38BDF8] flex items-center justify-center text-white shadow-xs">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#0F172A] font-headline">Vyralify</span>
            </div>

            {/* Search Input Bar */}
            <div className="flex-1 max-w-md mx-2 hidden sm:flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-400 shadow-2xs">
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Ask anything.. (e.g. content ideas, niche analysis...)</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#067CF9] shrink-0" />
            </div>

            {/* Profile & Notifications */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Bell className="w-4 h-4 text-slate-500" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Maaz" 
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">@maaz</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* MAIN GRID INSIDE SHOWCASE CARD */}
          <div className="flex gap-4 pt-3 sm:pt-4">
            
            {/* MINI LEFT SIDEBAR (Desktop/Tablet) */}
            <div className="hidden lg:flex flex-col w-38 shrink-0 space-y-1 text-xs border-r border-slate-100 pr-3">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#EFF6FF] text-[#067CF9] font-semibold">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Assistant</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Content Ideas</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <Compass className="w-3.5 h-3.5" />
                <span>Niche Finder</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <Film className="w-3.5 h-3.5" />
                <span>Viral Reels</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Monetisation</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Creator Store</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800">
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </div>
            </div>

            {/* MAIN DASHBOARD CONTENT */}
            <div className="flex-1 space-y-3.5">
              
              {/* 3 TOP KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                
                {/* KPI 1: Followers */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                        <InstagramIcon className="w-3 h-3" />
                      </div>
                      <span className="font-medium">Total Followers</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] font-mono">125,430</span>
                    <span className="text-[11px] font-semibold text-emerald-600">↑ 12.4%</span>
                  </div>
                  {/* Wave curve */}
                  <svg className="w-full h-5 mt-1 stroke-[#067CF9] fill-none" viewBox="0 0 100 25">
                    <path d="M0 20 Q 25 5, 50 15 T 100 5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* KPI 2: Reel Views */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-[#067CF9]">
                        <Film className="w-3 h-3" />
                      </div>
                      <span className="font-medium">Reel Views (7D)</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] font-mono">3,827,410</span>
                    <span className="text-[11px] font-semibold text-emerald-600">↑ 18.6%</span>
                  </div>
                  {/* Wave curve */}
                  <svg className="w-full h-5 mt-1 stroke-[#6366F1] fill-none" viewBox="0 0 100 25">
                    <path d="M0 18 Q 30 2, 60 14 T 100 4" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* KPI 3: Engagement */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <span className="font-medium">Engagement Rate</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] font-mono">5.8%</span>
                    <span className="text-[11px] font-semibold text-emerald-600">↑ 0.9%</span>
                  </div>
                  {/* Wave curve */}
                  <svg className="w-full h-5 mt-1 stroke-[#A855F7] fill-none" viewBox="0 0 100 25">
                    <path d="M0 16 Q 25 8, 50 18 T 100 6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

              </div>

              {/* TWO COLUMNS: PERFORMANCE OVERVIEW + AI ASSISTANT */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                
                {/* PERFORMANCE OVERVIEW BARS (3 Cols) */}
                <div className="md:col-span-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <span className="font-bold text-[#0F172A]">Performance Overview</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                      <span>Last 7 days</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Bar Chart Mockup */}
                  <div className="pt-3">
                    <div className="flex items-end justify-between h-24 sm:h-28 gap-1.5 px-1">
                      {[
                        { day: 'Oct 13', height: '35%', hVal: '280K' },
                        { day: 'Oct 14', height: '48%', hVal: '410K' },
                        { day: 'Oct 15', height: '62%', hVal: '520K' },
                        { day: 'Oct 16', height: '88%', hVal: '710K' },
                        { day: 'Oct 17', height: '54%', hVal: '460K' },
                        { day: 'Oct 18', height: '72%', hVal: '600K' },
                        { day: 'Oct 19', height: '66%', hVal: '540K' },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group/bar">
                          <div 
                            className="w-full rounded-t-md bg-gradient-to-t from-[#067CF9] to-[#818CF8] group-hover/bar:from-[#056AD6] group-hover/bar:to-[#6366F1] transition-all"
                            style={{ height: bar.height }}
                          />
                          <span className="text-[9px] text-slate-400 mt-1 font-mono">{bar.day.replace('Oct ', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI ASSISTANT BETA (2 Cols) */}
                <div className="md:col-span-2 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0F172A]">AI Assistant</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-[#067CF9] text-[9px] font-semibold">Beta</span>
                      </div>
                    </div>

                    {/* 4 Prompt Action Pills */}
                    <div className="space-y-1.5 pt-2.5 text-[11px]">
                      <div className="p-1.5 rounded-lg bg-blue-50/70 border border-blue-100/80 text-slate-700 flex items-center gap-2 hover:bg-blue-100/70 transition-colors">
                        <Zap className="w-3 h-3 text-[#067CF9] shrink-0" />
                        <span className="truncate">Generate content ideas</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">Write viral captions</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <BarChart2 className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">Analyze performance</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">Plan your content</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Submit Button */}
                  <div className="flex justify-end pt-2">
                    <div className="w-7 h-7 rounded-full bg-[#067CF9] text-white flex items-center justify-center shadow-xs hover:bg-[#056AD6] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 04. 4 FEATURE CARDS GRID (DITTO TO IMAGE 2)                              */}
      {/* ========================================================================= */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-bold text-[#067CF9] tracking-[0.2em] uppercase mb-2">
            P O W E R F U L &nbsp; T O O L S
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-headline">
            Engineered for Exponential Creator Growth
          </h2>
        </div>

        {/* 2x2 GRID (1 COL ON MOBILE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* CARD 01: AI Content Ideas */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#067CF9] flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-slate-400 font-semibold">01</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-1.5 font-headline">
                <span>AI Content Ideas</span>
                <span className="text-[#067CF9]">&rarr;</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                Get viral ideas for your niche in seconds.
              </p>
            </div>

            {/* Visual Box with 4 Pills */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100/80 space-y-2">
              <div className="px-3 py-2 rounded-lg bg-white border border-blue-100 text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>Viral Reel Ideas</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white border border-blue-100 text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>Hook Variations</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white border border-blue-100 text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>Caption Templates</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white border border-blue-100 text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#067CF9]" />
                <span>Trending Niches</span>
              </div>
            </div>
          </div>

          {/* CARD 02: Advanced Analytics */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-slate-400 font-semibold">02</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-1.5 font-headline">
                <span>Advanced Analytics</span>
                <span className="text-[#067CF9]">&rarr;</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                Track performance and find what works.
              </p>
            </div>

            {/* Visual Box with Reach 487.2K & Purple Wave */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-50/50 to-white border border-indigo-100/80">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Reach</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 142%</span>
              </div>
              <div className="text-2xl font-extrabold text-[#0F172A] font-mono mb-2">487.2K</div>
              <svg className="w-full h-16 stroke-[#8B5CF6] fill-none" viewBox="0 0 200 60">
                <path d="M0 50 Q 50 45, 90 25 T 150 20 T 200 8" strokeWidth="3" strokeLinecap="round" />
                <path d="M0 50 Q 50 45, 90 25 T 150 20 T 200 8 L 200 60 L 0 60 Z" fill="rgba(139, 92, 246, 0.08)" stroke="none" />
              </svg>
            </div>
          </div>

          {/* CARD 03: Automate DMs */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-slate-400 font-semibold">03</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-1.5 font-headline">
                <span>Automate DMs</span>
                <span className="text-[#067CF9]">&rarr;</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                Save time and grow faster with AI.
              </p>
            </div>

            {/* Visual Box with Instagram DM Conversation */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-50/40 to-white border border-cyan-100/80 space-y-2.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Hey! 👋</span>
              </div>
              <div className="flex justify-start">
                <div className="px-3 py-1.5 rounded-xl rounded-tl-xs bg-slate-100 text-xs text-slate-700 shadow-2xs">
                  Thanks for reaching out!
                </div>
              </div>
              <div className="flex justify-start">
                <div className="px-3 py-1.5 rounded-xl rounded-tl-xs bg-slate-100 text-xs text-slate-700 shadow-2xs">
                  How can I help you?
                </div>
              </div>
            </div>
          </div>

          {/* CARD 04: Monetisation Tools */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#067CF9] flex items-center justify-center font-bold text-sm">
                  ₹
                </div>
                <span className="font-mono text-xs text-slate-400 font-semibold">04</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-1.5 font-headline">
                <span>Monetisation Tools</span>
                <span className="text-[#067CF9]">&rarr;</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
                Turn your audience into revenue.
              </p>
            </div>

            {/* Visual Box with Total Revenue & Bar Chart */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100/80">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">Total Revenue</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 32.4%</span>
              </div>
              <div className="text-2xl font-extrabold text-[#0F172A] font-mono mb-2">₹42,850</div>
              {/* Rising Blue Bar Graph */}
              <div className="flex items-end justify-between h-12 gap-1.5 pt-2">
                {[20, 35, 45, 60, 50, 75, 95].map((val, i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-t-md bg-gradient-to-t from-[#067CF9] to-[#38BDF8]" 
                    style={{ height: `${val}%` }} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* EXPLORE ALL FEATURES BUTTON */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <button
            onClick={handleStartFree}
            className="px-7 py-3 rounded-2xl bg-white/95 hover:bg-white text-[#067CF9] font-semibold text-xs sm:text-sm border border-blue-200/90 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore All Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 05. 3-STEP ENGINE WORKFLOW                                                */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#067CF9] tracking-[0.2em] uppercase mb-2">
            H O W &nbsp; I T &nbsp; W O R K S
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-headline">
            Three Steps from Zero to Automated Instagram Income
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* STEP 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#067CF9] font-mono font-bold text-base flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] font-headline">Audit &amp; Niche Discovery</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Scan high eRPM niches, fix bio conversion bottlenecks, and calculate your exact audience retention score before posting.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
              <span>Audience Health Score</span>
              <span className="font-bold text-[#067CF9]">86 / 100</span>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#067CF9] font-mono font-bold text-base flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] font-headline">Generate Proven Content</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Use trained 2026 algorithmic models to generate viral reel scripts, 3-second visual hooks, and 30 days of pre-scheduled posts.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
              <span>Script Retention Rate</span>
              <span className="font-bold text-emerald-600">68.5% avg</span>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#067CF9] font-mono font-bold text-base flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] font-headline">Automate Sales &amp; Storefront</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Trigger instant DM funnels when followers comment keywords, delivering digital downloads and collecting payments 24/7.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
              <span>DM Conversion Boost</span>
              <span className="font-bold text-[#067CF9]">3.2x ROI</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. PRICING SECTION (STRICT ELECTRIC LIGHT BLUEPRINT)                     */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#067CF9] tracking-[0.2em] uppercase mb-2">
            T R A N S P A R E N T &nbsp; P R I C I N G
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-headline">
            Start Free. Upgrade As You Scale.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No surprise charges. Cancel or pause your subscription anytime with 1-click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* STARTER (₹0) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-mono">₹0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                For new creators exploring viral niches and optimizing their bio.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>1 Instagram Page</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>5 AI Viral Scripts / week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Bio Optimization &amp; Scorecard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Basic Link-in-Bio Store</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartFree}
              className="w-full mt-8 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Start Free
            </button>
          </div>

          {/* PRO (₹499/mo) - HIGHLIGHTED */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#067CF9] shadow-xl shadow-blue-500/10 flex flex-col justify-between relative scale-102">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#067CF9] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#067CF9]">Creator Pro</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-mono">₹499</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                For serious creators ready to turn their views into predictable income.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Everything in Starter</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Unlimited AI Reel &amp; Carousel Scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Automated DM Sales Funnels (Meta Safe)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Full Creator Storefront (0% platform fee)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>30-Day Content Planner &amp; Scheduler</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartFree}
              className="w-full mt-8 py-3 px-4 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Get Started with Pro
            </button>
          </div>

          {/* ELITE (₹1,499/mo) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Elite Agency</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-mono">₹1,499</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                For agencies, scaling theme empires, and multiple brand managers.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Up to 5 Instagram Accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Custom Storefront Domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>High-Volume DM Automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#067CF9]" />
                  <span>Priority 24/7 Creator Growth Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartFree}
              className="w-full mt-8 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Contact for Elite
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. FAQ ACCORDION                                                         */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-[#067CF9] tracking-[0.2em] uppercase mb-2">
            F R E Q U E N T L Y &nbsp; A S K E D
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-headline">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Is Vyralify compliant with Instagram's terms of service?",
              a: "Yes, 100%. Vyralify strictly utilizes official Meta Graph APIs and standard webhooks. We never use unofficial scraping or bot emulation that risks account bans."
            },
            {
              q: "Do I need technical skills or coding knowledge?",
              a: "None at all. Everything from AI script generation to your link-in-bio storefront is configured through simple point-and-click buttons."
            },
            {
              q: "How does the automated DM trigger work?",
              a: "When a follower comments your chosen trigger keyword (e.g. 'FREE', 'SCALE', 'GUIDE') on your Reel or Post, Vyralify instantly sends them a personalized direct message with your link."
            },
            {
              q: "Can I cancel or change my plan anytime?",
              a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time right from your Account Settings with one click."
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full py-4 px-5 text-left font-semibold text-sm sm:text-base text-[#0F172A] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${faqOpenIndex === idx ? 'rotate-180 text-[#067CF9]' : ''}`} />
              </button>
              {faqOpenIndex === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. FINAL CTA BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-white via-blue-50/60 to-white border border-blue-200/80 shadow-[0_20px_70px_rgba(6,124,249,0.12)] p-8 sm:p-14 text-center relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-headline">
              Ready to Scale Your Instagram Business?
            </h2>
            <p className="text-xs sm:text-base text-slate-600">
              Join 150,000+ creators using Vyralify AI to turn views into recurring monthly revenue.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors cursor-pointer"
              >
                Watch 2-min Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. FOOTER                                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#067CF9] to-[#38BDF8] flex items-center justify-center text-white shadow-xs">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#0F172A] font-headline">Vyralify</span>
            <span className="text-slate-400 ml-2">© 2026 Vyralify Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-[#067CF9] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#067CF9] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#067CF9] transition-colors">FAQ</a>
            <button onClick={handleLogin} className="hover:text-[#067CF9] transition-colors cursor-pointer">Log In</button>
          </div>
        </div>
      </footer>

      {/* WATCH DEMO MODAL */}
      <WatchDemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        onStartFree={handleStartFree} 
      />

      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={isAuthOpen} 
        initialMode={authMode} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={(payload) => {
          setIsAuthOpen(false);
          if (onLoginSuccess) onLoginSuccess(payload);
        }} 
      />

    </div>
  );
}
