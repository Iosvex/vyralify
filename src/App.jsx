import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DynamicIslandNavbar from './components/DynamicIslandNavbar';
import Hero from './components/Hero';
import { CaseStudyFlipStack } from './components/ui/case-study-flip-stack';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import ClipAndEarn from './components/ClipAndEarn';
import { useGsapScrollParallax } from './hooks/useGsapScrollParallax';

export default function App() {
  // Activate GSAP parallax scrolling across sections
  useGsapScrollParallax();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white flex flex-col font-sans selection:bg-[#D1FE17] selection:text-black transition-colors duration-200">
        {/* DYNAMIC ISLAND FLOATING NAVBAR */}
        <DynamicIslandNavbar />

        {/* PAGE CONTENT: 1 TOPIC PER VIEWPORT/SECTION */}
        <main className="flex-1">
          {/* TOPIC 1: HERO VALUE PROPOSITION (100dvh Full Viewport) */}
          <Hero />

          {/* TOPIC 2: AUDITED ESCROW LEDGER & TRUST (AreaChart + Stat Cards + Live Settlement) */}
          <SocialProof />

          {/* TOPIC 3: 10-SYSTEM CORE ARCHITECTURE */}
          <Features />

          {/* TOPIC 4: CLIPPING BOUNTY PROTOCOL & INCOME CALCULATOR */}
          <ClipAndEarn />

          {/* TOPIC 5: EDITORIAL CASE STUDIES (Moved after 3-4 pages as requested) */}
          <section id="case-studies" className="relative bg-black border-t border-neutral-200 dark:border-[#1C1C20] overflow-hidden">
            <CaseStudyFlipStack 
              hint="Scroll Down to Flip"
              heading="Verified Creator Case Studies."
              endLabel="Ready to Build Your Empire?"
            />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
