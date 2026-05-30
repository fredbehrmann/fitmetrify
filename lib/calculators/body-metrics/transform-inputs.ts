import { ftInToCm, inToCm, lbToKg, type UnitSystem } from "@/lib/conversions";

const IMPERIAL_CIRCUMFERENCE_FIELDS = [
  "waistIn",
  "neckIn",
  "hipIn",
] as const;

const METRIC_CIRCUMFERENCE_MAP: Record<
  (typeof IMPERIAL_CIRCUMFERENCE_FIELDS)[number],
  string
> = {
  waistIn: "waist",
  neckIn: "neck",
  hipIn: "hip",
};

export function transformBodyMetricInputs(
  values: Record<string, unknown>,
  unitSystem: UnitSystem
): Record<string, unknown> {
  if (unitSystem === "metric") return values;

  const result = { ...values };

  if (typeof values.weightLb === "number") {
    result.weight = lbToKg(values.weightLb);
  }

  if (typeof values.inlineWeightLb === "number") {
    result.inlineWeight = lbToKg(values.inlineWeightLb);
  }

  if (
    typeof values.heightFt === "number" &&
    typeof values.heightIn === "number"
  ) {
    result.height = ftInToCm(values.heightFt, values.heightIn);
  }

  if (
    typeof values.inlineHeightFt === "number" &&
    typeof values.inlineHeightIn === "number"
  ) {
    result.inlineHeight = ftInToCm(
      values.inlineHeightFt,
      values.inlineHeightIn
    );
  }

  for (const imperialField of IMPERIAL_CIRCUMFERENCE_FIELDS) {
    const metricField = METRIC_CIRCUMFERENCE_MAP[imperialField];
    const value = values[imperialField];
    if (typeof value === "number") {
      result[metricField] = inToCm(value);
    }
  }

  return result;
}
