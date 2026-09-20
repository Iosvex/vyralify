import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-black text-white flex flex-col font-sans selection:bg-[#D1FE17] selection:text-black">
          {/* TOP NAVBAR (PDF Page 1) */}
          <Navbar />

          {/* MAIN: HERO SECTION + DASHBOARD MOCKUP (PDF Page 2 & 3) */}
          <main className="flex-1 flex flex-col justify-start w-full relative">
            <Hero />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
