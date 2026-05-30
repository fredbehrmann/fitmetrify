import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { AdvancedDeficitResult } from "./calculate-advanced";
import type { SimpleDeficitResult } from "./calculate-simple";
import {
  AGGRESSIVE_DEFICIT_KCAL_THRESHOLD,
  AGGRESSIVE_DEFICIT_PERCENT_THRESHOLD,
  MIN_DAILY_CALORIES_BY_SEX,
  type DeficitStrategy,
  type Sex,
} from "./constants";
import { formatKcal, formatKg, formatPercent, formatWeeks } from "./format";

const STRATEGY_LABELS: Record<DeficitStrategy, string> = {
  light: "leve (10%)",
  moderate: "moderado (20%)",
  aggressive: "agressivo (25%)",
};

const HEALTH_REMINDER =
  "Evite reduzir calorias de forma excessiva. Déficits sustentáveis favorecem adesão, energia e preservação de massa muscular.";

export function buildSimpleInterpretation(
  expenditure: number,
  result: SimpleDeficitResult,
  strategy: DeficitStrategy
): string {
  return `Com gasto diário de ${formatKcal(expenditure)} kcal e déficit ${STRATEGY_LABELS[strategy]}, o alvo sugerido é ${formatKcal(result.targetCalories)} kcal/dia — déficit de ${formatKcal(result.dailyDeficit)} kcal/dia, equivalente a cerca de ${formatKg(result.weeklyWeightLossKg)} kg por semana (referência: 7.700 kcal ≈ 1 kg de gordura).`;
}

export function buildAdvancedInterpretation(
  expenditure: number,
  result: AdvancedDeficitResult
): string {
  return `Para perder ${formatKg(result.kgToLose)} kg em ${result.requestedWeeks} semanas, seria necessário um déficit médio de ${formatKcal(Math.round(result.dailyDeficit))} kcal/dia (${formatPercent(result.deficitPercent)} do seu gasto de ${formatKcal(expenditure)} kcal). Com déficit moderado (20%), um prazo mais realista seria cerca de ${formatWeeks(result.realisticWeeks)} semanas.`;
}

export function buildSimpleKpis(result: SimpleDeficitResult): ResultKpi[] {
  return [
    {
      label: "Déficit diário",
      value: formatKcal(result.dailyDeficit),
      unit: "kcal",
    },
    {
      label: "Déficit semanal",
      value: formatKcal(result.weeklyDeficit),
      unit: "kcal",
    },
    {
      label: "Perda semanal estimada",
      value: formatKg(result.weeklyWeightLossKg),
      unit: "kg",
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedDeficitResult): ResultKpi[] {
  return [
    ...buildSimpleKpis(result),
    {
      label: "Déficit necessário",
      value: formatPercent(result.deficitPercent),
    },
    {
      label: "Prazo realista (20%)",
      value: formatWeeks(result.realisticWeeks),
      unit: "semanas",
    },
  ];
}

const STRATEGY_CLASSIFICATION: Record<
  DeficitStrategy,
  { label: string; variant: ResultClassification["variant"] }
> = {
  light: { label: "Déficit leve", variant: "default" },
  moderate: { label: "Déficit moderado", variant: "default" },
  aggressive: { label: "Déficit agressivo", variant: "warning" },
};

export function buildSimpleClassification(
  strategy: DeficitStrategy
): ResultClassification {
  const entry = STRATEGY_CLASSIFICATION[strategy];
  return { label: entry.label, variant: entry.variant };
}

const METABOLIC_ADAPTATION_NOTE =
  "Em déficits prolongados o metabolismo se adapta. Considere semanas de recarga calórica (diet breaks) a cada 8–12 semanas.";

export function buildSimpleWarnings(
  result: SimpleDeficitResult,
  strategy: DeficitStrategy,
  sex?: Sex
): string[] {
  const warnings: string[] = [];

  if (sex) {
    const minCalories = MIN_DAILY_CALORIES_BY_SEX[sex];
    if (result.targetCalories < minCalories) {
      warnings.push(
        `Atenção: ${formatKcal(result.targetCalories)} kcal está abaixo do mínimo recomendado de ${formatKcal(minCalories)} kcal/dia. Déficits abaixo deste valor aumentam o risco de perda muscular, fadiga e deficiências nutricionais. Reduza o percentual de déficit.`
      );
    }
  }

  if (strategy === "aggressive") {
    warnings.push(METABOLIC_ADAPTATION_NOTE);
  }

  warnings.push(HEALTH_REMINDER);

  return warnings;
}

export function buildAdvancedWarnings(
  result: AdvancedDeficitResult,
  sex: Sex,
  trainingLevel: string,
  minProtein?: number,
  currentWeight?: number
): string[] {
  const warnings: string[] = [];

  if (
    result.deficitPercent > AGGRESSIVE_DEFICIT_PERCENT_THRESHOLD ||
    result.dailyDeficit > AGGRESSIVE_DEFICIT_KCAL_THRESHOLD
  ) {
    warnings.push(
      "A meta exige um déficit elevado para o prazo informado. Considere ampliar o prazo ou aceitar uma perda mais gradual."
    );
  }

  if (result.realisticWeeks > result.requestedWeeks * 1.5) {
    warnings.push(
      `O prazo desejado é bastante ambicioso. Com déficit moderado, espere algo em torno de ${result.realisticWeeks} semanas.`
    );
  }

  const minCalories = MIN_DAILY_CALORIES_BY_SEX[sex] ?? 1200;
  if (result.targetCalories < minCalories) {
    warnings.push(
      `As calorias alvo (${formatKcal(result.targetCalories)} kcal) ficam abaixo de um piso de referência (${formatKcal(minCalories)} kcal). Revise o prazo ou o gasto informado.`
    );
  }

  if (
    minProtein !== undefined &&
    currentWeight !== undefined &&
    minProtein > 0
  ) {
    const proteinCalories = minProtein * currentWeight * 4;
    const minimumViable = proteinCalories * 1.25;
    if (result.targetCalories < minimumViable) {
      warnings.push(
        `Para ${minProtein} g/kg de proteína, o alvo calórico pode ser insuficiente. Priorize proteína e não comprima calorias demais.`
      );
    }
  }

  if (
    (trainingLevel === "active" || trainingLevel === "extreme") &&
    result.deficitPercent > 0.2
  ) {
    warnings.push(
      "Com treino intenso, déficits muito altos podem prejudicar recuperação e performance."
    );
  }

  if (result.requestedWeeks > 8) {
    warnings.push(METABOLIC_ADAPTATION_NOTE);
  }

  warnings.push(HEALTH_REMINDER);

  return warnings;
}

export function buildNextSteps(): string[] {
  return [
    "Calcule sua ingestão diária de proteína para preservar massa muscular no déficit.",
    "Distribua o restante das calorias na calculadora de macronutrientes.",
  ];
}
