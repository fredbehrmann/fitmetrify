import type { LucideIcon } from "lucide-react";

export type CalculatorCategory =
  | "emagrecimento"
  | "nutricao"
  | "corrida"
  | "musculacao"
  | "saude-geral";

export type InputMode = "simple" | "advanced";

export type InputType =
  | "number"
  | "text"
  | "select"
  | "radio"
  | "checkbox"
  | "time";

export type FaqItem = {
  question: string;
  answer: string;
};

export type CalculatorSeoContent = {
  about: string;
  howItWorks: string;
  interpretationGuide: string;
  limitations: string;
  measurementGuide?: string;
};

export type InputValidation = {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  warningAbove?: number;
  warningMessage?: string;
};

export type CalculatorInput = {
  id: string;
  name: string;
  label: string;
  type: InputType;
  mode: InputMode;
  unit?: string;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  validation?: InputValidation;
  defaultValue?: string | number | boolean;
};

export type Calculator = {
  slug: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  icon: LucideIcon;
  seoTitle: string;
  seoDescription: string;
  popular?: boolean;
  simpleMode: boolean;
  advancedMode: boolean;
  inputs: CalculatorInput[];
  seoContent: CalculatorSeoContent;
  faq: FaqItem[];
  formula?: string;
  scientificReviewDate?: string;
  relatedSlugs?: string[];
};

export type CalculatorTool = Pick<
  Calculator,
  "slug" | "simpleMode" | "advancedMode" | "inputs"
>;

/** @deprecated Use Calculator instead */
export type CalculatorMeta = Calculator;
