'use client'
import CourseCard from '@/components/main/CourseCard'
import { useGetAllCoursesQuery } from '@/redux/api/courseApi'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

const CoursePage = () => {
  const cardRef = useRef<(HTMLDivElement | null)[]>([])
  const { data, isLoading, error } = useGetAllCoursesQuery();

  useGSAP(() => {
    if (data?.courses) {
      gsap.from(cardRef.current, { opacity: 0, ease: 'power2.inOut', duration: 1, stagger: 0.08 })
    }
  }, [data])

  return (
    <section className='py-18 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
          {isLoading && <p className="text-center col-span-full">Loading courses......</p>}
          {error && <p className="text-center col-span-full text-red-500">Error loading courses</p>}
          {data && data.courses && data.courses.map((course, index) => (
            <div key={course._id || index} className='' ref={(el) => { cardRef.current[index] = el }}>
              <CourseCard key={course._id || index} id={course._id} img={course.image} title={course.title} time={course.duration} level={course.level} modules={`${course.modules?.length} modules`} price={course.price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoursePage
