import { brzycki1RM, trainingLoads, type TrainingZoneLoad } from "../strength/one-rm-formulas";

export type SimpleOneRmResult = {
  loadKg: number;
  reps: number;
  oneRmKg: number;
  zones: TrainingZoneLoad[];
};

export function calculateSimpleOneRm(
  loadKg: number,
  reps: number
): SimpleOneRmResult | null {
  const oneRmKg = brzycki1RM(loadKg, reps);
  if (oneRmKg === null) return null;

  return {
    loadKg,
    reps,
    oneRmKg,
    zones: trainingLoads(oneRmKg),
  };
}
