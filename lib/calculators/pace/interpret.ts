import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { PaceResult } from "./calculate-simple";
import {
  formatDistanceKm,
  formatDurationMinutes,
  formatPaceMinutesPerKm,
  formatSpeedKmh,
} from "../running/format";

export function buildClassification(): ResultClassification {
  return { label: "Pace médio", variant: "default" };
}

export function buildKpis(result: PaceResult): ResultKpi[] {
  return [
    {
      label: "Velocidade média",
      value: formatSpeedKmh(result.speedKmh),
      unit: "km/h",
    },
    {
      label: "Distância",
      value: formatDistanceKm(result.distanceKm),
      unit: "km",
    },
    {
      label: "Tempo total",
      value: formatDurationMinutes(result.timeMinutes),
    },
  ];
}

export function buildInterpretation(result: PaceResult): string {
  return `Em ${formatDistanceKm(result.distanceKm)} km em ${formatDurationMinutes(result.timeMinutes)}, seu pace médio é ${formatPaceMinutesPerKm(result.paceMinPerKm)} min/km e sua velocidade média é ${formatSpeedKmh(result.speedKmh)} km/h. Pace = tempo ÷ distância; velocidade = distância ÷ tempo em horas.`;
}

export function buildNextSteps(): string[] {
  return [
    "Converta pace em velocidade no conversor pace/velocidade.",
    "Estime tempo em outra distância no previsor de tempo (fórmula de Riegel).",
  ];
}
