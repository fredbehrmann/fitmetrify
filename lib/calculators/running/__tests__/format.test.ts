import { describe, expect, it } from "vitest";

import {
  formatDurationMinutes,
  formatPaceMinutesPerKm,
  formatSpeedKmh,
} from "../format";

describe("running format", () => {
  it("formats pace as mm:ss", () => {
    expect(formatPaceMinutesPerKm(5)).toBe("5:00");
    expect(formatPaceMinutesPerKm(5.5)).toBe("5:30");
  });

  it("formats duration under one hour", () => {
    expect(formatDurationMinutes(50)).toBe("50:00");
    expect(formatDurationMinutes(111.5)).toBe("1:51:30");
  });

  it("formats duration with hours", () => {
    expect(formatDurationMinutes(125)).toBe("2:05:00");
  });

  it("formats speed", () => {
    expect(formatSpeedKmh(12)).toBe("12,0");
  });
});
