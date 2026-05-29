import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getPopularCalculators } from "@/lib/calculators/registry";

export function PopularCalculatorsSection() {
  const popular = getPopularCalculators();

  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Ferramentas populares"
            subtitle="As ferramentas mais usadas para começar sua jornada de evolução."
            className="mb-0"
          />
          <Button asChild variant="outline">
            <Link href="/calculadoras">
              Ver todas
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </div>
    </section>
  );
}
