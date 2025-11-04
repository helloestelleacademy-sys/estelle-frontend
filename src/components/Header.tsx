'use client';
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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F7F0FF] flex items-center justify-center px-6 md:px-16 lg:px-24 py-26">
        
        <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>

            <div className='flex flex-col justify-center lg:text-left text-black'>
                <h1 className='text-4xl lg:text-6xl font-bold mb-6 max-w-3xl'>Build a Personal brand that becomes a {' '}
                        <span className='font-source'>Legacy</span></h1>
                <p className='lg:text-xl mb-8 max-w-2xl text-sm'>Learn from experts, gain practical skills, and transform your personal brand through guided courses and resources.</p>
                
                <p className='text-sm mb-8 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>35,000 naira/ basic plan </span>, lifetime access</p>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                    <button className=' bg-[#37296D] hover:opacity-90 text-white py-4 rounded-full font-semibold w-full md:w-[200px]'>Start Learning</button>
                    <button className='gradient-bg text-white hover:bg-white hover:text-black transition w-full  md:w-[200px] py-4 rounded-full font-semibold'>Learn More</button>
                </div>
                <p className='text-sm mt-6 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>210,000 naira/ Premium plan </span>, instant 5% cash back guarantee</p>
            </div>
            

            <div className="flex justify-center lg:justify-end relative">
                <div className="relative w-72 h-72 md:w-110 md:h-96">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full bg-[#D9B3FF]"></div>

                    {/* Your Image */}
                    <img
                    src="/assets/headerImg.png"
                    alt="Hero Person"
                    className="absolute -bottom-30 right-0 w-[120%] h-auto object-contain"
                    />
                </div>
            </div>
            {/* <div className='flex-1'>
                 <Image ref={containerRef} src={'/assets/headerImg.png'} alt="auth-image" width={200} height={150} className='w-[400px] h-full object-cover' />
            </div> */}
        </div>
      
    </section>
  )
}

export default Header

// Build a Personal Brand that Becomes a Legacy
// Learn from experts, gain practical skills, and transform your personal brand through guided courses and resources.
