import { Calculator } from "lucide-react";

import { caloriesInput, selectInput } from "./common-inputs";
import {
  MAIN_MEAL_OPTIONS,
  MEAL_COUNT_OPTIONS,
  MEAL_PROTOCOL_OPTIONS,
  TRAINING_TIME_OPTIONS,
} from "./options";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";
import type { Calculator as CalculatorType } from "./types";

export const caloriasRefeicaoCalculator: CalculatorType = {
  slug: "calculadora-calorias-refeicao",
  title: "Calculadora de Calorias por Refeição",
  description:
    "Distribua suas calorias diárias entre refeições de forma equilibrada.",
  category: "nutricao",
  icon: Calculator,
  seoTitle: "Calculadora de Calorias por Refeição | FitMetrify",
  seoDescription:
    "Divida suas calorias diárias entre refeições de acordo com sua rotina alimentar.",
  simpleMode: true,
  advancedMode: true,
  formula: "Calorias por refeição conforme protocolo (uniforme, pré/pós-treino, jejum)",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-macros", "calculadora-gasto-calorico"],
  seoContent: {
    about:
      "Dividir calorias de forma equilibrada entre refeições facilita o controle alimentar e a adesão ao plano nutricional, especialmente em dietas com metas calóricas definidas.",
    howItWorks:
      "Informe calorias diárias e número de refeições para divisão igualitária. No avançado, escolha horário de treino, protocolo alimentar (uniforme, pré/pós-treino maior, jejum 16:8 ou 18:6) e refeição principal.",
    interpretationGuide:
      "O resultado mostra kcal, percentual e proteína estimada por refeição. Avisos aparecem quando alguma refeição fica abaixo de 25 g de proteína. Ajuste pré e pós-treino conforme sua rotina.",
    limitations:
      "A distribuição calórica sugerida é um ponto de partida, não uma regra rígida. Fatores individuais como sensibilidade insulínica, cronobiologia (preferência por refeições maiores de manhã ou à noite) e variação do apetite ao longo do dia devem guiar ajustes personalizados. Para objetivos de hipertrofia, a presença de proteína em todas as refeições (mínimo 25–40g por refeição) é mais relevante do que a distribuição calórica exata.",
  },
  inputs: [
    caloriesInput("simple"),
    selectInput("simple", {
      id: "mealCount",
      name: "mealCount",
      label: "Número de refeições",
      options: [...MEAL_COUNT_OPTIONS],
      validation: { required: true },
    }),
    caloriesInput("advanced"),
    selectInput("advanced", {
      id: "mealCount",
      name: "mealCount",
      label: "Número de refeições",
      options: [...MEAL_COUNT_OPTIONS],
      validation: { required: true },
    }),
    selectInput("advanced", {
      id: "trainingTime",
      name: "trainingTime",
      label: "Horário estimado de treino",
      options: [...TRAINING_TIME_OPTIONS],
      validation: { required: true },
    }),
    selectInput("advanced", {
      id: "mealProtocol",
      name: "mealProtocol",
      label: "Protocolo alimentar",
      options: [...MEAL_PROTOCOL_OPTIONS],
      validation: { required: true },
    }),
    selectInput("advanced", {
      id: "mainMeal",
      name: "mainMeal",
      label: "Maior refeição",
      options: [...MAIN_MEAL_OPTIONS],
      validation: { required: true },
    }),
  ],
  faq: [
    {
      question: "Quantas refeições devo fazer?",
      answer:
        "Depende da rotina. A maioria das pessoas se adapta bem a 3–5 refeições por dia.",
    },
    {
      question: "Todas as refeições devem ter calorias iguais?",
      answer:
        "Não necessariamente. Pré e pós-treino podem ter mais carboidratos; a distribuição pode ser personalizada.",
    },
  ],
};
