import { Dumbbell } from "lucide-react";

import { loadInput, repsInput, selectInput, sexInput, weightInput } from "./common-inputs";
import { EXERCISE_OPTIONS, ONE_RM_METHOD_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const oneRepMaxCalculator: Calculator = {
  slug: "calculadora-1rm",
  title: "Calculadora de 1RM",
  description:
    "Estime sua carga máxima para uma repetição com fórmulas validadas.",
  category: "musculacao",
  icon: Dumbbell,
  seoTitle: "Calculadora de 1RM Grátis | FitMetrify",
  seoDescription:
    "Calcule seu 1RM estimado e descubra as zonas de carga para treino.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "1RM = carga × 36 / (37 - repetições) [Brzycki]",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-zonas-carga", "calculadora-volume-treino"],
  seoContent: {
    about:
      "O 1RM (one-rep max) é a carga máxima que você consegue levantar uma vez. Estimá-lo a partir de séries submáximas permite planejar treinos sem testar o máximo real.",
    howItWorks:
      "Informe carga (kg) e repetições realizadas com boa técnica. No avançado, escolha Brzycki, Epley, Lombardi ou média entre métodos. Repetições acima de 12 geram alerta de menor precisão.",
    interpretationGuide:
      "O 1RM estimado aparece como valor principal. Use-o na calculadora de zonas de carga para definir percentuais de treino. KPIs podem comparar métodos no modo avançado.",
    limitations:
      "Fórmulas assumem técnica consistente e fadiga mínima na série. Não substitui teste real supervisionado. Articulações, experiência e exercícios diferentes (agachamento vs. supino) alteram a transferência do 1RM estimado.",
  },
  inputs: [
    loadInput("simple"),
    repsInput("simple"),
    loadInput("advanced"),
    repsInput("advanced"),
    selectInput("advanced", {
      id: "exercise",
      name: "exercise",
      label: "Exercício",
      options: [...EXERCISE_OPTIONS],
      validation: { required: true },
    }),
    weightInput("advanced", {
      id: "weight",
      name: "weight",
      label: "Peso corporal",
      helpText: "Necessário para classificação de força relativa.",
    }),
    sexInput("advanced"),
    selectInput("advanced", {
      id: "method",
      name: "method",
      label: "Método de cálculo",
      options: [...ONE_RM_METHOD_OPTIONS],
      helpText: "Compare Brzycki, Epley, Lombardi ou use a média.",
    }),
  ],
  faq: [
    {
      question: "O que é 1RM?",
      answer:
        "1RM é a carga máxima para uma repetição completa. Base para definir intensidades de treino.",
    },
    {
      question: "Qual fórmula é mais precisa?",
      answer:
        "Brzycki é popular para 1–10 reps. No modo avançado, compare métodos ou use a média.",
    },
    {
      question: "Posso usar muitas repetições?",
      answer:
        "Estimativas ficam menos precisas acima de 12 repetições. Prefira séries de 1–10 reps.",
    },
  ],
};
