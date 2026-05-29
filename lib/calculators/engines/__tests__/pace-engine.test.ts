import { describe, expect, it } from "vitest";

import { paceEngine } from "../pace-engine";

describe("paceEngine", () => {
  it("calculates pace for 10 km in 50 min", () => {
    const result = paceEngine.calculateSimple?.({
      distance: 10,
      timeMinutes: 50,
    });

    expect(result?.primaryValue).toBe("5:00");
    expect(result?.kpis?.[0].value).toBe("12,0");
  });
});
