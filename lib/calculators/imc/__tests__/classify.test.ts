import { describe, expect, it } from "vitest";

import { classifyImc } from "../classify";

describe("classifyImc", () => {
  it("classifies underweight", () => {
    expect(classifyImc(17)).toEqual({
      label: "Abaixo do peso",
      variant: "warning",
    });
  });

  it("classifies normal weight at lower boundary", () => {
    expect(classifyImc(18.5)).toEqual({
      label: "Peso normal",
      variant: "success",
    });
  });

  it("classifies normal weight below overweight threshold", () => {
    expect(classifyImc(24.9)).toEqual({
      label: "Peso normal",
      variant: "success",
    });
  });

  it("classifies overweight at lower boundary", () => {
    expect(classifyImc(25)).toEqual({
      label: "Sobrepeso",
      variant: "warning",
    });
  });

  it("classifies obesity grade I at lower boundary", () => {
    expect(classifyImc(30)).toEqual({
      label: "Obesidade grau I",
      variant: "danger",
    });
  });

  it("classifies obesity grade II at lower boundary", () => {
    expect(classifyImc(35)).toEqual({
      label: "Obesidade grau II",
      variant: "danger",
    });
  });

  it("classifies elderly normal at BMI 26", () => {
    expect(classifyImc(26, { age: 65 })).toEqual({
      label: "Peso normal (referência ≥60a)",
      variant: "success",
    });
  });

  it("classifies elderly overweight at BMI 27", () => {
    expect(classifyImc(27, { age: 60 })).toEqual({
      label: "Sobrepeso",
      variant: "warning",
    });
  });
});
