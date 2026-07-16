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
import { SectionFlow, Section } from "@/components/sectionflow/core/section-flow";

export default function LandingPage() {
  return (
    <main className="bg-[#f8fbff]">
      <SectionFlow defaultTransition="wave-reveal" className="bg-[#f8fbff]">
        <Section transition="wave-reveal" className="min-h-0 bg-transparent">
          <HeroSection />
        </Section>
        <Section transition="wave-reveal" className="min-h-0 bg-transparent">
          <SocialProof />
        </Section>
        <Section className="min-h-0 bg-transparent">
          <AiToolsSection />
        </Section>
        <Section className="min-h-0 bg-transparent">
          <HowItWorks />
        </Section>
        <Section className="min-h-0 bg-transparent">
          <div id="features">
            <FeaturesSection />
          </div>
        </Section>
        <Section className="min-h-0 bg-transparent">
          <div id="everything-inside">
            <EverythingInside />
          </div>
        </Section>
        <Section className="min-h-0 bg-transparent">
          <WhyVyralify />
        </Section>
        <Section className="min-h-0 bg-transparent">
          <div id="community">
            <Community />
          </div>
        </Section>
        <Section className="min-h-0 bg-transparent">
          <Testimonials />
        </Section>
        <Section className="min-h-0 bg-transparent">
          <div id="pricing">
            <PricingSection />
          </div>
        </Section>
        <Section className="min-h-0 bg-transparent">
          <div id="faq">
            <FaqSection />
          </div>
        </Section>
        <Section className="min-h-0 bg-transparent">
          <FinalCta />
        </Section>
      </SectionFlow>
    </main>
  );
}
