import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateZones } from "../zonas-carga/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../zonas-carga/interpret";
import { percentFromRpe } from "../strength/rpe-mapping";
import { formatLoadKg } from "../strength/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

export const zonasCargaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const inputMode =
      typeof values.inputMode === "string" ? values.inputMode : "percent";
    const oneRepMax = parseNumber(values.oneRepMax);
    const estimateLoad = parseNumber(values.estimateLoad);
    const estimateReps = parseNumber(values.estimateReps);
    const rpe = parseNumber(values.rpe);
    const exercise =
      typeof values.exercise === "string" ? values.exercise : undefined;

    let resolvedOneRm = oneRepMax ?? undefined;

    if (inputMode === "rpe" && estimateLoad !== null && rpe !== null) {
      const percent = percentFromRpe(rpe);
      if (percent !== null) {
        resolvedOneRm = estimateLoad / (percent / 100);
      }
    }

    const result = calculateZones(
      resolvedOneRm,
      estimateLoad ?? undefined,
      estimateReps ?? undefined,
      { exercise, rpe: rpe ?? undefined }
    );

    if (result === null) return null;

    return {
      primaryValue: formatLoadKg(result.oneRmKg),
      primaryUnit: "kg",
      primaryLabel: "1RM de referência",
      classification: buildClassification(result.source),
      interpretation: buildInterpretation(result),
      kpis: buildKpis(result),
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
