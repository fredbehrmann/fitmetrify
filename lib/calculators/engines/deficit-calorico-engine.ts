import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedDeficit } from "../deficit-calorico/calculate-advanced";
import { calculateSimpleDeficit } from "../deficit-calorico/calculate-simple";
import {
  DEFICIT_STRATEGY_PERCENT,
  type DeficitStrategy,
  type Sex,
} from "../deficit-calorico/constants";
import { formatKcal } from "../deficit-calorico/format";
import {
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildAdvancedWarnings,
  buildNextSteps,
  buildSimpleClassification,
  buildSimpleInterpretation,
  buildSimpleKpis,
  buildSimpleWarnings,
} from "../deficit-calorico/interpret";
import { ACTIVITY_LEVEL_FACTORS } from "../gasto-calorico/constants";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseStrategy(value: unknown): DeficitStrategy | null {
  if (typeof value === "string" && value in DEFICIT_STRATEGY_PERCENT) {
    return value as DeficitStrategy;
  }
  return null;
}

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function parseTrainingLevel(value: unknown): string | null {
  if (typeof value === "string" && value in ACTIVITY_LEVEL_FACTORS) {
    return value;
  }
  return null;
}

function buildDeficitResult(
  expenditure: number,
  targetCalories: number,
  interpretation: string,
  kpis: CalculatorResult["kpis"],
  options?: {
    classification?: CalculatorResult["classification"];
    warnings?: string[];
  }
): CalculatorResult {
  return {
    primaryValue: formatKcal(targetCalories),
    primaryUnit: "kcal/dia",
    primaryLabel: "Calorias diárias sugeridas",
    interpretation,
    kpis,
    nextSteps: buildNextSteps(),
    classification: options?.classification,
    warnings: options?.warnings,
    actions: [
      {
        label: "Distribuir Macronutrientes",
        href: "/calculadora-macros",
        params: { calories: targetCalories },
      },
    ],
  };
}

export const deficitCaloricoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const expenditure = parseNumber(values.dailyExpenditure);
    const strategy = parseStrategy(values.strategy);
    const sex = parseSex(values.sex);

    if (expenditure === null || strategy === null) return null;

    const result = calculateSimpleDeficit(expenditure, strategy);

    return buildDeficitResult(
      expenditure,
      result.targetCalories,
      buildSimpleInterpretation(expenditure, result, strategy),
      buildSimpleKpis(result),
      {
        classification: buildSimpleClassification(strategy),
        warnings: buildSimpleWarnings(result, strategy, sex ?? undefined),
      }
    );
  },

  calculateAdvanced(values) {
    const expenditure = parseNumber(values.dailyExpenditure);
    const currentWeight = parseNumber(values.currentWeight);
    const targetWeight = parseNumber(values.targetWeight);
    const deadline = parseNumber(values.deadline);
    const sex = parseSex(values.sex);
    const trainingLevel = parseTrainingLevel(values.trainingLevel);
    const minProtein = parseNumber(values.minProtein) ?? undefined;

    if (
      expenditure === null ||
      currentWeight === null ||
      targetWeight === null ||
      deadline === null ||
      sex === null ||
      trainingLevel === null
    ) {
      return null;
    }

    const result = calculateAdvancedDeficit(
      expenditure,
      currentWeight,
      targetWeight,
      deadline
    );

    if (!result) return null;

    return buildDeficitResult(
      expenditure,
      result.targetCalories,
      buildAdvancedInterpretation(expenditure, result),
      buildAdvancedKpis(result),
      {
        warnings: buildAdvancedWarnings(
          result,
          sex,
          trainingLevel,
          minProtein,
          currentWeight
        ),
      }
    );
  },
};
