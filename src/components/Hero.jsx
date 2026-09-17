import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';

export default function Hero() {
  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center bg-black text-white overflow-hidden select-none">
      
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND (Lights up on mouse move with trail effect) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelCanvas
          gap={8}
          speed={0.025}
          variant="glow"
          colors={["#D1FE17", "#A3E635", "#38bdf8", "#22d3ee"]}
          className="w-full h-full opacity-80"
        />
      </div>

      {/* Subtle bottom vignette to blend seamlessly into next section */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

      {/* 2. MINIMALIST HERO CONTENT (Direct Match to Reference Mockup) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 text-center pointer-events-none">
        
        {/* Main Giant Headline (CreatorFlow Extra Bold Display) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[86px] font-display font-extrabold text-white tracking-[-0.035em] leading-[1.04]">
          Turn <span className="text-[#D1FE17] font-script text-[1.2em] font-normal inline-block mx-1">viral</span> views into <br className="hidden sm:inline" />
          automated <br className="hidden sm:inline" />
          <span className="text-[#D1FE17] font-script text-[1.2em] font-normal inline-block mr-2">for</span>creator revenue
        </h1>

        {/* Clean Minimalist Subtitle (Regular 400 Sans) */}
        <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto mt-6 sm:mt-8 tracking-[-0.01em]">
          Monetize your content faster with integrated tools, <br className="hidden sm:inline" />
          real-time analytics, and instant cashouts.
        </p>

        {/* Primary Volt Green CTA Button (Semibold 600) */}
        <div className="pt-8 sm:pt-10 flex items-center justify-center pointer-events-auto">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#D1FE17] text-black hover:bg-[#BBF00E] active:scale-[0.97] transition-all font-sans shadow-lg shadow-[#D1FE17]/10 cursor-pointer"
          >
            CREATE ACCOUNT
          </motion.a>
        </div>

      </div>

    </section>
  );
}
