import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

import { CategoryBadge } from "@/components/calculators/category-badge";
import type { ArticleMeta } from "@/lib/blog";
import type { CalculatorCategory } from "@/lib/calculators/types";

type ArticleHeroProps = {
  meta: ArticleMeta;
};

function formatDate(dateString: string): string {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ArticleHero({ meta }: ArticleHeroProps) {
  return (
    <header className="mb-10 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={meta.category as CalculatorCategory} />
        {meta.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-tertiary rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{meta.title}</h1>

      <p className="text-muted-foreground text-lg leading-relaxed">{meta.excerpt}</p>

      <div className="text-tertiary flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <User className="size-4" />
          {meta.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          {formatDate(meta.publishedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" />
          {meta.readingTimeMinutes} min de leitura
        </span>
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[20px] border border-white/10 bg-muted">
        <Image
          src={meta.coverImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </header>
  );
}
