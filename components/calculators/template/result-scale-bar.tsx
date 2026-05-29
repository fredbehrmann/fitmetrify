export type { ScaleSegment } from "@/lib/calculators/engines/types";
import type { ScaleSegment } from "@/lib/calculators/engines/types";

type ResultScaleBarProps = {
  segments: ScaleSegment[];
  value: number;
  min: number;
  max: number;
};

export function ResultScaleBar({
  segments,
  value,
  min,
  max,
}: ResultScaleBarProps) {
  const range = max - min;
  const position = range > 0 ? ((value - min) / range) * 100 : 0;
  const clampedPosition = Math.min(100, Math.max(0, position));

  return (
    <div className="space-y-3">
      <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
        <div className="flex h-full">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="h-full flex-1"
              style={{ backgroundColor: segment.color ?? "transparent" }}
              title={segment.label}
            />
          ))}
        </div>
        <div
          className="border-primary bg-background absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{ left: `${clampedPosition}%` }}
        />
      </div>
      <div className="text-tertiary flex flex-wrap justify-between gap-2 text-xs">
        {segments.map((segment) => (
          <span key={segment.label}>{segment.label}</span>
        ))}
      </div>
    </div>
  );
}
