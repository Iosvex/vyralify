import React, { useState } from 'react';
import TopStrip from './TopStrip';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import ProblemSolution from './ProblemSolution';
import SystemJourney from './SystemJourney';
import BenefitsGrid from './BenefitsGrid';
import Spotlights from './Spotlights';
import TwoPaths from './TwoPaths';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import WatchDemoModal from './WatchDemoModal';
import StickyMobileCTA from './StickyMobileCTA';
import AuthModal from './auth/AuthModal';

/**
 * VYRALIFY — 17-SECTION MARKETING LANDING PAGE
 * Follows exact specifications from:
 * - Vyralify — Main Website Landing Page Spec.pdf
 * - Vyralify_UIUX_Specification.md
 * - Vyralify_Final_Platform_Structure.md
 *
 * Sequence:
 * 01. Top Announcement Strip + Sticky Navbar
 * 02. Hero (100vh, 3D unrolling perspective mockup + 3 real floating cards)
 * 03. Trust Strip (Creator handle marquee + 4 metrics + 4-point Meta safety guarantee)
 * 04. Problem & Solution (3 red cards, green transition arrow, dual-audience solution lines)
 * 05. The System (6-stage pulsing journey flow with real screen tooltips)
 * 06. Results & Testimonials (Hidden until verified live data, placeholder in code)
 * 07. Benefits Modules (6 cards in 3x2 grid with live UI previews and audience chips)
 * 08. AI Assistant Spotlight (Interactive 3-chip demo, differentiator chip)
 * 09. Discover & Create Spotlight (Split view, 8 niche category chips)
 * 10. Page Builder Spotlight (Niche quiz, 74/100 audit health card)
 * 11. Instagram Automation Spotlight (DM phone flow, 3am sale card, Meta safety)
 * 12. Store & Commerce Spotlight (3 product cards, vyralify.io/u/username, winning products)
 * 13. How It Works + Two Paths (Segmented toggle: Scratch vs Existing Page)
 * 14. Pricing & Comparison Table (30% annual toggle, Pro center hero, 24-row comparison)
 * 15. FAQ (11 accordion questions with green +/- toggles)
 * 16. Final CTA ("Your Instagram business starts today.", green radial glow)
 * 17. 5-Column Footer (Brand, Product, Company, Resources, Legal with Data Deletion)
 */

export default function LandingPage({ onLoginSuccess }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedStartingPath, setSelectedStartingPath] = useState('scratch');

  const handleStartFree = (path = 'scratch') => {
    setSelectedStartingPath(path);
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleSelectPlan = (planName) => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleSelectPath = (path) => {
    setSelectedStartingPath(path);
    const target = document.getElementById('two-paths');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white selection:bg-[#23E598]/30 selection:text-white font-sans antialiased">
      
      {/* 01. TOP ANNOUNCEMENT STRIP */}
      <TopStrip />

      {/* 01. STICKY NAVBAR */}
      <Navbar 
        onStartFree={() => handleStartFree('scratch')}
        onLogin={handleLogin}
        onSelectPath={handleSelectPath}
      />

      {/* 02. HERO SECTION */}
      <Hero 
        onStartFree={() => handleStartFree('scratch')}
        onWatchDemo={() => setIsDemoModalOpen(true)}
        onSelectPath={handleSelectPath}
      />

      {/* 03. TRUST STRIP & METRICS */}
      <TrustStrip />

      {/* 04. PROBLEM & SOLUTION */}
      <ProblemSolution />

      {/* 05. THE SYSTEM (6-STAGE JOURNEY) */}
      <SystemJourney />

      {/* ============================================================== */}
      {/* 06. RESULTS & TESTIMONIALS (SECTION HIDDEN IN CODE PER SPEC) */}
      {/* // RESULTS SECTION — activate when real testimonials available */}
      {/* ============================================================== */}

      {/* 07. BENEFITS MODULES (6 CARDS GRID) */}
      <BenefitsGrid />

      {/* 08 - 12. PRODUCT SPOTLIGHTS (AI, DISCOVER/CREATE, BUILDER, AUTOMATION, STORE) */}
      <Spotlights 
        onStartFree={() => handleStartFree('scratch')}
      />

      {/* 13. HOW IT WORKS + TWO STARTING PATHS */}
      <TwoPaths 
        activePath={selectedStartingPath}
        onSelectPath={(path) => handleStartFree(path)}
      />

      {/* 14. PRICING & COMPARISON TABLE */}
      <PricingSection 
        onSelectPlan={handleSelectPlan}
      />

      {/* 15. FAQ (11 ACCORDION QUESTIONS) */}
      <FAQSection 
        onContactClick={handleLogin}
      />

      {/* 16. FINAL CTA */}
      <FinalCTA 
        onStartFree={() => handleStartFree('scratch')}
        onWatchDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 17. 5-COLUMN FOOTER */}
      <Footer 
        onOpenAuth={handleStartFree}
      />

      {/* INTERACTIVE DEMO MODAL */}
      <WatchDemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartFree={() => handleStartFree('scratch')}
      />

      {/* STICKY MOBILE BOTTOM BAR */}
      <StickyMobileCTA 
        onStartFree={() => handleStartFree('scratch')}
      />

      {/* AUTHENTICATION MODAL */}
      <AuthModal 
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(mode) => {
          if (onLoginSuccess) onLoginSuccess(mode);
        }}
      />
    </div>
  );
}
