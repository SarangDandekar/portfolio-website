"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Star,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

export function VisitUs() {
  return (
    <section id="visit" className="bg-background-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeading
            title="Visit Our Store"
            subtitle="See Jugadu Cafe in Samudrapur — watch the clip and come visit us!"
          />
        </FadeUp>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    Address
                  </h3>
                  <p className="mt-1 text-text-secondary">
                    {siteConfig.contact.address}
                  </p>
                  <Button
                    href={siteConfig.map.link}
                    external
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-0"
                    icon={<ExternalLink className="h-4 w-4" />}
                  >
                    Get Directions
                  </Button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-secondary/15">
                  <Phone className="h-6 w-6 text-secondary-dark" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    Contact
                  </h3>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="mt-1 block text-text-secondary hover:text-primary"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-accent/10">
                  <InstagramIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    Instagram
                  </h3>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-text-secondary hover:text-accent"
                  >
                    {siteConfig.contact.instagramHandle}
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-brand border border-primary/30 bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-primary/15">
                  <Star className="h-6 w-6 fill-primary text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    Google Reviews
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    Enjoyed your visit? Help Jugadu Cafe grow with a Google review.
                  </p>
                  <Button
                    href={siteConfig.social.googleReview}
                    external
                    variant="primary"
                    size="sm"
                    className="mt-3"
                    icon={<Star className="h-4 w-4 fill-current" />}
                  >
                    Leave a Google Review
                  </Button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-brand border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    Opening Hours
                  </h3>
                  <p className="mt-1 text-text-secondary">
                    Mon – Fri: {siteConfig.hours.weekdays}
                  </p>
                  <p className="text-text-secondary">
                    Sat – Sun: {siteConfig.hours.weekends}
                  </p>
                </div>
              </motion.div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="overflow-hidden rounded-brand border border-border bg-card shadow-[var(--shadow-strong)]"
            >
              <div className="border-b border-border bg-primary/10 px-4 py-3">
                <p className="font-heading text-lg font-semibold text-primary">
                  Inside Jugadu Cafe
                </p>
                <p className="text-sm text-text-secondary">
                  A quick look at our store &amp; ambience
                </p>
              </div>
              <video
                src={siteConfig.storeVideo}
                controls
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                className="aspect-[9/16] max-h-[520px] w-full bg-black object-cover sm:aspect-video sm:max-h-none sm:object-contain"
              >
                Your browser does not support video playback.
              </video>
              <div className="border-t border-border p-4 text-center">
                <Button
                  href={siteConfig.map.link}
                  external
                  variant="ghost"
                  size="sm"
                  icon={<ExternalLink className="h-4 w-4" />}
                >
                  Open in Google Maps
                </Button>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
