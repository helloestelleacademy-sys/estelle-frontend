'use client'
import React from 'react'
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, ScrollTrigger)

const Details = () => {

  useGSAP(()=>{
    const messageSplit = SplitText.create('.message', {type:'words'})

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'.about',
        start:'top center',
        end: 'bottom center',
      }
    })

    tl.to('.about h2', {opacity:1, y:0, ease:'power2.inOut', duration:0.8})

    tl.from(messageSplit.words, {
      opacity:0,
      yPercent:50,
      ease:'power1.in',
      stagger:0.03,
      duration:0.5,
    })
  },[])

  return (
    <section className='about py-18 lg:py-24 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold opacity-0 translate-y-10'>About Estelle</h2>
            <p className='message max-w-3xl mx-auto text-[20px] text-center text-[#131314] mt-6'>
                Estelle is an e-learning platform designed to make personal branding education universally accessible. Through curated courses, expert mentorship,
                and interactive learning experiences, we empower individuals and teams to define their voice, showcase their value, and build influence that matters.
                
                Every legacy begins with a story. At Estelle, we help you discover yours and turn it into a brand that outlives trends. We are more than an e-learning platform, we are a movement empowering individuals to find their voice, share their story, and build influence that lasts through interactive courses, community learning, and expert guidance,
                we are shaping a new generation of thinkers, doers, and dreamers who build brands that live beyond them.

                Estelle Academy is a cutting-edge online learning platform dedicated to empowering individuals and organizations with the skills needed to thrive in today's digital landscape.
                
            </p>
      </div>
    </section>
  )
}

export default Details
