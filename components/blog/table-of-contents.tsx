import type { ArticleHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: ArticleHeading[];
  className?: string;
};

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Índice do artigo"
      className={cn(
        "glass-card mb-8 p-5 text-sm",
        className
      )}
    >
      <p className="mb-3 font-semibold text-foreground">Neste artigo</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(heading.level === 3 && "pl-4")}
          >
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
