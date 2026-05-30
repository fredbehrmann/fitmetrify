import Link from "next/link";

const ALTERNATIVE_LINKS: Record<string, { href: string; label: string }> = {
  "calculadora-peso-ideal": {
    href: "/calculadora-imc",
    label: "Calculadora de IMC",
  },
  "calculadora-calorias-refeicao": {
    href: "/calculadora-macros",
    label: "Calculadora de Macronutrientes",
  },
};

type CalculatorDevelopmentBannerProps = {
  slug: string;
};

export function CalculatorDevelopmentBanner({
  slug,
}: CalculatorDevelopmentBannerProps) {
  const alternative = ALTERNATIVE_LINKS[slug];

  if (!alternative) return null;

  return (
    <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
        <p className="font-medium text-amber-100">
          Esta calculadora está em desenvolvimento. Os resultados estarão
          disponíveis em breve.
        </p>
        <p className="mt-1 text-sm text-amber-200/80">
          Enquanto isso, use a{" "}
          <Link
            href={alternative.href}
            className="font-medium text-amber-100 underline underline-offset-2 hover:text-white"
          >
            {alternative.label}
          </Link>{" "}
          como referência.
        </p>
      </div>
    </div>
  );
}
