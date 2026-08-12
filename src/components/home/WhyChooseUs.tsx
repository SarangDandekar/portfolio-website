"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Zap,
  Star,
  GraduationCap,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";

const reasons = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Farm-fresh produce delivered daily",
    color: "bg-green-500/10 text-green-700",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Preparation",
    description: "Spotless kitchen, certified standards",
    color: "bg-blue-500/10 text-blue-700",
  },
  {
    icon: Zap,
    title: "Quick Service",
    description: "Your order ready in minutes",
    color: "bg-amber-500/10 text-amber-700",
  },
  {
    icon: Star,
    title: "Best Taste",
    description: "Recipes perfected over years",
    color: "bg-secondary/15 text-secondary-dark",
  },
  {
    icon: GraduationCap,
    title: "Student Friendly",
    description: "Affordable combos and free WiFi",
    color: "bg-purple-500/10 text-purple-700",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "A welcoming space for all ages",
    color: "bg-primary/10 text-primary",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Why Choose Us"
            subtitle="What makes Jugadu Cafe the favorite spot in town"
          />
        </FadeUp>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <motion.div
                whileHover={{ y: -8, rotateX: 5 }}
                className="group relative overflow-hidden rounded-brand border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-strong)]"
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-brand ${reason.color}`}
                >
                  <reason.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  {reason.title}
                </h3>
                <p className="mt-2 text-text-secondary">{reason.description}</p>
                <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
