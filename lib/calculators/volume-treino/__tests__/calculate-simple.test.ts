import { describe, expect, it } from "vitest";

import { calculateSimpleVolume } from "../calculate-simple";

describe("calculateSimpleVolume", () => {
  it("calculates 4x10x32 as 1280 kg", () => {
    const result = calculateSimpleVolume("Supino reto", 4, 10, 32);

    expect(result.volumeKg).toBe(1280);
  });
});
