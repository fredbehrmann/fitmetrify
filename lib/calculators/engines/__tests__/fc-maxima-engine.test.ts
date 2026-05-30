import { describe, expect, it } from "vitest";

import { fcMaximaEngine } from "../fc-maxima-engine";

describe("fcMaximaEngine", () => {
  it("calculates Tanaka simple mode for age 30", () => {
    const result = fcMaximaEngine.calculateSimple?.({
      age: 30,
      formula: "tanaka",
    });

    expect(result?.primaryValue).toBe("187");
    expect(result?.heartRateZones).toHaveLength(5);
    expect(result?.actions?.[0]?.href).toBe("/calculadora-pace");
  });

  it("calculates advanced mode with Karvonen zones", () => {
    const result = fcMaximaEngine.calculateAdvanced?.({
      age: 30,
      formula: "tanaka",
      restingHeartRate: 60,
      trainingGoal: "aerobic",
    });

    expect(result?.primaryValue).toBe("187");
    const zone2 = result?.heartRateZones?.find((zone) => zone.id === 2);
    expect(zone2?.minBpm).toBe(136);
    expect(result?.actions?.[0]?.params?.restingHeartRate).toBe(60);
  });
});
