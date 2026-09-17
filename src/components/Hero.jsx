import React from 'react';
import { motion } from 'motion/react';
import { PixelCanvas } from './ui/pixel-canvas';
import { 
  ChevronLeft, 
  Phone, 
  Video, 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Hero() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  ];

  return (
    <section 
      id="hero-section" 
      className="relative w-full min-h-full lg:h-full flex flex-col justify-center bg-black text-white select-none overflow-x-hidden"
    >
      {/* 1. INTERACTIVE PIXEL CANVAS BACKGROUND (Preserved animation) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelCanvas
          gap={10}
          speed={0.02}
          variant="glow"
          colors={["#D1FE17", "#A3E635", "#38bdf8"]}
          className="w-full h-full opacity-40"
        />
      </div>

      {/* Subtle vignette gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />

      {/* MAIN 2-COLUMN HERO CONTAINER: RESPONSIVE ON MOBILE & 100% VIEWPORT ON DESKTOP */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-8 pb-14 sm:py-10 lg:py-2 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          
          {/* LEFT COLUMN: PUNCHY COPY & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow: INSTAGRAM DM AUTOMATION */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 lg:mb-4"
            >
              INSTAGRAM DM AUTOMATION
            </motion.div>

            {/* Headline: Responsive typography (natural wrap on mobile, structured on desktop) */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-[34px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-display font-extrabold text-white tracking-[-0.035em] leading-[1.08] sm:leading-[1.04] mb-3 sm:mb-4"
            >
              More clicks,<br className="hidden sm:inline" />
              {' '}leads, and sales<br className="hidden sm:inline" />
              {' '}from Instagram
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="text-neutral-400 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-lg mb-5 lg:mb-6 font-normal"
            >
              Instagram DM automation that turns comments, story replies, and DMs into instant links, captured emails, and sales, on autopilot. Set it up once, it runs on every post, reel or story.
            </motion.p>

            {/* CTA Button: Get Started Free (full-width on phone, button on tablet/desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mb-5 lg:mb-6"
            >
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-display font-bold text-sm sm:text-base transition-all duration-200 shadow-[0_0_25px_rgba(209,254,23,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
              </a>
            </motion.div>

            {/* Trust Social Proof: [avatars] [20K+] Loved by creators, brands and agencies */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex items-center gap-2.5 mb-8 lg:mb-0"
            >
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                {avatars.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Creator avatar"
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-black object-cover"
                  />
                ))}
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-[#1F1F24] ring-2 ring-black text-[9px] font-bold text-white">
                  20K+
                </div>
              </div>
              <span className="text-xs text-neutral-400 font-medium">
                Loved by creators, brands and agencies
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: IPHONE 16 PRO INSTAGRAM DM AUTOMATION MOCKUP */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            
            {/* Ambient warm / volt glow behind phone */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#D1FE17]/15 blur-[90px] rounded-full pointer-events-none" />

            {/* Phone Outer Shell (Responsive width on mobile, constrained height on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-[280px] sm:w-[320px] lg:w-auto lg:h-[min(510px,calc(100vh-140px))] aspect-[9/18.8] max-w-full rounded-[44px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2A2A30] via-[#141416] to-[#0A0A0C] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(209,254,23,0.08)] border border-[#303038] relative z-10 mx-auto"
            >
              {/* Phone Inner Screen (White Background) */}
              <div className="h-full w-full rounded-[34px] bg-white text-black overflow-hidden flex flex-col relative select-none shadow-inner">
                
                {/* Dynamic Island Notch */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto mt-1.5 flex items-center justify-between px-2 z-20 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#0D0D11]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14142B] border border-blue-900/40" />
                </div>

                {/* Status Bar */}
                <div className="px-5 pt-0.5 pb-1.5 flex items-center justify-between text-[10px] font-semibold text-black tracking-tight shrink-0">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    {/* Signal bars */}
                    <div className="flex items-end gap-0.5 h-2">
                      <span className="w-0.5 h-1 bg-black rounded-full" />
                      <span className="w-0.5 h-1.5 bg-black rounded-full" />
                      <span className="w-0.5 h-2 bg-black rounded-full" />
                    </div>
                    {/* WiFi */}
                    <span className="text-[9px]">5G</span>
                    {/* Battery */}
                    <div className="w-4 h-2 border border-black rounded-xs p-0.5 flex items-center">
                      <div className="w-full h-full bg-black rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Instagram App Chat Header */}
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-neutral-100 bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4 text-black cursor-pointer" />
                    <div className="relative">
                      {/* Gradient Avatar */}
                      <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-0.5 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center text-[9px] font-bold text-neutral-700">
                          NF
                        </div>
                      </div>
                      {/* Active Status Dot */}
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1.5 ring-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-black tracking-tight leading-tight">
                        new_follower
                      </div>
                      <div className="text-[9px] text-neutral-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span>Active now</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-black">
                    <Phone className="w-3.5 h-3.5 text-black cursor-pointer" />
                    <Video className="w-3.5 h-3.5 text-black cursor-pointer" />
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-start bg-white overflow-hidden text-[11px]">
                  {/* Timestamp */}
                  <div className="text-center text-[9px] font-medium text-neutral-400">
                    Today 9:41
                  </div>

                  {/* Message 1: Incoming */}
                  <div className="flex items-end gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-[8px] text-white font-bold shrink-0">
                      NF
                    </div>
                    <div className="bg-[#F0F2F5] text-neutral-900 px-3 py-1.5 rounded-2xl rounded-bl-xs text-[11px] font-normal max-w-[75%] leading-snug">
                      LINK please!
                    </div>
                  </div>

                  {/* Message 2: Automated Outgoing (Blue bubble + button) */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-[#0084FF] text-white px-3 py-2 rounded-2xl rounded-br-xs text-[11px] leading-snug max-w-[88%] shadow-sm">
                      <p className="mb-0.5">Hey! Thanks for commenting 🙌</p>
                      <p>Here's the link you asked for:</p>
                    </div>

                    <a
                      href="#shop"
                      className="inline-flex items-center justify-center gap-1 bg-[#0070E0] hover:bg-[#0060C0] text-white font-semibold text-[10px] px-3.5 py-1 rounded-full shadow-sm"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {/* Message 3: Incoming reaction */}
                  <div className="flex items-end gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-[8px] text-white font-bold shrink-0">
                      NF
                    </div>
                    <div className="bg-[#F0F2F5] text-neutral-900 px-3 py-1.5 rounded-2xl rounded-bl-xs text-[11px] font-normal max-w-[80%] leading-snug">
                      Omg that was instant, thank you!
                    </div>
                  </div>

                  {/* Instant Automation Badge */}
                  <div className="mt-auto self-center pt-1">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-[9px] font-mono">
                      <Sparkles className="w-2 h-2 text-emerald-500" />
                      <span>Automated in 0.4s · 100% On Autopilot</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Input Bar */}
                <div className="p-2 border-t border-neutral-100 bg-white flex items-center gap-1.5 text-neutral-400 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <Camera className="w-3 h-3" />
                  </div>
                  <div className="flex-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-400 text-[10px] flex items-center">
                    Message...
                  </div>
                  <Mic className="w-3.5 h-3.5 text-neutral-500 cursor-pointer" />
                  <ImageIcon className="w-3.5 h-3.5 text-neutral-500 cursor-pointer" />
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
