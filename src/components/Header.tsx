'use client';
import Image from "next/image"
import React from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import DiscountBanner from './DiscountBanner';

gsap.registerPlugin(ScrollTrigger);
const Header = () => {
    return (
        <section id='header' className='flex flex-col' >
            <DiscountBanner />
            <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F0FF] flex items-center justify-center px-6 md:px-16 lg:px-24 py-28">

                <div className='flex flex-col justify-center lg:text-left text-black'>
                    <h1 className='text-4xl lg:text-[56px] font-bold mb-6 max-w-3xl'>Build a <span className='text-[#7852A9]'>Personal brand</span> that becomes a {' '}
                        <span className='font-source'>Legacy</span></h1>
                    <p className='lg:text-xl mb-8 max-w-2xl text-sm'>Attract global opportunities, become an Influence, and transform your personal brand through guided courses and resources.</p>

                    <p className='text-sm mb-8 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>210,000 naira/ Premium plan, </span>instant 30% cash back guarantee</p>
                    <div className='flex flex-col sm:flex-row items-start gap-4'>
                        <a href='https://mainstack.store/stellanwosu/w2RdFBdyAPo7' className='flex items-center justify-center bg-white text-[#7852A9] hover:opacity-90  py-4 rounded-lg font-bold w-full md:w-[200px]'>Start Learning</a>
                        <a href='https://mainstack.store/stellanwosu/w2RdFBdyAPo7' className='flex items-center justify-center gradient-bg text-white hover:bg-white hover:text-black transition w-full  md:w-[200px] py-4 rounded-lg font-bold'>Learn More</a>
                    </div>
                    <p className='text-sm mt-6 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>Life time learning access</span> to Courses and AI resources</p>
                </div>

                <div className="flex justify-center lg:justify-end relative">
                    <div className="relative w-72 h-72 md:w-110 md:h-96">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full bg-[#D9B3FF]"></div>

                        {/* Your Image */}
                        <Image
                            src="/assets/headerImg.png"
                            alt="Hero Person"
                            className="absolute -bottom-30 right-0 w-[120%] h-auto object-contain"
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Header
