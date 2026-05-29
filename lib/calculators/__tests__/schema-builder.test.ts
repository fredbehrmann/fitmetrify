import { describe, expect, it } from "vitest";

import { weightInput } from "../common-inputs";
import { buildCalculatorSchema, getDefaultValues } from "../schema-builder";
import type { CalculatorInput } from "../types";

describe("schema-builder", () => {
  it("rejects weight below minimum", () => {
    const schema = buildCalculatorSchema([weightInput("simple")]);
    const result = schema.safeParse({ weight: 10 });
    expect(result.success).toBe(false);
  });

  it("rejects weight above maximum", () => {
    const schema = buildCalculatorSchema([weightInput("simple")]);
    const result = schema.safeParse({ weight: 400 });
    expect(result.success).toBe(false);
  });

  it("accepts valid weight", () => {
    const schema = buildCalculatorSchema([weightInput("simple")]);
    const result = schema.safeParse({ weight: 75 });
    expect(result.success).toBe(true);
  });

  it("requires valid select option", () => {
    const input: CalculatorInput = {
      id: "sex",
      name: "sex",
      label: "Sexo",
      type: "select",
      mode: "simple",
      options: [
        { value: "male", label: "Homem" },
        { value: "female", label: "Mulher" },
      ],
      validation: { required: true },
    };

    const schema = buildCalculatorSchema([input]);
    expect(schema.safeParse({ sex: "invalid" }).success).toBe(false);
    expect(schema.safeParse({ sex: "male" }).success).toBe(true);
  });

  it("defaults checkbox to false", () => {
    const input: CalculatorInput = {
      id: "hotClimate",
      name: "hotClimate",
      label: "Clima quente",
      type: "checkbox",
      mode: "advanced",
    };

    const defaults = getDefaultValues([input]);
    expect(defaults.hotClimate).toBe(false);
  });
});
