import { Scale } from "lucide-react";

import {
  activityLevelInput,
  ageInput,
  heightInput,
  numberInput,
  sexInput,
  weightInput,
} from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const imcCalculator: Calculator = {
  slug: "calculadora-imc",
  title: "Calculadora de IMC",
  description:
    "Calcule seu Índice de Massa Corporal e descubra sua classificação de peso.",
  category: "emagrecimento",
  icon: Scale,
  seoTitle: "Calculadora de IMC Grátis | FitMetrify",
  seoDescription:
    "Calcule seu IMC online de forma gratuita e entenda sua classificação de peso com precisão.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "IMC = peso (kg) / altura (m)²",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: [
    "calculadora-tmb",
    "calculadora-percentual-gordura",
    "calculadora-gasto-calorico",
  ],
  seoContent: {
    about:
      "O Índice de Massa Corporal (IMC) é uma medida que relaciona peso e altura para estimar se você está abaixo, dentro ou acima da faixa considerada saudável. É uma ferramenta útil de triagem, mas não diferencia massa muscular de gordura corporal.",
    howItWorks:
      "Informe peso (kg) e altura (cm). A calculadora converte a altura para metros e aplica IMC = peso ÷ altura². No modo avançado, sexo, idade, circunferência abdominal e nível de atividade permitem alertas adicionais sobre limitações do IMC e composição corporal.",
    interpretationGuide:
      "O painel exibe o IMC calculado, a classificação segundo faixas da OMS (normal, sobrepeso, obesidade etc.) e uma barra visual do seu posicionamento. Use a interpretação textual e os próximos passos para decidir se vale calcular TMB ou percentual de gordura.",
    limitations:
      "O IMC (OMS) é triagem populacional e não diferencia massa muscular de gordura; pode classificar atletas como sobrepeso. Margem prática de interpretação individual é alta. Não substitui avaliação clínica.",
    measurementGuide:
      "Circunferência abdominal (modo avançado): meça na altura do umbigo, em pé, após expirar normalmente, com fita paralela ao chão e sem comprimir a pele.",
  },
  inputs: [
    weightInput("simple"),
    heightInput("simple"),
    weightInput("advanced"),
    heightInput("advanced"),
    sexInput("advanced"),
    ageInput("advanced"),
    numberInput("advanced", {
      id: "waist",
      name: "waist",
      label: "Circunferência abdominal",
      unit: "cm",
      placeholder: "Ex: 85",
      helpText: "Medida na altura do umbigo.",
      validation: { min: 40, max: 200, step: 1 },
    }),
    activityLevelInput("advanced"),
  ],
  faq: [
    {
      question: "O que é IMC?",
      answer:
        "O IMC é o Índice de Massa Corporal, calculado dividindo o peso (kg) pelo quadrado da altura (m). É usado como indicador geral de composição corporal.",
    },
    {
      question: "O IMC é confiável para atletas?",
      answer:
        "Nem sempre. Pessoas com muita massa muscular podem ter IMC elevado sem excesso de gordura. Nesses casos, avaliar percentual de gordura é mais indicado.",
    },
    {
      question: "Qual a faixa de IMC considerada normal?",
      answer:
        "Segundo a OMS, IMC entre 18,5 e 24,9 é classificado como peso normal.",
    },
  ],
};
