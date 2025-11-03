import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReactLenis from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ReactLenis root className="relative min-h-screen w-screen overflow-x-auto">
      <main className='w-full flex flex-col'>
        <Navbar />
        {children}
        <Footer />
      </main>
     </ReactLenis>
  );
}
