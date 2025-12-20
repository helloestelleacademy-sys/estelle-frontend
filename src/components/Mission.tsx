'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const features = [
  {
    num:'01',
    coloredTitle:'Become',
    title: "a thought leader",
    text: "Learn how to tell your story that becomes a legacy. Get seen and make an impact.",
  },
  {
    num:'02',
    coloredTitle:'Expert',
    title: "led courses",
    text: "Access to valuable knowledge and mentorship that improves your visibility",
  },
  {
    num:'03',
    coloredTitle:'Earn',    
    title: "valuable credentials",
    text: "Get certified and boost your chances of being trusted by clients & recruiters.",
  },
  {
    num:'04',
   coloredTitle:'Every',   
    title: "legacy begins with a story",
    text: "our mission is to turn everyday people into legacy brands by making personal branding education accessible, practical, and transformative.",
  },
];

const Mission = () => {
    const sectionRef = useRef(null);
    const featuresContainer = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef(null);

    useEffect(()=>{
        const ctx =gsap.context(()=>{
            // we are going to pin the container ref when the section comes into view
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom 60%",
                pin: containerRef.current,
                pinSpacing: true,
                scrub: true,
                markers: false,
            });

            gsap.from(featuresContainer.current, {
                x: 80,
                opacity:0,
                stagger: 0.3,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",    
                    end: "bottom 20%",
                    markers: false,
                }
            });
            
        },  sectionRef)
         return () => ctx.revert();
    },[])

  return (
     <section className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
          Our mission is simple: to turn everyday <br className="hidden md:block" />
          people into legacy brands.
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative bg-[#F3E8FF] rounded-xl p-6 shadow-sm">
            <span className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white text-sm font-semibold text-gray-900">
              1
            </span>

            <h3 className="mt-14 text-lg font-semibold text-gray-900 mb-2">
              Become a thought leader
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Learn how to tell your story that becomes a legacy.
              Get seen and make an impact.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#F3E8FF] rounded-xl p-6 shadow-sm">
            <span className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white text-sm font-semibold text-gray-900">
              2
            </span>

            <h3 className="mt-14 text-lg font-semibold text-gray-900 mb-2">
              Expert led courses
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Access to valuable knowledge and mentorship
              that improves your visibility.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#F3E8FF] rounded-xl p-6 shadow-sm">
            <span className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white text-sm font-semibold text-gray-900">
              3
            </span>

            <h3 className="mt-14 text-lg font-semibold text-gray-900 mb-2">
              Earn valuable credentials
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Get certified and boost your chances of being
              trusted by clients & recruiters.
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative bg-[#F3E8FF] rounded-xl p-6 shadow-sm">
            <span className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white text-sm font-semibold text-gray-900">
              4
            </span>

            <h3 className="mt-14 text-lg font-semibold text-gray-900 mb-2">
              Every legacy begins with a story
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our mission is to turn everyday people into
              legacy brands by making personal branding
              education accessible, practical, and
              transformative.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
