'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Service = () => {

  useGSAP(()=>{
      const tl =gsap.timeline({
            scrollTrigger:{
                trigger:'#service',
                start:'top center',
                end:'bottom 20%'
            }
        })

        tl.from('#service h2', {opacity:0, duration:0.5, ease:'power1.in'})
        tl.from('#service p', {opacity:0, duration:0.2,delay:0.1, ease:'power1.in'})
        tl.from('.serviceImage', {opacity:0, duration:0.5,delay:0.4, ease:'power1.in'}, '-=0.6')
  },[])

  return (
    <section id='service' className='py-18 lg:py-22'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
            {/* left */}
            <div className='w-full md:w-1/2 flex flex-col gap-4'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl mt-2 font-semibold max-w-2xl'>Want personalized services in building your personal brand? </h2>
                <p className='text-xl tracking-wide font-medium'>Send a mail to</p>
                <div className='flex items-center gap-2 text-[#7851A9]'>
                  <Mail />
                <a href='https://info.estelleglobal.com'>info.estelleglobal@gmail.com</a>
                </div>
            </div>
            {/* right */}
            <div className='serviceImage w-full md:w-1/2'>
                <Image src={'/assets/serviceImg.png'} alt='image' width={200} height={150} className='object-cover w-full'/>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Service
