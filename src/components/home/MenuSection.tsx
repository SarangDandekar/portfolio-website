"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Flame } from "lucide-react";
import {
  menuCategories,
  featuredItems,
  formatPrice,
  menuPdfPath,
} from "@/config/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="bg-background-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Signature Menu"
            subtitle="100% Pure Veg · Chinese specials, burgers, pizza & fries — Samudrapur's favourite"
          />
        </FadeUp>

        {/* Customer favourites */}
        <FadeUp delay={0.05}>
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-xl font-semibold text-primary md:text-2xl">
                Most Loved at Jugadu Cafe
              </h3>
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredItems.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative overflow-hidden rounded-brand border-2 border-primary/30 bg-card p-5 shadow-[var(--shadow-glow)]"
                  >
                    <Badge className="absolute top-3 right-3">Must Try</Badge>
                    <h4 className="pr-20 font-heading text-lg font-semibold text-text-primary">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      {item.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-primary">
                      {formatPrice(item.price, item.halfPrice)}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUp>

        {/* Category tabs — Chinese first */}
        <FadeUp delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-brand px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-[var(--shadow-glow)]"
                    : "bg-card text-text-secondary hover:bg-primary/10 hover:text-primary",
                  cat.highlight && activeCategory !== cat.id && "ring-1 ring-primary/20",
                )}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.name}
                {cat.id === "chinese" && (
                  <span className="ml-1.5 text-xs text-primary">★</span>
                )}
              </button>
            ))}
          </div>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory.id === "chinese" && (
              <p className="mb-6 text-center text-sm text-primary">
                🥢 Chinese is our specialty — most ordered category at Jugadu Cafe!
              </p>
            )}
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentCategory.items.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:border-primary/30 hover:shadow-[var(--shadow-medium)]"
                  >
                    {item.bestseller && (
                      <Badge className="absolute top-4 right-4">Bestseller</Badge>
                    )}
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary">
                        {item.name}
                      </h3>
                      <span className="shrink-0 font-semibold text-primary">
                        {formatPrice(item.price, item.halfPrice)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-primary-light transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        <FadeUp delay={0.3} className="mt-12 text-center">
          <Button
            href="/menu"
            variant="primary"
            size="lg"
            icon={<FileText className="h-5 w-5" />}
          >
            View Full Menu PDF
          </Button>
          <p className="mt-3">
            <a
              href={menuPdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-primary"
            >
              Or download PDF directly
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
