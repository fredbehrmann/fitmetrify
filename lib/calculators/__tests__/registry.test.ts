import { describe, expect, it } from "vitest";

import { calculators } from "../index";
import {
  getCalculatorBySlug,
  getAllCalculatorSlugs,
} from "../registry";
import { WEIGHT_VALIDATION } from "../validation";

describe("calculator registry", () => {
  it("registers exactly 15 calculators", () => {
    expect(calculators).toHaveLength(15);
  });

  it("has unique slugs with calculadora- prefix", () => {
    const slugs = getAllCalculatorSlugs();
    const uniqueSlugs = new Set(slugs);

    expect(uniqueSlugs.size).toBe(15);
    slugs.forEach((slug) => {
      expect(slug.startsWith("calculadora-")).toBe(true);
    });
  });

  it("returns undefined for invalid slug", () => {
    expect(getCalculatorBySlug("invalido")).toBeUndefined();
  });

  it("ensures every calculator has seoContent sections and at least 2 FAQ items", () => {
    const minLength = 80;

    calculators.forEach((calculator) => {
      expect(calculator.seoContent.about.length).toBeGreaterThanOrEqual(
        minLength
      );
      expect(calculator.seoContent.howItWorks.length).toBeGreaterThanOrEqual(
        minLength
      );
      expect(
        calculator.seoContent.interpretationGuide.length
      ).toBeGreaterThanOrEqual(minLength);
      expect(calculator.seoContent.limitations.length).toBeGreaterThanOrEqual(
        minLength
      );
      expect(calculator.faq.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("ensures simple mode calculators have simple inputs", () => {
    calculators
      .filter((c) => c.simpleMode)
      .forEach((calculator) => {
        const simpleInputs = calculator.inputs.filter((i) => i.mode === "simple");
        expect(simpleInputs.length).toBeGreaterThan(0);
      });
  });

  it("ensures advanced mode calculators have advanced inputs", () => {
    calculators
      .filter((c) => c.advancedMode)
      .forEach((calculator) => {
        const advancedInputs = calculator.inputs.filter(
          (i) => i.mode === "advanced"
        );
        expect(advancedInputs.length).toBeGreaterThan(0);
      });
  });

  it("applies weight validation to weight inputs", () => {
    calculators.forEach((calculator) => {
      calculator.inputs
        .filter((input) => input.name === "weight" || input.id === "weight")
        .forEach((input) => {
          expect(input.validation?.min).toBe(WEIGHT_VALIDATION.min);
          expect(input.validation?.max).toBe(WEIGHT_VALIDATION.max);
        });
    });
  });
});
