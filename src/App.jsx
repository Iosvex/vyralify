import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DynamicIslandNavbar from './components/DynamicIslandNavbar';
import Hero from './components/Hero';
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

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {/* 3. HERO */}
          <Hero />

          {/* 4. SOCIAL PROOF */}
          <SocialProof />

          {/* 5. FEATURES */}
          <Features />

          {/* 6. CLIP & GET PAID */}
          <ClipAndEarn />
        </main>
      </div>
    </ThemeProvider>
  );
}
