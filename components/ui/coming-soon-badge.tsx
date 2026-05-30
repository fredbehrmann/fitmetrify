import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ComingSoonBadgeProps = {
  className?: string;
};

export function ComingSoonBadge({ className }: ComingSoonBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-amber-500/40 bg-amber-500/10 text-amber-200",
        className
      )}
    >
      Em breve
    </Badge>
  );
}
