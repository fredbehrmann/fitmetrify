import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedPrediction } from "../previsor-tempo/calculate-advanced";
import {
  RACE_TYPE_FACTORS,
  EXPERIENCE_FACTORS,
  type RaceType,
  type RunnerExperience,
} from "../previsor-tempo/constants";
import { calculateSimplePrediction } from "../previsor-tempo/calculate-simple";
import {
  buildAdvancedClassification,
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildNextSteps,
  buildSimpleClassification,
  buildSimpleInterpretation,
  buildSimpleKpis,
} from "../previsor-tempo/interpret";
import { formatDurationMinutes } from "../running/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseExperience(value: unknown): RunnerExperience | undefined {
  if (typeof value === "string" && value in EXPERIENCE_FACTORS) {
    return value as RunnerExperience;
  }
  return undefined;
}

function parseRaceType(value: unknown): RaceType | undefined {
  if (typeof value === "string" && value in RACE_TYPE_FACTORS) {
    return value as RaceType;
  }
  return undefined;
}

export const previsorTempoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const knownDistance = parseNumber(values.knownDistance);
    const knownTime = parseNumber(values.knownTime);
    const targetDistance = parseNumber(values.targetDistance);

    if (
      knownDistance === null ||
      knownTime === null ||
      targetDistance === null ||
      knownDistance <= 0 ||
      targetDistance <= 0
    ) {
      return null;
    }

    const result = calculateSimplePrediction(
      knownDistance,
      knownTime,
      targetDistance
    );

    return {
      primaryValue: formatDurationMinutes(result.predictedTimeMinutes),
      primaryLabel: "Tempo previsto",
      classification: buildSimpleClassification(),
      interpretation: buildSimpleInterpretation(result),
      kpis: buildSimpleKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },

  calculateAdvanced(values) {
    const knownDistance = parseNumber(values.knownDistance);
    const knownTime = parseNumber(values.knownTime);
    const targetDistance = parseNumber(values.targetDistance);

    if (
      knownDistance === null ||
      knownTime === null ||
      targetDistance === null ||
      knownDistance <= 0 ||
      targetDistance <= 0
    ) {
      return null;
    }

    const result = calculateAdvancedPrediction(
      knownDistance,
      knownTime,
      targetDistance,
      {
        experience: parseExperience(values.experience),
        raceType: parseRaceType(values.raceType),
        elevation: parseNumber(values.elevation) ?? undefined,
        temperature: parseNumber(values.temperature) ?? undefined,
        weeklyRuns: parseNumber(values.weeklyRuns) ?? undefined,
      }
    );

    return {
      primaryValue: formatDurationMinutes(result.probableTimeMinutes),
      primaryLabel: "Tempo provável",
      classification: buildAdvancedClassification(),
      interpretation: buildAdvancedInterpretation(result),
      kpis: buildAdvancedKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
