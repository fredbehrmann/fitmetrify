import { describe, expect, it } from "vitest";

import { calculateSessionVolume } from "../calculate-session";
import type { SessionExercise } from "../constants";

describe("calculateSessionVolume", () => {
  it("calculates total and per muscle group", () => {
    const exercises: SessionExercise[] = [
      {
        id: "1",
        name: "Supino",
        muscleGroup: "chest",
        sets: 4,
        reps: 10,
        loadKg: 60,
      },
      {
        id: "2",
        name: "Remada",
        muscleGroup: "back",
        sets: 4,
        reps: 10,
        loadKg: 50,
      },
      {
        id: "3",
        name: "Crucifixo",
        muscleGroup: "chest",
        sets: 3,
        reps: 12,
        loadKg: 20,
      },
    ];

    const result = calculateSessionVolume(exercises);

    expect(result?.totalVolumeKg).toBe(4 * 10 * 60 + 4 * 10 * 50 + 3 * 12 * 20);
    expect(result?.byMuscleGroup).toHaveLength(2);
    expect(result?.exercises).toHaveLength(3);
  });

  it("returns null for empty list", () => {
    expect(calculateSessionVolume([])).toBeNull();
  });
});
