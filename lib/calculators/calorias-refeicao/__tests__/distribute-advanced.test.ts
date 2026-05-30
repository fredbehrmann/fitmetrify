import { describe, expect, it } from "vitest";

import { MEAL_PROTOCOL_OPTIONS } from "../../options";
import {
  distributeAdvanced,
  sumPercentages,
} from "../distribute-advanced";
import { distributeSimple } from "../distribute-simple";

describe("distribute-advanced", () => {
  for (const { value: protocol } of MEAL_PROTOCOL_OPTIONS) {
    it(`${protocol} percentages sum to 100%`, () => {
      const result = distributeAdvanced(2000, 4, protocol, {
        trainingTime: "afternoon",
        mainMeal: "lunch",
      });

      const total = sumPercentages(result.meals.map((meal) => meal.percent));
      expect(total).toBeCloseTo(100, 5);
    });
  }

  it("fasting 16:8 with 3 meals uses 25/40/35 split", () => {
    const result = distributeAdvanced(2000, 3, "fasting-16-8", {
      trainingTime: "none",
      mainMeal: "lunch",
    });

    expect(result.meals[0]?.percent).toBeCloseTo(25, 5);
    expect(result.meals[1]?.percent).toBeCloseTo(40, 5);
    expect(result.meals[2]?.percent).toBeCloseTo(35, 5);
    expect(result.meals[1]?.calories).toBeCloseTo(800, 0);
  });
});

describe("distribute-simple", () => {
  it("splits 2000 kcal across 4 meals equally", () => {
    const result = distributeSimple(2000, 4);
    expect(result.averageCalories).toBe(500);
    expect(result.meals).toHaveLength(4);
    expect(result.meals.every((meal) => meal.calories === 500)).toBe(true);
  });
});
