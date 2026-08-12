import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "gold" | "primary" | "accent";
  className?: string;
};

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  const variants = {
    gold: "bg-primary/15 text-primary-light border-primary/30",
    primary: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
