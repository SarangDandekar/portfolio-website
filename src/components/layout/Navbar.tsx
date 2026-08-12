"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquareHeart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass py-3 shadow-[var(--shadow-soft)]"
            : "bg-transparent py-5",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/#home" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/logo.png"
                alt="Jugadu Cafe Logo"
                width={48}
                height={48}
                className="h-10 w-10 transition-transform group-hover:scale-105 sm:h-12 sm:w-12"
                priority
              />
            </motion.div>
            <span
              className={cn(
                "font-heading text-xl font-bold tracking-tight transition-colors sm:text-2xl",
                isScrolled ? "text-primary" : "text-text-inverse",
              )}
            >
              Jugadu Cafe
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                {item.highlight ? (
                  <Link
                    href={item.href}
                    className="ml-2 inline-flex items-center gap-2 rounded-brand bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-primary-dark hover:shadow-lg"
                  >
                    <MessageSquareHeart className="h-4 w-4" />
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-brand px-4 py-2 text-sm font-medium transition-all hover:bg-primary/10",
                      isScrolled
                        ? "text-text-primary hover:text-primary"
                        : "text-text-inverse/90 hover:text-text-inverse",
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "rounded-brand p-2 transition-colors lg:hidden",
              isScrolled
                ? "text-primary hover:bg-primary/10"
                : "text-text-inverse hover:bg-white/10",
            )}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 flex h-full w-[min(320px,85vw)] flex-col bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <span className="font-heading text-xl font-bold text-primary">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-brand p-2 text-primary hover:bg-primary/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 p-6">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-brand px-4 py-3.5 text-base font-medium transition-colors",
                        item.highlight
                          ? "bg-primary text-white"
                          : "text-text-primary hover:bg-primary/5 hover:text-primary",
                      )}
                    >
                      {item.highlight && (
                        <MessageSquareHeart className="h-5 w-5" />
                      )}
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
