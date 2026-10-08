import type { Metadata } from "next";
import WaitlistCompare from "@/components/waitlist/WaitlistCompare";

export const metadata: Metadata = {
  title: "Waitlist: before and after",
  robots: { index: false, follow: false },
};

export default function WaitlistComparePage() {
  return <WaitlistCompare />;
}
