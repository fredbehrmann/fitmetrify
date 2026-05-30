import { MEAL_NAMES_BY_COUNT } from "./constants";
import { estimateProteinForMeal } from "./protein-estimate";

export type MealDistribution = {
  name: string;
  calories: number;
  percent: number;
  proteinMidGrams: number;
  proteinMinGrams: number;
  proteinMaxGrams: number;
};

export type SimpleDistributionResult = {
  totalCalories: number;
  mealCount: number;
  meals: MealDistribution[];
  averageCalories: number;
};

export function distributeSimple(
  totalCalories: number,
  mealCount: number
): SimpleDistributionResult {
  const names = MEAL_NAMES_BY_COUNT[mealCount] ?? buildGenericNames(mealCount);
  const caloriesPerMeal = totalCalories / mealCount;
  const percent = 100 / mealCount;

  const meals = names.map((name) => {
    const protein = estimateProteinForMeal(caloriesPerMeal);
    return {
      name,
      calories: caloriesPerMeal,
      percent,
      proteinMidGrams: protein.midGrams,
      proteinMinGrams: protein.minGrams,
      proteinMaxGrams: protein.maxGrams,
    };
  });

  return {
    totalCalories,
    mealCount,
    meals,
    averageCalories: caloriesPerMeal,
  };
}

function buildGenericNames(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `Refeição ${index + 1}`);
}
