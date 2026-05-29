import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { AdvancedTimePrediction } from "./calculate-advanced";
import type { TimePredictionResult } from "./calculate-simple";
import {
  formatDistanceKm,
  formatDurationMinutes,
  formatPaceMinutesPerKm,
} from "../running/format";

export function buildSimpleClassification(): ResultClassification {
  return { label: "Previsão Riegel", variant: "default" };
}

export function buildAdvancedClassification(): ResultClassification {
  return { label: "Previsão de prova", variant: "success" };
}

export function buildSimpleKpis(result: TimePredictionResult): ResultKpi[] {
  return [
    {
      label: "Pace previsto",
      value: formatPaceMinutesPerKm(result.predictedPaceMinPerKm),
      unit: "min/km",
    },
    {
      label: "Referência",
      value: `${formatDistanceKm(result.knownDistanceKm)} km em ${formatDurationMinutes(result.knownTimeMinutes)}`,
    },
    {
      label: "Nova distância",
      value: formatDistanceKm(result.targetDistanceKm),
      unit: "km",
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedTimePrediction): ResultKpi[] {
  return [
    {
      label: "Otimista",
      value: formatDurationMinutes(result.optimisticTimeMinutes),
    },
    {
      label: "Provável",
      value: formatDurationMinutes(result.probableTimeMinutes),
    },
    {
      label: "Conservador",
      value: formatDurationMinutes(result.conservativeTimeMinutes),
    },
    {
      label: "Pace provável",
      value: formatPaceMinutesPerKm(result.predictedPaceMinPerKm),
      unit: "min/km",
    },
    {
      label: "Base Riegel (sem ajustes)",
      value: formatDurationMinutes(result.baseTimeMinutes),
    },
  ];
}

export function buildSimpleInterpretation(result: TimePredictionResult): string {
  return `Com base em ${formatDistanceKm(result.knownDistanceKm)} km em ${formatDurationMinutes(result.knownTimeMinutes)}, a fórmula de Riegel (T2 = T1 × (D2/D1)^1,06) estima ${formatDurationMinutes(result.predictedTimeMinutes)} para ${formatDistanceKm(result.targetDistanceKm)} km — pace equivalente de ${formatPaceMinutesPerKm(result.predictedPaceMinPerKm)} min/km. É uma estimativa; terreno, clima e preparo alteram o resultado real.`;
}

export function buildAdvancedInterpretation(
  result: AdvancedTimePrediction
): string {
  const factorPercent = Math.round((result.conditionFactor - 1) * 100);
  const factorNote =
    factorPercent === 0
      ? "Os fatores de prova mantiveram a previsão próxima da base Riegel."
      : `Os fatores de prova ajustaram a previsão em cerca de ${factorPercent > 0 ? "+" : ""}${factorPercent}% sobre a base Riegel.`;

  return `${buildSimpleInterpretation(result)} ${factorNote} Faixas: otimista ${formatDurationMinutes(result.optimisticTimeMinutes)}, provável ${formatDurationMinutes(result.probableTimeMinutes)}, conservador ${formatDurationMinutes(result.conservativeTimeMinutes)} (variação de ±${Math.round(result.spread * 100)}% conforme experiência).`;
}

export function buildNextSteps(): string[] {
  return [
    "Confira seu pace médio na calculadora de pace.",
    "Converta pace e velocidade no conversor pace/velocidade.",
  ];
}
