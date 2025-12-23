import type { Metadata } from "next";
// import {Inter, Source_Serif_4} from "next/font/google"; // Disabled due to build network error
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import StoreProvider from "@/StoreProvider";
import { PersistLogin } from "@/components/PersistLogin";

/*
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const source = Source_Serif_4({
  variable: "--font-sourceserif4",
  subsets: ["latin"],
  display: "swap",
});
*/


export const metadata: Metadata = {
  title: "Estelle",
  description: "Learn Personal branding. Get Certified. Stand Out",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
