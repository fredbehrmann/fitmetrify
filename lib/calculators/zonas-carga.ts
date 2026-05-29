import { Heart } from "lucide-react";

import { loadInput, numberInput, repsInput } from "./common-inputs";
import type { Calculator } from "./types";

export const zonasCargaCalculator: Calculator = {
  slug: "calculadora-zonas-carga",
  title: "Calculadora de Zonas de Carga",
  description:
    "Defina zonas de treino com base no seu 1RM estimado.",
  category: "musculacao",
  icon: Heart,
  seoTitle: "Calculadora de Zonas de Carga | FitMetrify",
  seoDescription:
    "Calcule as zonas de carga ideais para hipertrofia, força e resistência.",
  simpleMode: true,
  advancedMode: false,
  formula: "Zonas: 90%, 80%, 70%, 60% do 1RM estimado",
  relatedSlugs: ["calculadora-1rm", "calculadora-volume-treino"],
  seoContent: {
    about:
      "Zonas de carga dividem seu 1RM em percentuais para diferentes objetivos: força (90%), hipertrofia (70–80%) e resistência (60%). Informe 1RM direto ou derive de carga + repetições.",
    howItWorks:
      "Informe o 1RM em kg ou forneça carga e repetições para estimar o máximo antes de calcular faixas em 90%, 80%, 70% e 60% do 1RM para cada objetivo de treino.",
    interpretationGuide:
      "KPIs listam cargas sugeridas por zona. Use a zona de força para poucas reps pesadas, hipertrofia para volume moderado e resistência para séries mais leves. Recalcule quando o 1RM estimado mudar.",
    limitations:
      "Percentuais fixos não consideram RPE, fadiga acumulada ou exercícios técnicos. 1RM impreciso distorce todas as zonas. Sempre priorize amplitude de movimento e segurança sobre cumprir percentual exato.",
  },
  inputs: [
    numberInput("simple", {
      id: "oneRepMax",
      name: "oneRepMax",
      label: "1RM estimado",
      unit: "kg",
      placeholder: "Ex: 100",
      helpText: "Informe seu 1RM ou use carga + reps abaixo para estimar.",
      validation: { min: 1, max: 500, step: 0.5 },
    }),
    loadInput("simple", {
      id: "estimateLoad",
      name: "estimateLoad",
      label: "Carga (para estimar 1RM)",
      helpText: "Opcional, se não souber o 1RM direto.",
    }),
    repsInput("simple", {
      id: "estimateReps",
      name: "estimateReps",
      label: "Repetições (para estimar 1RM)",
      helpText: "Opcional, usado com a carga para estimar 1RM.",
    }),
  ],
  faq: [
    {
      question: "Quais zonas de carga existem?",
      answer:
        "Comumente: 90% (força), 80% (força/hipertrofia), 70% (hipertrofia), 60% (resistência).",
    },
    {
      question: "Preciso do 1RM exato?",
      answer:
        "Não. Use a calculadora de 1RM para estimar a partir de carga e repetições submáximas.",
    },
  ],
};
