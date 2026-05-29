import { describe, expect, it } from "vitest";

import { previsorTempoEngine } from "../previsor-tempo-engine";

describe("previsorTempoEngine", () => {
  it("predicts time with Riegel simple mode", () => {
    const result = previsorTempoEngine.calculateSimple?.({
      knownDistance: 10,
      knownTime: 50,
      targetDistance: 21.1,
    });

    expect(result).not.toBeNull();
    expect(result?.classification?.label).toBe("Previsão Riegel");
  });

  it("returns advanced bands", () => {
    const result = previsorTempoEngine.calculateAdvanced?.({
      knownDistance: 10,
      knownTime: 50,
      targetDistance: 21.1,
      experience: "intermediate",
      elevation: 150,
      temperature: 28,
    });

    expect(result?.classification?.label).toBe("Previsão de prova");
    expect(result?.kpis?.length).toBeGreaterThanOrEqual(4);
  });
});
