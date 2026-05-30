import { milesToKm, type DistanceUnit } from "@/lib/conversions";

const PREVISOR_DISTANCE_FIELDS = ["knownDistance", "targetDistance"] as const;

export function transformPrevisorDistanceInputs(
  values: Record<string, unknown>,
  distanceUnit: DistanceUnit
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...values, distanceUnit };

  if (distanceUnit !== "miles") {
    return result;
  }

  for (const field of PREVISOR_DISTANCE_FIELDS) {
    const value = values[field];
    if (typeof value === "number" && !Number.isNaN(value)) {
      result[field] = milesToKm(value);
    }
  }

  return result;
}

export function attachDistanceUnit(
  values: Record<string, unknown>,
  distanceUnit: DistanceUnit
): Record<string, unknown> {
  return { ...values, distanceUnit };
}
