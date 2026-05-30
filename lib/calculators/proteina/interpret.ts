import type {
  ResultClassification,
  ResultKpi,
} from "@/lib/calculators/engines/types";

import type { AdvancedProteinResult } from "./calculate-advanced";
import type { ProteinRangeResult } from "./calculate-simple";
import type { DietPreference, ProteinGoal } from "./constants";
import { formatGrams, formatGramsPerKg } from "./format";

const GOAL_LABELS: Record<ProteinGoal, string> = {
  general: "saúde geral",
  "weight-loss": "emagrecimento",
  hypertrophy: "hipertrofia",
  athlete: "atleta / treino intenso",
};

const GOAL_CLASSIFICATION_LABELS: Record<ProteinGoal, string> = {
  general: "Sedentário / saúde geral",
  "weight-loss": "Emagrecimento",
  hypertrophy: "Hipertrofia",
  athlete: "Atleta / treino intenso",
};

export function buildProteinClassification(
  goal: ProteinGoal
): ResultClassification {
  return {
    label: GOAL_CLASSIFICATION_LABELS[goal],
    variant: "default",
  };
}

export function buildSimpleInterpretation(
  weightKg: number,
  goal: ProteinGoal,
  result: ProteinRangeResult
): string {
  return `Para ${formatGrams(weightKg)} kg com objetivo de ${GOAL_LABELS[goal]}, a faixa sugerida é de ${formatGrams(result.minGrams)} a ${formatGrams(result.maxGrams)} g de proteína por dia. O valor ideal (ponto médio) é ${formatGrams(result.idealGrams)} g/dia — equivalente a cerca de ${formatGramsPerKg((result.minPerKg + result.maxPerKg) / 2)} g por kg de peso corporal. Distribua em 3–5 refeições com aproximadamente 25–40 g de proteína em cada.`;
}

export function buildAdvancedInterpretation(
  weightKg: number,
  result: AdvancedProteinResult,
  goal: ProteinGoal
): string {
  if (result.usesLeanMass && result.leanMassKg !== undefined) {
    return `Com massa magra estimada de ${formatGrams(result.leanMassKg)} kg, a ingestão ideal é ${formatGrams(result.idealGrams)} g/dia (${formatGramsPerKg(result.gramsPerKgLbm ?? 0)} g/kg de massa magra). Em ${result.mealCount} refeições, isso representa cerca de ${formatGrams(result.gramsPerMeal)} g por refeição — por exemplo: ${formatGrams(result.idealGrams)} g/dia em ${result.mealCount} refeições = ${formatGrams(result.gramsPerMeal)} g por refeição.`;
  }

  const base = buildSimpleInterpretation(weightKg, goal, result);
  return `${base} Informe percentual de gordura ou massa magra para um cálculo baseado em composição corporal. Em ${result.mealCount} refeições: cerca de ${formatGrams(result.gramsPerMeal)} g por refeição.`;
}

export function buildSimpleKpis(result: ProteinRangeResult): ResultKpi[] {
  return [
    {
      label: "Proteína mínima",
      value: formatGrams(result.minGrams),
      unit: "g/dia",
    },
    {
      label: "Proteína máxima",
      value: formatGrams(result.maxGrams),
      unit: "g/dia",
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedProteinResult): ResultKpi[] {
  const kpis = buildSimpleKpis(result);

  if (result.usesLeanMass && result.gramsPerKgLbm !== undefined) {
    kpis.push({
      label: "Proteína por massa magra",
      value: formatGramsPerKg(result.gramsPerKgLbm),
      unit: "g/kg",
    });
  }

  kpis.push(
    {
      label: "Por refeição",
      value: formatGrams(result.gramsPerMeal),
      unit: `g (${result.mealCount} refeições)`,
    },
    {
      label: "Total diário",
      value: formatGrams(result.idealGrams),
      unit: "g/dia",
    }
  );

  return kpis;
}

export function buildProteinSourceKpis(): ResultKpi[] {
  return [
    { label: "Frango", value: "31", unit: "g/100g" },
    { label: "Atum", value: "29", unit: "g/100g" },
    { label: "Tofu", value: "17", unit: "g/100g" },
    { label: "Lentilha", value: "9", unit: "g/100g" },
  ];
}

export function buildDietPreferenceNote(
  preference?: DietPreference
): string | undefined {
  if (preference === "vegetarian" || preference === "vegan") {
    return "Vegetarianos e veganos devem priorizar combinação de leguminosas + cereais e aumentar a ingestão em ~10–15% pela menor digestibilidade das proteínas vegetais.";
  }
  return undefined;
}

export function buildNextSteps(): string[] {
  return [
    "Distribua suas calorias entre proteína, carboidrato e gordura na calculadora de macronutrientes.",
    "Mantenha o déficit calórico alinhado à meta de emagrecimento, se aplicável.",
  ];
}
