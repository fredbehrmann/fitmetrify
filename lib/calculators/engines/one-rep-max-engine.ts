import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedOneRm } from "../one-rep-max/calculate-advanced";
import { calculateSimpleOneRm } from "../one-rep-max/calculate-simple";
import type { OneRmMethod } from "../strength/constants";
import {
  classifyRelativeStrength,
  type ExerciseId,
} from "../strength/strength-standards";
import type { Sex } from "../tmb/calculate-mifflin";
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
  buildStrengthClassification,
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

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function parseExercise(value: unknown): ExerciseId {
  const exercises: ExerciseId[] = [
    "bench-press",
    "incline-bench",
    "overhead-press",
    "squat",
    "deadlift",
    "row",
    "pull-up",
    "leg-press",
    "curl",
    "other",
  ];
  if (typeof value === "string" && exercises.includes(value as ExerciseId)) {
    return value as ExerciseId;
  }
  return "other";
}

function buildOneRmActions(oneRmKg: number): CalculatorResult["actions"] {
  return [
    {
      label: "Ver Zonas de Carga com este 1RM",
      href: "/calculadora-zonas-carga",
      params: { oneRepMax: Math.round(oneRmKg * 10) / 10 },
    },
  ];
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
      actions: buildOneRmActions(result.oneRmKg),
    } satisfies CalculatorResult;
  },

  calculateAdvanced(values) {
    const load = parseNumber(values.load);
    const reps = parseNumber(values.reps);
    const method = parseMethod(values.method);
    const bodyWeight = parseNumber(values.weight);
    const sex = parseSex(values.sex);
    const exercise = parseExercise(values.exercise);

    if (load === null || reps === null) return null;

    const result = calculateAdvancedOneRm(load, reps, method);
    if (result === null) return null;

    let classification = buildAdvancedClassification();
    const kpis = buildAdvancedKpis(result);

    if (bodyWeight !== null && sex !== null) {
      const tier = classifyRelativeStrength(
        exercise,
        result.oneRmKg,
        bodyWeight,
        sex
      );
      classification = buildStrengthClassification(tier);
    }

    return {
      primaryValue: formatLoadKg(result.estimates.average),
      primaryUnit: "kg",
      primaryLabel: "1RM (média)",
      classification,
      interpretation: buildAdvancedInterpretation(result, method),
      kpis,
      warnings: buildHighRepsWarning(reps),
      nextSteps: buildNextSteps(),
      actions: buildOneRmActions(result.estimates.average),
    } satisfies CalculatorResult;
  },
};
