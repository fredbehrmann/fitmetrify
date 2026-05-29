import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedOneRm } from "../one-rep-max/calculate-advanced";
import { calculateSimpleOneRm } from "../one-rep-max/calculate-simple";
import type { OneRmMethod } from "../strength/constants";
import { formatLoadKg } from "../strength/format";
import {
  buildAdvancedClassification,
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildHighRepsWarning,
  buildNextSteps,
  buildSimpleClassification,
  buildSimpleInterpretation,
  buildSimpleKpis,
} from "../one-rep-max/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseMethod(value: unknown): OneRmMethod {
  if (
    value === "brzycki" ||
    value === "epley" ||
    value === "lombardi" ||
    value === "average"
  ) {
    return value;
  }
  return "average";
}

export const oneRepMaxEngine: CalculatorEngine = {
  calculateSimple(values) {
    const load = parseNumber(values.load);
    const reps = parseNumber(values.reps);

    if (load === null || reps === null) return null;

    const result = calculateSimpleOneRm(load, reps);
    if (result === null) return null;

    return {
      primaryValue: formatLoadKg(result.oneRmKg),
      primaryUnit: "kg",
      primaryLabel: "1RM estimado",
      classification: buildSimpleClassification(),
      interpretation: buildSimpleInterpretation(result),
      kpis: buildSimpleKpis(result),
      warnings: buildHighRepsWarning(reps),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },

  calculateAdvanced(values) {
    const load = parseNumber(values.load);
    const reps = parseNumber(values.reps);
    const method = parseMethod(values.method);

    if (load === null || reps === null) return null;

    const result = calculateAdvancedOneRm(load, reps, method);
    if (result === null) return null;

    return {
      primaryValue: formatLoadKg(result.estimates.average),
      primaryUnit: "kg",
      primaryLabel: "1RM (média)",
      classification: buildAdvancedClassification(),
      interpretation: buildAdvancedInterpretation(result, method),
      kpis: buildAdvancedKpis(result),
      warnings: buildHighRepsWarning(reps),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
