import { Zap } from "lucide-react";

import { loadInput, numberInput, repsInput } from "./common-inputs";
import type { Calculator } from "./types";
import { SCIENTIFIC_REVIEW_DATE } from "./content-standards";

export const volumeTreinoCalculator: Calculator = {
  slug: "calculadora-volume-treino",
  title: "Calculadora de Volume de Treino",
  description:
    "Calcule o volume total de treino por exercício e sessão.",
  category: "musculacao",
  icon: Zap,
  seoTitle: "Calculadora de Volume de Treino | FitMetrify",
  seoDescription:
    "Monitore o volume de treino para progressão segura e eficiente.",
  simpleMode: true,
  advancedMode: false,
  formula: "Volume = séries × repetições × carga",
  scientificReviewDate: SCIENTIFIC_REVIEW_DATE,
  relatedSlugs: ["calculadora-1rm", "calculadora-zonas-carga"],
  seoContent: {
    about:
      "Volume de treino é o produto de séries, repetições e carga. Monitorá-lo ajuda a garantir progressão gradual e evitar overtraining.",
    howItWorks:
      "Informe nome do exercício (referência), número de séries, repetições por série e carga em kg. O volume total da sessão para aquele exercício é séries × reps × carga.",
    interpretationGuide:
      "O volume total em kg aparece como resultado principal. Compare semanas semana a semana no mesmo exercício. Aumentos graduais de 5–10% costumam ser mais sustentáveis que saltos abruptos.",
    limitations:
      "O volume calculado (séries × reps × carga) é um indicador de trabalho mecânico total, mas não reflete a intensidade relativa ao 1RM. 3 séries de 10 reps a 60% do 1RM geram o mesmo volume bruto que 3 séries de 10 reps a 80%, mas produzem estímulos de hipertrofia muito diferentes. Para uma análise completa, combine esta calculadora com as Zonas de Carga. Referências de volume efetivo semanal: 10–20 séries por grupo muscular (Schoenfeld, 2017).",
  },
  inputs: [
    {
      id: "exercise",
      name: "exercise",
      label: "Exercício",
      type: "text",
      mode: "simple",
      placeholder: "Ex: Supino reto",
      helpText: "Nome do exercício (referência).",
    },
    numberInput("simple", {
      id: "sets",
      name: "sets",
      label: "Séries",
      placeholder: "Ex: 4",
      validation: { required: true, min: 1, max: 20, step: 1 },
    }),
    repsInput("simple"),
    loadInput("simple"),
  ],
  faq: [
    {
      question: "O que é volume de treino?",
      answer:
        "Volume = séries × repetições × carga (kg). Mede o trabalho total realizado.",
    },
    {
      question: "Como usar para progressão?",
      answer:
        "Aumente volume gradualmente (5–10% por semana) para estimular adaptação sem excesso.",
    },
  ],
};
