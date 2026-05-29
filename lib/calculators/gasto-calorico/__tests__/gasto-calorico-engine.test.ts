import { describe, expect, it } from "vitest";

import { gastoCaloricoEngine } from "../../engines/gasto-calorico-engine";

describe("gastoCaloricoEngine", () => {
  it("calculateSimple returns GET with KPIs", () => {
    const result = gastoCaloricoEngine.calculateSimple?.({
      tmb: 1800,
      activityLevel: "sedentary",
    });

    expect(result).not.toBeNull();
    expect(result?.primaryValue).toBe("2.160");
    expect(result?.primaryLabel).toBe("Gasto calórico diário");
    expect(result?.kpis?.some((k) => k.label === "Calorias para emagrecimento")).toBe(
      true
    );
    expect(result?.kpis?.some((k) => k.label === "Faixa recomendada")).toBe(true);
  });

  it("calculateSimple returns null without required fields", () => {
    expect(
      gastoCaloricoEngine.calculateSimple?.({ tmb: 1800 })
    ).toBeNull();
  });

  it("calculateAdvanced uses estimated factor and goal in interpretation", () => {
    const result = gastoCaloricoEngine.calculateAdvanced?.({
      tmb: 1800,
      strengthDays: 4,
      cardioDays: 2,
      workoutDuration: 60,
      workType: "standing",
      goal: "lose",
    });

    expect(result).not.toBeNull();
    expect(result?.interpretation).toContain("emagrecer");
    expect(result?.kpis?.[0]?.label).toBe("Fator de atividade");
  });

  it("calculateAdvanced highlights gain goal", () => {
    const result = gastoCaloricoEngine.calculateAdvanced?.({
      tmb: 2000,
      strengthDays: 3,
      cardioDays: 1,
      workoutDuration: 45,
      workType: "sedentary",
      goal: "gain",
    });

    expect(result?.interpretation).toContain("ganho de massa");
  });

  it("calculateAdvanced returns null when fields missing", () => {
    expect(
      gastoCaloricoEngine.calculateAdvanced?.({
        tmb: 1800,
        strengthDays: 4,
      })
    ).toBeNull();
  });
});
