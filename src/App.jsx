import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-black text-white flex flex-col font-sans selection:bg-[#3CEB75] selection:text-black">
          {/* TOP NAVBAR (PDF Page 1) */}
          <Navbar />

          {/* MAIN CONTAINER: PAGES 1–10 CONTENT */}
          <main className="flex-1 flex flex-col justify-start w-full relative">
            {/* HERO SECTION + 3D DASHBOARD (PDF Pages 2 & 3) */}
            <Hero />

            {/* SOCIAL PROOF & METRICS (PDF Pages 4, 5, 6, 7) */}
            <SocialProof />

            {/* WHAT'S INSIDE / FEATURES 3x2 GRID (PDF Pages 7, 8, 9, 10) */}
            <Features />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

