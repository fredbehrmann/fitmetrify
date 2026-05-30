"use client";

import type { CalculatorResult } from "@/lib/calculators/engines/types";

type HeartRateZonesTableProps = {
  zones: NonNullable<CalculatorResult["heartRateZones"]>;
};

export function HeartRateZonesTable({ zones }: HeartRateZonesTableProps) {
  if (zones.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Zona</th>
            <th className="px-4 py-3 font-medium">% reserva</th>
            <th className="px-4 py-3 font-medium">FC (bpm)</th>
            <th className="px-4 py-3 font-medium">Benefício</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.label} className="border-t border-white/10">
              <td className="px-4 py-3 font-medium">{zone.label}</td>
              <td className="px-4 py-3">
                {zone.minPercent}–{zone.maxPercent}%
              </td>
              <td className="px-4 py-3">
                {zone.minBpm}–{zone.maxBpm}
              </td>
              <td className="text-muted-foreground px-4 py-3">{zone.benefit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
