import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCalculatorBySlug } from "@/lib/calculators/registry";

type ResultRelatedLinksProps = {
  slugs: string[];
};

export function ResultRelatedLinks({ slugs }: ResultRelatedLinksProps) {
  if (slugs.length === 0) return null;

  return (
    <div className="space-y-3 border-t border-white/10 pt-6">
      <p className="text-sm font-semibold">Calculadoras relacionadas</p>
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
  );
}
