import About from "@/components/About";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
    </div>
  );
}
