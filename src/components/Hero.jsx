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
      className="relative min-h-[calc(100vh-80px)] bg-black text-white flex items-center overflow-hidden"
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

      {/* MAIN 2-COLUMN HERO CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: PUNCHY COPY & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow: INSTAGRAM DM AUTOMATION */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6"
            >
              INSTAGRAM DM AUTOMATION
            </motion.div>

            {/* Headline: More clicks, leads, and sales from Instagram */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-display font-extrabold text-white tracking-[-0.04em] leading-[1.03] mb-6"
            >
              More clicks,<br />
              leads, and sales<br />
              from Instagram
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-400 text-base sm:text-lg lg:text-[19px] leading-[1.5] max-w-xl mb-8 font-normal"
            >
              Instagram DM automation that turns comments, story replies, and DMs into instant links, captured emails, and sales, on autopilot. Set it up once, it runs on every post, reel or story.
            </motion.p>

            {/* CTA Button: Get Started Free */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D1FE17] hover:bg-[#bbf00e] text-black font-display font-bold text-base transition-all duration-200 shadow-[0_0_25px_rgba(209,254,23,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
              </a>
            </motion.div>

            {/* Trust Social Proof: [avatars] [20K+] Loved by creators, brands and agencies */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2.5 overflow-hidden">
                {avatars.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Creator avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                  />
                ))}
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#1F1F24] ring-2 ring-black text-[10px] font-bold text-white">
                  20K+
                </div>
              </div>
              <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                Loved by creators, brands and agencies
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: IPHONE 16 PRO INSTAGRAM DM AUTOMATION MOCKUP */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient warm / volt glow behind phone */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#D1FE17]/15 blur-[100px] rounded-full pointer-events-none" />

            {/* Phone Outer Shell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[320px] sm:w-[360px] rounded-[52px] p-3.5 bg-gradient-to-b from-[#2A2A30] via-[#141416] to-[#0A0A0C] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(209,254,23,0.08)] border border-[#303038] relative z-10"
            >
              {/* Phone Inner Screen (White Background) */}
              <div className="rounded-[40px] bg-white text-black overflow-hidden flex flex-col aspect-[9/19.2] relative select-none shadow-inner">
                
                {/* Dynamic Island Notch */}
                <div className="w-28 h-6 bg-black rounded-full mx-auto mt-2.5 flex items-center justify-between px-2.5 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D11]" />
                  <div className="w-2 h-2 rounded-full bg-[#14142B] border border-blue-900/40" />
                </div>

                {/* Status Bar */}
                <div className="px-7 pt-1 pb-2 flex items-center justify-between text-[11px] font-semibold text-black tracking-tight">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* Signal bars */}
                    <div className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 h-1 bg-black rounded-full" />
                      <span className="w-0.5 h-1.5 bg-black rounded-full" />
                      <span className="w-0.5 h-2 bg-black rounded-full" />
                      <span className="w-0.5 h-2.5 bg-black rounded-full" />
                    </div>
                    {/* WiFi */}
                    <span className="text-[10px]">5G</span>
                    {/* Battery */}
                    <div className="w-5 h-2.5 border border-black rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-black rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Instagram App Chat Header */}
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-neutral-100 bg-white">
                  <div className="flex items-center gap-2.5">
                    <ChevronLeft className="w-5 h-5 text-black cursor-pointer" />
                    <div className="relative">
                      {/* Gradient Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-0.5 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-700">
                          NF
                        </div>
                      </div>
                      {/* Active Status Dot */}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black tracking-tight leading-tight">
                        new_follower
                      </div>
                      <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active now</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-black">
                    <Phone className="w-4 h-4 text-black cursor-pointer" />
                    <Video className="w-4 h-4 text-black cursor-pointer" />
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-start bg-white overflow-hidden text-xs">
                  {/* Timestamp */}
                  <div className="text-center text-[10px] font-medium text-neutral-400">
                    Today 9:41
                  </div>

                  {/* Message 1: Incoming */}
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-[9px] text-white font-bold shrink-0">
                      NF
                    </div>
                    <div className="bg-[#F0F2F5] text-neutral-900 px-3.5 py-2 rounded-2xl rounded-bl-xs text-xs font-normal max-w-[70%]">
                      LINK please!
                    </div>
                  </div>

                  {/* Message 2: Automated Outgoing (Blue bubble + button) */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="bg-[#0084FF] text-white px-3.5 py-2.5 rounded-2xl rounded-br-xs text-xs leading-relaxed max-w-[85%] shadow-sm">
                      <p className="mb-1">Hey! Thanks for commenting 🙌</p>
                      <p>Here's the link you asked for:</p>
                    </div>

                    <a
                      href="#shop"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#0070E0] hover:bg-[#0060C0] text-white font-semibold text-xs px-4 py-1.5 rounded-full shadow-sm"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Message 3: Incoming reaction */}
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-[9px] text-white font-bold shrink-0">
                      NF
                    </div>
                    <div className="bg-[#F0F2F5] text-neutral-900 px-3.5 py-2 rounded-2xl rounded-bl-xs text-xs font-normal max-w-[75%] leading-relaxed">
                      Omg that was instant, thank you!
                    </div>
                  </div>

                  {/* Instant Automation Badge */}
                  <div className="mt-auto self-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-mono">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                      <span>Automated in 0.4s · 100% On Autopilot</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Input Bar */}
                <div className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2 text-neutral-400">
                  <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-400 text-xs flex items-center">
                    Message...
                  </div>
                  <Mic className="w-4 h-4 text-neutral-500 cursor-pointer" />
                  <ImageIcon className="w-4 h-4 text-neutral-500 cursor-pointer" />
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
