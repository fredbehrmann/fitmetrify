import { describe, expect, it } from "vitest";

import { macrosEngine } from "../macros-engine";

describe("macrosEngine", () => {
  it("calculates simple mode for lose goal", () => {
    const result = macrosEngine.calculateSimple?.({
      calories: 2000,
      goal: "lose",
    });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("2.000");
    expect(result?.macroChart).toHaveLength(3);
    expect(result?.kpis?.[0].value).toBe("150");
  });

  it("returns null when simple inputs are missing", () => {
    expect(macrosEngine.calculateSimple?.({ calories: 2000 })).toBeNull();
  });

  it("calculates advanced mode with g/kg", () => {
    const result = macrosEngine.calculateAdvanced?.({
      weight: 80,
      calories: 2200,
      proteinPerKg: 2,
      fatMinPerKg: 0.8,
      adjustCarbs: false,
    });

    expect(result).not.toBeNull();
    expect(result?.macroChart).toBeDefined();
    expect(result?.kpis?.[0].label).toBe("Proteína");
  });

  it("returns warning result when fixed macros exceed calories", () => {
    const result = macrosEngine.calculateAdvanced?.({
      weight: 80,
      calories: 1500,
      proteinPerKg: 2.5,
      fatMinPerKg: 1.5,
      adjustCarbs: false,
    });

    expect(result?.warnings).toBeDefined();
    expect(result?.warnings?.length).toBeGreaterThan(0);
  });

  it("requires trainingDays when adjustCarbs is true", () => {
    const result = macrosEngine.calculateAdvanced?.({
      weight: 80,
      calories: 2200,
      proteinPerKg: 2,
      fatMinPerKg: 0.8,
      adjustCarbs: true,
    });

    expect(result).toBeNull();
  });
});
