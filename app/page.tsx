import type { Metadata } from "next";

import { HeroSection } from "@/components/home/hero-section";
import { CalculatorSearch } from "@/components/home/calculator-search";
import { CategoryNav } from "@/components/home/category-nav";
import { PopularCalculatorsSection } from "@/components/home/popular-calculators-section";
import { CategorySections } from "@/components/home/category-sections";
import { PortalAboutSection } from "@/components/home/portal-about-section";
import { SeoLinksSection } from "@/components/home/seo-links-section";
import { HealthTipsSection } from "@/components/home/health-tips-section";
import { BottomCtaSection } from "@/components/home/bottom-cta-section";

export const metadata: Metadata = {
  title: "Calculadoras Fitness, Nutrição e Treino Grátis",
  description:
    "Calcule IMC, TMB, macros, pace e 1RM gratuitamente. Portal de calculadoras fitness para emagrecimento, nutrição, corrida e musculação.",
  keywords: [
    "calculadora IMC",
    "calculadora TMB",
    "calculadora macros",
    "calculadora pace",
    "calculadora 1RM",
    "calculadoras fitness",
    "calculadora proteína",
    "gasto calórico",
  ],
  openGraph: {
    title: "FitMetrify | Calculadoras Fitness, Nutrição e Treino Grátis",
    description:
      "Portal gratuito de calculadoras para emagrecimento, nutrição, corrida e musculação. Resultados instantâneos.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function HomePage() {
  return (
    <>
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
