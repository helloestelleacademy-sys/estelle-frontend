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
    <section ref={sectionRef} className='py-22 lg:py-28 w-full min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>

            <div className="relative flex flex-col md:flex-row items-start gap-8">

                 {/* {/* Left column: Headline */}
                 <div ref={containerRef} className="w-full lg:w-1/2 pr-8">
                     <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                    Our mission is simple: to turn everyday people into legacy brands.

                    </h1>
                 </div>

                  {/* Right column: Centered pinned media area */}
                  <div className="w-full lg:w-1/2 pr-8 space-y-6">
                    {features.map((feature, index)=>(
                        <div key={index}
                        ref={(el)=> {featuresContainer.current[index]=el}}
                        className='border-l border-neutral-700 px-6 py-2'>
                            <p className='text-sm'>{feature.num}</p>

                            <div className='mt-6 space-y-6'>
                                <h2 className='text-2xl md:text-3xl max-w-lg'><span className='gradient-bg bg-clip-text text-transparent'>{feature.coloredTitle}</span>{" "}{feature.title}</h2>
                                <h3 className='max-w-2xl text-balance'>{feature.text}</h3>
                            </div>
                        </div>
                    ))}
                  </div>

            </div>
        </div>
    </section>
  )
}

export default Mission
