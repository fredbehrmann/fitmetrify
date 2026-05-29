import { calculators } from "./index";
import type { Calculator, CalculatorCategory } from "./types";

export type {
  Calculator,
  CalculatorCategory,
  CalculatorInput,
  CalculatorSeoContent,
  FaqItem,
} from "./types";
export type { CalculatorMeta } from "./types";

export const CATEGORY_LABELS: Record<CalculatorCategory, string> = {
  emagrecimento: "Emagrecimento",
  nutricao: "Nutrição",
  corrida: "Corrida",
  musculacao: "Musculação",
  "saude-geral": "Saúde geral",
};

export { calculators };

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calculator) => calculator.slug === slug);
}

export function getCalculatorsByCategory(
  category: CalculatorCategory
): Calculator[] {
  return calculators.filter((calculator) => calculator.category === category);
}

export function getAllCalculatorSlugs(): string[] {
  return calculators.map((calculator) => calculator.slug);
}

export function getPopularCalculators(): Calculator[] {
  return calculators.filter((calculator) => calculator.popular);
}

export function getCalculatorsGroupedByCategory(): Record<
  CalculatorCategory,
  Calculator[]
> {
  return calculators.reduce(
    (acc, calculator) => {
      acc[calculator.category].push(calculator);
      return acc;
    },
    {
      emagrecimento: [],
      nutricao: [],
      corrida: [],
      musculacao: [],
      "saude-geral": [],
    } as Record<CalculatorCategory, Calculator[]>
  );
}

export function isCalculatorSlug(slug: string): boolean {
  return calculators.some((calculator) => calculator.slug === slug);
}

export {
  getAdvancedInputs,
  getInputsByMode,
  getSimpleInputs,
  hasMode,
} from "./helpers";
