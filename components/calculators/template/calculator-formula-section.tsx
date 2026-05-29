type CalculatorFormulaSectionProps = {
  formula?: string;
};

export function CalculatorFormulaSection({
  formula,
}: CalculatorFormulaSectionProps) {
  if (!formula) return null;

  return (
    <section className="mb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">Fórmula utilizada</h2>
        <div className="glass-card px-6 py-4">
          <p className="font-mono text-sm leading-relaxed">{formula}</p>
        </div>
      </div>
    </section>
  );
}
