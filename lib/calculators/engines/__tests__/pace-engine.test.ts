import { describe, expect, it } from "vitest";

import { paceEngine } from "../pace-engine";

describe("paceEngine", () => {
  it("calculates pace for 10 km in 50 min", () => {
    const result = paceEngine.calculateSimple?.({
      distance: 10,
      timeSeconds: 50 * 60,
    });

    expect(result?.primaryValue).toBe("5:00");
    expect(result?.kpis?.[0].value).toBe("12,0");
  });

  it("uses Karvonen zones when max and resting heart rate are provided", () => {
    const result = paceEngine.calculateAdvanced?.({
      distance: 10,
      timeSeconds: 50 * 60,
      maxHeartRate: 190,
      restingHeartRate: 60,
    });

    const zoneKpi = result?.kpis?.find((kpi) =>
      kpi.label.includes("Zona 2")
    );

    expect(zoneKpi?.value).toBe("138–151");
  });

  it("does not estimate heart rate without max heart rate", () => {
    const result = paceEngine.calculateAdvanced?.({
      distance: 10,
      timeSeconds: 50 * 60,
      age: 30,
    });

    const hrKpi = result?.kpis?.find((kpi) => kpi.unit === "bpm");
    expect(hrKpi).toBeUndefined();
  });
});
