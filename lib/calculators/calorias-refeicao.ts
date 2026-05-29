import { Calculator } from "lucide-react";

import { caloriesInput, selectInput } from "./common-inputs";
import { MEAL_COUNT_OPTIONS } from "./options";
import type { Calculator as CalculatorType } from "./types";

export const caloriasRefeicaoCalculator: CalculatorType = {
  slug: "calculadora-calorias-refeicao",
  title: "Calculadora de Calorias por Refeição",
  description:
    "Distribua suas calorias diárias entre refeições de forma equilibrada.",
  category: "nutricao",
  icon: Calculator,
  seoTitle: "Calculadora de Calorias por Refeição | FitMetrify",
  seoDescription:
    "Divida suas calorias diárias entre refeições de acordo com sua rotina alimentar.",
  simpleMode: true,
  advancedMode: false,
  formula: "Calorias por refeição = calorias diárias / número de refeições",
  relatedSlugs: ["calculadora-macros", "calculadora-gasto-calorico"],
  seoContent: {
    about:
      "Dividir calorias de forma equilibrada entre refeições facilita o controle alimentar e a adesão ao plano nutricional, especialmente em dietas com metas calóricas definidas.",
    howItWorks:
      "Informe o total de calorias diárias e o número de refeições. A calculadora divide igualmente as calorias por refeição (calorias diárias ÷ número de refeições).",
    interpretationGuide:
      "Quando disponível, o resultado mostrará kcal por refeição. Ajuste pré e pós-treino conforme sua rotina — a divisão igual é ponto de partida, não regra rígida.",
    limitations:
      "Distribuição uniforme não considera jejum, turnos de trabalho ou refeições maiores no pós-treino. Macros por refeição exigem a calculadora de macronutrientes. Motor de cálculo em desenvolvimento nesta versão.",
  },
  inputs: [
    caloriesInput("simple"),
    selectInput("simple", {
      id: "mealCount",
      name: "mealCount",
      label: "Número de refeições",
      options: [...MEAL_COUNT_OPTIONS],
      validation: { required: true },
    }),
  ],
  faq: [
    {
      question: "Quantas refeições devo fazer?",
      answer:
        "Depende da rotina. A maioria das pessoas se adapta bem a 3–5 refeições por dia.",
    },
    {
      question: "Todas as refeições devem ter calorias iguais?",
      answer:
        "Não necessariamente. Pré e pós-treino podem ter mais carboidratos; a distribuição pode ser personalizada.",
    },
  ],
};
