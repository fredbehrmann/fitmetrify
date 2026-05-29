import { notFound } from "next/navigation";

import { CalculatorEducationalContent } from "@/components/calculators/calculator-educational-content";
import { CalculatorFaq } from "@/components/calculators/calculator-faq";
import { Disclaimer } from "@/components/calculators/disclaimer";
import { CalculatorHero } from "@/components/calculators/template/calculator-hero";
import { CalculatorRecommendations } from "@/components/calculators/template/calculator-recommendations";
import { CalculatorTemplate } from "@/components/calculators/template/calculator-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllCalculatorSlugs,
  getCalculatorBySlug,
  isCalculatorSlug,
} from "@/lib/calculators/registry";
import { buildCalculatorMetadata } from "@/lib/seo/build-calculator-metadata";
import { buildCalculatorPageJsonLd } from "@/lib/seo/json-ld/build-calculator-json-ld";
import type { Metadata } from "next";

type CalculatorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCalculatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isCalculatorSlug(slug)) {
    return { title: "Página não encontrada" };
  }

  const calculator = getCalculatorBySlug(slug)!;
  return buildCalculatorMetadata(calculator);
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;

  if (!isCalculatorSlug(slug)) {
    notFound();
  }

  const calculator = getCalculatorBySlug(slug)!;
  const jsonLdGraphs = buildCalculatorPageJsonLd(calculator);

  return (
    <>
      {jsonLdGraphs.map((graph) => (
        <JsonLd key={graph["@type"] as string} data={graph} />
      ))}

      <CalculatorHero calculator={calculator} />
      <CalculatorTemplate
        calculator={{
          slug: calculator.slug,
          simpleMode: calculator.simpleMode,
          advancedMode: calculator.advancedMode,
          inputs: calculator.inputs,
        }}
      />

      <CalculatorEducationalContent calculator={calculator} />
      <CalculatorRecommendations slugs={calculator.relatedSlugs} />

      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <CalculatorFaq items={calculator.faq} />
      </div>

      <div className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Disclaimer />
      </div>
    </>
  );
}
