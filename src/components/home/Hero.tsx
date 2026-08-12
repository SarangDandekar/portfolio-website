"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, MessageSquareHeart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { CoffeeSteam, FloatingElements } from "@/components/animations/CoffeeSteam";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/hero-poster.png"
          alt="Jugadu Cafe"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      <FloatingElements />
      <CoffeeSteam />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 inline-block"
        >
          <Image
            src="/logo.png"
            alt="Jugadu Cafe Logo"
            width={280}
            height={280}
            className="mx-auto h-40 w-auto drop-shadow-2xl sm:h-52 md:h-60"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Welcome to{" "}
          <span className="text-gradient-gold">Jugadu Cafe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary sm:text-xl md:text-2xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-3 flex items-center justify-center gap-2 text-sm text-primary sm:text-base"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          {siteConfig.contact.address}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
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
            Give Feedback
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/40 p-1"
          >
            <motion.div className="h-2 w-1 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
