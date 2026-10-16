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
      q: 'What makes Vyralify AI different from just using ChatGPT?',
      a: 'ChatGPT gives generic responses. Vyralify AI is connected to your real Instagram data — your actual reach, engagement, content history, and niche benchmarks. When you ask it why a Reel underperformed, it looks at your specific numbers, not industry averages. It also links directly to the relevant Vyralify tool to take action immediately.'
    },
    {
      q: 'Can I use Vyralify for multiple Instagram pages?',
      a: 'Yes. Free plan: 1 page. Pro: up to 3 pages. Elite: unlimited pages. Each page has its own analytics, automations, and store, all switchable from one dashboard.'
    },
    {
      q: 'What happens when I hit my AI credit limit?',
      a: "You'll see a notification when you reach 80% of your daily AI credits. At 100%, AI features pause until your next daily reset. You can upgrade to Pro (300/day) or Elite (unlimited) at any time from your account settings."
    },
    {
      q: 'What niches does Vyralify support?',
      a: 'At launch, Vyralify supports 8 major niche categories: Business & Money, Self-Improvement, Health & Fitness, Fashion & Beauty, Cars & Automotive, Travel & Lifestyle, Entertainment, and Sports — with 40+ sub-niches total. The Discover feed, Viral Database, and AI recommendations are all filtered by your chosen niche.'
    },
    {
      q: 'How does the Store & Commerce feature work?',
      a: "You get a link-in-bio storefront at vyralify.io/your-username. Add products (digital files, services, coaching, subscriptions), set your prices, and share the link in your Instagram bio. When someone buys, Vyralify handles the checkout, payment processing, and automatic product delivery — you don't need to do anything manually."
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes. You can cancel from your account settings at any time — no calls required, no hoops to jump through. Your paid plan stays active until the end of your current billing period, then you roll back to Free automatically.'
    },
    {
      q: 'Is my Instagram data safe with Vyralify?',
      a: 'Yes. We only access the permissions you grant via Instagram’s official OAuth. We never store your Instagram password, never sell your data, and never post anything without your explicit permission. You can export or delete your data anytime.'
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
          <span className="text-[12px] font-bold text-[#16A34A] tracking-[0.18em] uppercase inline-block mb-3">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
            Everything you need to know.
          </h2>
          <p className="text-[#666666] text-sm md:text-base">
            Still have questions?{' '}
            <button
              onClick={onContactClick}
              className="text-[#16A34A] hover:text-[#0F8A55] font-semibold underline underline-offset-4 transition-colors cursor-pointer"
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
