import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedWater } from "../agua/calculate-advanced";
import { calculateSimpleWater } from "../agua/calculate-simple";
import type { AgeGroup, ExerciseType } from "../agua/constants";
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

function parseAgeGroup(value: unknown): AgeGroup {
  return value === "senior" ? "senior" : "adult";
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
    showUrineScale: true,
  };
}

export const aguaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const weight = parseNumber(values.weight);
    const ageGroup = parseAgeGroup(values.ageGroup);

    if (weight === null) return null;

    const result = calculateSimpleWater(weight, ageGroup);

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

    const ageGroup = parseAgeGroup(values.ageGroup);

    const result = calculateAdvancedWater(weight, {
      workoutTime: workoutTime ?? 0,
      hotClimate: parseBoolean(values.hotClimate),
      highCaffeine: parseBoolean(values.highCaffeine),
      heavySweating: parseBoolean(values.heavySweating),
      exerciseType: parseExerciseType(values.exerciseType),
      ageGroup,
    });

    return buildWaterResult(result, {
      classification: buildAdvancedClassification(),
      interpretation: buildAdvancedInterpretation(weight, result),
      kpis: buildAdvancedKpis(result),
    });
  },
};
