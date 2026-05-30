import {
  BIOTYPE_ADJUSTMENT,
  type Biotype,
  type Sex,
} from "./constants";
import type { SimplePesoIdealResult } from "./calculate-simple";
import { calculateSimplePesoIdeal } from "./calculate-simple";

export type WeightDeltaStatus = "within" | "below" | "above";

export type AdvancedPesoIdealResult = SimplePesoIdealResult & {
  currentWeight?: number;
  bodyFat?: number;
  biotype: Biotype;
  adjustedCentralWeight: number;
  adjustedOmsMin: number;
  adjustedOmsMax: number;
  leanMassKg?: number;
  weightDelta?: number;
  weightDeltaStatus?: WeightDeltaStatus;
};

export function calculateAdvancedPesoIdeal(
  heightCm: number,
  sex: Sex,
  options: {
    currentWeight?: number;
    bodyFat?: number;
    biotype: Biotype;
  }
): AdvancedPesoIdealResult {
  const base = calculateSimplePesoIdeal(heightCm, sex);
  const adjustment = BIOTYPE_ADJUSTMENT[options.biotype];
  const factor = 1 + adjustment;
  const adjustedCentralWeight = base.centralWeight * factor;
  const adjustedOmsMin = base.formulas.omsMin * factor;
  const adjustedOmsMax = base.formulas.omsMax * factor;

  const result: AdvancedPesoIdealResult = {
    ...base,
    biotype: options.biotype,
    adjustedCentralWeight,
    adjustedOmsMin,
    adjustedOmsMax,
  };

  if (options.bodyFat !== undefined) {
    if (options.currentWeight !== undefined) {
      result.leanMassKg =
        options.currentWeight * (1 - options.bodyFat / 100);
    }
    result.bodyFat = options.bodyFat;
  }

  if (options.currentWeight !== undefined) {
    result.currentWeight = options.currentWeight;
    const { adjustedMin, adjustedMax } = {
      adjustedMin: adjustedOmsMin,
      adjustedMax: adjustedOmsMax,
    };

    if (options.currentWeight < adjustedMin) {
      result.weightDeltaStatus = "below";
      result.weightDelta = options.currentWeight - adjustedMin;
    } else if (options.currentWeight > adjustedMax) {
      result.weightDeltaStatus = "above";
      result.weightDelta = options.currentWeight - adjustedMax;
    } else {
      result.weightDeltaStatus = "within";
      result.weightDelta = 0;
    }
  }

  return result;
}
