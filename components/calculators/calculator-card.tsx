import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryBadge } from "@/components/calculators/category-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Calculator } from "@/lib/calculators/types";
import { cn } from "@/lib/utils";

type CalculatorCardProps = {
  calculator: Calculator;
  className?: string;
};

export function CalculatorCard({ calculator, className }: CalculatorCardProps) {
  const Icon = calculator.icon;

  return (
    <Card className={cn("card-hover group bg-card-hover/0 hover:bg-card-hover", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="bg-primary/10 flex size-11 items-center justify-center rounded-xl">
            <Icon className="text-primary size-5" strokeWidth={2} />
          </div>
          <CategoryBadge category={calculator.category} />
        </div>
        <CardTitle className="text-lg">{calculator.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {calculator.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="px-0">
          <Link href={`/${calculator.slug}`}>
            Usar calculadora
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
