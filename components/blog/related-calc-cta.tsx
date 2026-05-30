import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCalculatorBySlug } from "@/lib/calculators/registry";

type RelatedCalcCtaProps = {
  slugs?: string[];
};

export function RelatedCalcCTA({ slugs = [] }: RelatedCalcCtaProps) {
  const calculators = slugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((calc): calc is NonNullable<typeof calc> => calc != null)
    .slice(0, 2);

  if (calculators.length === 0) return null;

  return (
    <div className="border-primary/30 bg-primary/5 my-8 rounded-[14px] border p-6">
      <p className="text-primary mb-3 text-xs font-semibold uppercase tracking-wide">
        Calcule agora, gratuitamente
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {calculators.map((calc) => (
          <Button key={calc.slug} asChild className="flex-1">
            <Link href={`/${calc.slug}`}>
              {calc.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
