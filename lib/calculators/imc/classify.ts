import type { ResultClassification } from "@/lib/calculators/engines/types";

import { IMC_THRESHOLDS } from "./constants";

export function classifyImc(bmi: number): ResultClassification {
  if (bmi < IMC_THRESHOLDS.underweight) {
    return { label: "Abaixo do peso", variant: "warning" };
  }
  if (bmi < IMC_THRESHOLDS.normal) {
    return { label: "Peso normal", variant: "success" };
  }
  if (bmi < IMC_THRESHOLDS.overweight) {
    return { label: "Sobrepeso", variant: "warning" };
  }
  if (bmi < IMC_THRESHOLDS.obesity1) {
    return { label: "Obesidade grau I", variant: "danger" };
  }
  if (bmi < IMC_THRESHOLDS.obesity2) {
    return { label: "Obesidade grau II", variant: "danger" };
  }
  return { label: "Obesidade grau III", variant: "danger" };
}
