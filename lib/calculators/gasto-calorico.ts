import { Activity } from "lucide-react";

import {
  activityLevelInput,
  numberInput,
  selectInput,
  tmbInput,
} from "./common-inputs";
import { GOAL_OPTIONS, WORK_TYPE_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const gastoCaloricoCalculator: Calculator = {
  slug: "calculadora-gasto-calorico",
  title: "Calculadora de Gasto Calórico",
  description:
    "Calcule seu gasto energético total diário com base no nível de atividade.",
  category: "emagrecimento",
  icon: Activity,
  seoTitle: "Calculadora de Gasto Calórico Diário | FitMetrify",
  seoDescription:
    "Estime quantas calorias você precisa consumir por dia para manter, perder ou ganhar peso.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "GET = TMB × fator de atividade",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-deficit-calorico", "calculadora-tmb"],
  seoContent: {
    about:
      "O Gasto Energético Total (GET) combina sua TMB com o fator de atividade física para estimar quantas calorias você gasta por dia. É essencial para planejar alimentação de acordo com seus objetivos.",
    howItWorks:
      "Informe a TMB e o nível de atividade (modo simples) ou detalhe dias de musculação, cardio, duração dos treinos, tipo de trabalho e meta (modo avançado). O fator de atividade é estimado e multiplicado pela TMB: GET = TMB × fator.",
    interpretationGuide:
      "O valor principal é o gasto de manutenção em kcal/dia. KPIs mostram faixas para emagrecimento e ganho de massa. A interpretação contextualiza sua meta (perder, manter ou ganhar peso). Em seguida, use o déficit calórico para definir calorias alvo.",
    limitations:
      "Fatores de atividade são médias e podem não refletir NEAT, sono ou estresse. TMB imprecisa distorce o GET. Ajustes finos exigem monitoramento de peso e ingestão por algumas semanas.",
  },
  inputs: [
    tmbInput("simple"),
    activityLevelInput("simple"),
    tmbInput("advanced"),
    numberInput("advanced", {
      id: "strengthDays",
      name: "strengthDays",
      label: "Dias de musculação por semana",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { required: true, min: 0, max: 7, step: 1 },
    }),
    numberInput("advanced", {
      id: "cardioDays",
      name: "cardioDays",
      label: "Dias de cardio por semana",
      unit: "dias",
      placeholder: "Ex: 2",
      validation: { required: true, min: 0, max: 7, step: 1 },
    }),
    numberInput("advanced", {
      id: "workoutDuration",
      name: "workoutDuration",
      label: "Duração média dos treinos",
      unit: "min",
      placeholder: "Ex: 60",
      validation: { required: true, min: 15, max: 180, step: 5 },
    }),
    selectInput("advanced", {
      id: "workType",
      name: "workType",
      label: "Tipo de trabalho",
      options: [...WORK_TYPE_OPTIONS],
      validation: { required: true },
    }),
    selectInput("advanced", {
      id: "goal",
      name: "goal",
      label: "Meta",
      options: [...GOAL_OPTIONS],
      validation: { required: true },
    }),
  ],
  faq: [
    {
      question: "O que é gasto calórico total?",
      answer:
        "É a soma das calorias gastas em repouso (TMB) mais as calorias queimadas com atividades diárias e exercícios.",
    },
    {
      question: "Como escolher o nível de atividade?",
      answer:
        "Considere sua rotina completa: trabalho, deslocamentos e treinos. Sedentário fica em 1,2; extremamente ativo chega a 1,9.",
    },
    {
      question: "Preciso calcular a TMB antes?",
      answer:
        "Sim. O gasto calórico total é calculado multiplicando a TMB pelo fator de atividade correspondente.",
    },
  ],
};
