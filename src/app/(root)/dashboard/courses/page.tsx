import CourseCard from '@/components/CourseCard'
import React from 'react'

const Courses = () => {
  return (
    <section className='py-8 bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  )
}

export default Courses
