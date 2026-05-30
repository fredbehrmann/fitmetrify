import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { ZonesResult } from "./calculate-simple";
import { formatLoadKg } from "../strength/format";

const EXERCISE_LABELS: Record<string, string> = {
  "bench-press": "Supino Reto",
  "incline-bench": "Supino Inclinado",
  "overhead-press": "Desenvolvimento",
  squat: "Agachamento Livre",
  deadlift: "Terra",
  row: "Remada",
  "pull-up": "Barra Fixa",
  "leg-press": "Leg Press",
  curl: "Rosca Direta",
  other: "Outro",
};

export function buildClassification(source: ZonesResult["source"]): ResultClassification {
  return {
    label: source === "direct" ? "Zonas do 1RM informado" : "Zonas com 1RM estimado",
    variant: "default",
  };
}

export function buildKpis(result: ZonesResult): ResultKpi[] {
  return result.zones.map((zone) => ({
    label: zone.label,
    value: `${formatLoadKg(zone.minLoadKg)}–${formatLoadKg(zone.maxLoadKg)}`,
    unit: `${zone.minPercent}–${zone.maxPercent}% · ${zone.repsLabel} reps`,
  }));
}

export function buildInterpretation(result: ZonesResult): string {
  const exerciseLabel = result.exercise
    ? EXERCISE_LABELS[result.exercise] ?? result.exercise
    : "exercício";

  const zonesText = result.zones
    .map(
      (zone) =>
        `${zone.label} (${zone.minPercent}–${zone.maxPercent}%): ${formatLoadKg(zone.minLoadKg)}–${formatLoadKg(zone.maxLoadKg)} kg · ${zone.repsLabel} reps`
    )
    .join("; ");

  const sourceNote =
    result.source === "direct"
      ? `Com 1RM de ${formatLoadKg(result.oneRmKg)} kg`
      : `Estimando 1RM de ${formatLoadKg(result.oneRmKg)} kg a partir de ${formatLoadKg(result.estimateLoad ?? 0)} kg × ${result.estimateReps} reps`;

  return `${sourceNote} para ${exerciseLabel}, suas 6 zonas de carga são: ${zonesText}.`;
}

export function buildNextSteps(): string[] {
  return [
    "Compare métodos de estimativa na calculadora de 1RM.",
    "Monitore volume na calculadora de volume de treino.",
  ];
}
