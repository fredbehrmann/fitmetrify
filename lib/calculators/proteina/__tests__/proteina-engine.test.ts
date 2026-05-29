import { describe, expect, it } from "vitest";

import { proteinaEngine } from "../../engines/proteina-engine";

describe("proteinaEngine", () => {
  it("calculateSimple returns protein range", () => {
    const result = proteinaEngine.calculateSimple?.({
      weight: 75,
      goal: "general",
    });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("75");
    expect(result?.kpis?.some((k) => k.label === "Proteína mínima")).toBe(true);
    expect(result?.interpretation).toContain("25–40 g");
  });

  it("calculateSimple returns null without weight", () => {
    expect(proteinaEngine.calculateSimple?.({ goal: "general" })).toBeNull();
  });

  it("calculateAdvanced includes meal distribution KPIs", () => {
    const result = proteinaEngine.calculateAdvanced?.({
      weight: 80,
      goal: "hypertrophy",
      leanMass: 64,
      trainingType: "strength",
      weeklyFrequency: 4,
    });

    expect(result?.kpis?.some((k) => k.label === "Por refeição")).toBe(true);
    expect(result?.interpretation).toContain("4 refeições");
  });

  it("calculateAdvanced adds diet preference note for vegan", () => {
    const result = proteinaEngine.calculateAdvanced?.({
      weight: 70,
      goal: "athlete",
      trainingType: "mixed",
      weeklyFrequency: 5,
      dietPreference: "vegan",
    });

    expect(result?.warnings?.some((w) => w.includes("vegano"))).toBe(true);
  });
});
