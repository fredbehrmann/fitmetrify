import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { AdvancedWaterResult } from "./calculate-advanced";
import type { WaterResult } from "./calculate-simple";
import {
  CUP_ML,
  EXERCISE_TYPE_LABELS,
  HIGH_INTAKE_WARNING_ML,
  ML_PER_KG,
  WAKING_HOURS,
  type ExerciseType,
} from "./constants";
import { formatCups, formatLiters, formatMl } from "./format";

export function buildDistributionText(cups: number): string {
  if (cups <= 0) {
    return "Distribua a ingestão de água ao longo do dia, em pequenas quantidades.";
  }

  const intervalHours = Math.max(1, Math.floor(WAKING_HOURS / cups));
  return `Beba cerca de ${formatCups(cups)} copos de ${CUP_ML} ml, espaçados aproximadamente a cada ${intervalHours} h enquanto estiver acordado.`;
}

export function buildSimpleClassification(): ResultClassification {
  return { label: "Recomendação base", variant: "default" };
}

export function buildAdvancedClassification(): ResultClassification {
  return { label: "Hidratação personalizada", variant: "success" };
}

export function buildSimpleKpis(result: WaterResult): ResultKpi[] {
  return [
    {
      label: "Copos (250 ml)",
      value: formatCups(result.cups),
      unit: "copos/dia",
    },
    {
      label: "Volume total",
      value: formatMl(result.totalMl),
      unit: "ml/dia",
    },
    {
      label: "Base (35 ml/kg)",
      value: formatMl(result.baseMl),
      unit: "ml",
    },
  ];
}

export function buildAdvancedKpis(result: AdvancedWaterResult): ResultKpi[] {
  const kpis: ResultKpi[] = [
    {
      label: "Copos (250 ml)",
      value: formatCups(result.cups),
      unit: "copos/dia",
    },
    {
      label: "Água base",
      value: formatMl(result.baseMl),
      unit: "ml",
    },
  ];

  for (const adjustment of result.adjustments) {
    kpis.push({
      label: adjustment.label,
      value: `+${formatMl(adjustment.ml)}`,
      unit: "ml",
    });
  }

  kpis.push({
    label: "Distribuição",
    value: buildDistributionText(result.cups),
  });

  return kpis;
}

function buildExerciseTip(exerciseType?: ExerciseType): string {
  if (!exerciseType) return "";

  const label = EXERCISE_TYPE_LABELS[exerciseType];
  if (exerciseType === "cardio") {
    return ` Para ${label}, hidrate-se antes e durante o exercício, especialmente em dias quentes.`;
  }
  if (exerciseType === "strength") {
    return ` Para ${label}, beba água entre as séries e após o treino para repor perdas.`;
  }
  return ` Para ${label}, combine hidratação antes, durante e após as atividades.`;
}

export function buildSimpleInterpretation(
  weightKg: number,
  result: WaterResult
): string {
  return `Com ${weightKg.toLocaleString("pt-BR")} kg, a recomendação base é de ${formatMl(result.baseMl)} ml/dia (${ML_PER_KG} ml por kg), equivalente a cerca de ${formatLiters(result.liters)} litros ou ${formatCups(result.cups)} copos de ${CUP_ML} ml. ${buildDistributionText(result.cups)}`;
}

export function buildAdvancedInterpretation(
  weightKg: number,
  result: AdvancedWaterResult
): string {
  const baseText = `Para ${weightKg.toLocaleString("pt-BR")} kg, a base é ${formatMl(result.baseMl)} ml/dia`;

  const adjustmentParts = result.adjustments.map(
    (a) => `${a.label.toLowerCase()}: +${formatMl(a.ml)} ml`
  );

  const adjustmentText =
    adjustmentParts.length > 0
      ? ` Com os ajustes (${adjustmentParts.join("; ")}), o total estimado é ${formatMl(result.totalMl)} ml (${formatLiters(result.liters)} L).`
      : ` O total estimado é ${formatMl(result.totalMl)} ml (${formatLiters(result.liters)} L).`;

  const climateNote = result.adjustments.some((a) => a.label === "Clima quente")
    ? " Em clima quente, a spec sugere entre 300 e 500 ml extras; usamos 400 ml como referência."
    : "";

  return `${baseText}.${adjustmentText}${climateNote}${buildExerciseTip(result.exerciseType)} ${buildDistributionText(result.cups)}`;
}

export function buildHighIntakeWarning(totalMl: number): string[] | undefined {
  if (totalMl > HIGH_INTAKE_WARNING_ML) {
    return [
      "A ingestão estimada está acima de 5 litros por dia. Considere avaliar com um profissional de saúde ou nutricionista.",
    ];
  }
  return undefined;
}

export function buildNextSteps(): string[] {
  return [
    "Ajuste proteína e macronutrientes na calculadora de macronutrientes.",
    "Confira sua ingestão de proteína na calculadora de proteína diária.",
  ];
}
