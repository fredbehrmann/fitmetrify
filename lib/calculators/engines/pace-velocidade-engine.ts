import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateSpeedFromPace } from "../pace-velocidade/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../pace-velocidade/interpret";
import { formatSpeedKmh } from "../running/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

export const paceVelocidadeEngine: CalculatorEngine = {
  calculateSimple(values) {
    const paceMinutes = parseNumber(values.paceMinutes);

    if (paceMinutes === null || paceMinutes <= 0) return null;

    const result = calculateSpeedFromPace(paceMinutes);

    return {
      primaryValue: formatSpeedKmh(result.speedKmh),
      primaryUnit: "km/h",
      primaryLabel: "Velocidade",
      classification: buildClassification(),
      interpretation: buildInterpretation(result),
      kpis: buildKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
