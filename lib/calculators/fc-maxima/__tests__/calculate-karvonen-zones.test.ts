import { describe, expect, it } from "vitest";

import { calculateKarvonenZones } from "../calculate-karvonen-zones";

describe("calculateKarvonenZones", () => {
  it("calculates zone 2 around 138-152 bpm for max 190 and rest 60", () => {
    const zones = calculateKarvonenZones(190, 60);
    const zone2 = zones.find((zone) => zone.id === 2);

    expect(zone2).toBeDefined();
    expect(zone2!.minBpm).toBe(138);
    expect(zone2!.maxBpm).toBe(151);
  });

  it("returns five zones", () => {
    expect(calculateKarvonenZones(190, 60)).toHaveLength(5);
  });
});
