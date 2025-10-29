'use client';
import Image from 'next/image'
import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';

 gsap.registerPlugin(ScrollTrigger);
const Header = () => {
    const containerRef =useRef<HTMLImageElement | null>(null);

    useGSAP(()=>{
        gsap.to(containerRef.current, {duration:5, opacity:1, scale:1, ease:'power3.out', scrollTrigger:{
                trigger:containerRef.current,
                start:'top 80%'
            }})
    },{scope:containerRef})

  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-950">
        <Image ref={containerRef} src={'/assets/aboutImage.png'} alt="auth-image" className="absolute inset-0 object-cover w-full motion-safe:scale-125 bg-image h-[100vh] opacity-0 " width={800} height={300} />
        <div className="absolute inset-0 bg-[#39373b] mix-blend-multiply"></div>
        
        <div className='relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4 lg:px-8'>
            <h1 className='text-4xl lg:text-6xl font-bold mb-6'>About Estellte</h1>
            <p className='text-lg lg:text-2xl mb-8 max-w-2xl'>Your Gateway to Expert-Led Courses and Affordable Learning</p>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
                <button className='gradient-bg hover:opacity-90 w-[200px] py-4 rounded-full font-semibold'>Get Started</button>
                <button className='border border-white hover:bg-white hover:text-black transition w-[200px] py-4 rounded-full font-semibold'>Learn More</button>
            </div>
        </div>
      
    </section>
  )
}

export default Header
