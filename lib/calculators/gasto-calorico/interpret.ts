import type { ResultKpi } from "@/lib/calculators/engines/types";

import type { CalorieTargets } from "./calorie-targets";
import type { Goal } from "./constants";
import { formatFactor, formatKcal } from "./format";

export function buildInterpretation(
  targets: CalorieTargets,
  goal: Goal
): string {
  const { maintenance, weightLoss, hypertrophy } = targets;

  const base = `Seu gasto calórico diário estimado (manutenção) é de ${formatKcal(maintenance)} kcal/dia — a soma da sua TMB com o gasto das atividades do dia.`;

  switch (goal) {
    case "lose":
      return `${base} Para emagrecer, uma referência comum é consumir cerca de ${formatKcal(weightLoss)} kcal/dia (aproximadamente 20% abaixo da manutenção).`;
    case "gain":
      return `${base} Para ganho de massa, muitas pessoas começam em torno de ${formatKcal(hypertrophy)} kcal/dia (superávit moderado de ~10%).`;
    default:
      return `${base} Para manter o peso, procure ficar próximo desse valor no dia a dia.`;
  }
}

export function buildNextSteps(): string[] {
  return [
    "Use a calculadora de déficit calórico para refinar seu plano de emagrecimento.",
    "Distribua suas calorias entre proteína, carboidrato e gordura na calculadora de macronutrientes.",
  ];
}

export function buildResultKpis(
  activityFactor: number,
  targets: CalorieTargets
): ResultKpi[] {
  return [
    {
      label: "Fator de atividade",
      value: formatFactor(activityFactor),
    },
    {
      label: "Calorias para emagrecimento",
      value: formatKcal(targets.weightLoss),
      unit: "kcal/dia",
    },
    {
      label: "Calorias para hipertrofia",
      value: formatKcal(targets.hypertrophy),
      unit: "kcal/dia",
    },
    {
      label: "Faixa recomendada",
      value: targets.recommendedRange,
    },
  ];
}
