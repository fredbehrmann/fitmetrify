import { describe, expect, it } from "vitest";

import { tmbEngine } from "../../engines/tmb-engine";

describe("tmbEngine", () => {
  it("calculateSimple returns Mifflin result", () => {
    const result = tmbEngine.calculateSimple?.({
      sex: "male",
      weight: 80,
      height: 180,
      age: 30,
    });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("1780");
    expect(result?.primaryUnit).toBe("kcal/dia");
    expect(result?.kpis?.[0]?.value).toBe("Mifflin-St Jeor");
    expect(result?.nextSteps?.length).toBeGreaterThan(0);
  });

  it("calculateSimple returns null without required fields", () => {
    expect(
      tmbEngine.calculateSimple?.({ sex: "male", weight: 80 })
    ).toBeNull();
  });

  it("calculateAdvanced uses lean mass when provided", () => {
    const result = tmbEngine.calculateAdvanced?.({
      sex: "male",
      weight: 80,
      height: 180,
      age: 30,
      leanMass: 64,
    });

    expect(result?.primaryValue).toBe("1752");
    expect(result?.kpis?.[0]?.value).toBe("Massa magra (Katch-McArdle)");
  });

  it("calculateAdvanced derives lean mass from body fat and weight", () => {
    const result = tmbEngine.calculateAdvanced?.({
      sex: "female",
      weight: 80,
      height: 165,
      age: 30,
      bodyFat: 20,
    });

    expect(result?.primaryValue).toBe("1752");
    expect(result?.kpis?.some((k) => k.label === "Massa magra estimada")).toBe(
      true
    );
  });

  it("calculateAdvanced prioritizes lean mass over body fat", () => {
    const result = tmbEngine.calculateAdvanced?.({
      sex: "male",
      weight: 80,
      height: 180,
      age: 30,
      leanMass: 70,
      bodyFat: 20,
    });

    expect(result?.primaryValue).toBe("1882");
  });

  it("calculateAdvanced falls back to Mifflin without lean mass data", () => {
    const result = tmbEngine.calculateAdvanced?.({
      sex: "male",
      weight: 80,
      height: 180,
      age: 30,
    });

    expect(result?.primaryValue).toBe("1780");
    expect(result?.kpis?.[0]?.value).toBe("Mifflin-St Jeor");
  });
});
