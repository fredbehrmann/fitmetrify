import type {
  ResultClassification,
  ResultKpi,
} from "@/lib/calculators/engines/types";

import {
  MEAL_PROTOCOL_LABELS,
  MIN_PROTEIN_GRAMS_PER_MEAL,
  type MealProtocol,
} from "./constants";
import type { AdvancedDistributionResult } from "./distribute-advanced";
import type { SimpleDistributionResult } from "./distribute-simple";
import { formatKcal, formatPercent, formatProteinGrams } from "./format";

export function buildSimpleClassification(): ResultClassification {
  return {
    label: "Distribuição uniforme",
    variant: "default",
  };
}

export function buildAdvancedClassification(
  protocol: MealProtocol
): ResultClassification {
  return {
    label: MEAL_PROTOCOL_LABELS[protocol],
    variant: "default",
  };
}

export function buildSimpleInterpretation(
  result: SimpleDistributionResult
): string {
  return `Com ${formatKcal(result.totalCalories)} kcal divididas em ${result.mealCount} refeições, cada refeição fica com cerca de ${formatKcal(result.averageCalories)} kcal (${formatPercent(100 / result.mealCount)} do total). A proteína estimada por refeição (25–30% das calorias) fica entre ${formatProteinGrams(result.meals[0]?.proteinMinGrams ?? 0)} e ${formatProteinGrams(result.meals[0]?.proteinMaxGrams ?? 0)} g.`;
}

export function buildAdvancedInterpretation(
  result: AdvancedDistributionResult
): string {
  const mainMeal = result.meals[result.mainMealIndex];
  const protocolLabel = MEAL_PROTOCOL_LABELS[result.protocol].toLowerCase();

  return `Protocolo ${protocolLabel}: ${result.mealCount} refeições totalizando ${formatKcal(result.totalCalories)} kcal. A refeição principal (${mainMeal?.name ?? "—"}) concentra ${formatKcal(mainMeal?.calories ?? 0)} kcal (${formatPercent(mainMeal?.percent ?? 0)}). Distribua proteína ao longo do dia — cada refeição deve idealmente atingir pelo menos ${MIN_PROTEIN_GRAMS_PER_MEAL} g para síntese proteica adequada.`;
}

export function buildMealKpis(
  meals: SimpleDistributionResult["meals"]
): ResultKpi[] {
  return meals.map((meal) => ({
    label: meal.name,
    value: formatKcal(meal.calories),
    unit: `${formatPercent(meal.percent)} · ~${formatProteinGrams(meal.proteinMidGrams)} g prot.`,
  }));
}

export function buildProteinWarnings(
  meals: SimpleDistributionResult["meals"]
): string[] {
  const lowProteinMeals = meals.filter(
    (meal) => meal.proteinMaxGrams < MIN_PROTEIN_GRAMS_PER_MEAL
  );

  if (lowProteinMeals.length === 0) return [];

  const names = lowProteinMeals.map((meal) => meal.name).join(", ");
  return [
    `${names} ${lowProteinMeals.length === 1 ? "não atinge" : "não atingem"} ${MIN_PROTEIN_GRAMS_PER_MEAL} g de proteína por refeição (mesmo no cenário de 30% das calorias). Considere redistribuir ou aumentar a proteína nessas refeições.`,
  ];
}

export function buildNextSteps(): string[] {
  return [
    "Use a calculadora de macronutrientes para definir proteína, carboidrato e gordura totais.",
    "Ajuste pré e pós-treino conforme horário e intensidade do treino.",
    "Distribua proteína de forma equilibrada — evite refeições muito pobres em proteína.",
  ];
}
