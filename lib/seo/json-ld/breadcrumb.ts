export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function buildBreadcrumbListJsonLd(
  items: BreadcrumbItem[],
  absoluteHref: (path: string) => string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const position = index + 1;
      if (item.href) {
        return {
          "@type": "ListItem",
          position,
          name: item.label,
          item: absoluteHref(item.href),
        };
      }
      return {
        "@type": "ListItem",
        position,
        name: item.label,
      };
    }),
  };
}

export function buildCalculatorBreadcrumbItems(title: string): BreadcrumbItem[] {
  return [
    { label: "Início", href: "/" },
    { label: "Calculadoras", href: "/calculadoras" },
    { label: title },
  ];
}
