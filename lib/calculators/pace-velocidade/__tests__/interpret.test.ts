import { describe, expect, it } from "vitest";

import { calculateSpeedFromPace } from "../calculate-simple";
import { buildKpis, buildInterpretation } from "../interpret";

describe("pace-velocidade interpret", () => {
  it("shows pace and speed in metric and imperial units", () => {
    const result = calculateSpeedFromPace(5);

    const kpis = buildKpis(result);
    expect(kpis).toHaveLength(4);
    expect(kpis[0]?.unit).toBe("min/km");
    expect(kpis[1]?.unit).toBe("min/mi");
    expect(kpis[2]?.unit).toBe("km/h");
    expect(kpis[3]?.unit).toBe("mph");

    const interpretation = buildInterpretation(result);
    expect(interpretation).toContain("min/km");
    expect(interpretation).toContain("min/mi");
    expect(interpretation).toContain("km/h");
    expect(interpretation).toContain("mph");
  });
});
