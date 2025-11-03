'use client'
import CourseCard from '@/components/main/CourseCard'
import { AllCourses } from '@/constants'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const cardRef =useRef<(HTMLDivElement | null)[]>([])


  useGSAP(()=>{
    gsap.from(cardRef.current, {opacity:0, ease:'power2.inOut', duration:1, stagger:0.08})
  },[])

  return (
    <section className='py-18 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {AllCourses.map((course, index)=>(
              <div className='' ref={(el)=>{cardRef.current[index]= el}}>
                <CourseCard key={index} img={course.img} title={course.title} time={course.time} level={course.level} modules={course.modules} price={course.price} />
              </div>
            ))}        
        </div>
      </div>
    </section>
  )
}

export default Courses
