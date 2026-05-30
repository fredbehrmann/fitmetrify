import {
  PROTEIN_CALORIE_SHARE_MAX,
  PROTEIN_CALORIE_SHARE_MIN,
  PROTEIN_KCAL_PER_GRAM,
} from "./constants";

export type ProteinEstimate = {
  minGrams: number;
  maxGrams: number;
  midGrams: number;
};

export function estimateProteinForMeal(mealCalories: number): ProteinEstimate {
  const minGrams =
    (mealCalories * PROTEIN_CALORIE_SHARE_MIN) / PROTEIN_KCAL_PER_GRAM;
  const maxGrams =
    (mealCalories * PROTEIN_CALORIE_SHARE_MAX) / PROTEIN_KCAL_PER_GRAM;
  const midGrams = (minGrams + maxGrams) / 2;

  return { minGrams, maxGrams, midGrams };
}
