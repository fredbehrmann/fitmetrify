import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { PaceVelocityResult } from "./calculate-simple";
import { formatPaceMinutesPerKm, formatSpeedKmh } from "../running/format";

export function buildClassification(): ResultClassification {
  return { label: "Velocidade equivalente", variant: "default" };
}

export function buildKpis(result: PaceVelocityResult): ResultKpi[] {
  return [
    {
      label: "Pace informado",
      value: formatPaceMinutesPerKm(result.paceMinPerKm),
      unit: "min/km",
    },
    {
      label: "Fórmula",
      value: `60 ÷ ${result.paceMinPerKm.toFixed(2).replace(".", ",")}`,
      unit: "km/h",
    },
  ];
}

export function buildInterpretation(result: PaceVelocityResult): string {
  return `Um pace de ${formatPaceMinutesPerKm(result.paceMinPerKm)} min/km equivale a ${formatSpeedKmh(result.speedKmh)} km/h. A conversão é: velocidade (km/h) = 60 ÷ pace (min/km).`;
}

export function buildNextSteps(): string[] {
  return [
    "Calcule pace a partir de distância e tempo na calculadora de pace.",
    "Preveja tempo em outra distância no previsor de tempo.",
  ];
}
