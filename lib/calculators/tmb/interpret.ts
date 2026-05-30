import type { ResultKpi } from "@/lib/calculators/engines/types";

import { formatTmb } from "./format";

export type TmbFormulaUsed = "mifflin" | "lean-mass" | "harris-benedict";

export type TmbComparison = {
  mifflin?: number;
  harrisBenedict?: number;
  katchMcArdle?: number;
  leanMassKg?: number;
};

export function buildInterpretation(
  tmb: number,
  options?: { sex?: string; showMenstrualNote?: boolean }
): string {
  let text = `Sua TMB estimada é de ${tmb.toLocaleString("pt-BR")} kcal/dia (${formatTmb(tmb / 24)} kcal/hora em repouso). Esse é o gasto aproximado do seu corpo em repouso absoluto, sem contar atividades físicas do dia.`;

  if (options?.showMenstrualNote && options.sex === "female") {
    text +=
      " Em mulheres, o ciclo menstrual pode alterar a TMB em cerca de 5–10% conforme a fase.";
  }

  return text;
}

export function buildNextSteps(): string[] {
  return [
    "Calcule agora seu gasto calórico total para saber quantas calorias consumir por dia.",
    "Com a TMB em mãos, você também pode planejar um déficit calórico alinhado ao seu objetivo.",
  ];
}

export function buildFormulaKpis(
  formula: TmbFormulaUsed,
  estimatedLeanMassKg?: number
): ResultKpi[] {
  const kpis: ResultKpi[] = [
    {
      label: "Fórmula principal",
      value:
        formula === "mifflin"
          ? "Mifflin-St Jeor"
          : formula === "harris-benedict"
            ? "Harris-Benedict revisada"
            : "Massa magra (Katch-McArdle)",
    },
  ];

  if (formula === "lean-mass" && estimatedLeanMassKg !== undefined) {
    kpis.push({
      label: "Massa magra estimada",
      value: estimatedLeanMassKg.toFixed(1),
      unit: "kg",
    });
  }

  return kpis;
}

export function buildComparisonKpis(comparison: TmbComparison): ResultKpi[] {
  const kpis: ResultKpi[] = [];

  if (comparison.mifflin !== undefined) {
    kpis.push({
      label: "Mifflin-St Jeor",
      value: formatTmb(comparison.mifflin),
      unit: "kcal/dia",
    });
  }

  if (comparison.harrisBenedict !== undefined) {
    kpis.push({
      label: "Harris-Benedict revisada",
      value: formatTmb(comparison.harrisBenedict),
      unit: "kcal/dia",
    });
  }

  if (comparison.katchMcArdle !== undefined) {
    kpis.push({
      label: "Katch-McArdle",
      value: formatTmb(comparison.katchMcArdle),
      unit: "kcal/dia",
    });
  }

  if (comparison.leanMassKg !== undefined) {
    kpis.push({
      label: "Massa magra (base Katch)",
      value: comparison.leanMassKg.toFixed(1),
      unit: "kg",
    });
  }

  return kpis;
}

export function buildHourlyKpi(tmb: number): ResultKpi {
  return {
    label: "TMB por hora",
    value: formatTmb(tmb / 24),
    unit: "kcal/h",
  };
}
