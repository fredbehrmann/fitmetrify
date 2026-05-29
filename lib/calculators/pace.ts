import { Timer } from "lucide-react";

import { numberInput } from "./common-inputs";
import type { Calculator } from "./types";

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
  advancedMode: false,
  formula: "Pace = tempo / distância | Velocidade = distância / tempo",
  relatedSlugs: ["calculadora-previsor-tempo", "calculadora-pace-velocidade"],
  seoContent: {
    about:
      "O pace (ritmo) indica quantos minutos você leva para percorrer um quilômetro. É a métrica principal dos corredores para monitorar intensidade e progresso.",
    howItWorks:
      "Informe a distância percorrida (km) e o tempo total (minutos). A calculadora divide tempo pela distância para obter pace em min/km e deriva a velocidade média em km/h.",
    interpretationGuide:
      "O pace principal aparece no formato min:seg por km. KPIs complementam com velocidade média. Compare com treinos anteriores ou use o previsor de tempo para estimar outra distância.",
    limitations:
      "Terreno, vento, altitude e paradas não entram no cálculo. Pace médio de prova com largada lenta difere do pace de treino contínuo. Use como referência, não como meta absoluta em todas as condições.",
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
    numberInput("simple", {
      id: "timeMinutes",
      name: "timeMinutes",
      label: "Tempo total",
      unit: "min",
      placeholder: "Ex: 50",
      helpText: "Tempo total em minutos.",
      validation: { required: true, min: 1, max: 1440, step: 1 },
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
