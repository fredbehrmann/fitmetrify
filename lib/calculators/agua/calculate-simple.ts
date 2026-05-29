import { CUP_ML, ML_PER_KG } from "./constants";

export type WaterResult = {
  baseMl: number;
  totalMl: number;
  liters: number;
  cups: number;
};

export function calculateBaseWaterMl(weightKg: number): number {
  return weightKg * ML_PER_KG;
}

export function calculateSimpleWater(weightKg: number): WaterResult {
  const baseMl = calculateBaseWaterMl(weightKg);
  const totalMl = baseMl;

  return {
    baseMl,
    totalMl,
    liters: totalMl / 1000,
    cups: Math.round(totalMl / CUP_ML),
  };
}
