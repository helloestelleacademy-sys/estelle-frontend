'use client'
import CourseCard from '@/components/main/CourseCard'
import { AllCourses } from '@/constants'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import CreateCourse from '@/components/admin/CreateCourse';

// gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const cardRef =useRef<(HTMLDivElement | null)[]>([])


  useGSAP(()=>{
    gsap.from(cardRef.current, {opacity:0, ease:'power2.inOut', duration:1, stagger:0.08})
  },[])

  return (
    <section className=''>
      <div className='px-4 md:px-6'>
      <div className='flex items-center w-full justify-between mb-10 px-4 md:px-6'>
      <h2 className='text-2xl font-semibold'>All Courses</h2>
      <CreateCourse />
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {AllCourses.map((course, index)=>(
              <div key={index} className='' ref={(el)=>{cardRef.current[index]= el}}>
                <CourseCard key={index} img={course.img} title={course.title} time={course.time} level={course.level} modules={course.modules} price={course.price} />
              </div>
            ))}        
        </div>
      </div>
    </section>
  )
}

export default Courses
