import { TRAINING_ZONES } from "./constants";
import { roundLoadHalfKg } from "./format";

export type TrainingZoneLoad = {
  id: string;
  label: string;
  minPercent: number;
  maxPercent: number;
  repsLabel: string;
  minLoadKg: number;
  maxLoadKg: number;
  midLoadKg: number;
};

/** @deprecated legacy single-percent zone */
export type LegacyTrainingZoneLoad = {
  percent: number;
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

export function trainingZoneLoads(oneRmKg: number): TrainingZoneLoad[] {
  return TRAINING_ZONES.map((zone) => {
    const minLoadKg = roundLoadHalfKg(oneRmKg * (zone.minPercent / 100));
    const maxLoadKg = roundLoadHalfKg(oneRmKg * (zone.maxPercent / 100));
    const midLoadKg = roundLoadHalfKg((minLoadKg + maxLoadKg) / 2);

    return {
      id: zone.id,
      label: zone.label,
      minPercent: zone.minPercent,
      maxPercent: zone.maxPercent,
      repsLabel: zone.repsLabel,
      minLoadKg,
      maxLoadKg,
      midLoadKg,
    };
  });
}

/** @deprecated use trainingZoneLoads */
export function trainingLoads(oneRmKg: number): LegacyTrainingZoneLoad[] {
  return [90, 80, 70, 60].map((percent) => ({
    percent,
    loadKg: roundLoadHalfKg(oneRmKg * (percent / 100)),
  }));
}
