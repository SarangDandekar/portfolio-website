import { z } from "zod";

export const feedbackSchema = z.object({
  overallRating: z
    .number({ error: "Please tap a star to rate your experience" })
    .min(1, "Please tap a star to rate your experience")
    .max(5),
  customerName: z.string().max(100).optional(),
  feedbackText: z
    .string()
    .min(5, "Please write at least a few words")
    .max(1000, "Feedback must be under 1000 characters"),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

export type FeedbackRecord = {
  id: string;
  overall_rating: number;
  customer_name: string | null;
  feedback_text: string;
  created_at: string;
};
