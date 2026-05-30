import { describe, expect, it } from "vitest";

import { percentualGorduraEngine } from "../percentual-gordura-engine";

describe("percentualGorduraEngine", () => {
  it("calculates US Navy simple mode for male", () => {
    const result = percentualGorduraEngine.calculateSimple?.({
      sex: "male",
      height: 180,
      weight: 80,
      waist: 85,
      neck: 38,
    });

    expect(result).not.toBeNull();
    expect(result!.primaryUnit).toBe("%");
    expect(result!.actions?.[0]?.href).toBe("/calculadora-tmb");
    expect(result!.actions?.[0]?.params?.leanMass).toBeDefined();
  });

  it("requires hip for female simple mode", () => {
    expect(
      percentualGorduraEngine.calculateSimple?.({
        sex: "female",
        height: 165,
        weight: 62,
        waist: 72,
        neck: 32,
      })
    ).toBeNull();
  });

  it("calculates Jackson-Pollock advanced mode", () => {
    const result = percentualGorduraEngine.calculateAdvanced?.({
      sex: "male",
      age: 30,
      weight: 80,
      chestSkinfold: 10,
      abdomenSkinfold: 18,
      thighSkinfold: 14,
    });

    expect(result).not.toBeNull();
    expect(result!.classification?.label).toBeDefined();
  });
});
