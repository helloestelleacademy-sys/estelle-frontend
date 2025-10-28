'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { testimonials } from '@/constants'

const Testimonials = () => {
    const scrollRef = useRef(null);

    useEffect(()=>{
        const container = scrollRef.current
        const totalWidth = container.scrollWidth / 2

        gsap.to(container, {
             x: -totalWidth,
             duration: 20, 
             ease: 'linear',
             repeat: -1,
             modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // resets position smoothly
            },
        })
        
        
    },[])

  return (
    <section className='py-18 lg:py-24'>
      <div className='max-w-7xl mx-auto flex flex-col items-center justify-center'> 

        <h2 className='text-2xl md:text-3xl lg:text-5xl text-center font-semibold lg:max-w-2xl pb-12'>What our learners are acheiving through learning</h2>

        <div className="relative mt-12 overflow-hidden w-full">
          {/* Double the testimonials to create seamless looping */}
          <div ref={scrollRef} className="flex gap-6 w-[max] px-4">
            {[...testimonials, ...testimonials].map((t, index) => ( // we are mapping through doubled array, making it twice as long
              <div
                key={index}
                className="flex-shrink-0 w-[400px] rounded-2xl px-4 py-6 border border-neutral-200 "
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage className="size-12" src={t.img} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{t.name}</p>
                </div>
                <p className="text-sm text-neutral-400">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
