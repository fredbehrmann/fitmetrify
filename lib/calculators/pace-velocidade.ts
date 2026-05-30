import { Gauge } from "lucide-react";

import { numberInput, selectInput } from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

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
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-pace", "calculadora-previsor-tempo"],
  seoContent: {
    about:
      "Este conversor traduz entre pace (min/km) e velocidade (km/h), duas formas de expressar a mesma intensidade de corrida.",
    howItWorks:
      "Escolha se deseja informar pace (h/min/seg por km) ou velocidade (km/h). A conversão é bidirecional: 60 ÷ pace = km/h ou 60 ÷ km/h = pace.",
    interpretationGuide:
      "Use km/h para esteiras e planilhas; use pace para corrida de rua. A tabela de referência mostra equivalências comuns de 4 a 20 km/h.",
    limitations:
      "A conversão é matemática e não considera inclinação do terreno. Em esteiras, a inclinação de 1% é o ajuste padrão para simular o esforço ao ar livre — uma velocidade de 10 km/h na esteira plana equivale a aproximadamente 9,5 km/h em solo externo plano. Ritmos acima de 20 km/h (pace abaixo de 3:00 min/km) são referências para atletas de elite e podem não ser sustentáveis por longos períodos.",
  },
  inputs: [
    selectInput("simple", {
      id: "inputMode",
      name: "inputMode",
      label: "Converter a partir de",
      options: [
        { value: "pace", label: "Pace (min/km)" },
        { value: "speed", label: "Velocidade (km/h)" },
      ],
      validation: { required: true },
      defaultValue: "pace",
    }),
    {
      id: "timeSeconds",
      name: "timeSeconds",
      label: "Pace por km",
      type: "time",
      mode: "simple",
      helpText: "Tempo para percorrer 1 km (ex.: 0h 05min 30seg).",
      validation: { required: true, min: 60, max: 7200 },
    },
    numberInput("simple", {
      id: "speedKmh",
      name: "speedKmh",
      label: "Velocidade",
      unit: "km/h",
      placeholder: "Ex: 12",
      validation: { min: 1, max: 40, step: 0.1 },
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
