import type { CalculatorEngine, CalculatorResult } from "./types";
import { distributeAdvanced } from "../calorias-refeicao/distribute-advanced";
import { distributeSimple } from "../calorias-refeicao/distribute-simple";
import type {
  MainMeal,
  MealProtocol,
  TrainingTime,
} from "../calorias-refeicao/constants";
import { formatKcal } from "../calorias-refeicao/format";
import {
  buildAdvancedClassification,
  buildAdvancedInterpretation,
  buildMealKpis,
  buildNextSteps,
  buildProteinWarnings,
  buildSimpleClassification,
  buildSimpleInterpretation,
} from "../calorias-refeicao/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseMealCount(value: unknown): number | null {
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed >= 2 && parsed <= 6) return parsed;
  }
  if (typeof value === "number" && value >= 2 && value <= 6) return value;
  return null;
}

function parseProtocol(value: unknown): MealProtocol | null {
  const protocols: MealProtocol[] = [
    "uniform",
    "pre-workout",
    "post-workout",
    "fasting-16-8",
    "fasting-18-6",
  ];
  if (typeof value === "string" && protocols.includes(value as MealProtocol)) {
    return value as MealProtocol;
  }
  return null;
}

function parseTrainingTime(value: unknown): TrainingTime | null {
  const times: TrainingTime[] = ["morning", "afternoon", "evening", "none"];
  if (typeof value === "string" && times.includes(value as TrainingTime)) {
    return value as TrainingTime;
  }
  return null;
}

function parseMainMeal(value: unknown): MainMeal | null {
  const meals: MainMeal[] = ["breakfast", "lunch", "dinner"];
  if (typeof value === "string" && meals.includes(value as MainMeal)) {
    return value as MainMeal;
  }
  return null;
}

export const caloriasRefeicaoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const calories = parseNumber(values.calories);
    const mealCount = parseMealCount(values.mealCount);

    if (calories === null || mealCount === null) return null;

    const result = distributeSimple(calories, mealCount);
    const warnings = buildProteinWarnings(result.meals);

    return {
      primaryValue: formatKcal(result.averageCalories),
      primaryUnit: "kcal/refeição",
      primaryLabel: "Média por refeição",
      classification: buildSimpleClassification(),
      interpretation: buildSimpleInterpretation(result),
      kpis: buildMealKpis(result.meals),
      warnings: warnings.length > 0 ? warnings : undefined,
      nextSteps: buildNextSteps(),
      relatedSlugs: ["calculadora-macros", "calculadora-gasto-calorico"],
    } satisfies CalculatorResult;
  },

  calculateAdvanced(values) {
    const calories = parseNumber(values.calories);
    const mealCount = parseMealCount(values.mealCount);
    const protocol = parseProtocol(values.mealProtocol);
    const trainingTime = parseTrainingTime(values.trainingTime);
    const mainMeal = parseMainMeal(values.mainMeal);

    if (
      calories === null ||
      mealCount === null ||
      protocol === null ||
      trainingTime === null ||
      mainMeal === null
    ) {
      return null;
    }

    const result = distributeAdvanced(calories, mealCount, protocol, {
      trainingTime,
      mainMeal,
    });
    const warnings = buildProteinWarnings(result.meals);

    return {
      primaryValue: formatKcal(result.mainMealCalories),
      primaryUnit: "kcal",
      primaryLabel: "Refeição principal",
      classification: buildAdvancedClassification(protocol),
      interpretation: buildAdvancedInterpretation(result),
      kpis: buildMealKpis(result.meals),
      warnings: warnings.length > 0 ? warnings : undefined,
      nextSteps: buildNextSteps(),
      relatedSlugs: ["calculadora-macros", "calculadora-gasto-calorico"],
    } satisfies CalculatorResult;
  },
};
