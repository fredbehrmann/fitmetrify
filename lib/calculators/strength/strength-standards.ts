import type { Sex } from "../tmb/calculate-mifflin";
import type { StrengthTier } from "./constants";

export type ExerciseId =
  | "bench-press"
  | "incline-bench"
  | "overhead-press"
  | "squat"
  | "deadlift"
  | "row"
  | "pull-up"
  | "leg-press"
  | "curl"
  | "other";

/** Bodyweight multipliers for 1RM/bodyweight tiers (male baseline). */
const MALE_TIERS: Record<ExerciseId, [number, number, number, number]> = {
  "bench-press": [0.75, 1.0, 1.25, 1.5],
  "incline-bench": [0.65, 0.85, 1.05, 1.25],
  "overhead-press": [0.55, 0.75, 0.95, 1.15],
  squat: [1.0, 1.35, 1.65, 2.0],
  deadlift: [1.25, 1.65, 2.0, 2.4],
  row: [0.7, 0.95, 1.15, 1.35],
  "pull-up": [0.5, 0.75, 1.0, 1.25],
  "leg-press": [1.5, 2.0, 2.5, 3.0],
  curl: [0.35, 0.5, 0.65, 0.8],
  other: [0.8, 1.1, 1.35, 1.6],
};

const FEMALE_FACTOR = 0.72;

export function classifyRelativeStrength(
  exercise: ExerciseId,
  oneRmKg: number,
  bodyWeightKg: number,
  sex: Sex
): StrengthTier {
  const ratio = oneRmKg / bodyWeightKg;
  const tiers = MALE_TIERS[exercise] ?? MALE_TIERS.other;
  const factor = sex === "female" ? FEMALE_FACTOR : 1;
  const [belowAvg, avg, , elite] = tiers.map((value) => value * factor);

  if (ratio < belowAvg * 0.85) return "weak";
  if (ratio < belowAvg) return "below-average";
  if (ratio < avg) return "average";
  if (ratio < elite) return "above-average";
  return "elite";
}
