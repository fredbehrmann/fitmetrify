import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedWater } from "../agua/calculate-advanced";
import { calculateSimpleWater } from "../agua/calculate-simple";
import type { ExerciseType } from "../agua/constants";
import { formatLiters } from "../agua/format";
import {
  buildAdvancedClassification,
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildHighIntakeWarning,
  buildNextSteps,
  buildSimpleClassification,
  buildSimpleInterpretation,
  buildSimpleKpis,
} from "../agua/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "on";
}

function parseExerciseType(value: unknown): ExerciseType | undefined {
  if (value === "strength" || value === "cardio" || value === "mixed") {
    return value;
  }
  return undefined;
}

function buildWaterResult(
  result: ReturnType<typeof calculateSimpleWater>,
  options: {
    classification: CalculatorResult["classification"];
    interpretation: string;
    kpis: CalculatorResult["kpis"];
  }
): CalculatorResult {
  return {
    primaryValue: formatLiters(result.liters),
    primaryUnit: "L/dia",
    primaryLabel: "Água recomendada",
    classification: options.classification,
    interpretation: options.interpretation,
    kpis: options.kpis,
    warnings: buildHighIntakeWarning(result.totalMl),
    nextSteps: buildNextSteps(),
  };
}

export const aguaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const weight = parseNumber(values.weight);

    if (weight === null) return null;

    const result = calculateSimpleWater(weight);

    return buildWaterResult(result, {
      classification: buildSimpleClassification(),
      interpretation: buildSimpleInterpretation(weight, result),
      kpis: buildSimpleKpis(result),
    });
  },

  calculateAdvanced(values) {
    const weight = parseNumber(values.weight);
    const workoutTime = parseNumber(values.workoutTime);

    if (weight === null) return null;

    const result = calculateAdvancedWater(weight, {
      workoutTime: workoutTime ?? 0,
      hotClimate: parseBoolean(values.hotClimate),
      highCaffeine: parseBoolean(values.highCaffeine),
      heavySweating: parseBoolean(values.heavySweating),
      exerciseType: parseExerciseType(values.exerciseType),
    });

    return buildWaterResult(result, {
      classification: buildAdvancedClassification(),
      interpretation: buildAdvancedInterpretation(weight, result),
      kpis: buildAdvancedKpis(result),
    });
  },
};
