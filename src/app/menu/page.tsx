import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Menu",
  description: "Complete menu at Jugadu Cafe, Samudrapur",
};

export default function MenuPdfPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Jugadu Cafe — Full Menu
          </h1>
          <p className="mt-2 text-text-secondary">
            Chinese specials, burgers, pizza, fries &amp; more
          </p>
        </div>
        <div className="overflow-hidden rounded-brand border border-border bg-card shadow-[var(--shadow-strong)]">
          <iframe
            src="/menu/jugadu-cafe-menu.pdf"
            title="Jugadu Cafe Menu PDF"
            className="h-[80vh] w-full"
          />
        </div>
        <p className="mt-4 text-center text-sm text-text-muted">
          PDF not loading?{" "}
          <a
            href="/menu/jugadu-cafe-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Open menu in new tab
          </a>
        </p>
      </div>
    </div>
  );
}
