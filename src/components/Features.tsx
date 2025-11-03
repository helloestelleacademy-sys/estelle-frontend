'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const features =[
    {
        title: "Become an Influence",
        description: "Build  your personal brand to impact others and stay top of mind for your clients and recruiters ",
    },
    {
        title: "Lifetime access to course",
        description: "You can learn at your own pace, gain practical knowledge and show off your certification on your Linkedln profile ",
    },
    {
        title: "Mentorship",
        description: "Gain access to tutors and have 1-1 growth session to enable you stand out with your Personal brand.",
    },
]

const Features = () => {

    const cardRef =useRef<(HTMLDivElement | null)[]>([])

    useGSAP(()=>{
      const tl= gsap.timeline({
        scrollTrigger:'#features',
        start:'top center',
        end:'bottom 20%'
      })

      tl.from('.headerText', {opacity:0, duration:0.5, ease:'power1.in'})
      .from('.paragraph', {opacity:0, duration:0.2, delay:0.2, ease:'power1.in'})
      .from(cardRef.current, {opacity:0, yPercent:100, delay:0.1, ease:'power2.inOut', duration:1, stagger:0.08})

    },[])


  return (
    <section id='features' className='py-18 lg:py-24 '>
      <div className='max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center'>
        <h2 className='headerText text-center text-3xl md:text-4xl lg:text-5xl font-semibold max-w-md lg:max-w-xl mx-auto'>Why learn personal branding on Estelle?</h2>
        <p className='paragraph tracking-wide text-center mt-8'>Trusted by hundreds of learners in 10+ countries around the world</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-18 mt-18'>
            {features.map((feature, index)=>(
                
            <div  ref={(el)=>{cardRef.current[index]= el}} key={index} className="rounded-xl bg-gradient-to-br from-[#f6efff] to-[#e8d9fb] shadow-md p-6 w-80 lg:w-100">
                <div className="flex items-center justify-start mb-8">
                    <div className="rounded-md bg-[#7851A9] p-3 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l-4.5 2.25m0 0l4.5 2.25M8.25 15l2.25-4.5M15.75 9l-4.5-2.25M15.75 9l2.25 4.5m0 0l2.25-4.5M8.25 9l-2.25 2.25M12.75 9l-2.25-4.5m2.25 4.5l4.5 2.25M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
            </div>
            ))}

        </div>
      </div>
    </section>
  )
}

export default Features
