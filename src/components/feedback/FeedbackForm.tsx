"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import {
  feedbackSchema,
  type FeedbackFormData,
} from "@/lib/validations/feedback";
import { StarRatingInput } from "./StarRatingInput";
import { FeedbackSuccess } from "./FeedbackSuccess";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      overallRating: 0,
      customerName: "",
      feedbackText: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setSubmitError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error ?? "Failed to submit. Please try again.");
        return;
      }

      setSubmittedRating(data.overallRating);
      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  };

  if (isSubmitted) {
    return <FeedbackSuccess rating={submittedRating} />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="glass rounded-brand p-6 shadow-[var(--shadow-strong)] md:p-10"
    >
      <div className="space-y-6">
        <Controller
          name="overallRating"
          control={control}
          render={({ field }) => (
            <StarRatingInput
              label="How was your experience?"
              value={field.value}
              onChange={field.onChange}
              error={errors.overallRating?.message}
              size="lg"
            />
          )}
        />

        <div>
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Your Name <span className="text-text-muted">(optional)</span>
          </label>
          <input
            id="customerName"
            type="text"
            {...register("customerName")}
            className="w-full rounded-brand border border-border bg-card px-4 py-3 text-text-primary transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="feedbackText"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Your Feedback
          </label>
          <textarea
            id="feedbackText"
            rows={4}
            {...register("feedbackText")}
            className={cn(
              "w-full resize-none rounded-brand border border-border bg-card px-4 py-3 text-text-primary transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.feedbackText && "border-red-500",
            )}
            placeholder="Tell us what you loved at Jugadu Cafe..."
          />
          {errors.feedbackText && (
            <p className="mt-1 text-sm text-red-400">
              {errors.feedbackText.message}
            </p>
          )}
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-brand border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {submitError}
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
          icon={
            isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </motion.form>
  );
}
