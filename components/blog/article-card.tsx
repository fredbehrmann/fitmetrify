import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { CategoryBadge } from "@/components/calculators/category-badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ArticleMeta } from "@/lib/blog";
import type { CalculatorCategory } from "@/lib/calculators/types";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Card className={cn("card-hover group bg-card-hover/0 hover:bg-card-hover overflow-hidden", className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={article.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <CategoryBadge category={article.category as CalculatorCategory} />
          <span className="text-tertiary flex items-center gap-1 text-xs">
            <Clock className="size-3.5" />
            {article.readingTimeMinutes} min
          </span>
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${article.slug}`}
          className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Ler artigo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
