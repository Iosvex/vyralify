import React, { useState } from 'react';
import LegalModal from './LegalModal';

/**
 * Section 17: FOOTER
 * Specification:
 * - Background: #0A0A0A
 * - Border top: 1px solid #1F1F1F
 * - Padding: 80px 0 40px
 * - Layout: 5 columns
 *   Col 1: Brand (25%): Logo, tagline "The AI OS for Instagram Creators", social icons (IG, X, YT, TikTok)
 *   Col 2: Product: Vyralify AI · Discover & Create · Page Builder · Instagram Automation · Store & Commerce · Pricing
 *   Col 3: Company: About · Blog · Careers · Contact · Press
 *   Col 4: Resources: Help Center · Documentation · Creator Stories · Community · Status
 *   Col 5: Legal: Terms of Service · Privacy Policy · Cookie Policy · Refund Policy · Data Deletion
 * - Bottom Bar: "© {year} Vyralify. All rights reserved." + "Made for creators, by creators."
 */

export default function Footer({ onNavigateSection, onOpenAuth }) {
  const [legalModal, setLegalModal] = useState({ isOpen: false, tab: 'terms' });
  const currentYear = new Date().getFullYear();

  const openLegal = (tab) => {
    setLegalModal({ isOpen: true, tab });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#1F1F1F] pt-20 pb-10 px-5 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 mb-16">
          
          {/* Column 1: Brand (lg:col-span-4 or 3.5, ~25-30%) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <div className="flex items-center mb-4">
              <img 
                src="/vyralify-logo-white.png" 
                alt="Vyralify" 
                className="h-7 w-auto object-contain" 
              />
            </div>
            
            <p className="text-[13px] text-[#555555] leading-relaxed mb-6 max-w-xs">
              The AI OS for Instagram Creators. Build, grow, automate, and monetize — all in one platform.
            </p>

            {/* Social Icons (Instagram, X, YouTube, TikTok) */}
            <div className="flex items-center gap-3 text-[#555555]">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#161616] border border-[#222222] flex items-center justify-center hover:text-white hover:border-[#23E598] transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X"
                className="w-8 h-8 rounded-full bg-[#161616] border border-[#222222] flex items-center justify-center hover:text-white hover:border-[#23E598] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#161616] border border-[#222222] flex items-center justify-center hover:text-white hover:border-[#23E598] transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-[#161616] border border-[#222222] flex items-center justify-center hover:text-white hover:border-[#23E598] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-[0.1em] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              <li><a href="#ai-assistant" className="hover:text-white transition-colors">Vyralify AI</a></li>
              <li><a href="#discover-create" className="hover:text-white transition-colors">Discover & Create</a></li>
              <li><a href="#page-builder" className="hover:text-white transition-colors">Page Builder</a></li>
              <li><a href="#automation" className="hover:text-white transition-colors">Instagram Automation</a></li>
              <li><a href="#store" className="hover:text-white transition-colors">Store & Commerce</a></li>
              <li><a href="#pricing" className="hover:text-[#23E598] transition-colors font-medium">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-[0.1em] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); openLegal('terms'); }} className="hover:text-white transition-colors">About</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); alert('Vyralify Creator Blog launching soon with algorithm guides!'); }} className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); alert('We are hiring remote AI engineers and growth strategists! Email careers@vyralify.io'); }} className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); openLegal('contact'); }} className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#press" onClick={(e) => { e.preventDefault(); openLegal('contact'); }} className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-[0.1em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              <li><a href="#help" onClick={(e) => { e.preventDefault(); openLegal('contact'); }} className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#docs" onClick={(e) => { e.preventDefault(); openLegal('terms'); }} className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#stories" onClick={(e) => { e.preventDefault(); alert('Creator stories and case studies available inside dashboard.'); }} className="hover:text-white transition-colors">Creator Stories</a></li>
              <li><a href="#community" onClick={(e) => { e.preventDefault(); alert('Join 10K+ creators in the official Vyralify Creator Community.'); }} className="hover:text-white transition-colors">Community</a></li>
              <li><span className="inline-flex items-center gap-1.5 text-xs text-[#23E598]"><span className="w-1.5 h-1.5 rounded-full bg-[#23E598] animate-pulse" /> All Systems Operational</span></li>
            </ul>
          </div>

          {/* Column 5: Legal (Meta compliance requirement) */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold text-white uppercase tracking-[0.1em] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#666666]">
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('cookies')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('refund')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('deletion')} className="text-[#23E598] hover:underline transition-colors cursor-pointer text-left font-medium">
                  Data Deletion
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#555555]">
          <p>© {currentYear} Vyralify. All rights reserved.</p>
          <p>Made for creators, by creators.</p>
        </div>
      </div>

      {/* Meta-compliant Legal Modal for Terms, Privacy, Deletion, Cookies, Refund */}
      <LegalModal 
        isOpen={legalModal.isOpen} 
        initialTab={legalModal.tab} 
        onClose={() => setLegalModal({ isOpen: false, tab: 'terms' })} 
      />
    </footer>
  );
}
