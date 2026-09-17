import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopStrip from './components/TopStrip';
import DynamicIslandNavbar from './components/DynamicIslandNavbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import ClipAndEarn from './components/ClipAndEarn';
import { CaseStudyFlipStack } from './components/ui/case-study-flip-stack';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { useGsapScrollParallax } from './hooks/useGsapScrollParallax';

export default function App() {
  // Activate GSAP parallax scrolling across sections
  useGsapScrollParallax();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white flex flex-col font-sans selection:bg-[#D1FE17] selection:text-black transition-colors duration-200">
        {/* TOP ANNOUNCEMENT BAR */}
        <TopStrip />

        {/* DYNAMIC ISLAND FLOATING NAVBAR */}
        <DynamicIslandNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {/* SECTION 1: HERO (BUILD. GROW. MONETIZE. with PixelCanvas animation) */}
          <Hero />

          {/* SECTION 2: SOCIAL PROOF & COMMUNITY MARQUEE */}
          <SocialProof />

          {/* SECTION 3: FEATURES (WHAT'S INSIDE — 3x2 Locked Grid) */}
          <Features />

          {/* SECTION 4: CLIP & GET PAID (Discover | Post | Earn Interactive System) */}
          <ClipAndEarn />

          {/* SECTION 5: VERIFIED CREATOR CASE STUDIES */}
          <section id="case-studies" className="relative bg-black border-t border-neutral-200 dark:border-[#1C1C20] overflow-hidden">
            <CaseStudyFlipStack 
              hint="Scroll Down to Flip"
              heading="Verified Creator Case Studies."
              endLabel="Ready to Build Your Empire?"
            />
          </section>

          {/* SECTION 6: PRICING (Free vs. Pro with Billing Toggle) */}
          <Pricing />

          {/* SECTION 7: FAQ (11 Accordion Questions) */}
          <FAQ />
        </main>

        {/* SECTION 8: FINAL CTA & 5-COLUMN FOOTER */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
