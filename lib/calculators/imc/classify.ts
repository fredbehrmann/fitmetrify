import type { ResultClassification } from "@/lib/calculators/engines/types";

import { getImcThresholds } from "./constants";

export function classifyImc(
  bmi: number,
  options?: { age?: number }
): ResultClassification {
  const thresholds = getImcThresholds(options?.age);
  const isElderly =
    options?.age !== undefined && options.age >= 60;

  if (bmi < thresholds.underweight) {
    return {
      label: isElderly ? "Baixo peso (referência ≥60a)" : "Abaixo do peso",
      variant: "warning",
    };
  }
  if (bmi < thresholds.normal) {
    return {
      label: isElderly ? "Peso normal (referência ≥60a)" : "Peso normal",
      variant: "success",
    };
  }
  if (bmi < thresholds.overweight) {
    return {
      label: "Sobrepeso",
      variant: "warning",
    };
  }
  if (bmi < thresholds.obesity1) {
    return { label: "Obesidade grau I", variant: "danger" };
  }
  if (bmi < thresholds.obesity2) {
    return { label: "Obesidade grau II", variant: "danger" };
  }
  return { label: "Obesidade grau III", variant: "danger" };
}
