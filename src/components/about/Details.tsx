'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'

const Details = () => {

  useGSAP(()=>{
      const tl =gsap.timeline({
            scrollTrigger:{
                trigger:'#details',
                start:'top center',
                end:'bottom 20%'
            }
        })

        tl.from('#details h2', {opacity:0, duration:0.5, ease:'power1.in'})
        tl.from('#details p', {opacity:0, duration:0.2,delay:0.1, ease:'power1.in'})
        tl.from('.details Image', {opacity:0, duration:0.5,delay:0.4, ease:'power1.in'}, '-=0.6')
  },[])

  return (
    <section id='details' className='py-18 lg:py-22'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 mb-20'>
            {/* left */}
             <div className='serviceImage w-full md:w-1/2'>
                <Image src={'/assets/serviceImg.png'} alt='image' width={200} height={150} className='object-cover w-full'/>
            </div>
            {/* right */}
            <div className='w-full md:w-1/2 flex flex-col gap-4'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl mt-2 font-semibold max-w-2xl text-[#7851A9]'>Our Mission </h2>
                <p className='text-lg tracking-wide'>
                  At Estelle, our mission is to turn everyday people into legacy brands by making personal branding education accessible, practical, and transformative.We empower individuals and organizations to discover their unique voice, build meaningful influence, and create impact that lasts beyond them through learning, community, and purposeful storytelling.
                </p>

            </div>
           
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-10 mt-20'>
            {/* left */}
            <div className='w-full md:w-1/2 flex flex-col gap-4'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl mt-2 font-semibold max-w-2xl text-[#7851A9]'>Our Vision </h2>
                <p className='text-lg tracking-wide'>
                To become the world most trusted e-learning platform for personal brand education, inspiring a global movement of people who live with clarity,
                 lead with purpose, and leave a lasting legacy through their work and story.

                </p>

            </div>
            {/* right */}

            <div className='serviceImage w-full md:w-1/2'>
                <Image src={'/assets/heroImg.jpg'} alt='image' width={200} height={150} className='object-cover w-full'/>
            </div>
           
        </div>
      </div>
    </section>
  )
}

export default Details
