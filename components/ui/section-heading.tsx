import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 space-y-3",
        align === "center" && "text-center",
        className
      )}
    >
      <h2>{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
