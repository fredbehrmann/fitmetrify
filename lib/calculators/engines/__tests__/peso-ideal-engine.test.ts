import { describe, expect, it } from "vitest";

import { pesoIdealEngine } from "../peso-ideal-engine";

describe("pesoIdealEngine", () => {
  it("calculates simple result for 175 cm male", () => {
    const result = pesoIdealEngine.calculateSimple!({
      height: 175,
      sex: "male",
    });

    expect(result).not.toBeNull();
    expect(result!.primaryLabel).toBe("Peso central estimado");
    expect(result!.classification?.label).toBe("Faixa de peso saudável");
    expect(result!.kpis).toHaveLength(5);
    expect(result!.interpretation).toContain("faixa de peso saudável");
  });

  it("calculates advanced result with current weight above range", () => {
    const result = pesoIdealEngine.calculateAdvanced!({
      height: 175,
      sex: "male",
      weight: 90,
      biotype: "mesomorph",
    });

    expect(result).not.toBeNull();
    expect(result!.classification?.variant).toBe("warning");
    expect(result!.warnings?.length).toBeGreaterThan(0);
  });
});
