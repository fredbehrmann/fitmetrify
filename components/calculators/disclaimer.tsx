import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type DisclaimerProps = {
  className?: string;
};

export function Disclaimer({ className }: DisclaimerProps) {
  return (
    <div
      className={cn(
        "glass-card flex gap-3 p-5 text-sm text-muted-foreground",
        className
      )}
    >
      <AlertCircle className="text-primary mt-0.5 size-5 shrink-0" />
      <p>
        Os resultados são estimativas educativas e não substituem avaliação de
        médico, nutricionista ou profissional de educação física.
      </p>
    </div>
  );
}
