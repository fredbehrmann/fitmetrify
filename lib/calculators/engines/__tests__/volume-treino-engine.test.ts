import { describe, expect, it } from "vitest";

import { volumeTreinoEngine } from "../volume-treino-engine";

describe("volumeTreinoEngine", () => {
  it("calculates volume for 4x10x32", () => {
    const result = volumeTreinoEngine.calculateSimple?.({
      exercise: "Supino",
      sets: 4,
      reps: 10,
      load: 32,
    });

    expect(result?.primaryValue).toBe("1.280");
  });
});
