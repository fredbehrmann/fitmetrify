import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateSimpleVolume } from "../volume-treino/calculate-simple";
import {
  calculateSessionVolume,
  type SessionVolumeResult,
} from "../volume-treino/calculate-session";
import type { MuscleGroupId, SessionExercise } from "../volume-treino/constants";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
  buildSessionInterpretation,
  buildSessionKpis,
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

function parseSessionExercises(value: unknown): SessionExercise[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const exercises: SessionExercise[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const sets = parseNumber(record.sets);
    const reps = parseNumber(record.reps);
    const loadKg = parseNumber(record.loadKg);
    const name = typeof record.name === "string" ? record.name.trim() : "";
    const muscleGroup = record.muscleGroup;

    if (
      !name ||
      sets === null ||
      reps === null ||
      loadKg === null ||
      typeof muscleGroup !== "string"
    ) {
      continue;
    }

    exercises.push({
      id: typeof record.id === "string" ? record.id : `exercise-${exercises.length}`,
      name,
      muscleGroup: muscleGroup as MuscleGroupId,
      sets,
      reps,
      loadKg,
    });
  }

  return exercises.length > 0 ? exercises : null;
}

function buildSessionResult(result: SessionVolumeResult): CalculatorResult {
  return {
    primaryValue: formatVolumeKg(result.totalVolumeKg),
    primaryUnit: "kg",
    primaryLabel: "Volume total da sessão",
    classification: buildClassification(),
    interpretation: buildSessionInterpretation(result),
    kpis: buildSessionKpis(result),
    warnings: result.warnings.length > 0 ? result.warnings : undefined,
    nextSteps: buildNextSteps(),
  };
}

export const volumeTreinoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const sessionExercises = parseSessionExercises(values.exercises);
    if (sessionExercises) {
      const session = calculateSessionVolume(sessionExercises);
      if (!session) return null;
      return buildSessionResult(session);
    }

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
