import { describe, expect, it, beforeEach } from "vitest";

import { useCalcStore, resetCalcStore } from "../store";

describe("useCalcStore", () => {
  beforeEach(() => {
    resetCalcStore();
  });

  it("updates partial state", () => {
    useCalcStore.getState().update({ weight: 80, tmb: 1780 });
    expect(useCalcStore.getState().state.weight).toBe(80);
    expect(useCalcStore.getState().state.tmb).toBe(1780);
  });

  it("merges updates without losing previous fields", () => {
    useCalcStore.getState().update({ weight: 75 });
    useCalcStore.getState().update({ tmb: 1700 });
    expect(useCalcStore.getState().state).toEqual({ weight: 75, tmb: 1700 });
  });

  it("resets state", () => {
    useCalcStore.getState().update({ get: 2200 });
    resetCalcStore();
    expect(useCalcStore.getState().state).toEqual({});
  });
});
