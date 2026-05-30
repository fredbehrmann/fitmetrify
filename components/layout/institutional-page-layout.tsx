import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/json-ld/breadcrumb";
import { absoluteUrl } from "@/lib/seo/site";

type InstitutionalPageLayoutProps = {
  title: string;
  intro: string;
  children?: ReactNode;
};

export function InstitutionalPageLayout({
  title,
  intro,
  children,
}: InstitutionalPageLayoutProps) {
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: title },
  ];
  const jsonLd = buildBreadcrumbListJsonLd(breadcrumbItems, absoluteUrl);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="mb-4 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{intro}</p>
        <div className="glass-card space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </>
  );
}
