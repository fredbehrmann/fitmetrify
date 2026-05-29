"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { MacroChartSegment } from "@/lib/calculators/engines/types";

type MacroSplitChartProps = {
  segments: MacroChartSegment[];
};

type ChartDatum = {
  name: string;
  value: number;
  grams: number;
  percent: number;
  color: string;
};

export function MacroSplitChart({ segments }: MacroSplitChartProps) {
  const data: ChartDatum[] = segments.map((segment) => ({
    name: segment.name,
    value: segment.grams,
    grams: segment.grams,
    percent: segment.percent,
    color: segment.color,
  }));

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Distribuição de macronutrientes</p>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="transparent"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(5, 10, 18, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(_value, _name, item) => {
                const payload = item.payload as ChartDatum;
                return [
                  `${payload.grams} g (${Math.round(payload.percent)}%)`,
                  payload.name,
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex flex-wrap justify-center gap-4 text-xs">
        {segments.map((segment) => (
          <li key={segment.name} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-muted-foreground">
              {segment.name}: {Math.round(segment.grams)} g (
              {Math.round(segment.percent)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
