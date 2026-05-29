import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateSimpleVolume } from "../volume-treino/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../volume-treino/interpret";
import { formatVolumeKg } from "../strength/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseExercise(value: unknown): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  return "Exercício";
}

export const volumeTreinoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const sets = parseNumber(values.sets);
    const reps = parseNumber(values.reps);
    const load = parseNumber(values.load);

    if (sets === null || reps === null || load === null) return null;

    const result = calculateSimpleVolume(
      parseExercise(values.exercise),
      sets,
      reps,
      load
    );

    return {
      primaryValue: formatVolumeKg(result.volumeKg),
      primaryUnit: "kg",
      primaryLabel: "Volume total",
      classification: buildClassification(),
      interpretation: buildInterpretation(result),
      kpis: buildKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
