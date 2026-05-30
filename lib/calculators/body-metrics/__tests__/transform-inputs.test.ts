import { describe, expect, it } from "vitest";

import { transformBodyMetricInputs } from "../transform-inputs";

describe("transformBodyMetricInputs", () => {
  it("converts imperial weight and height to metric", () => {
    const result = transformBodyMetricInputs(
      {
        weightLb: 165,
        heightFt: 5,
        heightIn: 9,
      },
      "imperial"
    );

    expect(result.weight).toBeCloseTo(74.84, 1);
    expect(result.height).toBeCloseTo(175.26, 1);
  });

  it("converts imperial circumferences to centimeters", () => {
    const result = transformBodyMetricInputs(
      {
        waistIn: 33,
        neckIn: 15,
        hipIn: 39,
      },
      "imperial"
    );

    expect(result.waist).toBeCloseTo(83.82, 1);
    expect(result.neck).toBeCloseTo(38.1, 1);
    expect(result.hip).toBeCloseTo(99.06, 1);
  });

  it("converts inline TMB imperial fields", () => {
    const result = transformBodyMetricInputs(
      {
        inlineWeightLb: 180,
        inlineHeightFt: 6,
        inlineHeightIn: 0,
      },
      "imperial"
    );

    expect(result.inlineWeight).toBeCloseTo(81.65, 1);
    expect(result.inlineHeight).toBeCloseTo(182.88, 1);
  });

  it("returns metric values unchanged", () => {
    const values = { weight: 80, height: 180 };
    expect(transformBodyMetricInputs(values, "metric")).toEqual(values);
  });
});
