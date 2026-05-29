import {
  MAX_ACTIVITY_FACTOR,
  MIN_ACTIVITY_FACTOR,
  WORK_TYPE_BASE_FACTORS,
  type WorkType,
} from "./constants";

function getDurationMultiplier(workoutDurationMinutes: number): number {
  if (workoutDurationMinutes >= 90) return 1.1;
  if (workoutDurationMinutes >= 45) return 1.05;
  return 1;
}

export function estimateActivityFactor(
  workType: WorkType,
  strengthDays: number,
  cardioDays: number,
  workoutDurationMinutes: number
): number {
  const base = WORK_TYPE_BASE_FACTORS[workType] ?? MIN_ACTIVITY_FACTOR;
  const strengthBonus = (strengthDays / 7) * 0.25;
  const cardioBonus = (cardioDays / 7) * 0.15;
  const durationMultiplier = getDurationMultiplier(workoutDurationMinutes);

  const raw = (base + strengthBonus + cardioBonus) * durationMultiplier;
  return Math.min(MAX_ACTIVITY_FACTOR, Math.max(MIN_ACTIVITY_FACTOR, raw));
}
