import { describe, expect, it } from "vitest";

import { imcEngine } from "../../engines/imc-engine";

describe("imcEngine", () => {
  it("calculateSimple returns full result", () => {
    const result = imcEngine.calculateSimple?.({ weight: 70, height: 175 });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("22.9");
    expect(result?.primaryUnit).toBe("kg/m²");
    expect(result?.classification?.label).toBe("Peso normal");
    expect(result?.interpretation).toBeTruthy();
    expect(result?.scale?.value).toBe(22.9);
    expect(result?.nextSteps?.length).toBeGreaterThan(0);
    expect(result?.warnings).toBeUndefined();
  });

  it("calculateSimple returns null without required fields", () => {
    expect(imcEngine.calculateSimple?.({ weight: 70 })).toBeNull();
  });

  it("calculateAdvanced includes waist warnings for men", () => {
    const result = imcEngine.calculateAdvanced?.({
      weight: 90,
      height: 175,
      sex: "male",
      age: 40,
      waist: 105,
      activityLevel: "sedentary",
    });

    expect(result?.warnings?.some((w) => w.includes("102 cm"))).toBe(true);
    expect(result?.warnings?.some((w) => w.includes("não diferencia"))).toBe(
      true
    );
  });

  it("calculateAdvanced includes waist warnings for women", () => {
    const result = imcEngine.calculateAdvanced?.({
      weight: 75,
      height: 165,
      sex: "female",
      age: 35,
      waist: 85,
      activityLevel: "light",
    });

    expect(result?.warnings?.some((w) => w.includes("80 cm"))).toBe(true);
  });

  it("calculateAdvanced warns active users with high BMI", () => {
    const result = imcEngine.calculateAdvanced?.({
      weight: 85,
      height: 175,
      sex: "male",
      age: 28,
      waist: 80,
      activityLevel: "extreme",
    });

    expect(result?.warnings?.some((w) => w.includes("massa muscular"))).toBe(
      true
    );
  });
});
