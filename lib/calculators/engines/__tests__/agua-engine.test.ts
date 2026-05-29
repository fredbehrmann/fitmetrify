import { describe, expect, it } from "vitest";

import { aguaEngine } from "../agua-engine";

describe("aguaEngine", () => {
  it("calculates simple mode for 70 kg", () => {
    const result = aguaEngine.calculateSimple?.({ weight: 70 });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("2,5");
    expect(result?.kpis?.[0].value).toBe("10");
  });

  it("returns null when weight is missing", () => {
    expect(aguaEngine.calculateSimple?.({})).toBeNull();
  });

  it("calculates advanced mode with adjustments", () => {
    const result = aguaEngine.calculateAdvanced?.({
      weight: 80,
      workoutTime: 1,
      hotClimate: true,
      highCaffeine: true,
      exerciseType: "cardio",
    });

    expect(result).not.toBeNull();
    expect(result?.classification?.label).toBe("Hidratação personalizada");
    expect(result?.kpis?.length).toBeGreaterThan(3);
    expect(result?.interpretation).toContain("corrida");
  });

  it("returns null when advanced weight is missing", () => {
    expect(
      aguaEngine.calculateAdvanced?.({ workoutTime: 1 })
    ).toBeNull();
  });
});
