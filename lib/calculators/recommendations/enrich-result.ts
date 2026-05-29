import type { CalculatorResult, ResultClassification } from "../engines/types";
import { buildNextStepsForSlug } from "./build-next-steps";
import { getRelatedSlugsForCalculator } from "./cross-links";

const DEFAULT_CLASSIFICATIONS: Record<string, ResultClassification> = {
  "calculadora-tmb": {
    label: "Taxa metabólica basal",
    variant: "default",
  },
  "calculadora-gasto-calorico": {
    label: "Gasto calórico estimado",
    variant: "default",
  },
};

export function enrichCalculatorResult(
  slug: string,
  result: CalculatorResult
): CalculatorResult {
  const classification =
    result.classification ?? DEFAULT_CLASSIFICATIONS[slug];

  const nextSteps =
    result.nextSteps && result.nextSteps.length > 0
      ? result.nextSteps
      : buildNextStepsForSlug(slug);

  const relatedSlugs =
    result.relatedSlugs && result.relatedSlugs.length > 0
      ? result.relatedSlugs
      : getRelatedSlugsForCalculator(slug);

  return {
    ...result,
    classification,
    nextSteps,
    relatedSlugs,
  };
}

export function assertEtapa14Result(result: CalculatorResult): void {
  if (!result.primaryValue?.trim()) {
    throw new Error("Missing primaryValue");
  }
  if (!result.interpretation?.trim()) {
    throw new Error("Missing interpretation");
  }
  if (!result.classification?.label?.trim()) {
    throw new Error("Missing classification");
  }
  if (!result.nextSteps?.length) {
    throw new Error("Missing nextSteps");
  }
  if (!result.relatedSlugs?.length) {
    throw new Error("Missing relatedSlugs");
  }
}
