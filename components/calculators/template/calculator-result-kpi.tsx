import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ResultClassification } from "@/lib/calculators/engines/types";

type CalculatorResultKpiProps = {
  value: string;
  unit?: string;
  label?: string;
  className?: string;
};

export function CalculatorResultKpi({
  value,
  unit,
  label,
  className,
}: CalculatorResultKpiProps) {
  return (
    <div className={cn("space-y-2 text-center md:text-left", className)}>
      {label && (
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
      )}
      <p className="text-primary text-5xl leading-none font-extrabold transition-opacity md:text-[72px]">
        {value}
        {unit && (
          <span className="text-muted-foreground ml-2 text-2xl font-semibold md:text-3xl">
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}

const classificationVariants: Record<
  NonNullable<ResultClassification["variant"]>,
  string
> = {
  default: "border-white/10 bg-white/5 text-foreground",
  success: "border-primary/30 bg-primary/10 text-primary",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  danger: "border-red-500/30 bg-red-500/10 text-red-300",
};

export function ResultClassificationBadge({
  classification,
}: {
  classification: ResultClassification;
}) {
  const variant = classification.variant ?? "default";

  return (
    <Badge
      variant="outline"
      className={cn("text-sm", classificationVariants[variant])}
    >
      {classification.label}
    </Badge>
  );
}
