import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getCalculatorBySlug } from "@/lib/calculators/registry";

type CalculatorRecommendationsProps = {
  slugs?: string[];
};

export function CalculatorRecommendations({
  slugs,
}: CalculatorRecommendationsProps) {
  if (!slugs || slugs.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Calculadoras relacionadas"
          subtitle="Continue sua jornada com ferramentas complementares."
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {slugs.map((slug) => {
            const related = getCalculatorBySlug(slug);
            if (!related) return null;
            return (
              <Button key={slug} asChild variant="outline" size="sm">
                <Link href={`/${slug}`}>{related.title}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
