import type {
  ResultClassification,
  ResultKpi,
} from "@/lib/calculators/engines/types";

import type { AdvancedPesoIdealResult } from "./calculate-advanced";
import type { SimplePesoIdealResult } from "./calculate-simple";
import { BIOTYPE_LABELS, BMI_MAX, BMI_MIN } from "./constants";
import { formatKg, formatKgRange, formatSignedKg } from "./format";

export function buildClassification(
  result: SimplePesoIdealResult | AdvancedPesoIdealResult
): ResultClassification {
  if ("weightDeltaStatus" in result && result.weightDeltaStatus === "above") {
    return {
      label: `${formatSignedKg(result.weightDelta ?? 0)} kg acima da faixa`,
      variant: "warning",
    };
  }

  if ("weightDeltaStatus" in result && result.weightDeltaStatus === "below") {
    return {
      label: `${formatSignedKg(result.weightDelta ?? 0)} kg abaixo da faixa`,
      variant: "warning",
    };
  }

  if ("weightDeltaStatus" in result && result.weightDeltaStatus === "within") {
    return {
      label: "Dentro da faixa de peso saudável",
      variant: "success",
    };
  }

  return {
    label: "Faixa de peso saudável",
    variant: "default",
  };
}

export function buildSimpleInterpretation(result: SimplePesoIdealResult): string {
  const { omsMin, omsMax } = result.formulas;
  return `Para ${result.heightCm} cm, a faixa de peso saudável recomendada pela OMS (IMC ${BMI_MIN}–${BMI_MAX}) é de ${formatKgRange(omsMin, omsMax)} kg. O peso central estimado pela média das quatro fórmulas (OMS, Devine, Robinson e Miller) é ${formatKg(result.centralWeight)} kg. Não existe um peso ideal único — use a faixa como referência junto com composição corporal e objetivos.`;
}

export function buildAdvancedInterpretation(
  result: AdvancedPesoIdealResult
): string {
  const base = buildSimpleInterpretation(result);
  const biotypeLabel = BIOTYPE_LABELS[result.biotype];
  let text = `${base} Com biotipo ${biotypeLabel.toLowerCase()}, o alvo central ajustado é ${formatKg(result.adjustedCentralWeight)} kg.`;

  if (result.currentWeight !== undefined && result.weightDeltaStatus) {
    if (result.weightDeltaStatus === "within") {
      text += ` Seu peso atual (${formatKg(result.currentWeight)} kg) está dentro da faixa saudável ajustada.`;
    } else if (result.weightDeltaStatus === "above") {
      text += ` Seu peso atual (${formatKg(result.currentWeight)} kg) está cerca de ${formatKg(Math.abs(result.weightDelta ?? 0))} kg acima do limite superior da faixa.`;
    } else {
      text += ` Seu peso atual (${formatKg(result.currentWeight)} kg) está cerca de ${formatKg(Math.abs(result.weightDelta ?? 0))} kg abaixo do limite inferior da faixa.`;
    }
  }

  if (result.leanMassKg !== undefined) {
    text += ` Massa magra estimada: ${formatKg(result.leanMassKg)} kg (${formatKg(result.bodyFat ?? 0)}% de gordura).`;
  }

  return text;
}

export function buildFormulaKpis(
  result: SimplePesoIdealResult | AdvancedPesoIdealResult
): ResultKpi[] {
  const { formulas } = result;
  const central =
    "adjustedCentralWeight" in result
      ? result.adjustedCentralWeight
      : result.centralWeight;

  return [
    {
      label: "Faixa OMS",
      value: formatKgRange(formulas.omsMin, formulas.omsMax),
      unit: "kg",
    },
    {
      label: "Devine (1974)",
      value: formatKg(formulas.devine),
      unit: "kg",
    },
    {
      label: "Robinson (1983)",
      value: formatKg(formulas.robinson),
      unit: "kg",
    },
    {
      label: "Miller (1983)",
      value: formatKg(formulas.miller),
      unit: "kg",
    },
    {
      label: "Peso central (média)",
      value: formatKg(central),
      unit: "kg",
    },
  ];
}

export function buildAdvancedWarnings(
  result: AdvancedPesoIdealResult
): string[] {
  const warnings: string[] = [];

  if (result.weightDeltaStatus === "above") {
    warnings.push(
      "Seu peso atual está acima da faixa de peso saudável. Considere avaliar hábitos alimentares e atividade física com um profissional."
    );
  }

  if (result.weightDeltaStatus === "below") {
    warnings.push(
      "Seu peso atual está abaixo da faixa de peso saudável. Avalie ingestão calórica e saúde geral com orientação profissional."
    );
  }

  return warnings;
}

export function buildNextSteps(): string[] {
  return [
    "Use a calculadora de IMC para contextualizar seu peso atual em relação à altura.",
    "Calcule sua TMB e gasto calórico para definir metas alimentares realistas.",
    "Lembre-se: composição corporal importa mais que um número único na balança.",
  ];
}
