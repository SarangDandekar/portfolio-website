"use client";

import { motion } from "framer-motion";
import { CheckCircle, Home, Heart, Star, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

type FeedbackSuccessProps = {
  rating: number;
};

export function FeedbackSuccess({ rating }: FeedbackSuccessProps) {
  const isHappyCustomer = rating >= 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full ${
          isHappyCustomer ? "bg-success/15" : "bg-primary/15"
        }`}
      >
        <CheckCircle
          className={`h-14 w-14 ${isHappyCustomer ? "text-success" : "text-primary"}`}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-heading text-3xl font-bold text-primary md:text-4xl"
      >
        Thank You!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg text-text-secondary"
      >
        {isHappyCustomer
          ? "We're so glad you enjoyed Jugadu Cafe! Your feedback means a lot to us."
          : "We're sorry your experience wasn't perfect. Your feedback helps us improve every day."}
      </motion.p>

      {isHappyCustomer ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass mx-auto mt-8 max-w-md rounded-brand border border-primary/20 p-6"
        >
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
          <p className="font-heading text-xl font-semibold text-text-primary">
            Love Jugadu Cafe?
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Share your experience on Google — it helps more people discover us in
            Samudrapur!
          </p>
          <div className="mt-5">
            <Button
              href={siteConfig.social.googleReview}
              external
              variant="secondary"
              size="lg"
              className="w-full !text-text-inverse"
              icon={<Star className="h-5 w-5 fill-current" />}
            >
              Leave a Google Review
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass mx-auto mt-8 max-w-md rounded-brand p-6"
        >
          <Heart className="mx-auto mb-3 h-8 w-8 text-primary" fill="currentColor" />
          <p className="font-heading text-xl font-semibold text-primary">
            We&apos;ll Do Better
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Our team will review your feedback and work on improvements. We hope
            to serve you a much better experience next time.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <Button
          href="/"
          variant="primary"
          size="lg"
          icon={<Home className="h-5 w-5" />}
        >
          Back to Home
        </Button>
        {isHappyCustomer && (
          <Button href="/#menu" variant="outline" size="lg">
            View Menu Again
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
