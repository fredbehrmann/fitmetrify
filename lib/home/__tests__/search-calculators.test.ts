import { describe, expect, it } from "vitest";

import { calculators } from "@/lib/calculators/registry";
import { searchCalculators } from "../search-calculators";

describe("searchCalculators", () => {
  it("returns empty array for empty query", () => {
    expect(searchCalculators("", calculators)).toEqual([]);
    expect(searchCalculators("   ", calculators)).toEqual([]);
  });

  it("matches by title", () => {
    const results = searchCalculators("IMC", calculators);
    expect(results.some((c) => c.slug === "calculadora-imc")).toBe(true);
  });

  it("matches by category label", () => {
    const results = searchCalculators("corrida", calculators);
    expect(results.every((c) => c.category === "corrida")).toBe(true);
    expect(results.length).toBe(4);
  });

  it("returns empty array when no match", () => {
    expect(searchCalculators("xyzinexistente", calculators)).toEqual([]);
  });

  it("ignores accents in query", () => {
    const results = searchCalculators("proteina", calculators);
    expect(results.some((c) => c.slug === "calculadora-proteina")).toBe(true);
  });
});
