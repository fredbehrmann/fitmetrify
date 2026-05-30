import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type MedicalDisclaimerProps = {
  className?: string;
};

export function MedicalDisclaimer({ className }: MedicalDisclaimerProps) {
  return (
    <div
      className={cn(
        "border-primary/30 bg-primary/5 flex gap-3 rounded-[14px] border p-5 text-sm text-foreground",
        className
      )}
    >
      <AlertCircle className="text-primary mt-0.5 size-5 shrink-0" />
      <p>
        As calculadoras do FitMetrify são ferramentas educativas baseadas em
        fórmulas científicas validadas. Elas{" "}
        <strong>NÃO substituem</strong> avaliação de médico, nutricionista ou
        educador físico habilitado.
      </p>
    </div>
  );
}
