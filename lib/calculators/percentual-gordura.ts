import { Percent } from "lucide-react";

import {
  ageInput,
  heightInput,
  numberInput,
  sexInput,
  weightInput,
} from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const percentualGorduraCalculator: Calculator = {
  slug: "calculadora-percentual-gordura",
  title: "Calculadora de Percentual de Gordura",
  description:
    "Estime seu percentual de gordura corporal com o método da Marinha dos EUA ou dobras cutâneas.",
  category: "emagrecimento",
  icon: Percent,
  seoTitle: "Calculadora de Percentual de Gordura Corporal | FitMetrify",
  seoDescription:
    "Calcule seu percentual de gordura com US Navy ou Jackson-Pollock e descubra massa magra e massa gorda.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula:
    "US Navy: log10(cintura − pescoço) | Jackson-Pollock: Siri a partir da densidade corporal",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: [
    "calculadora-tmb",
    "calculadora-imc",
    "calculadora-proteina",
  ],
  seoContent: {
    about:
      "O percentual de gordura corporal complementa o IMC ao diferenciar massa magra de gordura. É essencial para composição corporal, nutrição e treino.",
    howItWorks:
      "No modo simples, use circunferências (US Navy). No avançado, informe dobras cutâneas (Jackson-Pollock 3 dobras) e idade para estimar densidade e % de gordura via equação de Siri.",
    interpretationGuide:
      "O resultado principal é o % de gordura. KPIs mostram massa gorda e massa magra em kg. A classificação considera sexo e faixa etária (20–39 ou 40–59 anos).",
    limitations:
      "US Navy (circunferências) tem margem típica de ±3–5%; Jackson-Pollock com dobras bem medidas fica em ±3–4%. Medidas inconsistentes ou hidratação alterada distorcem o resultado. Não substitui DEXA ou bioimpedância clínica.",
    measurementGuide:
      "Circunferências (US Navy): meça cintura na altura do umbigo, em expiração normal; pescoço abaixo da laringe; quadril (mulheres) no ponto mais largo. Use fita paralela ao chão, sem apertar.\n\nDobras cutâneas (Jackson-Pollock): pinça vertical, mesma posição a cada medição. Homens: peitoral, abdominal e coxa. Mulheres: tríceps, supra-ilíaca e coxa. Faça a média de 2–3 medidas por dobra.",
  },
  inputs: [
    sexInput("simple"),
    heightInput("simple"),
    weightInput("simple"),
    numberInput("simple", {
      id: "waist",
      name: "waist",
      label: "Circunferência da cintura",
      unit: "cm",
      placeholder: "Ex: 85",
      helpText: "Medida na altura do umbigo.",
      validation: { required: true, min: 40, max: 200, step: 0.1 },
    }),
    numberInput("simple", {
      id: "neck",
      name: "neck",
      label: "Circunferência do pescoço",
      unit: "cm",
      placeholder: "Ex: 38",
      helpText: "Medida abaixo da laringe.",
      validation: { required: true, min: 20, max: 60, step: 0.1 },
    }),
    numberInput("simple", {
      id: "hip",
      name: "hip",
      label: "Circunferência do quadril",
      unit: "cm",
      placeholder: "Ex: 98",
      helpText: "Apenas para mulheres — ponto mais largo.",
      validation: { min: 50, max: 200, step: 0.1 },
    }),
    sexInput("advanced"),
    ageInput("advanced"),
    weightInput("advanced"),
    numberInput("advanced", {
      id: "chestSkinfold",
      name: "chestSkinfold",
      label: "Dobra peitoral",
      unit: "mm",
      placeholder: "Ex: 12",
      helpText: "Homens — Jackson-Pollock 3 dobras.",
      validation: { min: 1, max: 80, step: 0.5 },
    }),
    numberInput("advanced", {
      id: "abdomenSkinfold",
      name: "abdomenSkinfold",
      label: "Dobra abdominal",
      unit: "mm",
      placeholder: "Ex: 18",
      helpText: "Homens — Jackson-Pollock 3 dobras.",
      validation: { min: 1, max: 80, step: 0.5 },
    }),
    numberInput("advanced", {
      id: "tricepsSkinfold",
      name: "tricepsSkinfold",
      label: "Dobra tríceps",
      unit: "mm",
      placeholder: "Ex: 16",
      helpText: "Mulheres — Jackson-Pollock 3 dobras.",
      validation: { min: 1, max: 80, step: 0.5 },
    }),
    numberInput("advanced", {
      id: "suprailiacSkinfold",
      name: "suprailiacSkinfold",
      label: "Dobra supra-ilíaca",
      unit: "mm",
      placeholder: "Ex: 14",
      helpText: "Mulheres — Jackson-Pollock 3 dobras.",
      validation: { min: 1, max: 80, step: 0.5 },
    }),
    numberInput("advanced", {
      id: "thighSkinfold",
      name: "thighSkinfold",
      label: "Dobra coxa",
      unit: "mm",
      placeholder: "Ex: 20",
      validation: { required: true, min: 1, max: 80, step: 0.5 },
    }),
  ],
  faq: [
    {
      question: "Qual método é mais preciso?",
      answer:
        "Jackson-Pollock com dobras bem medidas tende a ser mais preciso para atletas. US Navy é prático com fita métrica.",
    },
    {
      question: "Preciso do quadril no modo simples?",
      answer: "Sim, para mulheres. Homens usam apenas cintura, pescoço e altura.",
    },
    {
      question: "Como usar a massa magra na TMB?",
      answer:
        "Após calcular, use o botão para enviar massa magra à calculadora de TMB (fórmula Katch-McArdle).",
    },
  ],
};
