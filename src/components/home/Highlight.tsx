"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";
import type { HighlightMedia, HighlightsContent } from "@/lib/supabase/content";

type HighlightProps = {
  highlights: HighlightsContent;
};

export function Highlight({ highlights }: HighlightProps) {
  const items = highlights.items;
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
    setDirection(0);
  }, [items.length]);

  const slidePrev = () => {
    if (items.length === 0) return;
    setDirection(-1);
    setSlideIndex((i) => (i - 1 + items.length) % items.length);
  };

  const slideNext = () => {
    if (items.length === 0) return;
    setDirection(1);
    setSlideIndex((i) => (i + 1) % items.length);
  };

  const getVisibleItems = () => {
    if (items.length === 0) return [];
    const count = Math.min(3, items.length);
    return Array.from({ length: count }, (_, offset) => {
      const index = (slideIndex + offset) % items.length;
      return { item: items[index], index };
    });
  };

  const visible = getVisibleItems();

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section
      id="highlight"
      className="border-b border-border bg-card py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Highlights"
            subtitle={highlights.bodyText || undefined}
          />
        </FadeUp>

        {items.length > 0 && (
          <FadeUp delay={0.12}>
            <div className="relative">
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={slidePrev}
                    className="absolute top-1/2 left-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-primary shadow-[var(--shadow-medium)] transition-all hover:scale-105 hover:bg-primary hover:text-white sm:-left-2 md:-left-4"
                    aria-label="Previous highlight"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={slideNext}
                    className="absolute top-1/2 right-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-primary shadow-[var(--shadow-medium)] transition-all hover:scale-105 hover:bg-primary hover:text-white sm:-right-2 md:-right-4"
                    aria-label="Next highlight"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              <div
                className={
                  items.length > 1
                    ? "overflow-hidden px-10 sm:px-14"
                    : "overflow-hidden"
                }
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={slideIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={
                      items.length === 1
                        ? "mx-auto max-w-3xl"
                        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    }
                  >
                    {visible.map(({ item, index }: { item: HighlightMedia; index: number }) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="group relative overflow-hidden rounded-brand border border-border bg-black"
                      >
                        {item.type === "video" ? (
                          <div className="relative aspect-[4/5] bg-black sm:aspect-[3/4]">
                            <video
                              src={item.src}
                              controls
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={800}
                            height={1000}
                            className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {items.length > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {items.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setDirection(i > slideIndex ? 1 : -1);
                        setSlideIndex(i);
                      }}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        i === slideIndex
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-border hover:bg-primary/50",
                      )}
                      aria-label={`Go to highlight ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
