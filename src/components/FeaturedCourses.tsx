'use client'
import React from 'react'
import CourseCard from './main/CourseCard'
import { useGetFeaturedCoursesQuery } from '@/redux/api/courseApi'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const FeaturedCourses = () => {
    const { data, isLoading, error } = useGetFeaturedCoursesQuery();

    return (
        <section className='py-18 lg:py-20 min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 md:px-6'>
                <div className='flex justify-center'>
                    <Button className='bg-[#7851A9] px-8 py-6 text-lg'>Featured Courses</Button>
                </div>

                {/* courses */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                    {isLoading && <p className="text-center col-span-full">Loading courses...</p>}
                    {error && <p className="text-center col-span-full text-red-500">Error loading courses</p>}
                    {data && data.courses && data.courses.map((course, index) => (
                        <CourseCard key={course._id || index} img={course.image} title={course.title} time={course.duration} courseType={course.courseType} level={course.level} modules={`${course.modules?.length} modules`} price={course.price} />
                    ))}

                </div>

                <div className='w-fit flex justify-end mt-8 items-center gap-2'>
                    <button className='text-[#7851A9] cursor-pointer'>View More </button>
                    <ArrowRight />
                </div>
            </div>

        </section>
    )
}

export default FeaturedCourses
