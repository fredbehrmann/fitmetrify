import {
  getImperialCircumferenceInput,
  getImperialHeightInputs,
  getImperialWeightInput,
  getMetricCircumferenceInput,
  getMetricHeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import { activityLevelInput, ageInput, sexInput } from "../common-inputs";
import type { CalculatorInput } from "../types";
import type { UnitSystem } from "@/lib/conversions";

export function getImcMetricInputs(mode: "simple" | "advanced"): CalculatorInput[] {
  if (mode === "simple") {
    return [getMetricWeightInput("simple"), getMetricHeightInput("simple")];
  }

  return getImcAdvancedInputs("metric");
}

export function getImcImperialInputs(mode: "simple" | "advanced"): CalculatorInput[] {
  if (mode === "simple") {
    return [
      getImperialWeightInput("simple"),
      ...getImperialHeightInputs("simple"),
    ];
  }

  return getImcAdvancedInputs("imperial");
}

export function getImcAdvancedInputs(unitSystem: UnitSystem): CalculatorInput[] {
  const bodyInputs =
    unitSystem === "metric"
      ? [getMetricWeightInput("advanced"), getMetricHeightInput("advanced")]
      : [
          getImperialWeightInput("advanced"),
          ...getImperialHeightInputs("advanced"),
        ];

  const waistInput =
    unitSystem === "metric"
      ? getMetricCircumferenceInput("advanced", {
          id: "waist",
          name: "waist",
          label: "Circunferência abdominal",
          placeholder: "Ex: 85",
          helpText: "Medida na altura do umbigo.",
          min: 40,
          max: 200,
        })
      : getImperialCircumferenceInput("advanced", {
          id: "waistIn",
          name: "waistIn",
          label: "Circunferência abdominal",
          placeholder: "Ex: 33",
          helpText: "Medida na altura do umbigo.",
          minIn: 16,
          maxIn: 80,
        });

  return [
    ...bodyInputs,
    sexInput("advanced"),
    ageInput("advanced"),
    waistInput,
    activityLevelInput("advanced"),
  ];
}

export function getImcInputs(
  mode: "simple" | "advanced",
  unitSystem: UnitSystem
): CalculatorInput[] {
  if (mode === "simple") {
    return unitSystem === "metric"
      ? getImcMetricInputs("simple")
      : getImcImperialInputs("simple");
  }

  return getImcAdvancedInputs(unitSystem);
}
