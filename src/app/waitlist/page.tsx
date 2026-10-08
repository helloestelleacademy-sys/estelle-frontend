import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import WaitlistExperience from "@/components/waitlist/WaitlistExperience";
import "./waitlist.css";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description: "Get early access to Estelle's personal branding courses. Join the waitlist and be the first in when we open the doors.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  return <div className={`waitlist-page ${geist.variable}`}>
    <a className="skip-link" href="#main">Skip to waitlist</a>
    <header className="waitlist-header">
      <Link className="waitlist-wordmark-link" href="/" aria-label="Estelle home"><span className="waitlist-wordmark" /></Link>
    </header>
    <main id="main"><WaitlistExperience /></main>
  </div>;
}
