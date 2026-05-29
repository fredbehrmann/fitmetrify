import type { Metadata } from "next";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CATEGORY_LABELS,
  getCalculatorsGroupedByCategory,
  type CalculatorCategory,
} from "@/lib/calculators/registry";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/calculadoras",
  "Calculadoras Fitness e Nutrição",
  "Explore todas as calculadoras FitMetrify para emagrecimento, nutrição, corrida e musculação."
);

export default function CalculadorasPage() {
  const grouped = getCalculatorsGroupedByCategory();
  const categories = Object.keys(grouped) as CalculatorCategory[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Calculadoras" },
        ]}
      />

      <SectionHeading
        title="Todas as calculadoras"
        subtitle="Ferramentas gratuitas para calcular, entender e evoluir com base em métricas confiáveis."
      />

      <div className="space-y-16">
        {categories.map((category) => {
          const items = grouped[category];
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="mb-6 text-2xl font-bold">
                {CATEGORY_LABELS[category]}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calculator) => (
                  <CalculatorCard
                    key={calculator.slug}
                    calculator={calculator}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
