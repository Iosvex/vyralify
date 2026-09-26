import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, tab: 'terms' });

  return (
    <footer className="relative bg-black text-white border-t border-[#1C1C20] overflow-hidden">
      
      {/* FINAL CTA SECTION (Black background with subtle green glow) */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1C1C20]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D1FE17]/[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-[#242426] text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-xl bg-[#D1FE17]" />
            <span>GET STARTED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            Your Instagram Business Starts Today.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Build a page, grow with AI, or start clipping for pay: no experience, no page, and no cost to begin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
            <a
              href="#pricing"
              className="px-7 py-3.5 rounded-xl bg-[#D1FE17] text-black font-semibold text-sm hover:bg-[#bbf00e] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clip-and-earn"
              className="px-7 py-3.5 rounded-xl bg-[#121215] hover:bg-[#1E1E24] text-white border border-[#24242A] font-semibold text-sm transition-all flex items-center gap-2"
            >
              <span>Browse Campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs font-mono text-neutral-500">
            Free to start · No credit card required · Clipping always free
          </p>
        </div>
      </div>

      {/* 5-COLUMN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#D1FE17] flex items-center justify-center text-black font-bold text-xs">
                V
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">Vyralify</span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              The Operating System for Creator Businesses.
            </p>

            <div className="flex items-center gap-3 text-neutral-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#D1FE17] transition-colors p-1" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#D1FE17] transition-colors p-1" aria-label="X">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#D1FE17] transition-colors p-1" aria-label="YouTube">
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#D1FE17] transition-colors p-1" aria-label="Discord">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#features" className="hover:text-[#D1FE17] transition-colors">Vyralify AI</a></li>
              <li><a href="#features" className="hover:text-[#D1FE17] transition-colors">Discover</a></li>
              <li><a href="#features" className="hover:text-[#D1FE17] transition-colors">Create</a></li>
              <li><a href="#clip-and-earn" className="hover:text-[#D1FE17] transition-colors">Campaigns & Clipping</a></li>
              <li><a href="#features" className="hover:text-[#D1FE17] transition-colors">Monetize</a></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#about" className="hover:text-[#D1FE17] transition-colors">About</a></li>
              <li><a href="#pricing" className="hover:text-[#D1FE17] transition-colors">Pricing</a></li>
              <li><a href="#pricing" className="hover:text-[#D1FE17] transition-colors">Vyralify+</a></li>
              <li><a href="#careers" className="hover:text-[#D1FE17] transition-colors">Careers</a></li>
              <li><a href="mailto:support@vyralify.in" className="hover:text-[#D1FE17] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#blog" className="hover:text-[#D1FE17] transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-[#D1FE17] transition-colors">Help Center / FAQs</a></li>
              <li><a href="#community" className="hover:text-[#D1FE17] transition-colors">Community</a></li>
              <li><a href="#case-studies" className="hover:text-[#D1FE17] transition-colors">Creator Stories</a></li>
            </ul>
          </div>

          {/* Column 5 - Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button 
                  onClick={() => setLegalModal({ isOpen: true, tab: 'terms' })} 
                  className="hover:text-[#D1FE17] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal({ isOpen: true, tab: 'privacy' })} 
                  className="hover:text-[#D1FE17] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal({ isOpen: true, tab: 'refund' })} 
                  className="hover:text-[#D1FE17] transition-colors text-left cursor-pointer"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal({ isOpen: true, tab: 'cookies' })} 
                  className="hover:text-[#D1FE17] transition-colors text-left cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR + MANDATORY DISCLAIMER */}
        <div className="pt-8 border-t border-[#1C1C20] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
            <div>
              © 2026 Vyralify. All rights reserved.
            </div>
            <div>
              Made for creators, clippers & brands.
            </div>
          </div>

          {/* Mandatory Google Doc Disclaimer */}
          <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#1E1E24] text-[11px] leading-relaxed text-neutral-400">
            <strong className="text-neutral-300">Disclaimer:</strong> Vyralify is not affiliated with or endorsed by Instagram, Meta, or any third party. We do not guarantee views, followers, earnings, sales, or specific results.
          </div>
        </div>

      </div>

      {/* Interactive Comprehensive Legal Center Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        initialTab={legalModal.tab}
      />
    </footer>
  );
}
