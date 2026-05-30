"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";
import { searchCalculators } from "@/lib/home/search-calculators";
import { calculators } from "@/lib/calculators/registry";

const MAX_RESULTS = 6;
const DEBOUNCE_MS = 200;
const ANALYTICS_DEBOUNCE_MS = 600;

export function CalculatorSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const lastTrackedQuery = useRef("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed.length < 3) return;
      if (trimmed === lastTrackedQuery.current) return;

      lastTrackedQuery.current = trimmed;
      trackEvent("search_used", { search_query: trimmed });
    }, ANALYTICS_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  const results = useMemo(
    () => searchCalculators(debouncedQuery, calculators),
    [debouncedQuery]
  );

  const visibleResults = results.slice(0, MAX_RESULTS);
  const hasQuery = debouncedQuery.trim().length > 0;
  const showEmptyState = hasQuery && results.length === 0;

  return (
    <section className="border-b border-white/10 bg-background-secondary py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold md:text-2xl">
              Encontre sua calculadora
            </h2>
            <p className="text-muted-foreground text-sm">
              Busque por IMC, TMB, macros, pace, 1RM e outras ferramentas.
            </p>
          </div>

          <div className="relative">
            <Search className="text-tertiary pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar calculadoras: IMC, TMB, pace, proteína..."
              className="glass-card h-12 border-white/10 pl-12 text-base"
              aria-label="Buscar calculadoras"
            />
          </div>

          <div aria-live="polite">
            {showEmptyState && (
              <p className="text-muted-foreground text-center text-sm">
                Nenhuma calculadora encontrada para &quot;{debouncedQuery}&quot;.
              </p>
            )}

            {hasQuery && visibleResults.length > 0 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {visibleResults.map((calculator) => (
                    <CalculatorCard
                      key={calculator.slug}
                      calculator={calculator}
                    />
                  ))}
                </div>
                {results.length > MAX_RESULTS && (
                  <div className="text-center">
                    <Link
                      href="/calculadoras"
                      className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      Ver todas as calculadoras
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
