import type { Metadata } from "next";
import Link from "next/link";
import WaitlistPass from "@/components/waitlist/WaitlistPass";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description: "Get early access to Estelle's personal branding courses. Join the waitlist and be the first in when we open the doors.",
  alternates: { canonical: "/waitlist" },
};

// Page-scoped colour tokens for the dark waitlist scene.
const tokens = {
  "--wl-bg": "#0f0d14",
  "--wl-surface-1": "#2d2738",
  "--wl-surface-2": "#1d1925",
  "--wl-accent": "#7852A9",
  "--wl-accent-soft": "#d9b3ff",
  "--wl-strap": "#6f4aa0",
  "--wl-error": "#f4b8a8",
} as React.CSSProperties;

export default function WaitlistPage() {
  return (
    <div style={tokens} className="relative min-h-svh overflow-clip bg-[var(--wl-bg)] text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-[#37296D]"
      >
        Skip to waitlist
      </a>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link href="/" aria-label="Estelle home" className="flex min-h-11 items-center font-serif text-2xl tracking-tight text-[var(--wl-accent-soft)]">
          Estelle
        </Link>
        <Link href="/" className="flex min-h-11 items-center px-2 text-sm text-white/70 transition-colors hover:text-white">
          Back to home
        </Link>
      </header>
      <main id="main">
        <WaitlistPass />
      </main>
    </div>
  );
}
