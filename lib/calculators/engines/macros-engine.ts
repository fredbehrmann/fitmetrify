import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedMacros } from "../macros/calculate-advanced";
import {
  calculateMacrosFromGramsPerKg,
  calculateSimpleMacros,
} from "../macros/calculate-simple";
import { MACRO_SPLITS_BY_GOAL, type MacroGoal } from "../macros/constants";
import { formatKcal } from "../macros/format";
import {
  buildAdvancedInterpretation,
  buildAdvancedKpis,
  buildClassification,
  buildFoodExampleKpis,
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
  goal: MacroGoal,
  profile: ReturnType<typeof calculateSimpleMacros>
): CalculatorResult {
  return {
    primaryValue: formatKcal(calories),
    primaryUnit: "kcal/dia",
    primaryLabel: "Calorias alvo",
    classification: buildClassification(goal),
    interpretation: buildSimpleInterpretation(calories, goal, profile),
    kpis: [...buildSimpleKpis(profile), ...buildFoodExampleKpis(profile)],
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
    kpis: [
      ...buildAdvancedKpis(result),
      ...buildFoodExampleKpis(result.training),
    ],
    macroChart: buildMacroChart(chartProfile),
    nextSteps: buildNextSteps(),
  };
}

export const macrosEngine: CalculatorEngine = {
  calculateSimple(values) {
    const calories = parseNumber(values.calories);
    const goal = parseGoal(values.goal);
    const inputMode =
      values.inputMode === "gramsPerKg" ? "gramsPerKg" : "percent";

    if (calories === null || goal === null) return null;

    if (inputMode === "gramsPerKg") {
      const weight = parseNumber(values.weight);
      const proteinPerKg = parseNumber(values.proteinPerKg) ?? 1.8;
      const fatMinPerKg = parseNumber(values.fatMinPerKg) ?? 1.0;

      if (weight === null) return null;

      const profile = calculateMacrosFromGramsPerKg(
        weight,
        calories,
        proteinPerKg,
        fatMinPerKg
      );

      if (profile === null) {
        return {
          primaryValue: formatKcal(calories),
          primaryUnit: "kcal/dia",
          primaryLabel: "Calorias alvo",
          interpretation:
            "Proteína e gordura em g/kg ultrapassam o alvo calórico. Reduza os valores ou aumente as calorias.",
          warnings: [
            "A soma de proteína e gordura mínimas excede o total de calorias.",
          ],
          nextSteps: buildNextSteps(),
        };
      }

      return buildSimpleResult(calories, goal, profile);
    }

    const profile = calculateSimpleMacros(calories, goal);
    return buildSimpleResult(calories, goal, profile);
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
          "A soma de proteína e gordura mínimas excede o total de calorias. Ajuste os parámetros.",
        ],
        nextSteps: buildNextSteps(),
      };
    }

    return buildAdvancedResult(calories, result);
  },
};
