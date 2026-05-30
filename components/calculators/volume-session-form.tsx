"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MUSCLE_GROUP_OPTIONS,
  type MuscleGroupId,
  type SessionExercise,
} from "@/lib/calculators/volume-treino/constants";

type VolumeSessionFormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
};

function createEmptyExercise(): SessionExercise {
  return {
    id: crypto.randomUUID(),
    name: "",
    muscleGroup: "chest",
    sets: 3,
    reps: 10,
    loadKg: 20,
  };
}

export function VolumeSessionForm({ onSubmit }: VolumeSessionFormProps) {
  const [exercises, setExercises] = useState<SessionExercise[]>([
    createEmptyExercise(),
  ]);

  const updateExercise = (
    id: string,
    patch: Partial<SessionExercise>
  ): void => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === id ? { ...exercise, ...patch } : exercise
      )
    );
  };

  const removeExercise = (id: string): void => {
    setExercises((current) =>
      current.length <= 1 ? current : current.filter((e) => e.id !== id)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const valid = exercises.filter(
      (exercise) =>
        exercise.name.trim() &&
        exercise.sets > 0 &&
        exercise.reps > 0 &&
        exercise.loadKg > 0
    );
    onSubmit({ exercises: valid });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {exercises.map((exercise, index) => (
        <div
          key={exercise.id}
          className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium">Exercício {index + 1}</p>
            {exercises.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExercise(exercise.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`name-${exercise.id}`}>Nome</Label>
            <Input
              id={`name-${exercise.id}`}
              value={exercise.name}
              placeholder="Ex: Supino reto"
              onChange={(event) =>
                updateExercise(exercise.id, { name: event.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Grupo muscular</Label>
            <Select
              value={exercise.muscleGroup}
              onValueChange={(value) =>
                updateExercise(exercise.id, {
                  muscleGroup: value as MuscleGroupId,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MUSCLE_GROUP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`sets-${exercise.id}`}>Séries</Label>
              <Input
                id={`sets-${exercise.id}`}
                type="number"
                min={1}
                value={exercise.sets}
                onChange={(event) =>
                  updateExercise(exercise.id, {
                    sets: Number(event.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`reps-${exercise.id}`}>Repetições</Label>
              <Input
                id={`reps-${exercise.id}`}
                type="number"
                min={1}
                value={exercise.reps}
                onChange={(event) =>
                  updateExercise(exercise.id, {
                    reps: Number(event.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`load-${exercise.id}`}>Carga (kg)</Label>
              <Input
                id={`load-${exercise.id}`}
                type="number"
                min={0.5}
                step={0.5}
                value={exercise.loadKg}
                onChange={(event) =>
                  updateExercise(exercise.id, {
                    loadKg: Number(event.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => setExercises((current) => [...current, createEmptyExercise()])}
      >
        <Plus className="size-4" />
        Adicionar exercício
      </Button>

      <Button type="submit" size="lg">
        Calcular volume da sessão
      </Button>
    </form>
  );
}
