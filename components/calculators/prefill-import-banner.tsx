"use client";

import { CheckCircle2 } from "lucide-react";

import type { PrefillImportItem } from "@/lib/calc-context/types";

type PrefillImportBannerProps = {
  items: PrefillImportItem[];
};

export function PrefillImportBanner({ items }: PrefillImportBannerProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-100">
      <p className="mb-2 font-medium">Dados importados da jornada anterior</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-blue-300" />
            <span>
              {item.label}: {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
