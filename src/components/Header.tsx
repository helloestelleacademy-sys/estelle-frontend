'use client';
import Image from "next/image"
import React from 'react'
import Link from 'next/link';
import { HeroGeometric } from './ui/shape-landing-hero';

const Header = () => {
    return (
        <section id='header' className='flex flex-col' >

            <HeroGeometric className="bg-[#F7F0FF] min-h-0">
                {/* same max-w-6xl / gutters as the navbar so the logo and headline share one left edge */}
                <div className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-36 lg:pt-40 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-8">

                    <div className='flex flex-col justify-center lg:text-left text-black lg:self-center lg:pb-12'>
                        <h1 className='text-4xl lg:text-[56px] font-bold mb-6 max-w-3xl'>Build a <span className='text-[#7852A9]'>Personal brand</span> that becomes a Legacy</h1>
                        <p className='lg:text-xl mb-8 max-w-2xl text-sm'>Attract global opportunities, become an Influence, and transform your personal brand through guided courses and resources.</p>

                        <div className='flex flex-col sm:flex-row items-start gap-4'>
                            <Link href='/waitlist' className='flex items-center justify-center gradient-bg text-white hover:bg-[#563b7a] active:bg-black transition w-full md:w-[200px] py-4 rounded-md font-bold'>Join the Waitlist</Link>
                        </div>
                        <p className='text-sm mt-6 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>Life time learning access</span> to Courses and AI resources</p>
                    </div>

                    {/* portrait cropped at the waist, with the circle sized to sit behind the head only */}
                    <div className="relative w-[280px] sm:w-[340px] lg:w-[420px] aspect-[1/1.05] overflow-hidden shrink-0">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[54%] aspect-square rounded-full bg-[#D9B3FF]"></div>
                        <Image
                            src="/assets/stelaPurple.png"
                            alt="Estelle founder in a purple dress"
                            className="absolute inset-x-0 top-0 w-full h-auto z-10"
                            width={1024}
                            height={1536}
                            sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 280px"
                            priority
                        />
                    </div>
                </div>

            </HeroGeometric>
        </section>
    )
}

export default Header
