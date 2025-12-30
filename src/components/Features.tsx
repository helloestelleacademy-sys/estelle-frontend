'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React, { useRef } from 'react'

const features = [
  {
    title: "Become an Influence",
    description: "Build  your personal brand to impact others and stay top of mind for your clients and recruiters ",
    icon: '/assets/influence.svg'
  },
  {
    title: "Lifetime access to course",
    description: "You can learn at your own pace, gain practical knowledge and show off your certification on your Linkedln profile ",
    icon: '/assets/infintiy.svg'
  },
  {
    title: "Mentorship",
    description: "Gain access to tutors and have 1-1 growth session to enable you stand out with your Personal brand.",
    icon: '/assets/Mentor.svg'
  },
]

const Features = () => {

  const cardRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: '#features',
      start: 'top 80%',
      end: 'bottom 20%'
    })

    tl.from('.headerText', { opacity: 0, duration: 0.5, ease: 'power1.in' })
      .from('.paragraph', { opacity: 0, duration: 0.2, ease: 'power1.in' })
      .from(cardRef.current, { opacity: 0, yPercent: 50, delay: 0.1, ease: 'power2.inOut', duration: 1, stagger: 0.02 })

  }, [])


  return (
    <section id='features' className='py-20 lg:py-24 bg-[#F7F0FF]'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center'>
        <h2 className='headerText text-center text-xl md:text-2xl lg:text-3xl font-semibold max-w-md lg:max-w-xl mx-auto text-[#7852A9]'>Why learn personal branding on Estelle?</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18 mt-18'>
          {features.map((feature, index) => (

            <div ref={(el) => { cardRef.current[index] = el }} key={index} className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-start mb-8">
                <div className="rounded-md p-3 mr-3 h-[60px]">
                  <Image src={feature.icon} alt='icon' width={60} height={40} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-center text-[#7852A9]">{feature.title}</h2>
              <p className="text-gray-600 text-center text-balance">{feature.description}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Features
