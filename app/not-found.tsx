import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-primary mb-2 text-sm font-semibold uppercase tracking-wider">
        404
      </p>
      <h1 className="mb-4 text-3xl font-bold">Página não encontrada</h1>
      <p className="text-muted-foreground mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Voltar ao início</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/calculadoras">Ver calculadoras</Link>
        </Button>
      </div>
    </div>
  );
}
