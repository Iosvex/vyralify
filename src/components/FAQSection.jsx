import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

/**
 * Section 15: FAQ
 * Specification:
 * - Background: #F9F9F9
 * - Padding: 100px 0
 * - Headline: "Everything you need to know." 40px, 700, #0A0A0A, centered
 * - Subheading: "Can't find your answer? Contact us →" 16px, #666666, centered
 * - 11 questions with accordion (+ / - in green)
 * - First item open by default
 */

export default function FAQSection({ onContactClick }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      q: 'What exactly is Vyralify?',
      a: 'Vyralify is an AI-powered toolkit for Instagram creators. It helps you build pages, discover viral content, create posts, automate DMs, and sell products — all in one platform.'
    },
    {
      q: 'Do I need an existing Instagram page to use Vyralify?',
      a: 'No. Vyralify has a complete Page Builder for beginners starting from scratch — niche selector, bio generator, and a step-by-step launch guide. You can start with zero following.'
    },
    {
      q: "Is Vyralify's automation safe? Will it get my account banned?",
      a: "Vyralify's automation is built to stay within Meta's official guidelines. We use rate-limiting and safe messaging patterns — the same methods used by tools like ManyChat, which millions of accounts use safely."
    },
    {
      q: 'What AI model powers Vyralify AI?',
      a: "Vyralify AI is built on top of leading language models and fine-tuned specifically for Instagram growth — niche benchmarks, algorithm behavior, and content strategy. It's not a generic AI wrapper."
    },
    {
      q: 'Can I use Vyralify for multiple Instagram pages?',
      a: 'Yes. Pro supports up to 3 pages, Elite supports unlimited pages. Each page has its own analytics, automations, and store.'
    },
    {
      q: 'What happens when I hit my AI credit limit?',
      a: "You'll see a notification at 80% usage. At 100%, AI features are paused until the next reset. You can upgrade to Pro/Elite for higher limits or unlimited credits."
    },
    {
      q: 'Does Vyralify work for all types of Instagram pages?',
      a: 'Yes — we support 8 niche categories with 40+ sub-niches at launch: Business & Money, Self-Improvement, Health & Fitness, Fashion & Beauty, Cars & Automotive, Travel & Lifestyle, Entertainment, and Sports.'
    },
    {
      q: 'How does the Store & Commerce feature work?',
      a: 'You get a link-in-bio storefront at vyralify.io/your-username. Add products, set prices, and share the link in your Instagram bio. Followers buy directly — Vyralify handles checkout, delivery, and tracking.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes. Cancel from your account settings anytime. Your plan stays active until the end of the current billing period.'
    },
    {
      q: 'Is my Instagram data safe?',
      a: 'Yes. We only access the permissions you grant via Instagram’s official OAuth. We never store your Instagram password and never post anything without your explicit permission.'
    },
    {
      q: 'What does Vyralify need access to on Instagram?',
      a: 'It reads your profile, posts, insights and audience data to power your dashboard and AI. Messaging access is used only for automations you set up and switch on. You see the exact permissions on Meta’s login screen.'
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="bg-[#F9F9F9] text-[#0A0A0A] py-24 px-5 md:px-10 border-t border-[#EBEBEB]">
      <div className="max-w-[860px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[12px] font-bold text-[#1DCC84] tracking-[0.18em] uppercase inline-block mb-3">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
            Everything you need to know.
          </h2>
          <p className="text-[#666666] text-sm md:text-base">
            Can't find your answer?{' '}
            <button
              onClick={onContactClick}
              className="text-[#1DCC84] hover:text-[#18A96E] font-semibold underline underline-offset-4 transition-colors cursor-pointer"
            >
              Contact us &rarr;
            </button>
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EBEBEB] divide-y divide-[#EBEBEB] shadow-xs overflow-hidden">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 md:px-8 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden hover:bg-[#FAFAFA]"
                >
                  <span className="text-base md:text-[17px] font-semibold text-[#0A0A0A] leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#23E598]/20 text-[#0F8A55]' : 'bg-[#F2F2F2] text-[#1DCC84]'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4 font-bold" /> : <Plus className="w-4 h-4 font-bold" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 pt-1 text-[#666666] text-sm md:text-[15px] leading-[1.7]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 text-center p-6 rounded-xl bg-white border border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-semibold text-sm text-[#0A0A0A]">Have more specific questions?</h4>
            <p className="text-xs text-[#666666]">Our team is always here to assist creators with setup and scaling.</p>
          </div>
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#222222] text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
          >
            Chat with Support
          </button>
        </div>
      </div>
    </section>
  );
}
