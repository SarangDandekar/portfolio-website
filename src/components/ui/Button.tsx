"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)]",
  secondary:
    "bg-secondary text-text-inverse hover:bg-secondary-dark shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)]",
  accent:
    "bg-accent text-white hover:bg-accent-light shadow-[var(--shadow-soft)]",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2.5",
  lg: "px-8 py-4 text-lg gap-3",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  onClick,
  type = "button",
  disabled,
  icon,
}: ButtonProps) {
  const classes = cn(
    "btn-ripple inline-flex items-center justify-center rounded-brand font-medium transition-all duration-300",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
