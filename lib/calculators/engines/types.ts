export type ResultClassification = {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
};

export type ResultKpi = {
  label: string;
  value: string;
  unit?: string;
};

export type ScaleSegment = {
  label: string;
  min: number;
  max: number;
  color?: string;
};

export type ResultScale = {
  segments: ScaleSegment[];
  value: number;
  min: number;
  max: number;
};

export type MacroChartSegment = {
  name: string;
  grams: number;
  percent: number;
  color: string;
};

export type ResultAction = {
  label: string;
  href: string;
  params?: Record<string, string | number>;
};

export type CalculatorResult = {
  primaryValue: string;
  primaryUnit?: string;
  primaryLabel?: string;
  classification?: ResultClassification;
  interpretation: string;
  nextSteps?: string[];
  kpis?: ResultKpi[];
  warnings?: string[];
  scale?: ResultScale;
  macroChart?: MacroChartSegment[];
  /** Slugs for related calculator links in the result panel */
  relatedSlugs?: string[];
  /** Cross-calculator action buttons (Etapa 2 bridge to Etapa 3) */
  actions?: ResultAction[];
  /** Optional React node key for custom result sections */
  showUrineScale?: boolean;
  heartRateZones?: {
    label: string;
    minBpm: number;
    maxBpm: number;
    benefit: string;
    minPercent: number;
    maxPercent: number;
  }[];
};

export type CalculatorEngine = {
  calculateSimple?: (
    values: Record<string, unknown>
  ) => CalculatorResult | null;
  calculateAdvanced?: (
    values: Record<string, unknown>
  ) => CalculatorResult | null;
};

export type ResultPanelState = "initial" | "placeholder" | "result";
