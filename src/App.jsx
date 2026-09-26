import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import ClipAndEarn from './components/ClipAndEarn';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize Lenis smooth inertial scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Smooth scroll for all hash links with header offset
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -65, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-black text-white flex flex-col font-sans selection:bg-[#3CEB75] selection:text-black">
          {/* TOP SMOOTH SCROLL PROGRESS BAR */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#16A34A] via-[#3CEB75] to-[#A3E635] z-50 origin-left pointer-events-none shadow-[0_0_12px_rgba(60,235,117,0.7)]"
            style={{ scaleX: smoothProgress }}
          />

          {/* TOP NAVBAR (PDF Page 1) */}
          <Navbar />

          {/* MAIN CONTAINER: PAGES 1–20+ CONTENT */}
          <main className="flex-1 flex flex-col justify-start w-full relative">
            {/* HERO SECTION + 3D DASHBOARD (PDF Pages 2 & 3) */}
            <Hero />

            {/* SOCIAL PROOF & METRICS (PDF Pages 4, 5, 6, 7) */}
            <SocialProof />

            {/* WHAT'S INSIDE / FEATURES 3x2 GRID (PDF Pages 7, 8, 9, 10, 18) */}
            <Features />

            {/* CLIP & GET PAID (PDF Pages 18, 19, 20, 21, 22) */}
            <ClipAndEarn />

            {/* PRICING PLANS (PDF Pages 34 & 35) */}
            <Pricing />

            {/* FREQUENTLY ASKED QUESTIONS (PDF Pages 36 & 37) */}
            <FAQ />
          </main>

          {/* FINAL CTA & FOOTER WITH LEGAL LINKS & DISCLAIMER (PDF Pages 38, 39, 40) */}
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
