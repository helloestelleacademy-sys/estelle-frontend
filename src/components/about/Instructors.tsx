'use client'
import React, { useRef } from 'react'
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

const instructors =[
    {
        name: "Stella Nwosu",
        role: "Personal Branding Strategist",
        image: "/assets/stella.jpg",
    },

    {
        name: "Brenda Blanche",
        role: "Personal Branding Coach",  
        image: "/assets/brenda1.jpg",
    }
]

const Instructors = () => {

  const cardsRef =useRef<Array<HTMLDivElement | null>>([])

  // useGSAP(()=>{
  //   const tl = gsap.timeline({
  //     scrollTrigger:{
  //       trigger:'.instructors',
  //       start:'top center',
  //       markers:true,
  //     }
  //   })

  //   tl.from(cardsRef.current, { yPercent:50, opacity:0, stagger:0.2, ease:'power1.inOut', duration:0.8})
  // },[])

  return (
    <section className='instructors py-22 lg:py-28 w-full min-h-screen bg-black' >
        <div className='max-w-7xl mx-auto px-4 lg:px-8 text-white'>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-6 text-center max-w-xl mx-auto mb-10">Our Instructors</h2>

             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {instructors.map((instructor, index)=>(

                <div  key={index}
                ref={(el) => {cardsRef.current[index] = el}}
                className='flex flex-col items-center text-center'>
                    <div className='w-60 h-60 rounded-full overflow-hidden mb-6'>
                        <img src={instructor.image} alt='Instructor 1' className='w-full h-full object-cover' />
                    </div>
                    <h3 className='text-3xl font-semibold'>{instructor.name}</h3>
                    <p className='text-sm text-gray-300 mt-2'>{instructor.role}</p>
                </div>
              ))}

             </div>
        </div>
      
    </section>
  )
}

export default Instructors
