import { describe, expect, it } from "vitest";

import type { CalculatorResult } from "../../engines/types";
import {
  assertEtapa14Result,
  enrichCalculatorResult,
} from "../enrich-result";

describe("enrichCalculatorResult", () => {
  it("adds relatedSlugs and preserves engine nextSteps", () => {
    const base: CalculatorResult = {
      primaryValue: "1800",
      interpretation: "TMB estimada.",
      nextSteps: ["Passo customizado."],
    };

    const enriched = enrichCalculatorResult("calculadora-tmb", base);

    expect(enriched.nextSteps).toEqual(["Passo customizado."]);
    expect(enriched.relatedSlugs?.[0]).toBe("calculadora-gasto-calorico");
    expect(enriched.classification?.label).toBe("Taxa metabólica basal");
    assertEtapa14Result(enriched);
  });

  it("fills nextSteps when empty", () => {
    const base: CalculatorResult = {
      primaryValue: "24",
      interpretation: "IMC normal.",
      classification: { label: "Normal" },
    };

    const enriched = enrichCalculatorResult("calculadora-imc", base);

    expect(enriched.nextSteps!.length).toBeGreaterThan(0);
    assertEtapa14Result(enriched);
  });
});
