'use client'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import CreateCourse from '@/components/admin/CreateCourse';
import CourseCard from '@/components/main/CourseCard'
import { useGetAllCoursesQuery } from '@/redux/api/courseApi'

const Courses = () => {
  const cardRef = useRef<(HTMLDivElement | null)[]>([])
  const { data, isLoading, error } = useGetAllCoursesQuery();

  useGSAP(() => {
    if (data?.courses) {
      gsap.from(cardRef.current, { opacity: 0, ease: 'power2.inOut', duration: 1, stagger: 0.08 })
    }
  }, [data])

  return (
    <section className=''>
      <div className='px-4 md:px-6'>
        <div className='flex items-center w-full justify-between mb-10 px-4 md:px-6'>
          <h2 className='text-2xl font-semibold'>All Courses</h2>
          <CreateCourse />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
          {isLoading && <p className="text-center col-span-full">Loading courses...</p>}
          {error && <p className="text-center col-span-full text-red-500">Error loading courses</p>}
          {data && data.courses && data.courses.map((course, index) => (
            <div key={course._id || index} className='' ref={(el) => { cardRef.current[index] = el }}>
              <CourseCard key={course._id || index} img={course.image} title={course.title} time={course.duration} level={course.level} modules={`${course.modules?.length} modules`} price={course.price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
