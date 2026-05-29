import { Utensils } from "lucide-react";

import {
  bodyFatInput,
  numberInput,
  selectInput,
  weightInput,
} from "./common-inputs";
import { PROTEIN_GOAL_OPTIONS, TRAINING_TYPE_OPTIONS } from "./options";
import type { Calculator } from "./types";

export const proteinaCalculator: Calculator = {
  slug: "calculadora-proteina",
  title: "Calculadora de Proteína Diária",
  description:
    "Calcule a ingestão diária de proteína ideal para seu objetivo.",
  category: "nutricao",
  icon: Utensils,
  seoTitle: "Calculadora de Proteína Diária | FitMetrify",
  seoDescription:
    "Descubra quantos gramas de proteína consumir por dia para seu objetivo fitness.",
  popular: true,
  simpleMode: true,
  advancedMode: true,
  formula: "Proteína = peso × faixa g/kg conforme objetivo",
  relatedSlugs: ["calculadora-macros", "calculadora-deficit-calorico"],
  seoContent: {
    about:
      "A proteína é essencial para manutenção muscular, recuperação e saciedade. A ingestão ideal varia conforme seu objetivo: saúde geral, emagrecimento, hipertrofia ou performance atlética.",
    howItWorks:
      "Informe peso e objetivo (modo simples) para obter faixa em g/kg e gramas diárias. No avançado, tipo de treino, frequência semanal, massa magra ou gordura corporal e preferência alimentar refinam a recomendação, inclusive por refeição.",
    interpretationGuide:
      "O valor principal é a proteína ideal em gramas/dia. KPIs mostram faixa mínima-máxima e gramas por refeição. A classificação reflete seu objetivo (ex.: emagrecimento, hipertrofia). Distribua em 3–5 refeições ao longo do dia.",
    limitations:
      "Necessidades individuais variam com saúde renal, idade e volume de treino extremo. Fontes vegetais exigem combinação adequada de aminoácidos. Valores são estimativas educativas, não prescrição dietética.",
  },
  inputs: [
    weightInput("simple"),
    selectInput("simple", {
      id: "goal",
      name: "goal",
      label: "Objetivo",
      options: [...PROTEIN_GOAL_OPTIONS],
      validation: { required: true },
    }),
    weightInput("advanced"),
    selectInput("advanced", {
      id: "goal",
      name: "goal",
      label: "Objetivo",
      options: [...PROTEIN_GOAL_OPTIONS],
      validation: { required: true },
    }),
    bodyFatInput("advanced"),
    numberInput("advanced", {
      id: "leanMass",
      name: "leanMass",
      label: "Massa magra",
      unit: "kg",
      placeholder: "Ex: 55",
      validation: { min: 20, max: 150, step: 0.1 },
    }),
    selectInput("advanced", {
      id: "trainingType",
      name: "trainingType",
      label: "Tipo de treino",
      options: [...TRAINING_TYPE_OPTIONS],
      validation: { required: true },
    }),
    numberInput("advanced", {
      id: "weeklyFrequency",
      name: "weeklyFrequency",
      label: "Frequência semanal",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { required: true, min: 0, max: 7, step: 1 },
    }),
    selectInput("advanced", {
      id: "dietPreference",
      name: "dietPreference",
      label: "Preferência alimentar",
      options: [
        { value: "omnivore", label: "Onívoro" },
        { value: "vegetarian", label: "Vegetariano" },
        { value: "vegan", label: "Vegano" },
      ],
    }),
  ],
  faq: [
    {
      question: "Quanta proteína preciso por dia?",
      answer:
        "Depende do objetivo: saúde geral (0,8–1,2 g/kg), emagrecimento ou hipertrofia (1,6–2,2 g/kg), atletas (2,0–2,4 g/kg).",
    },
    {
      question: "Proteína ajuda no emagrecimento?",
      answer:
        "Sim. Proteína aumenta saciedade, preserva massa muscular em déficit calórico e tem maior efeito térmico.",
    },
    {
      question: "Como distribuir ao longo do dia?",
      answer:
        "Divida em 3–5 refeições com 25–40 g de proteína cada para otimizar síntese proteica muscular.",
    },
  ],
};
