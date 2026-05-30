import { describe, expect, it } from "vitest";

import { paceVelocidadeEngine } from "../pace-velocidade-engine";

describe("paceVelocidadeEngine", () => {
  it("converts 6 min/km to 10 km/h", () => {
    const result = paceVelocidadeEngine.calculateSimple?.({
      inputMode: "pace",
      timeSeconds: 6 * 60,
    });

    expect(result?.primaryValue).toBe("10,0");
  });
});
