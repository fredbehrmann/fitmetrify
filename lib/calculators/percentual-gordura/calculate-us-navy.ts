import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

import type { BodyFatResult } from "./constants";

export type UsNavyInput = {
  sex: Sex;
  heightCm: number;
  weightKg: number;
  waistCm: number;
  neckCm: number;
  hipCm?: number;
};

export function calculateUsNavyBodyFat(input: UsNavyInput): number | null {
  const { sex, heightCm, waistCm, neckCm, hipCm } = input;

  if (heightCm <= 0 || waistCm <= neckCm) return null;

  if (sex === "male") {
    const bodyFat =
      86.01 * Math.log10(waistCm - neckCm) -
      70.041 * Math.log10(heightCm) +
      36.76;
    return clampBodyFat(bodyFat);
  }

  if (hipCm === undefined || hipCm <= 0) return null;
  const sum = waistCm + hipCm - neckCm;
  if (sum <= 0) return null;

  const bodyFat =
    163.205 * Math.log10(sum) -
    97.684 * Math.log10(heightCm) -
    78.387;

  return clampBodyFat(bodyFat);
}

function clampBodyFat(value: number): number {
  return Math.max(2, Math.min(60, value));
}

export function buildUsNavyResult(input: UsNavyInput): BodyFatResult | null {
  const bodyFatPercent = calculateUsNavyBodyFat(input);
  if (bodyFatPercent === null) return null;

  const fatMassKg = (input.weightKg * bodyFatPercent) / 100;
  const leanMassKg = input.weightKg - fatMassKg;

  return {
    bodyFatPercent,
    fatMassKg,
    leanMassKg,
    method: "us-navy",
    sex: input.sex,
  };
}
