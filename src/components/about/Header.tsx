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
    <section className="header relative min-h-[100vh] overflow-hidden bg-neutral-950 py-26">
        <Image ref={containerRef} src={'/assets/bgrec.png'} alt="auth-image" className="absolute inset-0 object-cover w-full motion-safe:scale-125 bg-image h-[150vh] opacity-0 " width={800} height={300} />
        <div className="absolute inset-0 bg-[#3e1963] mix-blend-multiply"></div>
        
        <div className='relative z-10 flex flex-col justify-center items-center max-w-7xl mx-auto text-white min-h-[100vh] px-4 lg:px-8'>
            <h1 className='heroText text-4xl lg:text-5xl font-bold mb-6 text-center '>Learn Personal branding. Get Certified. Stand Out</h1>
            <p className='paragraph1 text-lg lg:text-lg mb-4 max-w-2xl text-center'>
                Estelle is an e-learning platform designed to make personal branding education universally accessible. Through curated courses, expert mentorship, and interactive learning experiences, we empower individuals
                 and teams to define their voice, showcase their value, and build influence that matters.
            </p>

            <p className='paragraph1 text-sm lg:text-lg mb-4 max-w-2xl mt-4 text-center'>
                Every legacy begins with a story. At Estelle, we help you discover yours and turn it into a brand that outlives trends. We’re more than an e-learning platform, we’re a movement empowering individuals to find their voice, share their story, 
                and build influence that lasts through interactive courses, community learning, and expert guidance, we are shaping a new generation of thinkers, doers, and dreamers who build brands that live beyond them
            </p>
        </div>
      
    </section>
  )
}

export default Header
