"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TimeInputProps = {
  value: number;
  onChange: (seconds: number) => void;
  className?: string;
  describedById?: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function TimeInput({
  value,
  onChange,
  className,
  describedById,
}: TimeInputProps) {
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  const h = Math.floor(safeValue / 3600);
  const m = Math.floor((safeValue % 3600) / 60);
  const s = safeValue % 60;

  const update = (hh: number, mm: number, ss: number) => {
    onChange(hh * 3600 + mm * 60 + ss);
  };

  const inputClassName =
    "min-h-11 min-w-11 w-16 text-center tabular-nums";

  return (
    <fieldset
      className={cn("flex flex-wrap items-center gap-2 border-0 p-0", className)}
      aria-describedby={describedById}
    >
      <legend className="sr-only">Tempo total</legend>
      <Input
        type="number"
        min={0}
        max={99}
        value={h}
        placeholder="00"
        aria-label="Horas"
        className={inputClassName}
        onChange={(event) => {
          const next = clamp(Number(event.target.value) || 0, 0, 99);
          update(next, m, s);
        }}
      />
      <span className="text-muted-foreground text-sm" aria-hidden="true">
        h
      </span>
      <Input
        type="number"
        min={0}
        max={59}
        value={m}
        placeholder="00"
        aria-label="Minutos"
        className={inputClassName}
        onChange={(event) => {
          const next = clamp(Number(event.target.value) || 0, 0, 59);
          update(h, next, s);
        }}
      />
      <span className="text-muted-foreground text-sm" aria-hidden="true">
        min
      </span>
      <Input
        type="number"
        min={0}
        max={59}
        value={s}
        placeholder="00"
        aria-label="Segundos"
        className={inputClassName}
        onChange={(event) => {
          const next = clamp(Number(event.target.value) || 0, 0, 59);
          update(h, m, next);
        }}
      />
      <span className="text-muted-foreground text-sm" aria-hidden="true">
        seg
      </span>
    </fieldset>
  );
}
