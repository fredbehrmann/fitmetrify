import { Timer } from "lucide-react";

import { ageInput, numberInput } from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const paceCalculator: Calculator = {
  slug: "calculadora-pace",
  title: "Calculadora de Pace",
  description:
    "Calcule seu pace médio e velocidade com base na distância e tempo.",
  category: "corrida",
  icon: Timer,
  seoTitle: "Calculadora de Pace para Corrida | FitMetrify",
  seoDescription:
    "Calcule seu pace de corrida em min/km e descubra sua velocidade média.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "Pace = tempo / distância | Velocidade = distância / tempo",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: [
    "calculadora-fc-maxima",
    "calculadora-previsor-tempo",
    "calculadora-pace-velocidade",
  ],
  seoContent: {
    about:
      "O pace (ritmo) indica quantos minutos você leva para percorrer um quilômetro. É a métrica principal dos corredores para monitorar intensidade e progresso.",
    howItWorks:
      "Informe a distância percorrida e o tempo total (h/min/seg). A calculadora divide tempo pela distância para obter pace em min/km e deriva a velocidade média em km/h.",
    interpretationGuide:
      "O pace principal aparece no formato min:seg por km. KPIs incluem tabela de tempos alvo para 5K, 10K, meia e maratona. No avançado, informe FC máxima ou idade para estimar zonas cardíacas.",
    limitations:
      "Terreno, vento, altitude e paradas não entram no cálculo. Pace médio de prova com largada lenta difere do pace de treino contínuo.",
  },
  inputs: [
    numberInput("simple", {
      id: "distance",
      name: "distance",
      label: "Distância",
      unit: "km",
      placeholder: "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    {
      id: "timeSeconds",
      name: "timeSeconds",
      label: "Tempo total",
      type: "time",
      mode: "simple",
      validation: { required: true, min: 60, max: 86400 },
    },
    numberInput("advanced", {
      id: "distance",
      name: "distance",
      label: "Distância",
      unit: "km",
      placeholder: "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    {
      id: "timeSeconds",
      name: "timeSeconds",
      label: "Tempo total",
      type: "time",
      mode: "advanced",
      validation: { required: true, min: 60, max: 86400 },
    },
    ageInput("advanced", {
      id: "age",
      name: "age",
      label: "Idade (opcional, para FC estimada)",
      helpText: "Usada para estimar FC máxima (220 − idade) se FC máx. não informada.",
    }),
    numberInput("advanced", {
      id: "maxHeartRate",
      name: "maxHeartRate",
      label: "FC máxima",
      unit: "bpm",
      placeholder: "Ex: 190",
      validation: { min: 120, max: 220, step: 1 },
    }),
    numberInput("advanced", {
      id: "restingHeartRate",
      name: "restingHeartRate",
      label: "FC de repouso (opcional)",
      unit: "bpm",
      placeholder: "Ex: 60",
      helpText: "Com FC de repouso, as zonas usam o método Karvonen.",
      validation: { min: 35, max: 120, step: 1 },
    }),
  ],
  faq: [
    {
      question: "O que é pace?",
      answer:
        "Pace é o tempo por quilômetro (min/km). Um pace de 5:00 significa 5 minutos por km.",
    },
    {
      question: "Como calcular velocidade?",
      answer:
        "Velocidade (km/h) = distância ÷ tempo em horas. É o inverso do pace.",
    },
    {
      question: "Qual pace é considerado bom?",
      answer:
        "Varia muito por nível. Iniciantes costumam ficar entre 7–8 min/km; corredores avançados abaixo de 5 min/km.",
    },
  ],
};
