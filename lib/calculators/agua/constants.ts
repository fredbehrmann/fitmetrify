export const ML_PER_KG = 35;
export const SENIOR_ML_PER_KG = 40;
export const CLIMATE_ML_PER_KG_BONUS = 5;
export const ML_PER_WORKOUT_HOUR = 500;
/** @deprecated use per-kg climate adjustment */
export const HOT_CLIMATE_ML = 400;
export const CAFFEINE_ML = 250;
export const HEAVY_SWEATING_ML = 350;
export const CUP_ML = 250;
export const WAKING_HOURS = 16;
export const HIGH_INTAKE_WARNING_ML = 5000;

export type AgeGroup = "adult" | "senior";
export type ExerciseType = "strength" | "cardio" | "mixed";

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  strength: "musculação",
  cardio: "corrida / cardio",
  mixed: "treino misto",
};

export const HYDRATION_SCHEDULE_HOURS = [
  "07:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
] as const;
