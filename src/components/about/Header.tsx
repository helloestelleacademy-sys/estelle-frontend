'use client';
import Image from 'next/image'
import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';

 gsap.registerPlugin(ScrollTrigger, SplitText);
const Header = () => {
    const containerRef =useRef<HTMLImageElement | null>(null);

    useGSAP(()=>{
        const heroText = SplitText.create('.heroText', {type:'words'})
        const paragraphText = SplitText.create('.paragraph1', {type:'words'})


        gsap.to(containerRef.current, {duration:5, opacity:1, scale:1, ease:'power3.out', scrollTrigger:{
                trigger:containerRef.current,
                start:'top 80%'
            }})

        gsap.from(heroText.words, {yPercent:100, opacity:0, stagger:0.09, duration:1, ease:'power2.inOut'})
        gsap.from(paragraphText.words, {yPercent:100, opacity:0, delay:1.2, stagger:0.03, duration:1.2, ease:'power2.inOut'})
        gsap.from('.paragraph2', {yPercent:80, opacity:0, delay:1.5, duration:1.4, ease:'power2.inOut'})
    },[])

  return (
    <section className="header relative min-h-[80vh] overflow-hidden bg-neutral-950">
        <Image ref={containerRef} src={'/assets/aboutImage.png'} alt="auth-image" className="absolute inset-0 object-cover w-full motion-safe:scale-125 bg-image h-[100vh] opacity-0 " width={800} height={300} />
        <div className="absolute inset-0 bg-[#39373b] mix-blend-multiply"></div>
        
        <div className='relative z-10 flex flex-col justify-center max-w-7xl mx-auto text-white min-h-[80vh] px-4 lg:px-8'>
            <h1 className='heroText text-4xl lg:text-7xl font-bold mb-6'>About Estellte</h1>
            <p className='paragraph1 text-lg lg:text-2xl mb-4 max-w-2xl'>Building a Personal Brand that Becomes a Legacy</p>
            <p className='paragraph2 text-sm  mb-8 max-w-2xl'>Learn from experts, gain practical skills, and transform your personal brand through guided courses and resources.</p>
            {/* <div className='flex flex-col sm:flex-row items-center gap-4'>
                <button className='gradient-bg hover:opacity-90 w-[200px] py-4 rounded-full font-semibold'>Get Started</button>
                <button className='border border-white hover:bg-white hover:text-black transition w-[200px] py-4 rounded-full font-semibold'>Learn More</button>
            </div> */}
        </div>
      
    </section>
  )
}

export default Header
