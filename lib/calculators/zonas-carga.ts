import { Heart } from "lucide-react";

import { loadInput, numberInput, repsInput, selectInput } from "./common-inputs";
import { EXERCISE_OPTIONS, ZONE_INPUT_MODE_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const zonasCargaCalculator: Calculator = {
  slug: "calculadora-zonas-carga",
  title: "Calculadora de Zonas de Carga",
  description:
    "Defina zonas de treino com base no seu 1RM estimado.",
  category: "musculacao",
  icon: Heart,
  seoTitle: "Calculadora de Zonas de Carga | FitMetrify",
  seoDescription:
    "Calcule as zonas de carga ideais para hipertrofia, força e resistência.",
  simpleMode: true,
  advancedMode: false,
  formula: "6 zonas: 50–100% do 1RM com faixas de repetições",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-1rm", "calculadora-volume-treino"],
  seoContent: {
    about:
      "Zonas de carga dividem seu 1RM em 6 faixas percentuais para diferentes objetivos: resistência, hipertrofia, força e potência.",
    howItWorks:
      "Informe o 1RM em kg ou forneça carga + repetições para estimar. Escolha o exercício de referência e, opcionalmente, use RPE em vez de percentual.",
    interpretationGuide:
      "KPIs listam cargas mín/máx e repetições alvo por zona. Use a zona adequada ao objetivo do treino.",
    limitations:
      "Percentuais fixos não consideram fadiga acumulada. 1RM impreciso distorce todas as zonas. Priorize técnica e segurança.",
  },
  inputs: [
    selectInput("simple", {
      id: "exercise",
      name: "exercise",
      label: "Exercício de referência",
      options: [...EXERCISE_OPTIONS],
      validation: { required: true },
    }),
    selectInput("simple", {
      id: "inputMode",
      name: "inputMode",
      label: "Modo de entrada",
      options: [...ZONE_INPUT_MODE_OPTIONS],
      validation: { required: true },
    }),
    numberInput("simple", {
      id: "oneRepMax",
      name: "oneRepMax",
      label: "1RM estimado",
      unit: "kg",
      placeholder: "Ex: 100",
      helpText: "Informe seu 1RM ou use carga + reps abaixo.",
      validation: { min: 1, max: 500, step: 0.5 },
    }),
    loadInput("simple", {
      id: "estimateLoad",
      name: "estimateLoad",
      label: "Carga (para estimar 1RM ou RPE)",
    }),
    repsInput("simple", {
      id: "estimateReps",
      name: "estimateReps",
      label: "Repetições (para estimar 1RM)",
    }),
    numberInput("simple", {
      id: "rpe",
      name: "rpe",
      label: "RPE",
      placeholder: "Ex: 8",
      helpText: "Usado quando modo = RPE. Escala 1–10.",
      validation: { min: 5, max: 10, step: 0.5 },
    }),
  ],
  faq: [
    {
      question: "Quantas zonas de carga existem?",
      answer:
        "Seis zonas: resistência (50–60%), hipertrofia moderada/principal, força-hipertrofia, força máxima e potência (95–100%).",
    },
    {
      question: "Preciso do 1RM exato?",
      answer:
        "Não. Use a calculadora de 1RM ou informe carga + repetições submáximas.",
    },
  ],
};
