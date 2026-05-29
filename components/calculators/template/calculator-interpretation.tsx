import { cn } from "@/lib/utils";

type CalculatorInterpretationProps = {
  text: string;
  className?: string;
};

export function CalculatorInterpretation({
  text,
  className,
}: CalculatorInterpretationProps) {
  return (
    <div className={cn("glass-card p-5", className)}>
      <p className="text-tertiary mb-2 text-xs font-semibold uppercase tracking-wider">
        Interpretação
      </p>
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
