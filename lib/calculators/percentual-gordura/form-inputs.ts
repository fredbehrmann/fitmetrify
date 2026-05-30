import {
  getImperialCircumferenceInput,
  getImperialHeightInputs,
  getImperialWeightInput,
  getMetricCircumferenceInput,
  getMetricHeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import { ageInput, numberInput, sexInput } from "../common-inputs";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

export function getPercentualGorduraInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  if (mode === "advanced") {
    return [
      sexInput("advanced"),
      ageInput("advanced"),
      unitSystem === "metric"
        ? getMetricWeightInput("advanced")
        : getImperialWeightInput("advanced"),
      numberInput("advanced", {
        id: "chestSkinfold",
        name: "chestSkinfold",
        label: "Dobra peitoral",
        unit: "mm",
        placeholder: "Ex: 12",
        helpText: "Homens — Jackson-Pollock 3 dobras.",
        validation: { min: 1, max: 80, step: 0.5 },
      }),
      numberInput("advanced", {
        id: "abdomenSkinfold",
        name: "abdomenSkinfold",
        label: "Dobra abdominal",
        unit: "mm",
        placeholder: "Ex: 18",
        helpText: "Homens — Jackson-Pollock 3 dobras.",
        validation: { min: 1, max: 80, step: 0.5 },
      }),
      numberInput("advanced", {
        id: "tricepsSkinfold",
        name: "tricepsSkinfold",
        label: "Dobra tríceps",
        unit: "mm",
        placeholder: "Ex: 16",
        helpText: "Mulheres — Jackson-Pollock 3 dobras.",
        validation: { min: 1, max: 80, step: 0.5 },
      }),
      numberInput("advanced", {
        id: "suprailiacSkinfold",
        name: "suprailiacSkinfold",
        label: "Dobra supra-ilíaca",
        unit: "mm",
        placeholder: "Ex: 14",
        helpText: "Mulheres — Jackson-Pollock 3 dobras.",
        validation: { min: 1, max: 80, step: 0.5 },
      }),
      numberInput("advanced", {
        id: "thighSkinfold",
        name: "thighSkinfold",
        label: "Dobra coxa",
        unit: "mm",
        placeholder: "Ex: 20",
        validation: { required: true, min: 1, max: 80, step: 0.5 },
      }),
    ];
  }

  const weightInput =
    unitSystem === "metric"
      ? getMetricWeightInput("simple")
      : getImperialWeightInput("simple");
  const heightInputs =
    unitSystem === "metric"
      ? [getMetricHeightInput("simple")]
      : getImperialHeightInputs("simple");

  const waistInput =
    unitSystem === "metric"
      ? getMetricCircumferenceInput("simple", {
          id: "waist",
          name: "waist",
          label: "Circunferência da cintura",
          placeholder: "Ex: 85",
          helpText: "Medida na altura do umbigo.",
          min: 40,
          max: 200,
        })
      : getImperialCircumferenceInput("simple", {
          id: "waistIn",
          name: "waistIn",
          label: "Circunferência da cintura",
          placeholder: "Ex: 33",
          helpText: "Medida na altura do umbigo.",
          minIn: 16,
          maxIn: 80,
        });

  const neckInput =
    unitSystem === "metric"
      ? getMetricCircumferenceInput("simple", {
          id: "neck",
          name: "neck",
          label: "Circunferência do pescoço",
          placeholder: "Ex: 38",
          helpText: "Medida abaixo da laringe.",
          min: 20,
          max: 60,
        })
      : getImperialCircumferenceInput("simple", {
          id: "neckIn",
          name: "neckIn",
          label: "Circunferência do pescoço",
          placeholder: "Ex: 15",
          helpText: "Medida abaixo da laringe.",
          minIn: 8,
          maxIn: 24,
        });

  const hipInput =
    unitSystem === "metric"
      ? getMetricCircumferenceInput("simple", {
          id: "hip",
          name: "hip",
          label: "Circunferência do quadril",
          placeholder: "Ex: 98",
          helpText: "Apenas para mulheres — ponto mais largo.",
          required: false,
          min: 50,
          max: 200,
        })
      : getImperialCircumferenceInput("simple", {
          id: "hipIn",
          name: "hipIn",
          label: "Circunferência do quadril",
          placeholder: "Ex: 39",
          helpText: "Apenas para mulheres — ponto mais largo.",
          required: false,
          minIn: 20,
          maxIn: 80,
        });

  return [
    sexInput("simple"),
    ...heightInputs,
    weightInput,
    waistInput,
    neckInput,
    hipInput,
  ];
}
