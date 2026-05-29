import type { Calculator } from "@/lib/calculators/types";

type CalculatorEducationalContentProps = {
  calculator: Pick<Calculator, "title" | "seoContent" | "formula">;
};

export function CalculatorEducationalContent({
  calculator,
}: CalculatorEducationalContentProps) {
  const { seoContent, formula } = calculator;

  return (
    <section className="mb-12 space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">
          O que é {calculator.title}?
        </h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          {seoContent.about}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">Como funciona o cálculo</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-line">
          {seoContent.howItWorks}
        </p>
      </div>

      {formula && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold">Fórmula utilizada</h2>
          <div className="glass-card px-6 py-4">
            <p className="font-mono text-sm leading-relaxed">{formula}</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">Como interpretar o resultado</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-line">
          {seoContent.interpretationGuide}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">Limitações</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-line">
          {seoContent.limitations}
        </p>
      </div>
    </section>
  );
}
