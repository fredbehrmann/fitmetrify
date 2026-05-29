import type { ResultClassification, ResultKpi } from "@/lib/calculators/engines/types";

import type { ZonesResult } from "./calculate-simple";
import { ZONE_LABELS } from "../strength/constants";
import { formatLoadKg } from "../strength/format";

export function buildClassification(source: ZonesResult["source"]): ResultClassification {
  return {
    label: source === "direct" ? "Zonas do 1RM informado" : "Zonas com 1RM estimado",
    variant: "default",
  };
}

export function buildKpis(result: ZonesResult): ResultKpi[] {
  return result.zones.map((zone) => ({
    label: `${zone.percent}% — ${ZONE_LABELS[zone.percent]}`,
    value: formatLoadKg(zone.loadKg),
    unit: "kg",
  }));
}

export function buildInterpretation(result: ZonesResult): string {
  const zonesText = result.zones
    .map(
      (z) =>
        `${z.percent}% (${ZONE_LABELS[z.percent]}): ${formatLoadKg(z.loadKg)} kg`
    )
    .join("; ");

  const sourceNote =
    result.source === "direct"
      ? `Com 1RM de ${formatLoadKg(result.oneRmKg)} kg informado`
      : `Estimando 1RM de ${formatLoadKg(result.oneRmKg)} kg a partir de ${formatLoadKg(result.estimateLoad ?? 0)} kg × ${result.estimateReps} reps (Brzycki)`;

  return `${sourceNote}, suas zonas de carga são: ${zonesText}. Use 90% para força máxima, 70–80% para hipertrofia e 60% para resistência muscular.`;
}

export function buildNextSteps(): string[] {
  return [
    "Compare métodos de estimativa na calculadora de 1RM.",
    "Monitore volume na calculadora de volume de treino.",
  ];
}
