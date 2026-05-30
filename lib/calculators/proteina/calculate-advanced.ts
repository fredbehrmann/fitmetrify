import { estimateLeanMassFromBodyFat } from "../tmb/calculate-lean-mass";
import {
  DEFAULT_MEAL_COUNT,
  PLANT_BASED_MULTIPLIER,
  PROTEIN_RANGES_BY_GOAL,
  type DietPreference,
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
  plantBasedAdjusted?: boolean;
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

function applyPlantBasedMultiplier(
  result: ProteinRangeResult,
  dietPreference?: DietPreference
): { result: ProteinRangeResult; adjusted: boolean } {
  if (dietPreference !== "vegetarian" && dietPreference !== "vegan") {
    return { result, adjusted: false };
  }

  return {
    result: {
      ...result,
      minGrams: Math.round(result.minGrams * PLANT_BASED_MULTIPLIER),
      idealGrams: Math.round(result.idealGrams * PLANT_BASED_MULTIPLIER),
      maxGrams: Math.round(result.maxGrams * PLANT_BASED_MULTIPLIER),
    },
    adjusted: true,
  };
}

export function calculateAdvancedProtein(
  weightKg: number,
  goal: ProteinGoal,
  trainingType: TrainingType,
  weeklyFrequency: number,
  options?: {
    leanMass?: number;
    bodyFat?: number;
    dietPreference?: DietPreference;
    mealCount?: number;
  }
): AdvancedProteinResult {
  const leanMassKg = resolveLeanMass(
    weightKg,
    options?.leanMass,
    options?.bodyFat
  );

  const mealCount = options?.mealCount ?? DEFAULT_MEAL_COUNT;
  let base: ProteinRangeResult;
  let usesLeanMass = false;
  let gramsPerKgLbm: number | undefined;

  if (leanMassKg !== null) {
    const range = PROTEIN_RANGES_BY_GOAL[goal];
    gramsPerKgLbm = (range.minPerKg + range.maxPerKg) / 2;
    base = {
      minGrams: Math.round(leanMassKg * range.minPerKg),
      idealGrams: Math.round(leanMassKg * gramsPerKgLbm),
      maxGrams: Math.round(leanMassKg * range.maxPerKg),
      minPerKg: range.minPerKg,
      maxPerKg: range.maxPerKg,
    };
    usesLeanMass = true;
  } else {
    base = calculateSimpleProtein(weightKg, goal);
  }

  const { result: adjustedBase, adjusted } = applyPlantBasedMultiplier(
    base,
    options?.dietPreference
  );

  return {
    ...adjustedBase,
    leanMassKg: leanMassKg ?? undefined,
    gramsPerKgLbm,
    mealCount,
    gramsPerMeal: Math.round(adjustedBase.idealGrams / mealCount),
    usesLeanMass,
    plantBasedAdjusted: adjusted,
  };
}
