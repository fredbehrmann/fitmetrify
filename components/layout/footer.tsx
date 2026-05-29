import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Separator } from "@/components/ui/separator";
import { footerNavigation, socialLinks } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Transformando dados em evolução. Métricas inteligentes para
              resultados reais no seu treino, nutrição e saúde.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary flex size-10 items-center justify-center rounded-full border text-xs font-medium transition-colors"
                  aria-label={social.label}
                >
                  {social.label[0]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Navegação</h3>
            <ul className="space-y-3">
              {footerNavigation.navegacao.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Recursos</h3>
            <ul className="space-y-3">
              {footerNavigation.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Institucional</h3>
            <ul className="space-y-3">
              {footerNavigation.institucional.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="mb-2 text-sm font-semibold">
              Receba dicas exclusivas
            </h3>
            <p className="text-muted-foreground text-sm">
              Novidades sobre nutrição, treino e métricas corporais.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <Separator className="my-10" />

        <div className="text-tertiary flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} FitMetrify. Todos os direitos reservados.</p>
          <Link
            href="/calculadora-imc"
            className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
          >
            Calcular meu IMC
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
