export const ML_PER_KG = 35;
export const ML_PER_WORKOUT_HOUR = 500;
export const HOT_CLIMATE_ML = 400;
export const CAFFEINE_ML = 250;
/** Spec lists heavy sweating as input but no ml value; conservative default. */
export const HEAVY_SWEATING_ML = 350;
export const CUP_ML = 250;
export const WAKING_HOURS = 16;
export const HIGH_INTAKE_WARNING_ML = 5000;

export type ExerciseType = "strength" | "cardio" | "mixed";

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  strength: "musculação",
  cardio: "corrida / cardio",
  mixed: "treino misto",
};
