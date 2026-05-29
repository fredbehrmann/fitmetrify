import { Gauge } from "lucide-react";

import { numberInput } from "./common-inputs";
import type { Calculator } from "./types";

export const paceVelocidadeCalculator: Calculator = {
  slug: "calculadora-pace-velocidade",
  title: "Conversor Pace / Velocidade",
  description:
    "Converta pace em min/km para velocidade em km/h e vice-versa.",
  category: "corrida",
  icon: Gauge,
  seoTitle: "Conversor de Pace para Velocidade | FitMetrify",
  seoDescription:
    "Converta facilmente entre pace de corrida e velocidade em km/h.",
  simpleMode: true,
  advancedMode: false,
  formula: "Velocidade (km/h) = 60 / pace (min/km)",
  relatedSlugs: ["calculadora-pace", "calculadora-previsor-tempo"],
  seoContent: {
    about:
      "Este conversor traduz entre pace (min/km) e velocidade (km/h), duas formas de expressar a mesma intensidade de corrida.",
    howItWorks:
      "Informe o pace em minutos por quilômetro (ex.: 5:30 = 5,5). A velocidade é calculada como 60 ÷ pace, resultando em km/h equivalentes à mesma intensidade.",
    interpretationGuide:
      "Use o valor em km/h para esteiras, ciclismo comparativo ou planilhas que trabalham com velocidade. Para voltar ao pace, use a calculadora de pace com distância e tempo.",
    limitations:
      "Conversão assume ritmo constante. Em intervalados, calcule cada segmento separadamente. Esteira pode exigir calibração por diferença de atrito e ausência de deslocamento real.",
  },
  inputs: [
    numberInput("simple", {
      id: "paceMinutes",
      name: "paceMinutes",
      label: "Pace",
      unit: "min/km",
      placeholder: "Ex: 5.5",
      helpText: "Tempo em minutos por quilômetro (ex: 5:30 = 5.5).",
      validation: { required: true, min: 2, max: 20, step: 0.01 },
    }),
  ],
  faq: [
    {
      question: "Como converter pace para km/h?",
      answer: "Divida 60 pelo pace em min/km. Ex: pace 6:00 (6 min/km) = 10 km/h.",
    },
    {
      question: "Quando usar pace vs velocidade?",
      answer:
        "Corredores preferem pace (min/km). Ciclistas e esteiras costumam usar km/h.",
    },
  ],
};
