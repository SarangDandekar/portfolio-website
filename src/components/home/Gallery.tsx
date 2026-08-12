"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { galleryImages, galleryCategories } from "@/config/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((item) => item.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const next =
      dir === "prev"
        ? (lightboxIndex - 1 + filtered.length) % filtered.length
        : (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(next);
  };

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

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

        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "group relative mb-4 break-inside-avoid overflow-hidden rounded-brand border border-border bg-card",
                  item.span === "tall" && "sm:min-h-[280px]",
                )}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative block w-full cursor-pointer text-left"
                >
                  {item.type === "video" ? (
                    <div className="relative aspect-[3/4] bg-black sm:aspect-video">
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
                        height={item.span === "tall" ? 1000 : 700}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
                navigate("prev");
              }}
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
                navigate("next");
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
