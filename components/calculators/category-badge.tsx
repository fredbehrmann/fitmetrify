import { CATEGORY_LABELS, type CalculatorCategory } from "@/lib/calculators/registry";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  category: CalculatorCategory;
  className?: string;
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge variant="outline" className={cn("text-tertiary border-white/10", className)}>
      {CATEGORY_LABELS[category]}
    </Badge>
  );
}
