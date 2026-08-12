import type { Metadata } from "next";
import Image from "next/image";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description:
    "Share your experience at Jugadu Cafe. Your feedback helps us serve you better.",
};

export default function FeedbackPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "var(--gradient-warm, linear-gradient(180deg, #FAF6F1 0%, #F0E8DE 100%))" }}
        />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-10 text-center">
          <Image
            src="/logo.png"
            alt="Jugadu Cafe"
            width={80}
            height={80}
            className="mx-auto mb-6 h-16 w-16 sm:h-20 sm:w-20"
          />
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Rate Your Visit
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Tap a star, share a few words — it only takes a minute.
          </p>
        </div>

        <FeedbackForm />
      </div>
    </div>
  );
}
