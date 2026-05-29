import type { FaqItem } from "@/lib/calculators/types";

type CalculatorFaqProps = {
  items: FaqItem[];
};

export function CalculatorFaq({ items }: CalculatorFaqProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Perguntas frequentes</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="glass-card group px-6 py-4"
          >
            <summary className="cursor-pointer list-none font-medium [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-primary text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
