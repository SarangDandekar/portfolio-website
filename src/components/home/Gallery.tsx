"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { galleryImages, galleryCategories } from "@/config/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((item) => item.category === filter);

  useEffect(() => {
    setSlideIndex(0);
    setDirection(0);
  }, [filter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const slidePrev = () => {
    if (filtered.length === 0) return;
    setDirection(-1);
    setSlideIndex((i) => (i - 1 + filtered.length) % filtered.length);
  };

  const slideNext = () => {
    if (filtered.length === 0) return;
    setDirection(1);
    setSlideIndex((i) => (i + 1) % filtered.length);
  };

  const navigateLightbox = (dir: "prev" | "next") => {
    if (lightboxIndex === null || filtered.length === 0) return;
    const next =
      dir === "prev"
        ? (lightboxIndex - 1 + filtered.length) % filtered.length
        : (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(next);
  };

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  /** Show up to 3 cards in view; animate as a sliding strip */
  const getVisibleItems = () => {
    if (filtered.length === 0) return [];
    const count = Math.min(3, filtered.length);
    return Array.from({ length: count }, (_, offset) => {
      const index = (slideIndex + offset) % filtered.length;
      return { item: filtered[index], index };
    });
  };

  const visible = getVisibleItems();

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section id="gallery" className="bg-background-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Gallery"
            subtitle="Real photos & videos from Jugadu Cafe, Samudrapur"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "rounded-brand px-4 py-2 text-sm font-medium transition-all",
                  filter === cat.id
                    ? "bg-primary text-white"
                    : "bg-card text-text-secondary hover:bg-primary/10 hover:text-primary",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative">
            {/* Left / Right direction buttons */}
            <button
              type="button"
              onClick={slidePrev}
              className="absolute top-1/2 left-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-primary shadow-[var(--shadow-medium)] transition-all hover:scale-105 hover:bg-primary hover:text-white sm:-left-2 md:-left-4"
              aria-label="Slide gallery left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={slideNext}
              className="absolute top-1/2 right-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-primary shadow-[var(--shadow-medium)] transition-all hover:scale-105 hover:bg-primary hover:text-white sm:-right-2 md:-right-4"
              aria-label="Slide gallery right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="overflow-hidden px-10 sm:px-14">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${filter}-${slideIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {visible.map(({ item, index }) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="group relative overflow-hidden rounded-brand border border-border bg-card"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(index)}
                        className="relative block w-full cursor-pointer text-left"
                      >
                        {item.type === "video" ? (
                          <div className="relative aspect-[4/5] bg-black sm:aspect-[3/4]">
                            <video
                              src={item.src}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-primary/40">
                              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                <Play className="h-7 w-7 fill-current" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Image
                              src={item.src}
                              alt={item.alt}
                              width={800}
                              height={1000}
                              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[3/4]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-all group-hover:bg-primary/40">
                              <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                          </>
                        )}
                        <p className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm">
                          {item.alt}
                        </p>
                      </button>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            {filtered.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {filtered.map((item, i) => (
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
                    aria-label={`Go to gallery item ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </FadeUp>
      </div>

      <AnimatePresence>
        {active && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active.id}
              initial={{ scale: 0.9, opacity: 0, x: direction * 40 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-brand"
            >
              {active.type === "video" ? (
                <video
                  src={active.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] w-auto max-w-full bg-black"
                />
              ) : (
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1200}
                  height={900}
                  className="max-h-[85vh] w-auto object-contain"
                />
              )}
              <p className="mt-3 text-center text-sm text-white">{active.alt}</p>
            </motion.div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-16"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
