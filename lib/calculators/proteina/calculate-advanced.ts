import { estimateLeanMassFromBodyFat } from "../tmb/calculate-lean-mass";
import {
  DEFAULT_MEAL_COUNT,
  LBM_FREQUENCY_BONUS,
  LBM_FREQUENCY_THRESHOLD,
  LBM_PROTEIN_BASE_PER_KG,
  LBM_PROTEIN_MAX_PER_KG,
  LBM_PROTEIN_MIN_PER_KG,
  LBM_STRENGTH_BONUS,
  type ProteinGoal,
  type TrainingType,
} from "./constants";
import {
  calculateSimpleProtein,
  type ProteinRangeResult,
} from "./calculate-simple";

export type AdvancedProteinResult = ProteinRangeResult & {
  leanMassKg?: number;
  gramsPerKgLbm?: number;
  mealCount: number;
  gramsPerMeal: number;
  usesLeanMass: boolean;
};

function resolveLeanMass(
  weightKg: number,
  leanMass?: number,
  bodyFat?: number
): number | null {
  if (leanMass !== undefined && leanMass > 0) return leanMass;
  if (bodyFat !== undefined) return estimateLeanMassFromBodyFat(weightKg, bodyFat);
  return null;
}

function calculateLbmProteinPerKg(
  trainingType: TrainingType,
  weeklyFrequency: number
): number {
  let gramsPerKg = LBM_PROTEIN_BASE_PER_KG;
  if (trainingType === "strength") gramsPerKg += LBM_STRENGTH_BONUS;
  if (weeklyFrequency >= LBM_FREQUENCY_THRESHOLD) gramsPerKg += LBM_FREQUENCY_BONUS;
  return Math.min(LBM_PROTEIN_MAX_PER_KG, gramsPerKg);
}

export function calculateAdvancedProtein(
  weightKg: number,
  goal: ProteinGoal,
  trainingType: TrainingType,
  weeklyFrequency: number,
  options?: { leanMass?: number; bodyFat?: number }
): AdvancedProteinResult {
  const leanMassKg = resolveLeanMass(
    weightKg,
    options?.leanMass,
    options?.bodyFat
  );

  let base: ProteinRangeResult;

  if (leanMassKg !== null) {
    const gramsPerKgLbm = calculateLbmProteinPerKg(trainingType, weeklyFrequency);
    base = {
      minGrams: Math.round(leanMassKg * LBM_PROTEIN_MIN_PER_KG),
      idealGrams: Math.round(leanMassKg * gramsPerKgLbm),
      maxGrams: Math.round(leanMassKg * LBM_PROTEIN_MAX_PER_KG),
      minPerKg: LBM_PROTEIN_MIN_PER_KG,
      maxPerKg: LBM_PROTEIN_MAX_PER_KG,
    };

    const mealCount = DEFAULT_MEAL_COUNT;
    return {
      ...base,
      leanMassKg,
      gramsPerKgLbm,
      mealCount,
      gramsPerMeal: Math.round(base.idealGrams / mealCount),
      usesLeanMass: true,
    };
  }

  base = calculateSimpleProtein(weightKg, goal);
  const mealCount = DEFAULT_MEAL_COUNT;

  return {
    ...base,
    mealCount,
    gramsPerMeal: Math.round(base.idealGrams / mealCount),
    usesLeanMass: false,
  };
}
