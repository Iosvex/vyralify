import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ChevronDown, ChevronUp, Zap, HelpCircle, Lock } from 'lucide-react';

/**
 * Section 14: PRICING + COMPARISON TABLE
 * Specification:
 * - Background: #FFFFFF (white body)
 * - Padding: 100px 0
 * - Section Label: "PRICING" — 12px, #23E598, uppercase, centered
 * - Headline: "Simple pricing. Start free." 40px, 700, #0A0A0A, centered
 * - Subheading: "Free to start, upgrade when you're ready to scale. No hidden fees." 16px, #666666, centered
 * - "Just want to try it? Start Free →" text link under subheading
 * - Billing Toggle: Monthly vs Annually (Save 30%)
 * - Currency Toggle: INR (₹) / USD ($)
 * - 3 Cards: Free (Starter) | Pro (Most Popular / 2px #23E598 border / Recommended) | Elite
 * - Trust row: "✓ No credit card required · ✓ Cancel anytime · ✓ Instant access"
 * - Collapsible 24-Row Comparison Table
 */

export default function PricingSection({ onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [showTable, setShowTable] = useState(false);

  const isAnnual = billingCycle === 'annual';

  const prices = {
    INR: {
      free: { price: '₹0', period: 'forever free' },
      pro: {
        monthly: '₹499',
        annual: '₹415',
        billedAnnual: '₹4,988/yr'
      },
      elite: {
        monthly: '₹1,499',
        annual: '₹1,249',
        billedAnnual: '₹14,988/yr'
      }
    },
    USD: {
      free: { price: '$0', period: 'forever free' },
      pro: {
        monthly: '$9',
        annual: '$7.50',
        billedAnnual: '$90/yr'
      },
      elite: {
        monthly: '$25',
        annual: '$21',
        billedAnnual: '$252/yr'
      }
    }
  };

  const currentPrices = prices[currency];

  const handlePlanClick = (planName) => {
    if (onSelectPlan) {
      onSelectPlan(planName, billingCycle);
    }
  };

  // Full feature table rows from specification
  const comparisonData = [
    { category: 'Core & Account', features: [
      { name: 'Connected pages', free: '1', pro: 'Up to 3', elite: 'Unlimited' },
      { name: 'AI credits (Assistant & Content)', free: '20 / day', pro: '300 / day', elite: 'Unlimited' },
      { name: 'Vyralify AI', free: 'Limited (basic Q&A)', pro: 'Full (deep analysis, strategy)', elite: 'Full + priority speed' },
      { name: 'Media upload in AI chat', free: '3 / month', pro: '50 / month', elite: 'Unlimited' },
      { name: 'Conversation history', free: 'Last 5', pro: 'Unlimited', elite: 'Unlimited' },
    ]},
    { category: 'Page Builder', features: [
      { name: 'Niche selector', free: '✓', pro: '✓', elite: '✓' },
      { name: 'New page setup wizard', free: '✓', pro: '✓', elite: '✓' },
      { name: 'Import and page audit', free: '1 audit', pro: 'Unlimited re-audits', elite: 'Unlimited + priority depth' },
      { name: 'Audience demographics', free: 'Basic', pro: 'Full', elite: 'Full + CSV export' },
    ]},
    { category: 'Discover & Create', features: [
      { name: 'Trending feed and search', free: 'Limited filters', pro: 'Full filters', elite: 'Full + early trend access' },
      { name: 'Competitor tracking', free: '1 competitor', pro: '10 competitors', elite: 'Unlimited' },
      { name: 'Niche viral database', free: 'View only', pro: 'Full access', elite: 'Full access' },
      { name: 'Hooks, scripts & captions generator', free: 'Limited (uses daily credits)', pro: 'Full', elite: 'Full + unlimited' },
      { name: 'Content planner', free: '7-day', pro: '30-day', elite: '30-day + AI auto-fill' },
      { name: 'Post scheduling & calendar', free: 'Manual reminder', pro: 'Auto-publish', elite: 'Auto-publish + bulk scheduling' },
      { name: 'Saved & research library', free: '10 items', pro: 'Unlimited', elite: 'Unlimited' },
      { name: 'Templates library', free: 'Limited set', pro: 'Full library', elite: 'Full library + exclusive templates' },
    ]},
    { category: 'Store & Commerce', features: [
      { name: 'Link-in-bio storefront', free: '1 product', pro: 'Unlimited products', elite: 'Unlimited + custom branding' },
      { name: 'Winning products library', free: 'View only', pro: 'Full access', elite: 'Full access + priority drops' },
      { name: 'Orders & customer management', free: 'Basic (view only)', pro: 'Full', elite: 'Full + CSV export' },
      { name: 'Sales analytics', free: 'Basic (total sales)', pro: 'Full funnel analytics', elite: 'Full + export' },
      { name: 'White Label AI Assistant resale', free: '—', pro: '—', elite: 'Exclusive to Elite' },
    ]},
    { category: 'Support & Extras', features: [
      { name: 'Customer support', free: 'Help Center', pro: 'Email support', elite: 'Priority 24/7 support' },
    ]}
  ];

  return (
    <section id="pricing" className="bg-[#FFFFFF] text-[#0A0A0A] py-24 px-5 md:px-10 border-t border-[#EBEBEB]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[12px] font-bold text-[#1DCC84] tracking-[0.18em] uppercase inline-block mb-3">
            PRICING
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-[#0A0A0A] tracking-tight leading-tight mb-4">
            Simple pricing. Start free.
          </h2>
          <p className="text-[#666666] text-sm md:text-base mb-2">
            Free to start, upgrade when you're ready to scale. No hidden fees.
          </p>
          <button
            onClick={() => handlePlanClick('free')}
            className="text-sm font-semibold text-[#1DCC84] hover:text-[#18A96E] transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            Just want to try it? Start Free &rarr;
          </button>
        </div>

        {/* Toggles: Billing Cycle & Currency */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          {/* Monthly / Annual Toggle */}
          <div className="inline-flex p-1 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-[#0A0A0A] shadow-xs'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? 'bg-white text-[#0A0A0A] shadow-xs'
                  : 'text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              <span>Annually</span>
              <span className="px-2 py-0.5 rounded-full bg-[#23E598]/20 text-[#0F8A55] text-[11px] font-bold uppercase tracking-wider">
                Save 30%
              </span>
            </button>
          </div>

          {/* Currency Toggle (INR / USD) */}
          <div className="inline-flex p-1 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] text-xs font-semibold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-white text-[#0A0A0A] shadow-xs' : 'text-[#666666]'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-white text-[#0A0A0A] shadow-xs' : 'text-[#666666]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards [RULE 6]: Elite (Left Anchor), Pro (Center Hero), Free (Right Entry) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Card A: Elite (Left — Anchor) */}
          <div className="order-1 rounded-2xl bg-[#F9F9F9] border border-[#EBEBEB] hover:border-[#D5D5D5] p-8 md:p-9 flex flex-col justify-between shadow-xs transition-all duration-200">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-1">Elite</h3>
                <p className="text-xs text-[#666666]">For scaling creators and multi-page businesses</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0A0A0A]">
                    {isAnnual ? currentPrices.elite.annual : currentPrices.elite.monthly}
                  </span>
                  <span className="text-xs text-[#666666]">/ month</span>
                </div>
                <p className="text-xs text-[#0F8A55] mt-1 font-semibold">
                  {isAnnual ? `Billed annually at ${currentPrices.elite.billedAnnual} (Save 30%)` : 'Billed monthly'}
                </p>
              </div>

              <div className="pt-6 border-t border-[#EBEBEB] space-y-3.5">
                <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">
                  Everything in Pro, plus:
                </p>
                {[
                  'Unlimited pages',
                  'Unlimited AI credits',
                  'Full + priority response speed',
                  'Unlimited media uploads',
                  '30-Day Planner + AI auto-fill',
                  'Bulk scheduling',
                  'White Label AI Resale',
                  'Priority support + early access'
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1DCC84] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-[#444444]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EBEBEB]">
              <button
                onClick={() => handlePlanClick('elite')}
                className="w-full py-3 px-5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white font-bold text-xs md:text-sm transition-all duration-200 cursor-pointer text-center"
              >
                Start Elite Free &rarr;
              </button>
            </div>
          </div>

          {/* Card B: Pro (Center — Hero) [RULE 6] */}
          <div className="order-2 rounded-2xl bg-[#FFFFFF] border-2 border-[#23E598] p-8 md:p-9 flex flex-col justify-between shadow-[0_12px_40px_rgba(35,229,152,0.15)] relative -translate-y-2 lg:-translate-y-3 transition-all duration-200">
            {/* Recommended / Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#23E598] text-[#0A0A0A] text-[11px] font-extrabold uppercase tracking-widest shadow-md">
              Most Popular
            </div>

            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-[#0A0A0A]">Pro</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#23E598]/20 text-[#0E7A4A] text-[10px] font-bold uppercase">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#555555]">For creators serious about growing and earning</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A]">
                    {isAnnual ? currentPrices.pro.annual : currentPrices.pro.monthly}
                  </span>
                  <span className="text-xs text-[#666666]">/ month</span>
                </div>
                <p className="text-xs text-[#0F8A55] mt-1 font-semibold">
                  {isAnnual ? `Billed annually at ${currentPrices.pro.billedAnnual} (Save 30%)` : 'Billed monthly'}
                </p>
              </div>

              <div className="pt-6 border-t border-[#F0F0F0] space-y-3.5">
                <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">
                  Everything in Free, plus:
                </p>
                {[
                  'Up to 3 pages',
                  '300 AI credits / day',
                  'Full Discover & Create',
                  '10 competitor tracking',
                  'Full 30-Day Content Planner',
                  'Auto-publish scheduling',
                  'Unlimited store products',
                  'Full order & customer management',
                  'Email support'
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1DCC84] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-[#111111] font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
              <button
                onClick={() => handlePlanClick('pro')}
                className="w-full py-3.5 px-6 rounded-full bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-extrabold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#23E598]/25 cursor-pointer text-center"
              >
                Start Pro Free &rarr;
              </button>
            </div>
          </div>

          {/* Card C: Free (Right — Entry) [RULE 6] */}
          <div className="order-3 rounded-2xl bg-[#F9F9F9] border border-[#EBEBEB] hover:border-[#D5D5D5] p-8 md:p-9 flex flex-col justify-between shadow-xs transition-all duration-200">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-1">Free</h3>
                <p className="text-xs text-[#666666]">For creators just getting started</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0A0A0A]">{currentPrices.free.price}</span>
                  <span className="text-xs text-[#666666]">/ month</span>
                </div>
                <p className="text-xs text-[#888888] mt-1 font-medium">Forever free · No credit card required</p>
              </div>

              <div className="pt-6 border-t border-[#EBEBEB] space-y-3.5">
                {[
                  '1 connected page',
                  '20 AI credits / day',
                  'Basic Discover & Create',
                  '1 competitor tracking',
                  '7-day content planner',
                  '1 product in store'
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1DCC84] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-[#444444]">{feat}</span>
                  </div>
                ))}

                {/* Locked items shown with lock icon + Pro/Elite tag (Rule 6) */}
                {[
                  { name: 'Up to 3 Connected Pages', plan: 'Pro' },
                  { name: 'Auto-publish scheduling', plan: 'Pro' },
                  { name: 'White Label AI Resale', plan: 'Elite' }
                ].map((feat, i) => (
                  <div key={i} className="flex items-center justify-between gap-2.5 opacity-60">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-3.5 h-3.5 text-[#888888] shrink-0" />
                      <span className="text-xs md:text-sm text-[#777777] line-through decoration-[#AAAAAA]">{feat.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#777777] bg-[#EBEBEB] px-1.5 py-0.5 rounded border border-[#D5D5D5]">
                      {feat.plan}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EBEBEB]">
              <button
                onClick={() => handlePlanClick('free')}
                className="w-full py-3 px-5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white font-bold text-xs md:text-sm transition-all duration-200 cursor-pointer text-center"
              >
                Start for Free &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Trust Row Below Cards */}
        <p className="text-center text-xs md:text-sm text-[#888888] font-medium mt-10">
          ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Instant access after signup
        </p>

        {/* Collapsible Full Feature Comparison Table */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center">
            <button
              onClick={() => setShowTable(!showTable)}
              className="inline-flex items-center gap-1 text-[14px] font-bold text-[#16A34A] hover:text-[#0F8A55] hover:underline transition-colors cursor-pointer"
            >
              <span>{showTable ? 'Hide full comparison ▴' : 'See full comparison ▾'}</span>
            </button>
          </div>

          {showTable && (
            <div className="mt-8 overflow-x-auto rounded-xl border border-[#E5E5E5] bg-white shadow-sm">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] text-[#0A0A0A] sticky top-0 z-10">
                    <th className="py-4 px-6 font-bold w-2/5">Feature / Module</th>
                    <th className="py-4 px-4 font-bold text-center w-1/5 text-[#666666]">Free (Starter)</th>
                    <th className="py-4 px-4 font-bold text-center w-1/5 text-[#0F8A55] bg-[#23E598]/10">Pro (₹499)</th>
                    <th className="py-4 px-4 font-bold text-center w-1/5 text-[#0A0A0A]">Elite (₹1,499)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {comparisonData.map((cat, cIdx) => (
                    <React.Fragment key={cIdx}>
                      <tr className="bg-[#F8F9FA]">
                        <td colSpan={4} className="py-2.5 px-6 font-bold text-[11px] text-[#666666] uppercase tracking-wider">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.features.map((feat, fIdx) => (
                        <tr key={fIdx} className="hover:bg-[#FDFDFD]">
                          <td className="py-3 px-6 text-[#222222] font-medium">{feat.name}</td>
                          <td className="py-3 px-4 text-center text-[#555555]">{feat.free}</td>
                          <td className="py-3 px-4 text-center font-semibold text-[#0A0A0A] bg-[#23E598]/5">{feat.pro}</td>
                          <td className="py-3 px-4 text-center text-[#222222]">{feat.elite}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
