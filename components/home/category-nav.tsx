import Link from "next/link";

import { getHomeSectionNavItems } from "@/lib/home/sections";
import { cn } from "@/lib/utils";

export function CategoryNav() {
  const items = getHomeSectionNavItems();

  return (
    <nav
      className="border-b border-white/10 bg-background py-4"
      aria-label="Navegação por categorias"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "border-white/10 bg-card-hover/50 text-muted-foreground hover:border-primary/40 hover:text-primary shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
