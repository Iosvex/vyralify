import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <ThemeProvider>
      <div className="h-screen max-h-screen w-screen overflow-hidden bg-black text-white flex flex-col justify-between font-sans selection:bg-[#D1FE17] selection:text-black">
        {/* TOP NAVBAR (CreatorFlow style) */}
        <Navbar />

        {/* MAIN: HERO SECTION FITS 100% IN VIEWPORT (ZERO SCROLLBAR) */}
        <main className="flex-1 flex items-center justify-center overflow-hidden w-full relative">
          <Hero />
        </main>
      </div>
    </ThemeProvider>
  );
}
