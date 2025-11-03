'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const About = () => {

    useGSAP(()=>{

        const tl =gsap.timeline({
            scrollTrigger:{
                trigger:'#about',
                start:'top center',
                end:'bottom 20%'
            }
        })

        tl.from('.paragraphText', {opacity:0, duration:0.5, ease:'power1.in'})
        tl.from('.subText', {opacity:0, duration:0.2,delay:0.2, ease:'power1.in'})
        tl.from('.button', {opacity:0, duration:0.1,delay:0.1, ease:'power1.in'})
        tl.from('.image', {opacity:0, duration:0.5,delay:0.2, ease:'power1.in'}, '-=0.6')
    },[])

  return (
    <section id='about' className='py-22 lg:py-28 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 lg:px-8 flex flex-col '>
            <h3 className='subText font-bold text-[#7851A9] text-4xl mb-10'>Trusted by hundreds of learners in 10+ countries around the world</h3>

        <div className='flex lg:flex-row flex-col gap-12'>
        {/* left */}
        <div className='space-y-6 flex-1'>

            <h2 className='text-3xl md:text-4xl lg:text-4xl mt-2 font-semibold'>Why Estelle</h2>
            <p className='paragraphText text-neutral-500 max-w-xl text-[18px] tracking-wide text-balance'>Learn how to tell your story that becomes a legacy. Get seen and make an impact. 
            <br />Learn personal branding, Get certified and stand out to boost your chances of being trusted by clients & recruiters.
            </p>


            {/* <div className='flex items-center gap-4 flex-wrap mt-3'>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>Expert-Led Courses</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>Affordable & Accessible</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>For individuals & Teams</p>
                </div>
            </div> */}
            
            <div className='button'>
            <Button className='bg-gradient-to-r gradient-bg  hover:opacity-90 w-[200px] py-6 text-lg'>Read More</Button>
            </div>
        </div>

        {/* right */}
        <div className='image rounded-2xl h-[500px] w-full lg:w-[400px] relative'>
            <Image src={'/assets/aboutImg.jpg'} alt='image' width={200} height={150} className='w-full h-full object-cover rounded-2xl' />
        </div>

        </div>


      </div>
    </section>
  )
}

export default About


