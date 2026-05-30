import {
  FASTING_16_8_PERCENTAGES,
  type MainMeal,
  MEAL_NAMES_BY_COUNT,
  type MealProtocol,
  type TrainingTime,
  WORKOUT_MEAL_BOOST,
} from "./constants";
import type { MealDistribution } from "./distribute-simple";
import { estimateProteinForMeal } from "./protein-estimate";

export type AdvancedDistributionResult = {
  totalCalories: number;
  mealCount: number;
  protocol: MealProtocol;
  meals: MealDistribution[];
  mainMealIndex: number;
  mainMealCalories: number;
};

export function distributeAdvanced(
  totalCalories: number,
  mealCount: number,
  protocol: MealProtocol,
  options: {
    trainingTime: TrainingTime;
    mainMeal: MainMeal;
  }
): AdvancedDistributionResult {
  const percentages = buildPercentages(
    mealCount,
    protocol,
    options.trainingTime,
    options.mainMeal
  );

  const names = resolveMealNames(mealCount, protocol);
  const mainMealIndex = resolveMainMealIndex(
    mealCount,
    options.mainMeal,
    protocol
  );

  const meals = percentages.map((percent, index) => {
    const calories = (totalCalories * percent) / 100;
    const protein = estimateProteinForMeal(calories);
    return {
      name: names[index] ?? `Refeição ${index + 1}`,
      calories,
      percent,
      proteinMidGrams: protein.midGrams,
      proteinMinGrams: protein.minGrams,
      proteinMaxGrams: protein.maxGrams,
    };
  });

  return {
    totalCalories,
    mealCount,
    protocol,
    meals,
    mainMealIndex,
    mainMealCalories: meals[mainMealIndex]?.calories ?? meals[0].calories,
  };
}

function buildPercentages(
  mealCount: number,
  protocol: MealProtocol,
  trainingTime: TrainingTime,
  mainMeal: MainMeal
): number[] {
  switch (protocol) {
    case "uniform":
    case "fasting-18-6":
      return uniformPercentages(mealCount);
    case "fasting-16-8":
      return fasting168Percentages(mealCount);
    case "pre-workout":
      return boostedMealPercentages(
        mealCount,
        resolvePreWorkoutIndex(mealCount, trainingTime, mainMeal)
      );
    case "post-workout":
      return boostedMealPercentages(
        mealCount,
        resolvePostWorkoutIndex(mealCount, trainingTime, mainMeal)
      );
    default:
      return uniformPercentages(mealCount);
  }
}

function uniformPercentages(mealCount: number): number[] {
  const share = 100 / mealCount;
  return Array.from({ length: mealCount }, () => share);
}

function fasting168Percentages(mealCount: number): number[] {
  if (mealCount === 3) {
    return [...FASTING_16_8_PERCENTAGES];
  }

  const first = FASTING_16_8_PERCENTAGES[0];
  const second = FASTING_16_8_PERCENTAGES[1];
  const remaining = 100 - first - second;
  const tailShare = remaining / Math.max(mealCount - 2, 1);

  return Array.from({ length: mealCount }, (_, index) => {
    if (index === 0) return first;
    if (index === 1) return second;
    return tailShare;
  });
}

function boostedMealPercentages(
  mealCount: number,
  boostedIndex: number
): number[] {
  const baseShare = 100 / mealCount;
  const boostedShare = baseShare * WORKOUT_MEAL_BOOST;
  const remaining = 100 - boostedShare;
  const otherShare = mealCount > 1 ? remaining / (mealCount - 1) : 0;

  return Array.from({ length: mealCount }, (_, index) =>
    index === boostedIndex ? boostedShare : otherShare
  );
}

function resolvePreWorkoutIndex(
  mealCount: number,
  trainingTime: TrainingTime,
  mainMeal: MainMeal
): number {
  if (trainingTime === "morning") return 0;
  if (trainingTime === "afternoon") {
    return Math.min(Math.floor(mealCount / 2), mealCount - 1);
  }
  if (trainingTime === "evening") {
    return Math.max(mealCount - 2, 0);
  }
  return mainMealToIndex(mainMeal, mealCount);
}

function resolvePostWorkoutIndex(
  mealCount: number,
  trainingTime: TrainingTime,
  mainMeal: MainMeal
): number {
  if (trainingTime === "morning") return Math.min(1, mealCount - 1);
  if (trainingTime === "afternoon") {
    return Math.min(Math.floor(mealCount / 2) + 1, mealCount - 1);
  }
  if (trainingTime === "evening") return mealCount - 1;
  return mainMealToIndex(mainMeal, mealCount);
}

function mainMealToIndex(mainMeal: MainMeal, mealCount: number): number {
  if (mainMeal === "breakfast") return 0;
  if (mainMeal === "lunch") {
    return Math.min(Math.floor(mealCount / 2), mealCount - 1);
  }
  return mealCount - 1;
}

function resolveMainMealIndex(
  mealCount: number,
  mainMeal: MainMeal,
  protocol: MealProtocol
): number {
  if (protocol === "fasting-16-8" && mealCount >= 2) {
    return 1;
  }
  return mainMealToIndex(mainMeal, mealCount);
}

function resolveMealNames(
  mealCount: number,
  protocol: MealProtocol
): string[] {
  if (protocol === "fasting-16-8") {
    if (mealCount === 3) {
      return ["Quebra do jejum", "Refeição principal", "Última refeição"];
    }
    return MEAL_NAMES_BY_COUNT[mealCount] ?? buildGenericNames(mealCount);
  }

  if (protocol === "fasting-18-6") {
    return Array.from(
      { length: mealCount },
      (_, index) => `Refeição na janela ${index + 1}`
    );
  }

  return MEAL_NAMES_BY_COUNT[mealCount] ?? buildGenericNames(mealCount);
}

function buildGenericNames(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `Refeição ${index + 1}`);
}

export function sumPercentages(percentages: number[]): number {
  return percentages.reduce((total, value) => total + value, 0);
}
