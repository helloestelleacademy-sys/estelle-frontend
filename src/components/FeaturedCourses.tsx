import React from 'react'
import CourseCard from './main/CourseCard'
import { featuredCourses } from '@/constants'

const FeaturedCourses = () => {
  return (
    <section className='py-18 lg:py-24 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
                {/* left */}
                <div>
                    <p className='text-sm text-[#25143b] flex items-center gap-2'><span className='w-[50px] h-0.5 bg-[#76a8ee]' /> Popular Courses</p>
                    <h2 className='text-3xl md:text-2xl lg:text-3xl mt-2 font-semibold'>Master the Art of Personal Branding for Career Success with these courses</h2>
                </div>

                {/* right */}
                <div>
                    <p className='max-w-2xl text-[#7851A9]'>Estelle Academy focuses heavily on practical real world skills, ensuring your teams stay prepared with the top abilities
                        needed to tackle tomorrow&apos;s digital challenges
                    </p>
                </div>
            </div>


            {/* courses */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                {featuredCourses.map((course, index)=>(
                    <CourseCard key={index} img={course.img} title={course.title} time={course.time} level={course.level} modules={course.modules} price={course.price} />
                ))}
                
            </div>
        </div>
      
    </section>
  )
}

export default FeaturedCourses
