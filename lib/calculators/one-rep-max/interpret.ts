import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { AdvancedOneRmResult } from "./calculate-advanced";
import type { SimpleOneRmResult } from "./calculate-simple";
import {
  ONE_RM_METHOD_LABELS,
  ZONE_LABELS,
  type OneRmMethod,
} from "../strength/constants";
import { formatLoadKg } from "../strength/format";

function buildZoneKpis(zones: SimpleOneRmResult["zones"]): ResultKpi[] {
  return zones.map((zone) => ({
    label: `${zone.percent}% — ${ZONE_LABELS[zone.percent]}`,
    value: formatLoadKg(zone.loadKg),
    unit: "kg",
  }));
}

export function buildSimpleClassification(): ResultClassification {
  return { label: "1RM estimado (Brzycki)", variant: "default" };
}

export function buildAdvancedClassification(): ResultClassification {
  return { label: "Comparação de métodos", variant: "success" };
}

export function buildSimpleKpis(result: SimpleOneRmResult): ResultKpi[] {
  return [
    {
      label: "Carga utilizada",
      value: formatLoadKg(result.loadKg),
      unit: `kg × ${result.reps} reps`,
    },
    ...buildZoneKpis(result.zones),
  ];
}

export function buildAdvancedKpis(result: AdvancedOneRmResult): ResultKpi[] {
  const methodKpis: ResultKpi[] = [
    {
      label: "Brzycki",
      value: formatLoadKg(result.estimates.brzycki),
      unit: "kg",
    },
    {
      label: "Epley",
      value: formatLoadKg(result.estimates.epley),
      unit: "kg",
    },
    {
      label: "Lombardi",
      value: formatLoadKg(result.estimates.lombardi),
      unit: "kg",
    },
    {
      label: "Média",
      value: formatLoadKg(result.estimates.average),
      unit: "kg",
    },
  ];

  return [
    ...methodKpis,
    {
      label: "Referência",
      value: formatLoadKg(result.loadKg),
      unit: `kg × ${result.reps} reps`,
    },
    ...buildZoneKpis(result.zones),
  ];
}

export function buildSimpleInterpretation(result: SimpleOneRmResult): string {
  const zonesText = result.zones
    .map(
      (z) =>
        `${z.percent}% (${ZONE_LABELS[z.percent]}): ${formatLoadKg(z.loadKg)} kg`
    )
    .join("; ");

  return `Com ${formatLoadKg(result.loadKg)} kg por ${result.reps} repetições, seu 1RM estimado (Brzycki) é ${formatLoadKg(result.oneRmKg)} kg. Zonas sugeridas: ${zonesText}. Prefira séries de 1–10 reps para estimativas mais confiáveis.`;
}

export function buildAdvancedInterpretation(
  result: AdvancedOneRmResult,
  method: OneRmMethod
): string {
  const methodLabel = ONE_RM_METHOD_LABELS[method];
  const selectedValue =
    method === "average"
      ? result.estimates.average
      : result.estimates[method];

  const zonesText = result.zones
    .map(
      (z) =>
        `${z.percent}% (${ZONE_LABELS[z.percent]}): ${formatLoadKg(z.loadKg)} kg`
    )
    .join("; ");

  return `Com ${formatLoadKg(result.loadKg)} kg por ${result.reps} repetições: Brzycki ${formatLoadKg(result.estimates.brzycki)} kg, Epley ${formatLoadKg(result.estimates.epley)} kg, Lombardi ${formatLoadKg(result.estimates.lombardi)} kg. Média: ${formatLoadKg(result.estimates.average)} kg. Você selecionou ${methodLabel} (${formatLoadKg(selectedValue)} kg). Zonas baseadas na média: ${zonesText}.`;
}

export function buildHighRepsWarning(reps: number): string[] | undefined {
  if (reps > 12) {
    return [
      "Estimativas de 1RM ficam menos precisas acima de 12 repetições. Prefira séries de 1–10 reps.",
    ];
  }
  return undefined;
}

export function buildNextSteps(): string[] {
  return [
    "Defina zonas de treino na calculadora de zonas de carga.",
    "Monitore volume na calculadora de volume de treino.",
  ];
}
