import Link from "next/link";
import { Activity } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary/10 flex size-9 items-center justify-center rounded-xl">
        <Activity className="text-primary size-5" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-primary">Fit</span>Metrify
      </span>
    </Link>
  );
}
