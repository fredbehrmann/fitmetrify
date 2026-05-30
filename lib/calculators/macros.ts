import { Apple } from "lucide-react";

import {
  caloriesInput,
  checkboxInput,
  numberInput,
  selectInput,
  weightInput,
} from "./common-inputs";
import { GOAL_OPTIONS, MACRO_INPUT_MODE_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const macrosCalculator: Calculator = {
  slug: "calculadora-macros",
  title: "Calculadora de Macronutrientes",
  description:
    "Distribua suas calorias entre proteína, carboidrato e gordura.",
  category: "nutricao",
  icon: Apple,
  seoTitle: "Calculadora de Macronutrientes | FitMetrify",
  seoDescription:
    "Calcule a distribuição ideal de macros para emagrecimento, manutenção ou hipertrofia.",
  simpleMode: true,
  advancedMode: true,
  formula:
    "Proteína 4 kcal/g | Carboidrato 4 kcal/g | Gordura 9 kcal/g",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-proteina", "calculadora-gasto-calorico"],
  seoContent: {
    about:
      "Macronutrientes são proteínas, carboidratos e gorduras — os três pilares da alimentação. A distribuição ideal depende do seu objetivo: emagrecimento, manutenção ou hipertrofia.",
    howItWorks:
      "Modo simples: informe calorias diárias e objetivo para distribuir macros por percentuais padrão. Modo avançado: defina proteína e gordura por kg de peso e ajuste carboidratos conforme calorias restantes e dias de treino.",
    interpretationGuide:
      "O painel mostra gramas e percentuais de cada macro, com gráfico de distribuição. Use os KPIs para montar refeições. Se houver aviso de macros fixos acima das calorias, reduza proteína/gordura ou aumente o alvo calórico.",
    limitations:
      "Distribuições genéricas não consideram intolerâncias, preferências ou periodização. Fibra, micronutrientes e timing de nutrientes não entram no cálculo. Ajuste com base em performance e composição corporal ao longo do tempo.",
  },
  inputs: [
    caloriesInput("simple"),
    selectInput("simple", {
      id: "inputMode",
      name: "inputMode",
      label: "Modo de cálculo",
      options: [...MACRO_INPUT_MODE_OPTIONS],
      defaultValue: "percent",
      validation: { required: true },
    }),
    selectInput("simple", {
      id: "goal",
      name: "goal",
      label: "Objetivo",
      options: [...GOAL_OPTIONS],
      validation: { required: true },
    }),
    weightInput("simple", {
      id: "weight",
      name: "weight",
      label: "Peso corporal",
      helpText: "Obrigatório no modo g/kg. Pode vir da jornada anterior.",
      validation: { required: false, min: 30, max: 300, step: 0.1 },
    }),
    numberInput("simple", {
      id: "proteinPerKg",
      name: "proteinPerKg",
      label: "Proteína",
      unit: "g/kg",
      placeholder: "Ex: 1.8",
      validation: { min: 0.8, max: 3, step: 0.1 },
    }),
    numberInput("simple", {
      id: "fatMinPerKg",
      name: "fatMinPerKg",
      label: "Gordura mínima",
      unit: "g/kg",
      placeholder: "Ex: 1.0",
      validation: { min: 0.3, max: 2, step: 0.1 },
    }),
    caloriesInput("advanced"),
    weightInput("advanced"),
    numberInput("advanced", {
      id: "proteinPerKg",
      name: "proteinPerKg",
      label: "Proteína fixa",
      unit: "g/kg",
      placeholder: "Ex: 2.0",
      validation: { required: true, min: 0.8, max: 3, step: 0.1 },
    }),
    numberInput("advanced", {
      id: "fatMinPerKg",
      name: "fatMinPerKg",
      label: "Gordura mínima",
      unit: "g/kg",
      placeholder: "Ex: 0.8",
      validation: { required: true, min: 0.3, max: 2, step: 0.1 },
    }),
    checkboxInput("advanced", {
      id: "adjustCarbs",
      name: "adjustCarbs",
      label: "Dia de treino / Dia de descanso",
      helpText:
        "Distribui carboidratos com +20% nos dias de treino e −20% nos dias de descanso, mantendo proteína constante.",
    }),
    numberInput("advanced", {
      id: "trainingDays",
      name: "trainingDays",
      label: "Dias de treino por semana",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { min: 0, max: 7, step: 1 },
    }),
  ],
  faq: [
    {
      question: "Qual a distribuição para emagrecimento?",
      answer:
        "Padrão sugerido: 30% proteína, 25% gordura e 45% carboidrato das calorias totais.",
    },
    {
      question: "Quantas calorias tem cada macro?",
      answer: "Proteína e carboidrato: 4 kcal/g. Gordura: 9 kcal/g.",
    },
    {
      question: "Preciso contar macros?",
      answer:
        "Contar macros oferece precisão maior que apenas calorias, especialmente para hipertrofia ou cutting.",
    },
  ],
};
