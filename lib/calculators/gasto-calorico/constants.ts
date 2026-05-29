export const ACTIVITY_LEVEL_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

export const WORK_TYPE_BASE_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  standing: 1.375,
  physical: 1.55,
};

export const MIN_ACTIVITY_FACTOR = 1.2;
export const MAX_ACTIVITY_FACTOR = 1.9;

export const WEIGHT_LOSS_MULTIPLIER = 0.8;
export const HYPERTROPHY_MULTIPLIER = 1.1;

export type ActivityLevel = keyof typeof ACTIVITY_LEVEL_FACTORS;
export type WorkType = keyof typeof WORK_TYPE_BASE_FACTORS;
export type Goal = "lose" | "maintain" | "gain";
