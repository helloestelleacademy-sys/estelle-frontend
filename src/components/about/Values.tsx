'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// const steps = [
//   {
//     title: 'Authenticity',
//     text: 'We believe true influence begins with being real. Every story matters, and every voice deserves to be heard.',
//     icon: <BadgeCheck  className="w-14 h-14 text-white" />,
//   },
//   {
//     title: 'Empowerment',
//     text: 'We equip people with the tools and confidence to take charge of their growth and build something lasting.',
//     icon: <ArrowUpRight className="w-14 h-14 text-white" />,
//   },
//   {
//     title: 'Accessibility',
//     text: 'Education on personal branding should be available to everyone, everywhere regardless of background or experience.',
//     icon: <Accessibility className="w-14 h-14 text-white" />,
//   },
//   {
//     title: 'Legacy',
//     text: "We don't just build brands; we build names that will be remembered.",
//     icon: <Archive className="w-14 h-14 text-white" />,
//   },
//   {
//     title: 'Community',
//     text: 'Collaboration fuels greatness. We learn, grow, and thrive together.',
//     icon: <Users className="w-14 h-14 text-white" />,
//   },
// ]

const Values = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)


  return (
    <section ref={sectionRef} className="relative py-18 lg:py-22 w-full min-h-screen overflow-hidden ">
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex items-center justify-center'>
          <h2 className="headerText md:text-lg lg:text-xl text-[#7852A9] font-semibold mt-6 text-center  mb-10 rounded-3xl  px-4 py-2 bg-[#E2CBFF85] translate-y-10"> Our Core Values</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>


          <div className='bg-white shadow-md border border-gray-100/10 px-6 py-3 flex flex-col items-center justify-center'>
            <Image src={'/assets/influence.svg'} alt='icon' width={50} height={40} />

            <h2 className="text-xl font-semibold mb-2 text-center text-[#7852A9] mt-6">Authenticity</h2>
            <p className="text-gray-600 text-center text-sm text-balance">We believe true influence begins with being real. Every story matters, and every voice deserves to be heard.</p>
          </div>

          <div className='bg-white shadow-md border border-gray-100/10 px-6 py-3 flex flex-col items-center justify-center'>
            <Image src={'/assets/influence.svg'} alt='icon' width={50} height={40} />

            <h2 className="text-xl font-semibold mb-2 text-center text-[#7852A9] mt-6">Empowerment</h2>
            <p className="text-gray-600 text-sm text-center text-balance">We equip people with the tools and confidence to take charge of their growth and build something lasting.</p>
          </div>

          <div className='bg-white shadow-md border border-gray-100/10 px-6 py-3 flex flex-col items-center justify-center'>
            <Image src={'/assets/influence.svg'} alt='icon' width={50} height={40} />

            <h2 className="text-xl font-semibold mb-2 text-center text-[#7852A9] mt-6">Authenticity</h2>
            <p className="text-gray-600 text-center text-sm text-balance">We believe true influence begins with being real. Every story matters, and every voice deserves to be heard.</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4'>
          <div className='bg-white shadow-md border border-gray-100/10 px-6 py-3 flex flex-col items-center justify-center'>
            <Image src={'/assets/influence.svg'} alt='icon' width={50} height={40} />

            <h2 className="text-xl font-semibold mb-2 text-center text-[#7852A9] mt-6">Legacy</h2>
            <p className="text-gray-600 text-sm text-center text-balance">We don&apos;t just build brands; we build names that will be remembered.</p>
          </div>

          <div className='bg-white shadow-md border border-gray-100/10 px-6 py-3 flex flex-col items-center justify-center'>
            <Image src={'/assets/influence.svg'} alt='icon' width={50} height={40} />

            <h2 className="text-xl font-semibold mb-2 text-center text-[#7852A9] mt-6">Community</h2>
            <p className="text-gray-600 text-center text-sm text-balance">Collaboration fuels greatness. We learn, grow, and thrive together.</p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Values
