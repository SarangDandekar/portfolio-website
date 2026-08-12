import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex items-center gap-3",
          align === "center" && "justify-center w-full",
        )}
      >
        <span className="h-px w-8 bg-primary" />
        <span
          className={cn(
            "text-sm font-medium uppercase tracking-[0.2em]",
            light ? "text-primary-light" : "text-primary",
          )}
        >
          Jugadu Cafe
        </span>
        <span className="h-px w-8 bg-primary" />
      </div>
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          light ? "text-text-inverse" : "text-text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-text-inverse/80" : "text-text-secondary",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
