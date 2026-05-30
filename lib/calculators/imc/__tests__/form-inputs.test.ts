import { describe, expect, it } from "vitest";

import { getImcAdvancedInputs } from "../form-inputs";

describe("getImcAdvancedInputs", () => {
  it("returns metric advanced fields including waist", () => {
    const inputs = getImcAdvancedInputs("metric");
    const names = inputs.map((input) => input.name);

    expect(names).toContain("weight");
    expect(names).toContain("height");
    expect(names).toContain("waist");
    expect(names).toContain("sex");
  });

  it("returns imperial advanced fields including waistIn", () => {
    const inputs = getImcAdvancedInputs("imperial");
    const names = inputs.map((input) => input.name);

    expect(names).toContain("weightLb");
    expect(names).toContain("heightFt");
    expect(names).toContain("waistIn");
  });
});
