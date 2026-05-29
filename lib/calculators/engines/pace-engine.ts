import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculatePace } from "../pace/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../pace/interpret";
import { formatPaceMinutesPerKm } from "../running/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

export const paceEngine: CalculatorEngine = {
  calculateSimple(values) {
    const distance = parseNumber(values.distance);
    const timeMinutes = parseNumber(values.timeMinutes);

    if (distance === null || timeMinutes === null || distance <= 0) {
      return null;
    }

    const result = calculatePace(distance, timeMinutes);

    return {
      primaryValue: formatPaceMinutesPerKm(result.paceMinPerKm),
      primaryUnit: "min/km",
      primaryLabel: "Pace médio",
      classification: buildClassification(),
      interpretation: buildInterpretation(result),
      kpis: buildKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
