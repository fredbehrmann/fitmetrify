import type { ResultClassification } from "@/lib/calculators/engines/types";

export type ImcAdvancedContext = {
  sex?: string;
  age?: number;
  waist?: number;
  activityLevel?: string;
};

const SIMPLE_INTERPRETATIONS: Record<string, string> = {
  "Abaixo do peso":
    "Seu IMC está abaixo da faixa considerada adequada pela OMS. Isso pode indicar baixo peso; considere avaliar sua alimentação e saúde geral com um profissional.",
  "Peso normal":
    "Seu IMC está na faixa considerada normal pela OMS (18,5 a 24,9). Mantenha hábitos equilibrados de alimentação e atividade física.",
  Sobrepeso:
    "Seu IMC indica sobrepeso. Pequenos ajustes na alimentação e na rotina de exercícios podem ajudar a melhorar a composição corporal.",
  "Obesidade grau I":
    "Seu IMC indica obesidade grau I. Um plano estruturado de alimentação e atividade física, com acompanhamento profissional, é recomendado.",
  "Obesidade grau II":
    "Seu IMC indica obesidade grau II. Busque orientação de médico ou nutricionista para um plano personalizado e seguro.",
  "Obesidade grau III":
    "Seu IMC indica obesidade grau III. É importante buscar avaliação médica para definir estratégias adequadas à sua saúde.",
};

const IMC_LIMITATION_WARNING =
  "O IMC é um indicador de triagem e não diferencia massa muscular de gordura corporal. Atletas e pessoas musculosas podem ter IMC elevado sem excesso de gordura.";

const BODY_FAT_SUGGESTION =
  "Para uma avaliação mais completa da composição corporal, considere estimar seu percentual de gordura na calculadora de TMB (modo avançado).";

export function buildSimpleInterpretation(
  classification: ResultClassification,
  bmi: number,
  age?: number
): string {
  const base =
    SIMPLE_INTERPRETATIONS[classification.label.replace(" (referência ≥60a)", "")] ??
    SIMPLE_INTERPRETATIONS[classification.label] ??
    `Seu IMC é ${bmi.toFixed(1)} kg/m².`;

  if (age !== undefined && age >= 60) {
    return `${base} Para idosos (≥60 anos), a classificação usa faixas adaptadas (sobrepeso a partir de IMC 27).`;
  }

  return base;
}

export function buildAdvancedWarnings(
  context: ImcAdvancedContext,
  bmi: number
): string[] {
  const warnings: string[] = [IMC_LIMITATION_WARNING];

  const { sex, age, waist, activityLevel } = context;

  if (waist !== undefined && sex) {
    if (sex === "male") {
      if (waist >= 102) {
        warnings.push(
          "Circunferência abdominal ≥ 102 cm (homens): risco elevado de doenças metabólicas, segundo critérios da OMS."
        );
      } else if (waist >= 94) {
        warnings.push(
          "Circunferência abdominal ≥ 94 cm (homens): risco aumentado; considere avaliação complementar."
        );
      }
    } else if (sex === "female") {
      if (waist >= 88) {
        warnings.push(
          "Circunferência abdominal ≥ 88 cm (mulheres): risco elevado de doenças metabólicas, segundo critérios da OMS."
        );
      } else if (waist >= 80) {
        warnings.push(
          "Circunferência abdominal ≥ 80 cm (mulheres): risco aumentado; considere avaliação complementar."
        );
      }
    }
  }

  if (
    (activityLevel === "active" || activityLevel === "extreme") &&
    bmi >= 25
  ) {
    warnings.push(
      "Com alto nível de atividade física, um IMC elevado pode refletir maior massa muscular. Avaliar percentual de gordura pode ser mais indicado."
    );
  }

  if (age !== undefined && age >= 65) {
    warnings.push(
      "Em idosos, o IMC pode subestimar riscos associados à composição corporal. A avaliação clínica individual é especialmente importante."
    );
  }

  warnings.push(BODY_FAT_SUGGESTION);

  return warnings;
}

export function buildNextSteps(): string[] {
  return [
    "Calcule sua TMB para estimar o gasto calórico em repouso.",
    "Use a calculadora de gasto calórico para saber quantas calorias consumir por dia.",
  ];
}
