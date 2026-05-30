"use client";

import { cn } from "@/lib/utils";
import type { UnitSystem } from "@/lib/conversions";

type UnitToggleProps = {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
  className?: string;
};

export function UnitToggle({ value, onChange, className }: UnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Sistema de medidas"
      className={cn(
        "inline-flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1",
        className
      )}
    >
      {(
        [
          { id: "metric" as const, label: "kg / cm" },
          { id: "imperial" as const, label: "lb / ft" },
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
