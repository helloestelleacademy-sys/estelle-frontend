import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import StoreProvider from "@/StoreProvider";
import { PersistLogin } from "@/components/PersistLogin";
import { inter, jakarta } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://estellelearning.com"),
  title: {
    default: "Estelle - Personal Branding & Career Growth",
    template: "%s | Estelle"
  },
  description: "Master personal branding, get certified, and stand out in your career with Estelle's expert-led courses and community.",
  keywords: ["Personal Branding", "Career Growth", "Online Courses", "Certification", "Professional Development", "Estelle"],
  authors: [{ name: "Estelle Team" }],
  creator: "Estelle",
  publisher: "Estelle",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://estellelearning.com",
    siteName: "Estelle",
    title: "Estelle - Personal Branding & Career Growth",
    description: "Master personal branding, get certified, and stand out in your career with Estelle's expert-led courses and community.",
    images: [
      {
        url: "/seothumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estelle - Personal Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estelle - Personal Branding & Career Growth",
    description: "Master personal branding, get certified, and stand out in your career with Estelle's expert-led courses and community.",
    images: ["/seothumbnail.png"],
    creator: "@estellelearning",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "nFgLye16lmzVkKvmw4FE1eFgdiqfzaCDeu-XqSq_p3c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body
        className={`antialiased font-sans`}
      >
        <StoreProvider>
          <PersistLogin>
            {children}
            <Toaster />
          </PersistLogin>
        </StoreProvider>
      </body>
    </html>
  );
}
