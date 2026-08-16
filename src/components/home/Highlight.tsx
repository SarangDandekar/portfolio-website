"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import type { SiteHighlightContent } from "@/lib/supabase/content";

type HighlightProps = {
  highlight: SiteHighlightContent;
};

export function Highlight({ highlight }: HighlightProps) {
  const hasMedia = Boolean(highlight.publicUrl && highlight.mediaType);

  return (
    <section
      id="highlight"
      className="border-b border-border bg-card py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title={highlight.title || "Highlight"}
            subtitle={highlight.bodyText || undefined}
          />
        </FadeUp>

        {hasMedia && (
          <FadeUp delay={0.12}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-brand border border-border bg-black shadow-[var(--shadow-medium)]">
              {highlight.mediaType === "video" ? (
                <video
                  src={highlight.publicUrl!}
                  controls
                  playsInline
                  className="aspect-video w-full object-contain"
                />
              ) : (
                <Image
                  src={highlight.publicUrl!}
                  alt={highlight.title || "Jugadu Cafe highlight"}
                  width={1200}
                  height={675}
                  className="aspect-video w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
