import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen lg:h-screen lg:max-h-screen w-full overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-black text-white flex flex-col justify-between font-sans selection:bg-[#D1FE17] selection:text-black">
          {/* TOP NAVBAR (CreatorFlow style) */}
          <Navbar />

          {/* MAIN: HERO SECTION (Desktop 100vh locked, Mobile smoothly scrollable) */}
          <main className="flex-1 flex flex-col justify-center w-full relative overflow-y-auto lg:overflow-hidden">
            <Hero />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
