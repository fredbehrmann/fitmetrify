"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCalcStore } from "@/lib/calc-context/store";
import { paramsToCalcState } from "@/lib/calc-context/sync-from-result";
import type { ResultAction } from "@/lib/calculators/engines/types";

type ResultActionButtonsProps = {
  actions: ResultAction[];
};

function buildHref(action: ResultAction): string {
  if (!action.params || Object.keys(action.params).length === 0) {
    return action.href;
  }

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(action.params)) {
    search.set(key, String(value));
  }

  return `${action.href}?${search.toString()}`;
}

export function ResultActionButtons({ actions }: ResultActionButtonsProps) {
  const update = useCalcStore((store) => store.update);

  if (actions.length === 0) return null;

  const handleClick = (action: ResultAction) => {
    if (action.params) {
      update(paramsToCalcState(action.params));
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button key={action.label} asChild>
          <Link href={buildHref(action)} onClick={() => handleClick(action)}>
            {action.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      ))}
    </div>
  );
}
