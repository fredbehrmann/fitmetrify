import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { PaceVelocityResult } from "./calculate-simple";
import {
  formatPaceMinutesPerKm,
  formatSpeedKmh,
  formatSpeedMph,
} from "../running/format";

export function buildClassification(): ResultClassification {
  return { label: "Velocidade equivalente", variant: "default" };
}

export function buildKpis(result: PaceVelocityResult): ResultKpi[] {
  const paceMinPerMi = result.paceMinPerKm * 1.60934;

  return [
    {
      label: "Pace",
      value: formatPaceMinutesPerKm(result.paceMinPerKm),
      unit: "min/km",
    },
    {
      label: "Pace",
      value: formatPaceMinutesPerKm(paceMinPerMi),
      unit: "min/mi",
    },
    {
      label: "Velocidade",
      value: formatSpeedKmh(result.speedKmh),
      unit: "km/h",
    },
    {
      label: "Velocidade",
      value: formatSpeedMph(result.speedKmh),
      unit: "mph",
    },
  ];
}

export function buildInterpretation(result: PaceVelocityResult): string {
  const paceMinPerMi = result.paceMinPerKm * 1.60934;

  return `Um pace de ${formatPaceMinutesPerKm(result.paceMinPerKm)} min/km (${formatPaceMinutesPerKm(paceMinPerMi)} min/mi) equivale a ${formatSpeedKmh(result.speedKmh)} km/h (${formatSpeedMph(result.speedKmh)} mph). A conversão é: velocidade (km/h) = 60 ÷ pace (min/km).`;
}

export function buildNextSteps(): string[] {
  return [
    "Calcule pace a partir de distância e tempo na calculadora de pace.",
    "Preveja tempo em outra distância no previsor de tempo.",
  ];
}
