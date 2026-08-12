"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      custom={{ delay, duration }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
