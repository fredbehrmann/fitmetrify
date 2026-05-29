import { PROTEIN_RANGES_BY_GOAL, type ProteinGoal } from "./constants";

export type ProteinRangeResult = {
  minGrams: number;
  idealGrams: number;
  maxGrams: number;
  minPerKg: number;
  maxPerKg: number;
};

export function calculateSimpleProtein(
  weightKg: number,
  goal: ProteinGoal
): ProteinRangeResult {
  const range = PROTEIN_RANGES_BY_GOAL[goal];
  const minGrams = Math.round(weightKg * range.minPerKg);
  const maxGrams = Math.round(weightKg * range.maxPerKg);
  const idealPerKg = (range.minPerKg + range.maxPerKg) / 2;
  const idealGrams = Math.round(weightKg * idealPerKg);

  return {
    minGrams,
    idealGrams,
    maxGrams,
    minPerKg: range.minPerKg,
    maxPerKg: range.maxPerKg,
  };
}
