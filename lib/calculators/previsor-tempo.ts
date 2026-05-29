import { PersonStanding } from "lucide-react";

import { numberInput, selectInput } from "./common-inputs";
import {
  RACE_TYPE_OPTIONS,
  RUNNER_EXPERIENCE_OPTIONS,
} from "./options";
import type { Calculator } from "./types";

export const previsorTempoCalculator: Calculator = {
  slug: "calculadora-previsor-tempo",
  title: "Previsor de Tempo de Corrida",
  description:
    "Preveja seu tempo de prova com base em resultados anteriores.",
  category: "corrida",
  icon: PersonStanding,
  seoTitle: "Previsor de Tempo de Corrida | FitMetrify",
  seoDescription:
    "Estime seu tempo de prova usando a fórmula de Riegel e dados de treino.",
  simpleMode: true,
  advancedMode: true,
  formula: "T2 = T1 × (D2 / D1)^1,06",
  relatedSlugs: ["calculadora-pace", "calculadora-pace-velocidade"],
  seoContent: {
    about:
      "O previsor utiliza a fórmula de Riegel para estimar tempo em uma nova distância com base em um resultado conhecido. No modo avançado, fatores como experiência e condições da prova refinam a estimativa.",
    howItWorks:
      "Informe distância e tempo de uma prova ou treino de referência e a distância alvo. Aplica-se T2 = T1 × (D2/D1)^1,06. No avançado, experiência, elevação e temperatura ajustam faixas otimista e conservadora.",
    interpretationGuide:
      "O tempo previsto é uma estimativa central; KPIs no modo avançado mostram faixas. Compare com seu pace médio habitual. Planeje nutrição e ritmo com margem abaixo do otimista em provas longas.",
    limitations:
      "Riegel funciona melhor entre distâncias de corrida semelhantes e com preparo consistente. Provas com muito desnível, calor extremo ou falta de treino específico podem desviar bastante do previsto.",
  },
  inputs: [
    numberInput("simple", {
      id: "knownDistance",
      name: "knownDistance",
      label: "Distância conhecida",
      unit: "km",
      placeholder: "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    numberInput("simple", {
      id: "knownTime",
      name: "knownTime",
      label: "Tempo conhecido",
      unit: "min",
      placeholder: "Ex: 50",
      validation: { required: true, min: 1, max: 1440, step: 1 },
    }),
    numberInput("simple", {
      id: "targetDistance",
      name: "targetDistance",
      label: "Nova distância desejada",
      unit: "km",
      placeholder: "Ex: 21.1",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    numberInput("advanced", {
      id: "knownDistance",
      name: "knownDistance",
      label: "Distância conhecida",
      unit: "km",
      placeholder: "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    numberInput("advanced", {
      id: "knownTime",
      name: "knownTime",
      label: "Tempo conhecido",
      unit: "min",
      placeholder: "Ex: 50",
      validation: { required: true, min: 1, max: 1440, step: 1 },
    }),
    numberInput("advanced", {
      id: "targetDistance",
      name: "targetDistance",
      label: "Nova distância desejada",
      unit: "km",
      placeholder: "Ex: 21.1",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    selectInput("advanced", {
      id: "experience",
      name: "experience",
      label: "Experiência do corredor",
      options: [...RUNNER_EXPERIENCE_OPTIONS],
    }),
    selectInput("advanced", {
      id: "raceType",
      name: "raceType",
      label: "Tipo de prova",
      options: [...RACE_TYPE_OPTIONS],
    }),
    numberInput("advanced", {
      id: "elevation",
      name: "elevation",
      label: "Desnível",
      unit: "m",
      placeholder: "Ex: 150",
      validation: { min: 0, max: 5000, step: 10 },
    }),
    numberInput("advanced", {
      id: "temperature",
      name: "temperature",
      label: "Temperatura",
      unit: "°C",
      placeholder: "Ex: 22",
      validation: { min: -10, max: 45, step: 1 },
    }),
    numberInput("advanced", {
      id: "weeklyRuns",
      name: "weeklyRuns",
      label: "Frequência semanal de treino",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { min: 0, max: 7, step: 1 },
    }),
  ],
  faq: [
    {
      question: "O que é a fórmula de Riegel?",
      answer:
        "T2 = T1 × (D2/D1)^1,06. Estima tempo em nova distância com base em performance conhecida.",
    },
    {
      question: "A previsão é exata?",
      answer:
        "Não. É uma estimativa. Terreno, clima e preparo influenciam o resultado real.",
    },
    {
      question: "O modo avançado mostra faixas?",
      answer:
        "Sim. Serão exibidos tempos otimista, provável e conservador com base nos fatores adicionais.",
    },
  ],
};
