import { describe, expect, it } from "vitest";

import { oneRepMaxEngine } from "../one-rep-max-engine";

describe("oneRepMaxEngine", () => {
  it("calculates simple Brzycki 1RM", () => {
    const result = oneRepMaxEngine.calculateSimple?.({ load: 80, reps: 8 });

    expect(result?.primaryValue).toBe("99,3");
    expect(result?.classification?.label).toContain("Brzycki");
  });

  it("calculates advanced with average primary", () => {
    const result = oneRepMaxEngine.calculateAdvanced?.({
      load: 80,
      reps: 8,
      method: "epley",
    });

    expect(result?.primaryLabel).toBe("1RM (média)");
    expect(result?.kpis?.length).toBeGreaterThan(4);
  });
});
