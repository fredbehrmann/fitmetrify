import { transformBodyMetricInputs } from "@/lib/calculators/body-metrics/transform-inputs";
import type { UnitSystem } from "@/lib/conversions";

export function transformImcInputs(
  values: Record<string, unknown>,
  unitSystem: UnitSystem
): Record<string, unknown> {
  return transformBodyMetricInputs(values, unitSystem);
}
