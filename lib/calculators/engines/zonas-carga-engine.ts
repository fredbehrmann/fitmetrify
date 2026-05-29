import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateZones } from "../zonas-carga/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../zonas-carga/interpret";
import { formatLoadKg } from "../strength/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

export const zonasCargaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const oneRepMax = parseNumber(values.oneRepMax);
    const estimateLoad = parseNumber(values.estimateLoad);
    const estimateReps = parseNumber(values.estimateReps);

    const result = calculateZones(
      oneRepMax ?? undefined,
      estimateLoad ?? undefined,
      estimateReps ?? undefined
    );

    if (result === null) return null;

    return {
      primaryValue: formatLoadKg(result.oneRmKg),
      primaryUnit: "kg",
      primaryLabel: "1RM de referência",
      classification: buildClassification(result.source),
      interpretation: buildInterpretation(result),
      kpis: buildKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
