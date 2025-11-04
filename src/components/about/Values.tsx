'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BadgeCheck, ArrowUpRight, Accessibility, Archive, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'Authenticity',
    text: 'We believe true influence begins with being real. Every story matters, and every voice deserves to be heard.',
    icon: <BadgeCheck  className="w-14 h-14 text-white" />,
  },
  {
    title: 'Empowerment',
    text: 'We equip people with the tools and confidence to take charge of their growth and build something lasting.',
    icon: <ArrowUpRight className="w-14 h-14 text-white" />,
  },
  {
    title: 'Accessibility',
    text: 'Education on personal branding should be available to everyone, everywhere regardless of background or experience.',
    icon: <Accessibility className="w-14 h-14 text-white" />,
  },
  {
    title: 'Legacy',
    text: "We don't just build brands; we build names that will be remembered.",
    icon: <Archive className="w-14 h-14 text-white" />,
  },
  {
    title: 'Community',
    text: 'Collaboration fuels greatness. We learn, grow, and thrive together.',
    icon: <Users className="w-14 h-14 text-white" />,
  },
]

const Values = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const horizontalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollLength = horizontalRef.current?.scrollWidth || 0
      const viewportWidth = window.innerWidth
      const totalScroll = scrollLength - viewportWidth

      gsap.to(horizontalRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    const tl =gsap.timeline({
      scrollTrigger:{
        trigger:sectionRef.current,
        start:'top center'
      }
    })
    tl.to('.headerText', {opacity:1, y:0, ease:'power2.inOut', duration:0.8,})
    tl.to('.paragraph', {opacity:1, y:0, ease:'power2.inOut', duration:0.8, delay:0.3})

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-22 lg:py-28 w-full min-h-screen bg-[#F7F0FF] overflow-hidden ">
         <h2 className="headerText text-4xl md:text-5xl lg:text-5xl font-semibold mt-6 text-center max-w-xl mx-auto mb-10 opacity-0 translate-y-10">Why Estelle? Our Core <span className="gradient-bg bg-clip-text text-transparent">Values</span></h2>
          {/* <p className='paragraph text-sm text-center max-w-xl mx-auto mb-10 text-neutral-500 opacity-0 translate-y-10'>At Estelle, our mission is to turn everyday people into legacy brands by making personal branding education accessible, practical, and transformative.
          We empower individuals and organizations to discover their unique voice, build meaningful influence, and create impact that lasts.</p> */}
    <div className='flex items-center text-white py-10'>

      <div ref={horizontalRef} className="flex space-x-10 px-[50vw]">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center bg-[#F7F0FF] rounded-2xl min-w-[400px] p-10 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="gradient-bg p-4 rounded-xl mb-6 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-[22px] md:text-[26px] font-semibold mb-3 mt-3 text-black">{step.title}</h3>
            <p className="text-neutral-500 text-sm md:text-[15px] max-w-xs">{step.text}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Values
