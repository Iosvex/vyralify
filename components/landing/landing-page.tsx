"use client";

import { SectionFlow, Section } from "@/components/sectionflow/core/section-flow";
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
    <SectionFlow
      heightPerSection={180}
      restHeight={120}
      className="bg-[#F5F3EF]"
    >
      <Section transition="circular-portal">
        <HeroSection />
      </Section>

      <Section transition="spotlight-reveal">
        <SocialProof />
      </Section>

      <Section transition="wave-reveal">
        <AiToolsSection />
      </Section>

      <Section transition="card-stack">
        <HowItWorks />
      </Section>

      <Section transition="circular-portal">
        <div id="features">
          <FeaturesSection />
        </div>
      </Section>

      <Section transition="spotlight-reveal">
        <div id="everything-inside">
          <EverythingInside />
        </div>
      </Section>

      <Section transition="wave-reveal">
        <WhyVyralify />
      </Section>

      <Section transition="card-stack">
        <div id="community">
          <Community />
        </div>
      </Section>

      <Section transition="circular-portal">
        <Testimonials />
      </Section>

      <Section transition="spotlight-reveal">
        <div id="pricing">
          <PricingSection />
        </div>
      </Section>

      <Section transition="wave-reveal">
        <div id="faq">
          <FaqSection />
        </div>
      </Section>

      <Section>
        <FinalCta />
      </Section>
    </SectionFlow>
  );
}
