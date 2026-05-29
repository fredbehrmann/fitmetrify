import { TrendingDown } from "lucide-react";

import {
  activityLevelInput,
  numberInput,
  selectInput,
  sexInput,
  weightInput,
} from "./common-inputs";
import { DEFICIT_STRATEGY_OPTIONS } from "./options";
import { CALORIES_VALIDATION } from "./validation";
import type { Calculator } from "./types";

export const deficitCaloricoCalculator: Calculator = {
  slug: "calculadora-deficit-calorico",
  title: "Calculadora de Déficit Calórico",
  description:
    "Planeje seu déficit calórico para alcançar seus objetivos de emagrecimento.",
  category: "emagrecimento",
  icon: TrendingDown,
  seoTitle: "Calculadora de Déficit Calórico | FitMetrify",
  seoDescription:
    "Calcule o déficit calórico ideal para perder peso de forma saudável e sustentável.",
  simpleMode: true,
  advancedMode: true,
  formula: "Calorias alvo = gasto diário × (1 - percentual de déficit)",
  relatedSlugs: ["calculadora-gasto-calorico", "calculadora-proteina"],
  seoContent: {
    about:
      "O déficit calórico ocorre quando você consome menos calorias do que gasta, levando o corpo a usar reservas de energia. Estratégias leves (10%), moderadas (20%) e agressivas (25%) oferecem diferentes velocidades de perda de peso.",
    howItWorks:
      "Modo simples: informe gasto diário total e escolha a estratégia de déficit. Modo avançado: informe peso atual, meta, prazo, sexo e nível de treino para estimar déficit necessário e prazo realista, com alertas quando o plano for agressivo.",
    interpretationGuide:
      "Veja calorias alvo diárias, déficit em kcal e percentual, e KPIs de perda semanal estimada. A classificação indica se o déficit é leve, moderado ou agressivo. Priorize proteína adequada para preservar massa muscular durante o corte.",
    limitations:
      "Perda de peso real depende de adesão, água corporal e hormônios. Déficits muito agressivos aumentam risco de perda muscular e efeito rebote. Não substitui acompanhamento profissional em condições metabólicas ou transtornos alimentares.",
  },
  inputs: [
    numberInput("simple", {
      id: "dailyExpenditure",
      name: "dailyExpenditure",
      label: "Gasto diário",
      unit: "kcal",
      placeholder: "Ex: 2200",
      helpText: "Gasto calórico total diário estimado.",
      validation: { required: true, ...CALORIES_VALIDATION, step: 1 },
    }),
    selectInput("simple", {
      id: "strategy",
      name: "strategy",
      label: "Objetivo de déficit",
      options: [...DEFICIT_STRATEGY_OPTIONS],
      validation: { required: true },
    }),
    numberInput("advanced", {
      id: "dailyExpenditure",
      name: "dailyExpenditure",
      label: "Gasto diário",
      unit: "kcal",
      placeholder: "Ex: 2200",
      helpText: "Gasto calórico total diário estimado.",
      validation: { required: true, ...CALORIES_VALIDATION, step: 1 },
    }),
    weightInput("advanced", { id: "currentWeight", name: "currentWeight", label: "Peso atual" }),
    numberInput("advanced", {
      id: "targetWeight",
      name: "targetWeight",
      label: "Peso desejado",
      unit: "kg",
      placeholder: "Ex: 70",
      validation: { required: true, min: 30, max: 300, step: 0.1 },
    }),
    numberInput("advanced", {
      id: "deadline",
      name: "deadline",
      label: "Prazo desejado",
      unit: "semanas",
      placeholder: "Ex: 12",
      validation: { required: true, min: 1, max: 104, step: 1 },
    }),
    sexInput("advanced"),
    activityLevelInput("advanced", { id: "trainingLevel", name: "trainingLevel", label: "Nível de treino" }),
    numberInput("advanced", {
      id: "minProtein",
      name: "minProtein",
      label: "Proteína mínima desejada",
      unit: "g/kg",
      placeholder: "Ex: 1.6",
      validation: { min: 0.8, max: 3, step: 0.1 },
    }),
  ],
  faq: [
    {
      question: "Quanto déficit é seguro?",
      answer:
        "Déficits de 10–20% são geralmente sustentáveis. Déficits acima de 25% podem comprometer massa muscular e adesão.",
    },
    {
      question: "Quanto peso posso perder por semana?",
      answer:
        "Como referência, 1 kg de gordura equivale a aproximadamente 7.700 kcal. Déficits moderados costumam resultar em 0,5–1 kg/semana.",
    },
    {
      question: "Preciso do gasto calórico antes?",
      answer:
        "Sim. O déficit é calculado com base no seu gasto energético total diário.",
    },
  ],
};
