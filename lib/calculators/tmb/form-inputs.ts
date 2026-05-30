import {
  getImperialHeightInputs,
  getImperialWeightInput,
  getMetricHeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import {
  ageInput,
  bodyFatInput,
  numberInput,
  sexInput,
} from "../common-inputs";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

export function getTmbInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  const weightInput =
    unitSystem === "metric"
      ? getMetricWeightInput(mode)
      : getImperialWeightInput(mode);
  const heightInputs =
    unitSystem === "metric"
      ? [getMetricHeightInput(mode)]
      : getImperialHeightInputs(mode);

  const base = [sexInput(mode), weightInput, ...heightInputs, ageInput(mode)];

  if (mode === "advanced") {
    base.push(
      bodyFatInput("advanced"),
      numberInput("advanced", {
        id: "leanMass",
        name: "leanMass",
        label: "Massa magra",
        unit: "kg",
        placeholder: "Ex: 55",
        helpText: "Se conhecida, permite usar TMB = 370 + 21,6 × massa magra.",
        validation: { min: 20, max: 150, step: 0.1 },
      })
    );
  }

  return base;
}
