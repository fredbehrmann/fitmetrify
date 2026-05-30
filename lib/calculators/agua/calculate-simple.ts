import {
  CUP_ML,
  ML_PER_KG,
  SENIOR_ML_PER_KG,
  type AgeGroup,
} from "./constants";

export type WaterResult = {
  baseMl: number;
  totalMl: number;
  liters: number;
  cups: number;
  mlPerKg: number;
};

export function getMlPerKg(ageGroup: AgeGroup = "adult"): number {
  return ageGroup === "senior" ? SENIOR_ML_PER_KG : ML_PER_KG;
}

export function calculateBaseWaterMl(
  weightKg: number,
  ageGroup: AgeGroup = "adult"
): number {
  return weightKg * getMlPerKg(ageGroup);
}

export function calculateSimpleWater(
  weightKg: number,
  ageGroup: AgeGroup = "adult"
): WaterResult {
  const mlPerKg = getMlPerKg(ageGroup);
  const baseMl = weightKg * mlPerKg;
  const totalMl = baseMl;

  return {
    baseMl,
    totalMl,
    liters: totalMl / 1000,
    cups: Math.round(totalMl / CUP_ML),
    mlPerKg,
  };
}
