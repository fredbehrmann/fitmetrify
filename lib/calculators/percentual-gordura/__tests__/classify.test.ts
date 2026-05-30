import { describe, expect, it } from "vitest";

import {
  buildBodyFatClassification,
  classifyBodyFat,
} from "../classify";

describe("classifyBodyFat", () => {
  it("classifies male 30 years at 15% as good form", () => {
    expect(classifyBodyFat(15, "male", 30)).toBe("good");
    expect(buildBodyFatClassification(15, "male", 30).label).toBe("Boa forma");
  });

  it("classifies athletic range below threshold", () => {
    expect(classifyBodyFat(7, "male", 25)).toBe("athletic");
  });

  it("classifies obese above overfat threshold", () => {
    expect(classifyBodyFat(30, "male", 30)).toBe("obese");
  });

  it("uses 40-59 age band thresholds", () => {
    expect(classifyBodyFat(16, "male", 45)).toBe("good");
    expect(classifyBodyFat(18, "male", 35)).toBe("acceptable");
  });

  it("classifies female with different thresholds", () => {
    expect(classifyBodyFat(25, "female", 30)).toBe("good");
    expect(classifyBodyFat(30, "female", 30)).toBe("acceptable");
  });
});
