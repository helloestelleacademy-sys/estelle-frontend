import About from "@/components/About";
import Cta from "@/components/Cta";
import FAQSection from "@/components/Faq";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Mission />
      <FeaturedCourses />
      <Features />
      <Pricing />
      <Testimonials />
      <Service />
      <FAQSection />
      <Cta />
    </>
  );
}
