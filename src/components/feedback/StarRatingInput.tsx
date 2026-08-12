"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: string;
  size?: "sm" | "lg";
};

export function StarRatingInput({
  value,
  onChange,
  label,
  error,
  size = "lg",
}: StarRatingInputProps) {
  const starSize = size === "lg" ? "h-8 w-8 sm:h-10 sm:w-10" : "h-6 w-6";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="flex gap-1 sm:gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          return (
            <motion.button
              key={i}
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(starValue)}
              className="rounded-full p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={`Rate ${starValue} out of 5`}
            >
              <Star
                className={cn(
                  starSize,
                  "transition-colors",
                  starValue <= value
                    ? "fill-secondary text-secondary"
                    : "text-border hover:text-secondary/50",
                )}
              />
            </motion.button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
