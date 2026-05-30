import type {
  MacroChartSegment,
  ResultClassification,
  ResultKpi,
} from "@/lib/calculators/engines/types";

import type { AdvancedMacroResult } from "./calculate-advanced";
import type { MacroProfile } from "./calculate-simple";
import {
  CHART_COLORS,
  GOAL_CLASSIFICATION_LABELS,
  type MacroGoal,
} from "./constants";
import { formatGrams, formatKcal, formatPercent } from "./format";

export function buildClassification(goal: MacroGoal): ResultClassification {
  return {
    label: GOAL_CLASSIFICATION_LABELS[goal],
    variant: goal === "lose" ? "success" : goal === "gain" ? "default" : "default",
  };
}

export function buildMacroChart(profile: MacroProfile): MacroChartSegment[] {
  return [
    {
      name: "Proteína",
      grams: profile.proteinG,
      percent: profile.proteinPercent,
      color: CHART_COLORS.protein,
    },
    {
      name: "Carboidrato",
      grams: profile.carbsG,
      percent: profile.carbsPercent,
      color: CHART_COLORS.carbs,
    },
    {
      name: "Gordura",
      grams: profile.fatG,
      percent: profile.fatPercent,
      color: CHART_COLORS.fat,
    },
  ];
}

export function buildSimpleKpis(profile: MacroProfile): ResultKpi[] {
  return [
    {
      label: "Proteína",
      value: formatGrams(profile.proteinG),
      unit: `g (${formatPercent(profile.proteinPercent)})`,
    },
    {
      label: "Carboidrato",
      value: formatGrams(profile.carbsG),
      unit: `g (${formatPercent(profile.carbsPercent)})`,
    },
    {
      label: "Gordura",
      value: formatGrams(profile.fatG),
      unit: `g (${formatPercent(profile.fatPercent)})`,
    },
  ];
}

export function buildFoodExampleKpis(profile: MacroProfile): ResultKpi[] {
  const chickenPortions = Math.max(1, Math.round(profile.proteinG / 31));
  const ricePortions = Math.max(1, Math.round(profile.carbsG / 28));
  const oilSpoons = Math.max(1, Math.round(profile.fatG / 14));

  return [
    {
      label: "Exemplo proteína",
      value: `~${chickenPortions} porção(ões)`,
      unit: "frango grelhado (31 g/100 g)",
    },
    {
      label: "Exemplo carboidrato",
      value: `~${ricePortions} porção(ões)`,
      unit: "arroz cozido (28 g/100 g)",
    },
    {
      label: "Exemplo gordura",
      value: `~${oilSpoons} colher(es)`,
      unit: "azeite (14 g/colher)",
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedMacroResult): ResultKpi[] {
  if (!result.hasCycling) {
    return buildSimpleKpis(result.training);
  }

  return [
    {
      label: "Treino — Proteína",
      value: formatGrams(result.training.proteinG),
      unit: "g",
    },
    {
      label: "Treino — Carboidrato",
      value: formatGrams(result.training.carbsG),
      unit: "g",
    },
    {
      label: "Treino — Gordura",
      value: formatGrams(result.training.fatG),
      unit: "g",
    },
    {
      label: "Descanso — Proteína",
      value: formatGrams(result.rest.proteinG),
      unit: "g",
    },
    {
      label: "Descanso — Carboidrato",
      value: formatGrams(result.rest.carbsG),
      unit: "g",
    },
    {
      label: "Descanso — Gordura",
      value: formatGrams(result.rest.fatG),
      unit: "g",
    },
  ];
}

export function buildSimpleInterpretation(
  calories: number,
  goal: MacroGoal,
  profile: MacroProfile
): string {
  const goalLabel = GOAL_CLASSIFICATION_LABELS[goal].toLowerCase();
  return `Com ${formatKcal(calories)} kcal/dia para ${goalLabel}, sua distribuição sugerida é ${formatGrams(profile.proteinG)} g de proteína (${formatPercent(profile.proteinPercent)}), ${formatGrams(profile.carbsG)} g de carboidrato (${formatPercent(profile.carbsPercent)}) e ${formatGrams(profile.fatG)} g de gordura (${formatPercent(profile.fatPercent)}). Proteína e carboidrato fornecem 4 kcal/g; gordura, 9 kcal/g.`;
}

export function buildAdvancedInterpretation(
  calories: number,
  result: AdvancedMacroResult
): string {
  const profile = result.training;

  if (!result.hasCycling) {
    return `Com proteína e gordura fixas por kg de peso, o restante das ${formatKcal(calories)} kcal diárias vai para carboidratos: cerca de ${formatGrams(profile.carbsG)} g/dia (${formatGrams(result.baseCarbG)} g em média antes do arredondamento). Total diário: ${formatGrams(profile.proteinG)} g proteína, ${formatGrams(profile.carbsG)} g carboidrato e ${formatGrams(profile.fatG)} g gordura.`;
  }

  return `Proteína e gordura permanecem estáveis todos os dias. Nos dias de treino, priorize ${formatGrams(result.training.carbsG)} g de carboidrato (+20% sobre a média); nos dias de descanso, ${formatGrams(result.rest.carbsG)} g. O gráfico reflete o perfil de treino. Proteína: ${formatGrams(profile.proteinG)} g; gordura: ${formatGrams(profile.fatG)} g em ambos os perfis.`;
}

export function buildNextSteps(): string[] {
  return [
    "Ajuste a ingestão de proteína com a calculadora de proteína diária.",
    "Confira seu gasto calórico total na calculadora de gasto calórico.",
  ];
}
