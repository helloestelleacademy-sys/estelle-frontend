"use client";

import React from 'react'
import CourseCard from './main/CourseCard'
import { featuredCourses } from '@/constants'
import { Button } from './ui/button'
import { ArrowBigRight, ArrowRight } from 'lucide-react'
import { useGetAllCoursesQuery } from '@/redux/api/courseApi'

const FeaturedCourses = () => {
    const { data, isLoading } = useGetAllCoursesQuery();

    // Create a local mapping for mock data fallback if you prefer, or rely on backend
    const courses = data?.courses?.slice(0, 3) || [];

    return (
        <section className='py-20 lg:py-24 min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 md:px-6'>
                <div className='flex justify-center'>
                    <Button className='bg-[#7851A9] px-8 py-6 text-lg'>Featured Courses</Button>
                </div>

                {/* courses */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                    {isLoading ? <p className="col-span-3 text-center">Loading...</p> : courses.map((course: any, index: number) => (
                        <CourseCard
                            key={course._id || index}
                            id={course._id}
                            img={course.image}
                            title={course.title}
                            time={course.duration}
                            courseType={course.courseType}
                            level={course.level}
                            modules={`${course.modules?.length} modules`}
                            price={course.price}
                        />
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
