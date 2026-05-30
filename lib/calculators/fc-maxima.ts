import { HeartPulse } from "lucide-react";

import { ageInput, numberInput, selectInput } from "./common-inputs";
import {
  FITNESS_LEVEL_OPTIONS,
  HR_TRAINING_GOAL_OPTIONS,
  MAX_HR_FORMULA_OPTIONS,
} from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const fcMaximaCalculator: Calculator = {
  slug: "calculadora-fc-maxima",
  title: "Calculadora de FC Máxima e Zonas",
  description:
    "Estime sua frequência cardíaca máxima e zonas de treino com Karvonen.",
  category: "corrida",
  icon: HeartPulse,
  seoTitle: "Calculadora de FC Máxima e Zonas | FitMetrify",
  seoDescription:
    "Calcule FC máxima (Tanaka, Fox, Gellish) e zonas de treino aeróbico com método Karvonen.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "Karvonen: FC alvo = FC repouso + (% × reserva de FC)",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: [
    "calculadora-pace",
    "calculadora-previsor-tempo",
    "calculadora-pace-velocidade",
  ],
  seoContent: {
    about:
      "A frequência cardíaca máxima e as zonas de treino ajudam a controlar intensidade em corrida e cardio, melhorando segurança e eficiência.",
    howItWorks:
      "Informe idade e escolha a fórmula de FC máxima. No avançado, inclua FC de repouso para calcular zonas pelo método Karvonen (5 zonas de 50% a 100% da reserva).",
    interpretationGuide:
      "A FC máxima aparece como valor principal. A tabela mostra faixas em bpm por zona. Siga a pirâmide 80/20: maioria do volume abaixo do limiar.",
    limitations:
      "Tanaka, Fox e Gellish são estimativas populacionais com margem típica de ±7–12 bpm. Karvonen depende de FC de repouso bem medida. Testes de esforço máximo são mais precisos. Consulte médico se houver condições cardíacas.",
  },
  inputs: [
    ageInput("simple"),
    selectInput("simple", {
      id: "formula",
      name: "formula",
      label: "Fórmula de FC máxima",
      options: [...MAX_HR_FORMULA_OPTIONS],
      defaultValue: "tanaka",
      validation: { required: true },
    }),
    ageInput("advanced"),
    selectInput("advanced", {
      id: "formula",
      name: "formula",
      label: "Fórmula de FC máxima",
      options: [...MAX_HR_FORMULA_OPTIONS],
      defaultValue: "tanaka",
      validation: { required: true },
    }),
    numberInput("advanced", {
      id: "restingHeartRate",
      name: "restingHeartRate",
      label: "FC de repouso",
      unit: "bpm",
      placeholder: "Ex: 60",
      helpText: "Necessária para o método Karvonen.",
      validation: { required: true, min: 35, max: 120, step: 1 },
    }),
    selectInput("advanced", {
      id: "fitnessLevel",
      name: "fitnessLevel",
      label: "Nível de condicionamento",
      options: [...FITNESS_LEVEL_OPTIONS],
    }),
    selectInput("advanced", {
      id: "trainingGoal",
      name: "trainingGoal",
      label: "Objetivo do treino",
      options: [...HR_TRAINING_GOAL_OPTIONS],
    }),
  ],
  faq: [
    {
      question: "Qual fórmula de FC máxima usar?",
      answer:
        "Tanaka (208 − 0,7 × idade) é a recomendada como padrão. Fox (220 − idade) ainda é comum. Gellish pode favorecer corredores treinados.",
    },
    {
      question: "O que é o método Karvonen?",
      answer:
        "Usa a reserva de FC (FC máx − FC repouso) para definir zonas mais personalizadas que % fixo da FC máx.",
    },
    {
      question: "Como usar na calculadora de Pace?",
      answer:
        "Após calcular, clique em usar FC máxima na Pace para estimar intensidade por zona no treino.",
    },
  ],
};
