import { describe, expect, it } from "vitest";

import { getAllCalculatorSlugs } from "../../registry";
import {
  getRelatedSlugsForCalculator,
  PRIMARY_CROSS_LINKS,
} from "../cross-links";

describe("cross-links", () => {
  it("maps spec primary links to valid calculator slugs", () => {
    const allSlugs = getAllCalculatorSlugs();

    for (const target of Object.values(PRIMARY_CROSS_LINKS)) {
      expect(allSlugs).toContain(target);
    }
  });

  it("puts primary cross link first for IMC", () => {
    const slugs = getRelatedSlugsForCalculator("calculadora-imc");

    expect(slugs[0]).toBe("calculadora-tmb");
  });

  it("puts previsor first for pace", () => {
    const slugs = getRelatedSlugsForCalculator("calculadora-pace");

    expect(slugs[0]).toBe("calculadora-previsor-tempo");
  });
});
