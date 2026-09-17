import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopStrip from './components/TopStrip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#D1FE17] selection:text-black">
        {/* TOP ANNOUNCEMENT BAR */}
        <TopStrip />

        {/* TOP NAVBAR (CreatorFlow style) */}
        <Navbar />

        {/* MAIN: HERO SECTION ONLY (Everything below hero removed as requested) */}
        <main className="flex-1 flex flex-col justify-center">
          <Hero />
        </main>
      </div>
    </ThemeProvider>
  );
}
