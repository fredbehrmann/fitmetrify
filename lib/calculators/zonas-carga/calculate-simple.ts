import { brzycki1RM, trainingLoads, type TrainingZoneLoad } from "../strength/one-rm-formulas";

export type ZonesResult = {
  oneRmKg: number;
  source: "direct" | "estimated";
  zones: TrainingZoneLoad[];
  estimateLoad?: number;
  estimateReps?: number;
};

export function resolveOneRepMax(
  oneRepMax?: number,
  estimateLoad?: number,
  estimateReps?: number
): { oneRmKg: number; source: "direct" | "estimated" } | null {
  if (oneRepMax !== undefined && oneRepMax > 0) {
    return { oneRmKg: oneRepMax, source: "direct" };
  }

  if (
    estimateLoad !== undefined &&
    estimateReps !== undefined &&
    estimateLoad > 0 &&
    estimateReps > 0
  ) {
    const estimated = brzycki1RM(estimateLoad, estimateReps);
    if (estimated === null) return null;
    return { oneRmKg: estimated, source: "estimated" };
  }

  return null;
}

export function calculateZones(
  oneRepMax?: number,
  estimateLoad?: number,
  estimateReps?: number
): ZonesResult | null {
  const resolved = resolveOneRepMax(oneRepMax, estimateLoad, estimateReps);
  if (resolved === null) return null;

  return {
    oneRmKg: resolved.oneRmKg,
    source: resolved.source,
    zones: trainingLoads(resolved.oneRmKg),
    estimateLoad,
    estimateReps,
  };
}
