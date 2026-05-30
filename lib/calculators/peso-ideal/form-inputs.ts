import {
  getImperialHeightInputs,
  getImperialWeightInput,
  getMetricHeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import { bodyFatInput, selectInput, sexInput } from "../common-inputs";
import { BIOTYPE_OPTIONS } from "../options";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

export function getPesoIdealInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  const heightInputs =
    unitSystem === "metric"
      ? [getMetricHeightInput(mode)]
      : getImperialHeightInputs(mode);

  if (mode === "simple") {
    return [...heightInputs, sexInput(mode)];
  }

  const weightInput =
    unitSystem === "metric"
      ? getMetricWeightInput(mode)
      : getImperialWeightInput(mode);

  return [
    ...heightInputs,
    sexInput(mode),
    weightInput,
    bodyFatInput("advanced"),
    selectInput("advanced", {
      id: "biotype",
      name: "biotype",
      label: "Biotipo",
      options: [...BIOTYPE_OPTIONS],
      validation: { required: true },
    }),
  ];
}
