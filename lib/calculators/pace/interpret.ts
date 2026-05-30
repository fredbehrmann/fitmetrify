import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { PaceResult } from "./calculate-simple";
import {
  formatDistanceKm,
  formatDurationMinutes,
  formatPaceMinutesPerKm,
  formatPaceMinutesPerMile,
  formatSpeedKmh,
} from "../running/format";
import { kmToMiles } from "@/lib/conversions";

export function buildClassification(): ResultClassification {
  return { label: "Pace médio", variant: "default" };
}

export function buildKpis(result: PaceResult, useMiles = false): ResultKpi[] {
  const speedValue = useMiles
    ? (result.speedKmh / 1.60934).toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : formatSpeedKmh(result.speedKmh);

  return [
    {
      label: "Velocidade média",
      value: speedValue,
      unit: useMiles ? "mph" : "km/h",
    },
    {
      label: "Distância",
      value: useMiles
        ? kmToMiles(result.distanceKm).toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })
        : formatDistanceKm(result.distanceKm),
      unit: useMiles ? "mi" : "km",
    },
    {
      label: "Tempo total",
      value: formatDurationMinutes(result.timeMinutes),
    },
  ];
}

export function buildInterpretation(
  result: PaceResult,
  useMiles = false
): string {
  if (useMiles) {
    const distMi = kmToMiles(result.distanceKm);
    const paceMi = formatPaceMinutesPerMile(result.paceMinPerKm);
    const speedMph = (result.speedKmh / 1.60934).toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `Em ${distMi.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mi em ${formatDurationMinutes(result.timeMinutes)}, seu pace médio é ${paceMi} min/mi e sua velocidade média é ${speedMph} mph.`;
  }

  return `Em ${formatDistanceKm(result.distanceKm)} km em ${formatDurationMinutes(result.timeMinutes)}, seu pace médio é ${formatPaceMinutesPerKm(result.paceMinPerKm)} min/km e sua velocidade média é ${formatSpeedKmh(result.speedKmh)} km/h. Pace = tempo ÷ distância; velocidade = distância ÷ tempo em horas.`;
}

export function buildNextSteps(): string[] {
  return [
    "Converta pace em velocidade no conversor pace/velocidade.",
    "Estime tempo em outra distância no previsor de tempo (fórmula de Riegel).",
  ];
}
