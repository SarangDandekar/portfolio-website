"use client";

import { motion } from "framer-motion";
import { MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

export function BottomCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-cta)" }}
      />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20"
          >
            <MessageSquareHeart className="h-8 w-8 text-secondary" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold text-text-inverse md:text-4xl lg:text-5xl">
            Loved your experience at Jugadu Cafe?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-inverse/80">
            Your feedback helps us serve you even better.
          </p>

          <div className="mt-10">
            <Button
              href="/feedback"
              variant="secondary"
              size="lg"
              icon={<MessageSquareHeart className="h-5 w-5" />}
              className="text-lg"
            >
              Give Feedback
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
