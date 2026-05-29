import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { VolumeResult } from "./calculate-simple";
import { formatLoadKg, formatVolumeKg } from "../strength/format";

export function buildClassification(): ResultClassification {
  return { label: "Volume de treino", variant: "default" };
}

export function buildKpis(result: VolumeResult): ResultKpi[] {
  return [
    {
      label: "Exercício",
      value: result.exercise,
    },
    {
      label: "Detalhe",
      value: `${result.sets} × ${result.reps} × ${formatLoadKg(result.loadKg)}`,
      unit: "kg",
    },
    {
      label: "Volume por exercício",
      value: formatVolumeKg(result.volumeKg),
      unit: "kg",
    },
  ];
}

export function buildInterpretation(result: VolumeResult): string {
  return `O volume de ${result.exercise} é ${formatVolumeKg(result.volumeKg)} kg (${result.sets} séries × ${result.reps} repetições × ${formatLoadKg(result.loadKg)} kg). Para progressão segura, aumente o volume gradualmente em cerca de 5–10% por semana, monitorando recuperação e técnica.`;
}

export function buildNextSteps(): string[] {
  return [
    "Estime seu 1RM na calculadora de 1RM.",
    "Defina intensidades na calculadora de zonas de carga.",
  ];
}
