import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { SessionVolumeResult } from "./calculate-session";
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

export function buildSessionKpis(result: SessionVolumeResult): ResultKpi[] {
  const exerciseKpis = result.exercises.map((row) => ({
    label: row.name,
    value: formatVolumeKg(row.volumeKg),
    unit: `${row.sets}×${row.reps} @ ${formatLoadKg(row.loadKg)} kg`,
  }));

  const groupKpis = result.byMuscleGroup.map((group) => ({
    label: `Grupo: ${group.label}`,
    value: formatVolumeKg(group.volumeKg),
    unit: `${group.sets} séries (ref. ${group.schoenfeldOptimal}/sem)`,
  }));

  return [
    {
      label: "Exercícios na sessão",
      value: String(result.exercises.length),
    },
    ...exerciseKpis,
    ...groupKpis,
  ];
}

export function buildInterpretation(result: VolumeResult): string {
  return `O volume de ${result.exercise} é ${formatVolumeKg(result.volumeKg)} kg (${result.sets} séries × ${result.reps} repetições × ${formatLoadKg(result.loadKg)} kg). Para progressão segura, aumente o volume gradualmente em cerca de 5–10% por semana, monitorando recuperação e técnica.`;
}

export function buildSessionInterpretation(result: SessionVolumeResult): string {
  const groups = result.byMuscleGroup
    .map(
      (group) =>
        `${group.label}: ${formatVolumeKg(group.volumeKg)} kg (${group.sets} séries)`
    )
    .join("; ");

  return `Volume total da sessão: ${formatVolumeKg(result.totalVolumeKg)} kg em ${result.exercises.length} exercício(s). Por grupo muscular: ${groups}. Compare séries semanais com as referências de Schoenfeld (2017) nos KPIs.`;
}

export function buildNextSteps(): string[] {
  return [
    "Estime seu 1RM na calculadora de 1RM.",
    "Defina intensidades na calculadora de zonas de carga.",
  ];
}
