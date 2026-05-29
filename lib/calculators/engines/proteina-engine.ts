import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedProtein } from "../proteina/calculate-advanced";
import { calculateSimpleProtein } from "../proteina/calculate-simple";
import {
  PROTEIN_RANGES_BY_GOAL,
  type DietPreference,
  type ProteinGoal,
  type TrainingType,
} from "../proteina/constants";
import { formatGrams } from "../proteina/format";
import {
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildDietPreferenceNote,
  buildNextSteps,
  buildProteinClassification,
  buildSimpleInterpretation,
  buildSimpleKpis,
} from "../proteina/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseGoal(value: unknown): ProteinGoal | null {
  if (typeof value === "string" && value in PROTEIN_RANGES_BY_GOAL) {
    return value as ProteinGoal;
  }
  return null;
}

function parseTrainingType(value: unknown): TrainingType | null {
  if (value === "strength" || value === "cardio" || value === "mixed") {
    return value;
  }
  return null;
}

function parseDietPreference(value: unknown): DietPreference | undefined {
  if (value === "omnivore" || value === "vegetarian" || value === "vegan") {
    return value;
  }
  return undefined;
}

function buildProteinResult(
  weightKg: number,
  goal: ProteinGoal,
  idealGrams: number,
  interpretation: string,
  kpis: CalculatorResult["kpis"],
  options?: { warnings?: string[] }
): CalculatorResult {
  return {
    primaryValue: formatGrams(idealGrams),
    primaryUnit: "g/dia",
    primaryLabel: "Proteína ideal",
    classification: buildProteinClassification(goal),
    interpretation,
    kpis,
    nextSteps: buildNextSteps(),
    warnings: options?.warnings,
  };
}

export const proteinaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const weight = parseNumber(values.weight);
    const goal = parseGoal(values.goal);

    if (weight === null || goal === null) return null;

    const result = calculateSimpleProtein(weight, goal);

    return buildProteinResult(
      weight,
      goal,
      result.idealGrams,
      buildSimpleInterpretation(weight, goal, result),
      buildSimpleKpis(result)
    );
  },

  calculateAdvanced(values) {
    const weight = parseNumber(values.weight);
    const goal = parseGoal(values.goal);
    const trainingType = parseTrainingType(values.trainingType);
    const weeklyFrequency = parseNumber(values.weeklyFrequency);
    const leanMass = parseNumber(values.leanMass) ?? undefined;
    const bodyFat = parseNumber(values.bodyFat) ?? undefined;
    const dietPreference = parseDietPreference(values.dietPreference);

    if (
      weight === null ||
      goal === null ||
      trainingType === null ||
      weeklyFrequency === null
    ) {
      return null;
    }

    const result = calculateAdvancedProtein(
      weight,
      goal,
      trainingType,
      weeklyFrequency,
      { leanMass, bodyFat }
    );

    const warnings: string[] = [];
    const dietNote = buildDietPreferenceNote(dietPreference);
    if (dietNote) warnings.push(dietNote);

    return buildProteinResult(
      weight,
      goal,
      result.idealGrams,
      buildAdvancedInterpretation(weight, result, goal),
      buildAdvancedKpis(result),
      { warnings: warnings.length > 0 ? warnings : undefined }
    );
  },
};
