import Link from "next/link";

export function OneRepMaxSafetyBanner() {
  return (
    <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
        <p className="font-medium text-red-100">
          Atenção: não realize testes de 1RM máximo real sem supervisão de um
          profissional de educação física certificado, especialmente nos
          exercícios Agachamento Livre, Levantamento Terra e Supino Reto com
          barra.
        </p>
        <p className="mt-1 text-sm text-red-200/80">
          Use estimativas a partir de séries submáximas sempre que possível.{" "}
          <Link
            href="/calculadora-zonas-carga"
            className="underline underline-offset-2 hover:text-white"
          >
            Ver zonas de carga
          </Link>
        </p>
      </div>
    </div>
  );
}
