import type { OneRmMethod } from "../strength/constants";
import {
  calculateAllOneRmEstimates,
  type OneRmEstimates,
} from "../strength/one-rm-formulas";

export type AdvancedOneRmResult = {
  loadKg: number;
  reps: number;
  estimates: OneRmEstimates;
  selectedMethod: OneRmMethod;
  oneRmKg: number;
};

export function calculateAdvancedOneRm(
  loadKg: number,
  reps: number,
  selectedMethod: OneRmMethod = "average"
): AdvancedOneRmResult | null {
  const estimates = calculateAllOneRmEstimates(loadKg, reps);
  if (estimates === null) return null;

  const oneRmKg =
    selectedMethod === "average"
      ? estimates.average
      : estimates[selectedMethod];

  return {
    loadKg,
    reps,
    estimates,
    selectedMethod,
    oneRmKg,
  };
}
