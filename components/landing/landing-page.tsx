"use client";

import HeroSection from "@/components/landing/hero-section";
import SocialProof from "@/components/landing/social-proof";
import AiToolsSection from "@/components/landing/ai-tools-section";
import HowItWorks from "@/components/landing/how-it-works";
import FeaturesSection from "@/components/landing/features-section";
import EverythingInside from "@/components/landing/everything-inside";
import WhyVyralify from "@/components/landing/why-vyralify";
import Community from "@/components/landing/community";
import Testimonials from "@/components/landing/testimonials";
import PricingSection from "@/components/landing/pricing-section";
import FaqSection from "@/components/landing/faq-section";
import FinalCta from "@/components/landing/final-cta";

export default function LandingPage() {
  return (
    <main className="bg-[#f5f3ef]">
      <HeroSection />
      <SocialProof />
      <AiToolsSection />
      <HowItWorks />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="everything-inside">
        <EverythingInside />
      </div>
      <WhyVyralify />
      <div id="community">
        <Community />
      </div>
      <Testimonials />
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <FinalCta />
    </main>
  );
}
