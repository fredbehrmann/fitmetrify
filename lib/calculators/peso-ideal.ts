import { Weight } from "lucide-react";

import { heightInput, sexInput } from "./common-inputs";
import type { Calculator } from "./types";

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
  advancedMode: false,
  formula: "Faixa baseada em IMC saudável (18,5–24,9) para sua altura",
  relatedSlugs: ["calculadora-imc", "calculadora-tmb"],
  seoContent: {
    about:
      "Esta calculadora estima uma faixa de peso considerada saudável com base na sua altura e sexo, utilizando referências de IMC normal (18,5 a 24,9 kg/m²).",
    howItWorks:
      "Informe altura e sexo. A faixa de peso é derivada aplicando os limites de IMC saudável à sua altura, convertendo para quilogramas mínimo e máximo.",
    interpretationGuide:
      "Quando o motor estiver ativo, o painel mostrará a faixa sugerida. Enquanto isso, use a calculadora de IMC com seu peso atual para contextualizar onde você está em relação à faixa.",
    limitations:
      "Não existe um peso ideal único: composição corporal, histórico e objetivos importam. A faixa por IMC ignora massa muscular. O cálculo completo desta ferramenta ainda está em desenvolvimento no produto.",
  },
  inputs: [heightInput("simple"), sexInput("simple")],
  faq: [
    {
      question: "Existe um peso ideal único?",
      answer:
        "Não. O peso ideal varia conforme composição corporal, massa muscular e objetivos individuais. A ferramenta oferece uma faixa de referência.",
    },
    {
      question: "Como é calculado?",
      answer:
        "A faixa é derivada do IMC considerado saudável (18,5 a 24,9) aplicado à sua altura.",
    },
  ],
};
