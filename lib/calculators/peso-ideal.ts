import { Weight } from "lucide-react";

import {
  bodyFatInput,
  heightInput,
  selectInput,
  sexInput,
  weightInput,
} from "./common-inputs";
import { BIOTYPE_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const pesoIdealCalculator: Calculator = {
  slug: "calculadora-peso-ideal",
  title: "Calculadora de Peso Ideal",
  description:
    "Descubra a faixa de peso ideal para sua altura e biotipo.",
  category: "emagrecimento",
  icon: Weight,
  seoTitle: "Calculadora de Peso Ideal | FitMetrify",
  seoDescription:
    "Estime seu peso ideal com base em fórmulas científicas reconhecidas.",
  simpleMode: true,
  advancedMode: true,
  formula:
    "Faixa OMS (IMC 18,5–24,9) + Devine, Robinson e Miller; média central",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-imc", "calculadora-tmb"],
  seoContent: {
    about:
      "Esta calculadora estima uma faixa de peso considerada saudável com base na sua altura e sexo, utilizando referências de IMC normal (18,5 a 24,9 kg/m²) e fórmulas clássicas (Devine, Robinson e Miller).",
    howItWorks:
      "Informe altura e sexo para obter a faixa OMS e o peso central (média das quatro referências). No modo avançado, inclua peso atual, biotipo (ajuste de ±5%) e, opcionalmente, percentual de gordura para massa magra estimada.",
    interpretationGuide:
      "O painel mostra a faixa de peso saudável, tabela comparativa das fórmulas e peso central. Com peso atual informado, você vê se está acima, abaixo ou dentro da faixa. Use sempre linguagem de faixa — não existe peso ideal único.",
    limitations:
      "Não existe um peso ideal único: composição corporal, histórico e objetivos importam. A faixa por IMC ignora massa muscular. Valores são estimativas educativas, não prescrição médica.",
  },
  inputs: [
    heightInput("simple"),
    sexInput("simple"),
    heightInput("advanced"),
    sexInput("advanced"),
    weightInput("advanced"),
    bodyFatInput("advanced"),
    selectInput("advanced", {
      id: "biotype",
      name: "biotype",
      label: "Biotipo",
      options: [...BIOTYPE_OPTIONS],
      validation: { required: true },
    }),
  ],
  faq: [
    {
      question: "Existe um peso ideal único?",
      answer:
        "Não. O peso ideal varia conforme composição corporal, massa muscular e objetivos individuais. A ferramenta oferece uma faixa de referência.",
    },
    {
      question: "Como é calculado?",
      answer:
        "A faixa OMS usa IMC 18,5–24,9 aplicado à altura. Devine, Robinson e Miller estimam peso por fórmulas antropométricas. O peso central é a média das quatro referências.",
    },
  ],
};
