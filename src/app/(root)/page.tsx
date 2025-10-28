import About from "@/components/About";
import Cta from "@/components/Cta";
import FeaturedCourses from "@/components/FeaturedCourses";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Mission />
      <FeaturedCourses />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
}
