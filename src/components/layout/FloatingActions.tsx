"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageSquareHeart } from "lucide-react";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-medium)] transition-colors hover:bg-primary-dark"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/feedback"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-glow)] transition-all hover:scale-110 hover:bg-primary-dark sm:h-14 sm:w-14"
          aria-label="Give feedback"
        >
          <MessageSquareHeart className="h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
        </Link>
      </motion.div>
    </div>
  );
}
