"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Award,
  Coffee,
  Sofa,
  Clock,
  IndianRupee,
  UserRound,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/FadeUp";
import type { StoryMedia } from "@/lib/supabase/content";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We source the finest local produce daily to ensure every dish bursts with natural flavor.",
  },
  {
    icon: Award,
    title: "Quality Food",
    description:
      "Our chefs craft each item with passion, maintaining the highest standards of taste and presentation.",
  },
  {
    icon: Coffee,
    title: "Signature Beverages",
    description:
      "From artisan coffees to traditional chai, our drinks are crafted to perfection.",
  },
  {
    icon: Sofa,
    title: "Cozy Ambience",
    description:
      "A warm, inviting space designed for comfort — perfect for work, dates, or family time.",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description:
      "We respect your time. Enjoy quick service without compromising on quality.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description:
      "Premium quality at prices that won't break the bank. Great value for everyone.",
  },
];

export function About({ storyMedia }: { storyMedia?: StoryMedia | null }) {
  const mediaSrc = storyMedia?.src ?? "/videos/our-story.mp4";
  const mediaType = storyMedia?.type ?? "video";

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Our Story"
            subtitle="Born from a passion for great food and hospitality, Jugadu Cafe has been Samudrapur’s neighborhood favourite since 2020."
          />
        </FadeUp>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp delay={0.2}>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative aspect-[4/5] overflow-hidden rounded-brand border border-border bg-black shadow-[var(--shadow-strong)]"
              >
                {mediaType === "video" ? (
                  <video
                    src={mediaSrc}
                    controls
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaSrc}
                    alt="Our Story — Jugadu Cafe"
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
              <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-brand bg-primary/20" />
            </div>
          </FadeUp>

          <div className="space-y-8">
            <FadeUp delay={0.25}>
              <div className="rounded-brand border border-primary/25 bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Founder &amp; Owner
                </p>
                <h3 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
                  Mr. Anil Dadmal
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  A hotel management professional with a deep love for food and
                  service, Mr. Anil Dadmal founded Jugadu Cafe to bring quality
                  Chinese, burgers, pizza, and local favourites to Samudrapur —
                  with warm hospitality and honest pricing.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-3 rounded-brand bg-primary/10 p-3">
                    <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-text-muted">Role</p>
                      <p className="text-sm font-semibold text-text-primary">
                        Founder &amp; Owner
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-brand bg-primary/10 p-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-text-muted">Expertise</p>
                      <p className="text-sm font-semibold text-text-primary">
                        Hotel Management
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-brand bg-primary/10 p-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs text-text-muted">Serving since</p>
                      <p className="text-sm font-semibold text-text-primary">
                        2020
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-medium)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-brand bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                      <feature.icon className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {feature.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
