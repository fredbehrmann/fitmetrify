import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { AdvancedOneRmResult } from "./calculate-advanced";
import type { SimpleOneRmResult } from "./calculate-simple";
import {
  ONE_RM_METHOD_LABELS,
  STRENGTH_TIER_LABELS,
  type OneRmMethod,
  type StrengthTier,
} from "../strength/constants";
import { formatLoadKg } from "../strength/format";

export function buildSimpleClassification(): ResultClassification {
  return { label: "1RM estimado (Brzycki)", variant: "default" };
}

export function buildAdvancedClassification(): ResultClassification {
  return { label: "Comparação de métodos", variant: "success" };
}

export function buildStrengthClassification(
  tier: StrengthTier
): ResultClassification {
  return {
    label: `Força relativa: ${STRENGTH_TIER_LABELS[tier]}`,
    variant:
      tier === "elite" || tier === "above-average"
        ? "success"
        : tier === "weak"
          ? "warning"
          : "default",
  };
}

export function buildSimpleKpis(result: SimpleOneRmResult): ResultKpi[] {
  return [
    {
      label: "Carga utilizada",
      value: formatLoadKg(result.loadKg),
      unit: `kg × ${result.reps} reps`,
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedOneRmResult): ResultKpi[] {
  return [
    {
      label: "Brzycki",
      value: formatLoadKg(result.estimates.brzycki),
      unit: "kg",
    },
    {
      label: "Epley",
      value: formatLoadKg(result.estimates.epley),
      unit: "kg",
    },
    {
      label: "Lombardi",
      value: formatLoadKg(result.estimates.lombardi),
      unit: "kg",
    },
    {
      label: "Média",
      value: formatLoadKg(result.estimates.average),
      unit: "kg",
    },
    {
      label: "Referência",
      value: formatLoadKg(result.loadKg),
      unit: `kg × ${result.reps} reps`,
    },
  ];
}

export function buildSimpleInterpretation(result: SimpleOneRmResult): string {
  return `Com ${formatLoadKg(result.loadKg)} kg por ${result.reps} repetições, seu 1RM estimado (Brzycki) é ${formatLoadKg(result.oneRmKg)} kg. Use a calculadora de zonas de carga para ver as 6 faixas de treino. Prefira séries de 1–10 reps para estimativas mais confiáveis.`;
}

export function buildAdvancedInterpretation(
  result: AdvancedOneRmResult,
  method: OneRmMethod
): string {
  const methodLabel = ONE_RM_METHOD_LABELS[method];
  const selectedValue =
    method === "average"
      ? result.estimates.average
      : result.estimates[method];

  return `Com ${formatLoadKg(result.loadKg)} kg por ${result.reps} repetições: Brzycki ${formatLoadKg(result.estimates.brzycki)} kg, Epley ${formatLoadKg(result.estimates.epley)} kg, Lombardi ${formatLoadKg(result.estimates.lombardi)} kg. Média: ${formatLoadKg(result.estimates.average)} kg. Método selecionado: ${methodLabel} (${formatLoadKg(selectedValue)} kg). Veja zonas de carga com o botão abaixo.`;
}

export function buildHighRepsWarning(reps: number): string[] | undefined {
  if (reps > 12) {
    return [
      "Estimativas de 1RM ficam menos precisas acima de 12 repetições. Prefira séries de 1–10 reps.",
    ];
  }
  return undefined;
}

export function buildNextSteps(): string[] {
  return [
    "Defina zonas de treino na calculadora de zonas de carga.",
    "Monitore volume na calculadora de volume de treino.",
  ];
}
