"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { RACE_DISTANCES_KM } from "@/lib/calculators/pace/pace-target-table";

type DistancePresetButtonsProps = {
  fields: Array<{ name: string; km: number; label: string }>;
};

export function DistancePresetButtons({ fields }: DistancePresetButtonsProps) {
  const form = useFormContext<Record<string, unknown>>();

  return (
    <div className="flex flex-wrap gap-2">
      {fields.map((field) => (
        <Button
          key={`${field.name}-${field.km}`}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => form.setValue(field.name, field.km)}
        >
          {field.label}
        </Button>
      ))}
    </div>
  );
}

export function PrevisorDistancePresets() {
  const presets = RACE_DISTANCES_KM.flatMap((race) => [
    { name: "knownDistance", km: race.km, label: `${race.label} ref.` },
    { name: "targetDistance", km: race.km, label: `${race.label} alvo` },
  ]);

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs">Presets de distância</p>
      <DistancePresetButtons fields={presets} />
    </div>
  );
}
