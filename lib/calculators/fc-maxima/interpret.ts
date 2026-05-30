import type { ResultKpi } from "@/lib/calculators/engines/types";

import type { HeartRateZone, MaxHrFormula, TrainingGoal } from "./constants";
import { MAX_HR_FORMULA_LABELS, TRAINING_PYRAMID_NOTE } from "./constants";

const GOAL_ZONE_HINTS: Record<TrainingGoal, string> = {
  "fat-burn": "Priorize Zonas 1–2 para maior oxidação de gordura.",
  aerobic: "Priorize Zonas 2–3 para base aeróbica.",
  threshold: "Inclua Zona 4 em treinos específicos de limiar.",
  vo2max: "Zona 5 em sessões curtas e espaçadas.",
};

export function buildSimpleInterpretation(
  maxHeartRate: number,
  formula: MaxHrFormula
): string {
  return `Sua FC máxima estimada é ${maxHeartRate} bpm (${MAX_HR_FORMULA_LABELS[formula]}). Use as zonas abaixo como referência de intensidade. ${TRAINING_PYRAMID_NOTE}`;
}

export function buildAdvancedInterpretation(
  maxHeartRate: number,
  formula: MaxHrFormula,
  zones: HeartRateZone[],
  trainingGoal?: TrainingGoal
): string {
  const goalHint = trainingGoal ? GOAL_ZONE_HINTS[trainingGoal] : "";
  const zone2 = zones.find((zone) => zone.id === 2);
  const zone4 = zones.find((zone) => zone.id === 4);

  return `FC máxima: ${maxHeartRate} bpm (${MAX_HR_FORMULA_LABELS[formula]}). ${
    zone2
      ? `Zona 2 aeróbica: ${zone2.minBpm}–${zone2.maxBpm} bpm. `
      : ""
  }${
    zone4
      ? `Zona 4 limiar: ${zone4.minBpm}–${zone4.maxBpm} bpm. `
      : ""
  }${TRAINING_PYRAMID_NOTE}${goalHint ? ` ${goalHint}` : ""}`;
}

export function buildFormulaComparisonKpis(
  formulas: Record<MaxHrFormula, number>,
  selected: MaxHrFormula
): ResultKpi[] {
  return (Object.keys(formulas) as MaxHrFormula[]).map((key) => ({
    label: MAX_HR_FORMULA_LABELS[key],
    value: String(formulas[key]),
    unit: key === selected ? "bpm (selecionada)" : "bpm",
  }));
}

export function buildZoneKpis(zones: HeartRateZone[]): ResultKpi[] {
  return zones.map((zone) => ({
    label: zone.label,
    value: `${zone.minBpm}–${zone.maxBpm}`,
    unit: "bpm",
  }));
}

export function buildNextSteps(): string[] {
  return [
    "Use sua FC máxima na calculadora de Pace para estimar intensidade por zona.",
    "Combine com o previsor de tempo para planejar provas.",
  ];
}
