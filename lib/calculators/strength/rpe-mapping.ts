import { RPE_TO_PERCENT } from "./constants";

export function percentFromRpe(rpe: number): number | null {
  if (rpe in RPE_TO_PERCENT) {
    return RPE_TO_PERCENT[rpe];
  }

  const rounded = Math.round(rpe * 2) / 2;
  return RPE_TO_PERCENT[rounded] ?? null;
}

export function loadFromRpe(oneRmKg: number, rpe: number): number | null {
  const percent = percentFromRpe(rpe);
  if (percent === null) return null;
  return oneRmKg * (percent / 100);
}
