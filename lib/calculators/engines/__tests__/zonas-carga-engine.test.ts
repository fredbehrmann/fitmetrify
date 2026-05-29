import { describe, expect, it } from "vitest";

import { zonasCargaEngine } from "../zonas-carga-engine";

describe("zonasCargaEngine", () => {
  it("calculates zones from 1RM", () => {
    const result = zonasCargaEngine.calculateSimple?.({ oneRepMax: 100 });

    expect(result?.primaryValue).toBe("100");
    expect(result?.kpis).toHaveLength(4);
  });

  it("returns null without inputs", () => {
    expect(zonasCargaEngine.calculateSimple?.({})).toBeNull();
  });
});
