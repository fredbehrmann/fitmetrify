import type { Calculator } from "@/lib/calculators/types";

export function buildWebApplicationJsonLd(calculator: Calculator, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.title,
    description: calculator.seoDescription,
    url: pageUrl,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    inLanguage: "pt-BR",
  };
}
