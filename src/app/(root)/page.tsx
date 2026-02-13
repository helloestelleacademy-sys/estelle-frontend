import About from "@/components/About";
import Cta from "@/components/Cta";
import DiscountBanner from "@/components/DiscountBanner";
import FAQSection from "@/components/Faq";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Pricing from "@/components/ui/pricing-cards";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Personal Branding & Stand Out",
  description: "Join Estelle to build a powerful personal brand. Access expert courses, get certified, and accelerate your career growth.",
};

export default function Home() {
  return (
    <>
      <Header />
      <DiscountBanner />
      <About />
      <FeaturedCourses />
      <Mission />
      <Pricing />
      <Testimonials />
      <Service />
      <FAQSection />
      <Features />
      <Cta />
    </>
  );
}
