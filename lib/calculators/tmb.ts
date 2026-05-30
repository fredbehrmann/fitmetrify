import { Flame } from "lucide-react";

import {
  ageInput,
  bodyFatInput,
  heightInput,
  numberInput,
  sexInput,
  weightInput,
} from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const tmbCalculator: Calculator = {
  slug: "calculadora-tmb",
  title: "Calculadora de TMB",
  description:
    "Estime sua Taxa Metabólica Basal com a fórmula Mifflin-St Jeor.",
  category: "emagrecimento",
  icon: Flame,
  seoTitle: "Calculadora de TMB Grátis | FitMetrify",
  seoDescription:
    "Descubra quantas calorias seu corpo gasta em repouso com nossa calculadora de TMB.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula:
    "Homem: TMB = 10 × peso + 6,25 × altura - 5 × idade + 5 | Mulher: TMB = 10 × peso + 6,25 × altura - 5 × idade - 161",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: [
    "calculadora-gasto-calorico",
    "calculadora-deficit-calorico",
    "calculadora-percentual-gordura",
  ],
  seoContent: {
    about:
      "A Taxa Metabólica Basal (TMB) representa a quantidade de calorias que seu corpo gasta em repouso absoluto para manter funções vitais como respiração, circulação e temperatura. Utilizamos a fórmula Mifflin-St Jeor, considerada uma das mais precisas para a população geral.",
    howItWorks:
      "No modo simples, informe sexo, peso, altura e idade para aplicar Mifflin-St Jeor. No avançado, com massa magra ou percentual de gordura, a calculadora pode usar Katch-McArdle (370 + 21,6 × massa magra) quando esses dados estiverem disponíveis.",
    interpretationGuide:
      "O resultado principal mostra kcal/dia em repouso. KPIs indicam qual fórmula foi usada. Use esse valor como base para a calculadora de gasto calórico total — a TMB sozinha não inclui exercícios nem atividades do dia a dia.",
    limitations:
      "Equações populacionais têm margem de erro individual (±10–15%). Condições clínicas, medicamentos e ciclo menstrual alteram o gasto real. Não use a TMB isolada para prescrever dietas sem considerar atividade e saúde geral.",
  },
  inputs: [
    sexInput("simple"),
    weightInput("simple"),
    heightInput("simple"),
    ageInput("simple"),
    sexInput("advanced"),
    weightInput("advanced"),
    heightInput("advanced"),
    ageInput("advanced"),
    bodyFatInput("advanced"),
    numberInput("advanced", {
      id: "leanMass",
      name: "leanMass",
      label: "Massa magra",
      unit: "kg",
      placeholder: "Ex: 55",
      helpText: "Se conhecida, permite usar TMB = 370 + 21,6 × massa magra.",
      validation: { min: 20, max: 150, step: 0.1 },
    }),
  ],
  faq: [
    {
      question: "O que é TMB?",
      answer:
        "TMB é a Taxa Metabólica Basal: o gasto calórico mínimo diário em repouso, sem contar atividades físicas.",
    },
    {
      question: "Qual fórmula é utilizada?",
      answer:
        "Utilizamos Mifflin-St Jeor no modo simples. No modo avançado, com massa magra conhecida, aplicamos a fórmula baseada em massa magra.",
    },
    {
      question: "Para que serve calcular a TMB?",
      answer:
        "A TMB é a base para estimar seu gasto calórico total e definir metas de emagrecimento, manutenção ou ganho de massa.",
    },
  ],
};
