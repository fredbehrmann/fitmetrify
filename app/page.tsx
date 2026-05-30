import type { Metadata } from "next";
import { Suspense } from "react";

import { HeroSection } from "@/components/home/hero-section";
import { CalculatorSearch } from "@/components/home/calculator-search";
import { CategoryNav } from "@/components/home/category-nav";
import { PopularCalculatorsSection } from "@/components/home/popular-calculators-section";
import { CategorySections } from "@/components/home/category-sections";
import { PortalAboutSection } from "@/components/home/portal-about-section";
import { SeoLinksSection } from "@/components/home/seo-links-section";
import { HealthTipsSection } from "@/components/home/health-tips-section";
import { BottomCtaSection } from "@/components/home/bottom-cta-section";
import { NewsletterConfirmBanner } from "@/components/home/newsletter-confirm-banner";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/",
  "Calculadoras Fitness, Nutrição e Treino Grátis",
  "Calcule IMC, TMB, macros, pace e 1RM gratuitamente. Portal de calculadoras fitness para emagrecimento, nutrição, corrida e musculação."
);

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <NewsletterConfirmBanner />
      </Suspense>
      <HeroSection />
      <CalculatorSearch />
      <CategoryNav />
      <PopularCalculatorsSection />
      <CategorySections />
      <PortalAboutSection />
      <SeoLinksSection />
      <HealthTipsSection />
      <BottomCtaSection />
    </>
  );
}
