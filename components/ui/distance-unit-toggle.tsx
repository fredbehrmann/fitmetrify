"use client";

import { cn } from "@/lib/utils";
import type { DistanceUnit } from "@/lib/conversions";

type DistanceUnitToggleProps = {
  value: DistanceUnit;
  onChange: (value: DistanceUnit) => void;
  className?: string;
};

export function DistanceUnitToggle({
  value,
  onChange,
  className,
}: DistanceUnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Unidade de distância"
      className={cn(
        "inline-flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1",
        className
      )}
    >
      {(
        [
          { id: "km" as const, label: "km" },
          { id: "miles" as const, label: "milhas" },
        ] as const
      ).map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "min-h-11 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            value === option.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
