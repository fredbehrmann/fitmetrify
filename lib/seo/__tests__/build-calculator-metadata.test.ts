import { describe, expect, it } from "vitest";

import { buildCalculatorMetadata } from "../build-calculator-metadata";
import { imcCalculator } from "@/lib/calculators/imc";

describe("buildCalculatorMetadata", () => {
  it("includes twitter url matching canonical", () => {
    const metadata = buildCalculatorMetadata(imcCalculator);
    const canonical = metadata.alternates?.canonical;

    expect(metadata.other?.["twitter:url"]).toBe(canonical);
    expect(metadata.openGraph?.url).toBe(canonical);
  });
});
