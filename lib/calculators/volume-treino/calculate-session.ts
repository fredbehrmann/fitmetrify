import { calculateVolume } from "./calculate-simple";
import {
  MUSCLE_GROUP_LABELS,
  SCHOENFELD_WEEKLY_SETS,
  type MuscleGroupId,
  type SessionExercise,
} from "./constants";

export type ExerciseVolumeRow = SessionExercise & {
  volumeKg: number;
};

export type MuscleGroupVolume = {
  muscleGroup: MuscleGroupId;
  label: string;
  sets: number;
  volumeKg: number;
  schoenfeldMin: number;
  schoenfeldOptimal: string;
};

export type SessionVolumeResult = {
  exercises: ExerciseVolumeRow[];
  totalVolumeKg: number;
  byMuscleGroup: MuscleGroupVolume[];
  warnings: string[];
};

export function calculateSessionVolume(
  exercises: SessionExercise[]
): SessionVolumeResult | null {
  if (exercises.length === 0) return null;

  const rows: ExerciseVolumeRow[] = exercises.map((exercise) => ({
    ...exercise,
    volumeKg: calculateVolume(exercise.sets, exercise.reps, exercise.loadKg),
  }));

  const totalVolumeKg = rows.reduce((sum, row) => sum + row.volumeKg, 0);

  const groupMap = new Map<MuscleGroupId, { sets: number; volumeKg: number }>();

  for (const row of rows) {
    const current = groupMap.get(row.muscleGroup) ?? { sets: 0, volumeKg: 0 };
    groupMap.set(row.muscleGroup, {
      sets: current.sets + row.sets,
      volumeKg: current.volumeKg + row.volumeKg,
    });
  }

  const byMuscleGroup: MuscleGroupVolume[] = Array.from(groupMap.entries()).map(
    ([muscleGroup, data]) => {
      const ref = SCHOENFELD_WEEKLY_SETS[muscleGroup];
      return {
        muscleGroup,
        label: MUSCLE_GROUP_LABELS[muscleGroup],
        sets: data.sets,
        volumeKg: data.volumeKg,
        schoenfeldMin: ref.min,
        schoenfeldOptimal: `${ref.optimalMin}–${ref.optimalMax}`,
      };
    }
  );

  const warnings: string[] = [];

  for (const group of byMuscleGroup) {
    if (group.sets < group.schoenfeldMin) {
      warnings.push(
        `${group.label}: ${group.sets} séries na sessão — referência semanal mínima de ${group.schoenfeldMin} séries (Schoenfeld, 2017).`
      );
    } else if (group.sets > group.schoenfeldMin * 2) {
      warnings.push(
        `${group.label}: volume alto para uma sessão (${group.sets} séries). Monitore recuperação.`
      );
    }
  }

  return {
    exercises: rows,
    totalVolumeKg,
    byMuscleGroup,
    warnings,
  };
}
