'use client';
import React from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);
const Header = () => {
    // const containerRef =useRef<HTMLImageElement | null>(null);

    // useGSAP(()=>{
    //     gsap.to
    // },{scope:containerRef})

    return (
        <section id='header' className='flex flex-col' >
            <div className='w-full bg-red-600 py-8 px-2'>
                <div className='max-w-6xl mx-auto flex items-center text-white text-sm md:text-2xl lg:text-3xl justify-between'>
                    <h2 className=''>30% Discount!!!</h2>

                    <h2>DON&apos;T MISS THIS OFFER</h2>

                    <div className='flex items-center gap-4 md:gap-8'>
                        <div className='flex flex-col items-center'>
                            <h2 className='font-semibold'>24</h2>
                            <p className='text-sm '>hours</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h2 className='font-semibold'>36</h2>
                            <p className='text-sm '>mins</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h2 className='font-semibold'>14</h2>
                            <p className='text-sm '>seconds</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F0FF] flex items-center justify-center px-6 md:px-16 lg:px-24 py-28">

                <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>

                    <div className='flex flex-col justify-center lg:text-left text-black'>
                        <h1 className='text-4xl lg:text-6xl font-bold mb-6 max-w-3xl'>Build a Personal brand that becomes a {' '}
                            <span className='font-source'>Legacy</span></h1>
                        <p className='lg:text-xl mb-8 max-w-2xl text-sm'>Learn from experts, gain practical skills, and transform your personal brand through guided courses and resources.</p>

                        <p className='text-sm mb-8 font-semibold'> <span className='gradient-bg bg-clip-text text-transparent'>35,000 naira/ basic plan </span>, lifetime access</p>
                        <div className='flex flex-col sm:flex-row items-start gap-4'>
                            <a href='https://mainstack.store/stellanwosu/w2RdFBdyAPo7' className='flex items-center justify-center bg-[#37296D] hover:opacity-90 text-white py-4 rounded-full font-semibold w-full md:w-[200px]'>Start Learning</a>
                            <a href='https://mainstack.store/stellanwosu/w2RdFBdyAPo7' className='flex items-center justify-center gradient-bg text-white hover:bg-white hover:text-black transition w-full  md:w-[200px] py-4 rounded-full font-semibold'>Learn More</a>
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

            </div>

        </section>
    )
}

export default Header

// Build a Personal Brand that Becomes a Legacy
// Learn from experts, gain practical skills, and transform your personal brand through guided courses and resources.
