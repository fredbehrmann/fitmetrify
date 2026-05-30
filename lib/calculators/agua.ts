import { Droplets } from "lucide-react";

import {
  checkboxInput,
  numberInput,
  selectInput,
  weightInput,
} from "./common-inputs";
import { TRAINING_TYPE_OPTIONS } from "./options";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const aguaCalculator: Calculator = {
  slug: "calculadora-agua",
  title: "Calculadora de Água Diária",
  description:
    "Estime quanta água você deve beber por dia com base no seu peso.",
  category: "nutricao",
  icon: Droplets,
  seoTitle: "Calculadora de Água Diária | FitMetrify",
  seoDescription:
    "Descubra a quantidade ideal de água para manter-se hidratado durante o dia.",
  simpleMode: true,
  advancedMode: true,
  formula: "Água base = peso × 35 ml",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-proteina"],
  seoContent: {
    about:
      "A hidratação adequada é fundamental para performance, recuperação e funções corporais. A recomendação base é de 35 ml por kg de peso corporal, com ajustes para treino, clima e cafeína.",
    howItWorks:
      "Informe o peso para calcular o volume base (35 ml/kg). No modo avançado, some ajustes por tempo de treino, clima quente, cafeína e sudorese intensa para refinar a meta diária em litros ou mililitros.",
    interpretationGuide:
      "O resultado principal indica quanta água beber por dia. KPIs detalham componentes do cálculo quando aplicável. Distribua a ingestão ao longo do dia e aumente em treinos longos ou calor.",
    limitations:
      "Necessidades variam com dieta (alimentos úmidos), altitude e condições médicas. Sede e cor da urina são indicadores práticos complementares. Hiperidratação excessiva também pode ser prejudicial em contextos clínicos específicos.",
  },
  inputs: [
    weightInput("simple"),
    selectInput("simple", {
      id: "ageGroup",
      name: "ageGroup",
      label: "Faixa etária",
      options: [
        { value: "adult", label: "Adulto (até 59 anos)" },
        { value: "senior", label: "Idoso (60 anos ou mais)" },
      ],
      validation: { required: true },
    }),
    weightInput("advanced"),
    selectInput("advanced", {
      id: "ageGroup",
      name: "ageGroup",
      label: "Faixa etária",
      options: [
        { value: "adult", label: "Adulto (até 59 anos)" },
        { value: "senior", label: "Idoso (60 anos ou mais)" },
      ],
      validation: { required: true },
    }),
    numberInput("advanced", {
      id: "workoutTime",
      name: "workoutTime",
      label: "Tempo de treino",
      unit: "horas",
      placeholder: "Ex: 1",
      helpText: "+500 ml por hora de treino.",
      validation: { min: 0, max: 6, step: 0.5 },
    }),
    checkboxInput("advanced", {
      id: "hotClimate",
      name: "hotClimate",
      label: "Clima quente",
      helpText: "+300 a 500 ml em clima quente.",
    }),
    checkboxInput("advanced", {
      id: "highCaffeine",
      name: "highCaffeine",
      label: "Alta ingestão de cafeína",
      helpText: "+250 ml se houver alta ingestão de cafeína.",
    }),
    checkboxInput("advanced", {
      id: "heavySweating",
      name: "heavySweating",
      label: "Sudorese alta",
    }),
    selectInput("advanced", {
      id: "exerciseType",
      name: "exerciseType",
      label: "Tipo de exercício",
      options: [...TRAINING_TYPE_OPTIONS],
    }),
  ],
  faq: [
    {
      question: "Quanta água devo beber por dia?",
      answer:
        "Como referência, multiplique seu peso (kg) por 35 ml. Ajustes são feitos conforme atividade e clima.",
    },
    {
      question: "Treino aumenta a necessidade?",
      answer:
        "Sim. Adicione cerca de 500 ml por hora de exercício para repor perdas por suor.",
    },
    {
      question: "Como distribuir ao longo do dia?",
      answer:
        "Beba água regularmente, não apenas quando sentir sede. Divida em copos de 250 ml ao longo do dia.",
    },
  ],
};
