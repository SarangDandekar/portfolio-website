"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import type { FeedbackRecord } from "@/lib/validations/feedback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function formatReviewDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

function getDisplayName(name: string | null) {
  if (name?.trim()) return name.trim();
  return "Happy Guest";
}

export function Testimonials() {
  const [reviews, setReviews] = useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="What Our Guests Say"
            subtitle="Real reviews from customers who visited Jugadu Cafe"
          />
        </FadeUp>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-brand border border-border bg-card"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <FadeUp>
            <div className="rounded-brand border border-dashed border-primary/30 bg-card p-12 text-center">
              <MessageSquareHeart className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-text-primary">
                Be the first to share your experience!
              </h3>
              <p className="mt-2 text-text-secondary">
                Visited Jugadu Cafe? We&apos;d love to hear from you.
              </p>
              <div className="mt-6">
                <Button href="/feedback" variant="primary" size="lg">
                  Give Feedback
                </Button>
              </div>
            </div>
          </FadeUp>
        ) : (
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => {
              const name = getDisplayName(review.customer_name);
              return (
                <StaggerItem key={review.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative rounded-brand border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
                  >
                    <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/15" />
                    <StarRating rating={review.overall_rating} />
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      &ldquo;{review.feedback_text}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="font-semibold text-text-primary">{name}</p>
                        <p className="text-sm text-text-muted">
                          {formatReviewDate(review.created_at)}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-heading text-lg font-bold text-primary">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        {reviews.length > 0 && (
          <FadeUp className="mt-10 text-center">
            <Link
              href="/feedback"
              className="text-sm font-medium text-primary hover:underline"
            >
              Share your experience →
            </Link>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
