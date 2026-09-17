import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Vyralify?",
      answer: "Vyralify is an all-in-one platform for building, growing, and monetizing your content presence. Discover viral content, create with AI, manage your pages, track performance, find campaigns, clip content, and earn — all from one place."
    },
    {
      question: "Do I need an Instagram page to use Vyralify?",
      answer: "No. You can join campaigns and start clipping even if you don't have your own page. If you want to build a page, Vyralify gives you the tools to start and grow it too."
    },
    {
      question: "Can I use Vyralify just for clipping and campaigns?",
      answer: "Yes. Discover campaigns, find content worth clipping, create and publish your clips, submit them, and track your performance and earnings — without needing to build your own page."
    },
    {
      question: "Is clipping free?",
      answer: "Yes. Campaigns and clipping are free on every plan. You don't need a paid subscription to participate in eligible clipping campaigns."
    },
    {
      question: "How do I get paid from clipping?",
      answer: "Join a campaign, create and publish clips according to its requirements, and submit them through Vyralify. Your eligible performance is tracked and verified, and approved earnings are made available for payout."
    },
    {
      question: "What's included in the Free plan?",
      answer: "The Free plan gives you basic platform access, limited AI credits, basic growth and content tools, community access, and full access to campaigns and clipping."
    },
    {
      question: "What's included in Pro?",
      answer: "Pro gives you everything in Free, plus higher AI usage, advanced analytics and Growth Intelligence, Content Intelligence, monetization tools, White Label AI, and priority support."
    },
    {
      question: "What can Vyralify AI help me with?",
      answer: "Vyralify AI helps you come up with content ideas, hooks, scripts and captions, understand your performance, identify opportunities, and figure out what to do next."
    },
    {
      question: "Can I manage multiple Instagram pages?",
      answer: "Yes. Vyralify is built to help you manage and grow your pages, including content planning, publishing, analytics, and performance tracking."
    },
    {
      question: "Can I cancel my Pro subscription anytime?",
      answer: "Yes, if self-serve cancellation is enabled on your billing setup. You'll retain access through the end of your current billing period."
    },
    {
      question: "How are clipping views and earnings verified?",
      answer: "Campaigns define the requirements for eligible performance. Vyralify tracks submitted content and performance, verifies eligible views, and excludes invalid or artificially generated traffic before earnings are approved."
    }
  ];

  return (
    <section id="faq" className="relative py-20 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
            <span>FAQs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
            Got Questions? We've Got Answers.
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
            Everything you need to know about Vyralify, clipping, campaigns, pricing, and getting started.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-3 mb-14">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-neutral-200 dark:border-[#202025] bg-neutral-50 dark:bg-[#0B0B0D] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 sm:py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen 
                      ? 'bg-[#D1FE17] text-black' 
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800/60 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SUPPORT CTA */}
        <div className="text-center p-8 rounded-2xl bg-neutral-100 dark:bg-[#0E0E12] border border-neutral-200 dark:border-[#202025]">
          <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-1">
            Still have questions?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            We're here to help you get set up and start clipping or scaling.
          </p>
          <a
            href="mailto:support@vyralify.in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
