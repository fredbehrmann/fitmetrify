import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  getCategoryLinkForSection,
  getHomeSectionCalculators,
  HOME_SECTIONS,
} from "@/lib/home/sections";
import { cn } from "@/lib/utils";

export function CategorySections() {
  return (
    <>
      {HOME_SECTIONS.map((section, index) => {
        const calculators = getHomeSectionCalculators(section);
        const categoryLink = getCategoryLinkForSection(section);

        return (
          <section
            key={section.id}
            id={section.anchor}
            className={cn(
              "scroll-mt-24 py-20",
              index % 2 === 0 ? "bg-background" : "bg-background-secondary"
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  title={section.title}
                  subtitle={section.subtitle}
                  className="mb-0"
                />
                {categoryLink && (
                  <Button asChild variant="outline">
                    <Link href={categoryLink}>
                      Ver todas
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calculator) => (
                  <CalculatorCard
                    key={calculator.slug}
                    calculator={calculator}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
