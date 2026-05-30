import { describe, expect, it } from "vitest";

import { caloriasRefeicaoEngine } from "../calorias-refeicao-engine";

describe("caloriasRefeicaoEngine", () => {
  it("calculates simple 2000 kcal / 4 meals", () => {
    const result = caloriasRefeicaoEngine.calculateSimple!({
      calories: 2000,
      mealCount: "4",
    });

    expect(result).not.toBeNull();
    expect(result!.primaryValue).toBe("500");
    expect(result!.kpis).toHaveLength(4);
  });

  it("calculates advanced fasting 16:8", () => {
    const result = caloriasRefeicaoEngine.calculateAdvanced!({
      calories: 2000,
      mealCount: "3",
      trainingTime: "evening",
      mealProtocol: "fasting-16-8",
      mainMeal: "dinner",
    });

    expect(result).not.toBeNull();
    expect(result!.classification?.label).toBe("Jejum 16:8");
    expect(result!.kpis).toHaveLength(3);
  });
});
