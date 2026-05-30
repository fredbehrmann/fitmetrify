export type MuscleGroupId =
  | "chest"
  | "back"
  | "shoulders"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "biceps"
  | "triceps"
  | "core"
  | "other";

export type SessionExercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroupId;
  sets: number;
  reps: number;
  loadKg: number;
};

export const MUSCLE_GROUP_OPTIONS: { value: MuscleGroupId; label: string }[] = [
  { value: "chest", label: "Peito" },
  { value: "back", label: "Costas" },
  { value: "shoulders", label: "Ombros" },
  { value: "quads", label: "Pernas (quadríceps)" },
  { value: "hamstrings", label: "Posterior de coxa" },
  { value: "glutes", label: "Glúteos" },
  { value: "biceps", label: "Bíceps" },
  { value: "triceps", label: "Tríceps" },
  { value: "core", label: "Core" },
  { value: "other", label: "Outro" },
];

/** Schoenfeld (2017) — séries efetivas por semana (referência). */
export const SCHOENFELD_WEEKLY_SETS: Record<
  MuscleGroupId,
  { min: number; optimalMin: number; optimalMax: number }
> = {
  chest: { min: 10, optimalMin: 12, optimalMax: 20 },
  back: { min: 10, optimalMin: 14, optimalMax: 22 },
  shoulders: { min: 8, optimalMin: 12, optimalMax: 20 },
  quads: { min: 10, optimalMin: 12, optimalMax: 20 },
  hamstrings: { min: 8, optimalMin: 10, optimalMax: 16 },
  glutes: { min: 8, optimalMin: 12, optimalMax: 18 },
  biceps: { min: 8, optimalMin: 10, optimalMax: 16 },
  triceps: { min: 8, optimalMin: 10, optimalMax: 16 },
  core: { min: 6, optimalMin: 8, optimalMax: 14 },
  other: { min: 8, optimalMin: 10, optimalMax: 16 },
};

export const MUSCLE_GROUP_LABELS: Record<MuscleGroupId, string> =
  Object.fromEntries(
    MUSCLE_GROUP_OPTIONS.map((option) => [option.value, option.label])
  ) as Record<MuscleGroupId, string>;
