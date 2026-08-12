import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-text-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Jugadu Cafe"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="font-heading text-2xl font-bold">
                Jugadu Cafe
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.nav
                .filter((item) => !item.highlight)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/feedback"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
                >
                  Give Feedback
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.social.googleReview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Review on Google
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {siteConfig.contact.address}
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
              Follow Us
            </h3>
            <div className="mb-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-brand bg-primary/10 transition-all hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-primary">
                {siteConfig.hours.label}:
              </span>
              <br />
              Mon–Fri: {siteConfig.hours.weekdays}
              <br />
              Sat–Sun: {siteConfig.hours.weekends}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Jugadu Cafe. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Crafted with love for coffee lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
