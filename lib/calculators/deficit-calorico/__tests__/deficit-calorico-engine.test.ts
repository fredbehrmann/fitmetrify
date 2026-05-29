import { describe, expect, it } from "vitest";

import { deficitCaloricoEngine } from "../../engines/deficit-calorico-engine";

describe("deficitCaloricoEngine", () => {
  it("calculateSimple returns full result for moderate strategy", () => {
    const result = deficitCaloricoEngine.calculateSimple?.({
      dailyExpenditure: 2200,
      strategy: "moderate",
    });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("1.760");
    expect(result?.kpis?.some((k) => k.label === "Déficit diário")).toBe(true);
    expect(result?.nextSteps?.length).toBeGreaterThan(0);
  });

  it("calculateSimple sets classification for aggressive strategy", () => {
    const result = deficitCaloricoEngine.calculateSimple?.({
      dailyExpenditure: 2000,
      strategy: "aggressive",
    });

    expect(result?.classification?.label).toBe("Déficit agressivo");
  });

  it("calculateAdvanced includes warnings for aggressive timeline", () => {
    const result = deficitCaloricoEngine.calculateAdvanced?.({
      dailyExpenditure: 2500,
      currentWeight: 90,
      targetWeight: 80,
      deadline: 10,
      sex: "male",
      trainingLevel: "active",
    });

    expect(result?.warnings?.length).toBeGreaterThan(0);
    expect(result?.kpis?.some((k) => k.label === "Prazo realista (20%)")).toBe(
      true
    );
  });

  it("calculateAdvanced returns null for invalid weight goal", () => {
    expect(
      deficitCaloricoEngine.calculateAdvanced?.({
        dailyExpenditure: 2500,
        currentWeight: 80,
        targetWeight: 85,
        deadline: 10,
        sex: "female",
        trainingLevel: "sedentary",
      })
    ).toBeNull();
  });
});
