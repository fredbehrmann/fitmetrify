import type { ResultKpi } from "@/lib/calculators/engines/types";

import type { BodyFatResult } from "./constants";
import { formatBodyFatPercent, formatMassKg } from "./format";

const METHOD_LABELS = {
  "us-navy": "Marinha dos EUA (US Navy)",
  "jackson-pollock": "Jackson-Pollock (3 dobras)",
} as const;

export function buildInterpretation(result: BodyFatResult): string {
  return `Seu percentual de gordura estimado é ${formatBodyFatPercent(result.bodyFatPercent)}%, com massa gorda de ${formatMassKg(result.fatMassKg)} kg e massa magra de ${formatMassKg(result.leanMassKg)} kg. Método: ${METHOD_LABELS[result.method]}. Estimativas por circunferências ou dobras cutâneas têm margem de erro individual.`;
}

export function buildKpis(result: BodyFatResult): ResultKpi[] {
  return [
    {
      label: "Massa gorda",
      value: formatMassKg(result.fatMassKg),
      unit: "kg",
    },
    {
      label: "Massa magra",
      value: formatMassKg(result.leanMassKg),
      unit: "kg",
    },
    {
      label: "Método",
      value: METHOD_LABELS[result.method],
    },
  ];
}

export function buildNextSteps(): string[] {
  return [
    "Use a massa magra na calculadora de TMB (Katch-McArdle) para estimar gasto calórico.",
    "Combine com a calculadora de proteína para metas baseadas em massa magra.",
  ];
}
