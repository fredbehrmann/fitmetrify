import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedMacros } from "../macros/calculate-advanced";
import { calculateSimpleMacros } from "../macros/calculate-simple";
import { MACRO_SPLITS_BY_GOAL, type MacroGoal } from "../macros/constants";
import { formatKcal } from "../macros/format";
import {
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildClassification,
  buildMacroChart,
  buildNextSteps,
  buildSimpleInterpretation,
  buildSimpleKpis,
} from "../macros/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseGoal(value: unknown): MacroGoal | null {
  if (typeof value === "string" && value in MACRO_SPLITS_BY_GOAL) {
    return value as MacroGoal;
  }
  return null;
}

function parseBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "on";
}

function buildSimpleResult(
  calories: number,
  goal: MacroGoal
): CalculatorResult {
  const profile = calculateSimpleMacros(calories, goal);

  return {
    primaryValue: formatKcal(calories),
    primaryUnit: "kcal/dia",
    primaryLabel: "Calorias alvo",
    classification: buildClassification(goal),
    interpretation: buildSimpleInterpretation(calories, goal, profile),
    kpis: buildSimpleKpis(profile),
    macroChart: buildMacroChart(profile),
    nextSteps: buildNextSteps(),
  };
}

function buildAdvancedResult(
  calories: number,
  result: NonNullable<ReturnType<typeof calculateAdvancedMacros>>
): CalculatorResult {
  const chartProfile = result.training;

  return {
    primaryValue: formatKcal(calories),
    primaryUnit: "kcal/dia",
    primaryLabel: "Calorias alvo",
    classification: {
      label: result.hasCycling ? "Ciclagem de carboidratos" : "Macros personalizados",
      variant: "default",
    },
    interpretation: buildAdvancedInterpretation(calories, result),
    kpis: buildAdvancedKpis(result),
    macroChart: buildMacroChart(chartProfile),
    nextSteps: buildNextSteps(),
  };
}

export const macrosEngine: CalculatorEngine = {
  calculateSimple(values) {
    const calories = parseNumber(values.calories);
    const goal = parseGoal(values.goal);

    if (calories === null || goal === null) return null;

    return buildSimpleResult(calories, goal);
  },

  calculateAdvanced(values) {
    const weight = parseNumber(values.weight);
    const calories = parseNumber(values.calories);
    const proteinPerKg = parseNumber(values.proteinPerKg);
    const fatMinPerKg = parseNumber(values.fatMinPerKg);
    const adjustCarbs = parseBoolean(values.adjustCarbs);
    const trainingDays = parseNumber(values.trainingDays);

    if (
      weight === null ||
      calories === null ||
      proteinPerKg === null ||
      fatMinPerKg === null
    ) {
      return null;
    }

    if (adjustCarbs && trainingDays === null) {
      return null;
    }

    const result = calculateAdvancedMacros(
      weight,
      calories,
      proteinPerKg,
      fatMinPerKg,
      {
        adjustCarbs,
        trainingDays: trainingDays ?? 0,
      }
    );

    if (result === null) {
      return {
        primaryValue: formatKcal(calories),
        primaryUnit: "kcal/dia",
        primaryLabel: "Calorias alvo",
        interpretation:
          "Proteína e gordura mínimas (em g/kg) ultrapassam o alvo calórico informado. Reduza os valores em g/kg ou aumente as calorias diárias.",
        warnings: [
          "A soma de proteína e gordura mínimas excede o total de calorias. Ajuste os parâmetros.",
        ],
        nextSteps: buildNextSteps(),
      };
    }

    return buildAdvancedResult(calories, result);
  },
};
