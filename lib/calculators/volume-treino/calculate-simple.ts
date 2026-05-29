export type VolumeResult = {
  exercise: string;
  sets: number;
  reps: number;
  loadKg: number;
  volumeKg: number;
};

export function calculateVolume(
  sets: number,
  reps: number,
  loadKg: number
): number {
  return sets * reps * loadKg;
}

export function calculateSimpleVolume(
  exercise: string,
  sets: number,
  reps: number,
  loadKg: number
): VolumeResult {
  return {
    exercise: exercise.trim() || "Exercício",
    sets,
    reps,
    loadKg,
    volumeKg: calculateVolume(sets, reps, loadKg),
  };
}
