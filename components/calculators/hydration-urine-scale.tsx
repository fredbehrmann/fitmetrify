"use client";

import { cn } from "@/lib/utils";

const URINE_SCALE = [
  {
    color: "#fef9c3",
    label: "Amarelo claro",
    status: "Bem hidratado",
  },
  {
    color: "#fde047",
    label: "Amarelo",
    status: "Hidratação adequada",
  },
  {
    color: "#facc15",
    label: "Amarelo escuro",
    status: "Beba mais água",
  },
  {
    color: "#f59e0b",
    label: "Âmbar",
    status: "Desidratação leve",
  },
  {
    color: "#d97706",
    label: "Âmbar escuro",
    status: "Desidratação — hidrate-se",
  },
] as const;

export function HydrationUrineScale() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Referência: cor da urina</p>
      <div className="grid gap-2 sm:grid-cols-5">
        {URINE_SCALE.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
          >
            <div
              className={cn("mx-auto mb-2 size-8 rounded-full border border-white/20")}
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-muted-foreground mt-1 text-[10px] leading-tight">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
