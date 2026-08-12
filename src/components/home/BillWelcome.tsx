"use client";

import { motion } from "framer-motion";
import { BookOpen, MessageSquareHeart, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

export function BillWelcome() {
  return (
    <section className="relative -mt-16 px-4 pb-8 sm:px-6 lg:px-8">
      <FadeUp className="mx-auto max-w-4xl">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass relative overflow-hidden rounded-brand p-8 shadow-[var(--shadow-strong)] md:p-12"
        >
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-secondary/10" />
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-primary/5" />

          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
            >
              <Heart className="h-8 w-8 text-primary" fill="currentColor" />
            </motion.div>

            <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
              Thank you for visiting Jugadu Cafe.
            </h2>
            <p className="mt-3 text-lg text-text-secondary md:text-xl">
              We hope you enjoyed your meal!
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                href="/#menu"
                variant="primary"
                size="lg"
                icon={<BookOpen className="h-5 w-5" />}
              >
                View Menu
              </Button>
              <Button
                href="/feedback"
                variant="accent"
                size="lg"
                icon={<MessageSquareHeart className="h-5 w-5" />}
              >
                Share Your Feedback
              </Button>
            </div>
          </div>
        </motion.div>
      </FadeUp>
    </section>
  );
}
