export const PROTEIN_RANGES_BY_GOAL: Record<
  string,
  { minPerKg: number; maxPerKg: number }
> = {
  general: { minPerKg: 0.8, maxPerKg: 1.2 },
  "weight-loss": { minPerKg: 1.6, maxPerKg: 2.2 },
  hypertrophy: { minPerKg: 1.6, maxPerKg: 2.2 },
  athlete: { minPerKg: 2.0, maxPerKg: 2.4 },
};

export const LBM_PROTEIN_MIN_PER_KG = 1.8;
export const LBM_PROTEIN_MAX_PER_KG = 2.5;
export const LBM_PROTEIN_BASE_PER_KG = 2.0;
export const LBM_STRENGTH_BONUS = 0.2;
export const LBM_FREQUENCY_BONUS = 0.1;
export const LBM_FREQUENCY_THRESHOLD = 4;

export const DEFAULT_MEAL_COUNT = 4;

export type ProteinGoal = keyof typeof PROTEIN_RANGES_BY_GOAL;
export type TrainingType = "strength" | "cardio" | "mixed";
export type DietPreference = "omnivore" | "vegetarian" | "vegan";
