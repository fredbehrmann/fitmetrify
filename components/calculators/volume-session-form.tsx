"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { PrefillImportBanner } from "@/components/calculators/prefill-import-banner";
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
import { trackEvent } from "@/lib/analytics";
import { useCalcStore } from "@/lib/calc-context/store";
import { getVolumeTreinoPrefillSuggestion } from "@/lib/calculators/prefill-from-context";
import {
  MUSCLE_GROUP_OPTIONS,
  type MuscleGroupId,
  type SessionExercise,
} from "@/lib/calculators/volume-treino/constants";

type VolumeSessionFormProps = {
  calcSlug: string;
  onSubmit: (values: Record<string, unknown>) => void;
};

function createEmptyExercise(
  overrides?: Partial<SessionExercise>
): SessionExercise {
  return {
    id: crypto.randomUUID(),
    name: "",
    muscleGroup: "chest",
    sets: 3,
    reps: 10,
    loadKg: 20,
    ...overrides,
  };
}

export function VolumeSessionForm({
  calcSlug,
  onSubmit,
}: VolumeSessionFormProps) {
  const calcState = useCalcStore((store) => store.state);
  const hasTrackedStart = useRef(false);
  const suggestion = useMemo(
    () => getVolumeTreinoPrefillSuggestion(calcState),
    [calcState]
  );

  const [exercises, setExercises] = useState<SessionExercise[]>(() => [
    createEmptyExercise(
      suggestion
        ? {
            name: suggestion.exerciseLabel ?? "",
            loadKg: suggestion.suggestedLoadKg ?? 20,
          }
        : undefined
    ),
  ]);
  const [prefillApplied, setPrefillApplied] = useState(false);

  useEffect(() => {
    if (prefillApplied || !suggestion) return;

    setExercises((current) => {
      const first = current[0];
      if (!first || first.name.trim()) return current;

      return [
        {
          ...first,
          name: suggestion.exerciseLabel ?? first.name,
          loadKg: suggestion.suggestedLoadKg ?? first.loadKg,
        },
        ...current.slice(1),
      ];
    });
    setPrefillApplied(true);
  }, [prefillApplied, suggestion]);

  const importItems = useMemo(() => {
    if (!suggestion?.oneRepMax) return [];

    const items = [
      {
        label: "1RM estimado",
        value: `${suggestion.oneRepMax} kg`,
      },
    ];

    if (suggestion.suggestedLoadKg !== undefined) {
      items.push({
        label: "Carga sugerida (~70%)",
        value: `${suggestion.suggestedLoadKg} kg`,
      });
    }

    if (suggestion.exerciseLabel) {
      items.push({
        label: "Exercício",
        value: suggestion.exerciseLabel,
      });
    }

    return items;
  }, [suggestion]);

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

  const handleFirstInteraction = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("calc_started", { calc_slug: calcSlug });
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
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFirstInteraction}
      className="space-y-6"
    >
      <PrefillImportBanner items={importItems} />

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
