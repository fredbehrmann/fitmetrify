import {
  TRAINING_ZONE_PERCENTS,
  type TrainingZonePercent,
} from "./constants";
import { roundLoadHalfKg } from "./format";

export type TrainingZoneLoad = {
  percent: TrainingZonePercent;
  loadKg: number;
};

export type OneRmEstimates = {
  brzycki: number;
  epley: number;
  lombardi: number;
  average: number;
};

export function brzycki1RM(loadKg: number, reps: number): number | null {
  if (reps < 1 || reps >= 37) return null;
  return (loadKg * 36) / (37 - reps);
}

export function epley1RM(loadKg: number, reps: number): number {
  return loadKg * (1 + reps / 30);
}

export function lombardi1RM(loadKg: number, reps: number): number {
  return loadKg * Math.pow(reps, 0.1);
}

export function calculateAllOneRmEstimates(
  loadKg: number,
  reps: number
): OneRmEstimates | null {
  const brzycki = brzycki1RM(loadKg, reps);
  if (brzycki === null) return null;

  const epley = epley1RM(loadKg, reps);
  const lombardi = lombardi1RM(loadKg, reps);
  const average = (brzycki + epley + lombardi) / 3;

  return { brzycki, epley, lombardi, average };
}

export function trainingLoads(oneRmKg: number): TrainingZoneLoad[] {
  return TRAINING_ZONE_PERCENTS.map((percent) => ({
    percent,
    loadKg: roundLoadHalfKg(oneRmKg * (percent / 100)),
  }));
}
