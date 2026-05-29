import { CategoryBadge } from "@/components/calculators/category-badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { buildCalculatorBreadcrumbItems } from "@/lib/seo/json-ld/breadcrumb";
import type { Calculator } from "@/lib/calculators/types";

type CalculatorHeroProps = {
  calculator: Calculator;
};

export function CalculatorHero({ calculator }: CalculatorHeroProps) {
  const Icon = calculator.icon;
  const breadcrumbItems = buildCalculatorBreadcrumbItems(calculator.title);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-primary/10 flex size-14 items-center justify-center rounded-2xl">
            <Icon className="text-primary size-7" strokeWidth={2} />
          </div>
          <CategoryBadge category={calculator.category} />
        </div>
        <h1>{calculator.title}</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          {calculator.description}
        </p>
      </div>
    </div>
  );
}
