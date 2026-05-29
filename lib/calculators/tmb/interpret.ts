import type { ResultKpi } from "@/lib/calculators/engines/types";

export type TmbFormulaUsed = "mifflin" | "lean-mass";

export function buildInterpretation(tmb: number): string {
  return `Sua TMB estimada é de ${tmb.toLocaleString("pt-BR")} kcal/dia. Esse é o gasto aproximado do seu corpo em repouso absoluto, sem contar atividades físicas do dia.`;
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
      label: "Fórmula utilizada",
      value:
        formula === "mifflin"
          ? "Mifflin-St Jeor"
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
