import type { CalculatorInput } from "../types";

export function getImcMetricInputs(mode: "simple" | "advanced"): CalculatorInput[] {
  if (mode === "simple") {
    return [
      {
        id: "weight",
        name: "weight",
        label: "Peso",
        type: "number",
        mode: "simple",
        unit: "kg",
        placeholder: "Ex: 75",
        validation: { required: true, min: 20, max: 300, step: 0.1 },
      },
      {
        id: "height",
        name: "height",
        label: "Altura",
        type: "number",
        mode: "simple",
        unit: "cm",
        placeholder: "Ex: 175",
        validation: { required: true, min: 100, max: 250, step: 1 },
      },
    ];
  }

  return [];
}

export function getImcImperialInputs(mode: "simple" | "advanced"): CalculatorInput[] {
  if (mode === "simple") {
    return [
      {
        id: "weightLb",
        name: "weightLb",
        label: "Peso",
        type: "number",
        mode: "simple",
        unit: "lb",
        placeholder: "Ex: 165",
        validation: { required: true, min: 44, max: 660, step: 0.1 },
      },
      {
        id: "heightFt",
        name: "heightFt",
        label: "Altura (pés)",
        type: "number",
        mode: "simple",
        unit: "ft",
        placeholder: "Ex: 5",
        validation: { required: true, min: 3, max: 8, step: 1 },
      },
      {
        id: "heightIn",
        name: "heightIn",
        label: "Altura (polegadas)",
        type: "number",
        mode: "simple",
        unit: "in",
        placeholder: "Ex: 9",
        validation: { required: true, min: 0, max: 11, step: 1 },
      },
    ];
  }

  return [];
}
