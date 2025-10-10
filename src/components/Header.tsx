import Image from 'next/image'
import React from 'react'
import bg from '@/assets/estelleBg.svg'
import { Button } from './ui/button'

const Header = () => {
  return (
    <section className='relative min-h-screen overflow-hidden'>
        <Image src={bg} alt='image'  className='w-full absolute h-full inset-0 object-cover'/>

        <div className='relative pt-32 max-w-6xl mx-auto px-4 flex flex-col items-center sm:flex-row gap-20'>
            <div className='flex flex-col gap-6'>
                <h2 className='font-semibold text-[48px] md:text-[56px] lg:text-[60px] md:max-w-[600px] leading-16  md:leading-18 text-white tracking-tight'>Build a Personal 
                Brand that Becomes a Legacy</h2>

                <p className='max-w-[600px] text-[20px] md:text-[24px] lg:text-[26px] tracking-tight text-white/60'>Learn from experts, gain practical skills, and transform your personal brand through 
                    guided courses and resources.</p>

                <div className='flex flex-col sm:flex-row gap-4 md:gap-10'>
                    <Button className='sm:w-[150px] py-5 bg-white text-black font-semibold'>Learn more</Button>
                    <Button className='bg-[#7852A9] sm:w-[150px] py-5 font-semibold'>Signup</Button>
                </div>
            </div>

            <div className='relative '>
                {/* <Image src={'/assets/ellipse.png'} alt='image' width={300} height={200} className='object-cover absolute -z-[0]'/> */}
                <Image src={'/assets/headerImg.png'} alt='image' width={500} height={300} className='object-cover z-10'/>
            </div>
        </div>
    </section>
  )
}

export default Header
