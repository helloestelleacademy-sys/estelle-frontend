'use client'
import CourseCard from '@/components/main/CourseCard'
import { useGetEnrolledCoursesQuery } from '@/redux/api/courseApi'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Courses = () => {
  const { data, isLoading, error } = useGetEnrolledCoursesQuery();

  return (
    <section className='py-8 bg-white min-h-screen px-6'>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {isLoading && <p>Loading your courses...</p>}

      {error && <p className="text-red-500">Error loading courses.</p>}

      {!isLoading && data?.enrollments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 mb-4">You have not enrolled in any courses yet.</p>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {data?.enrollments.map((enrollment) => (
          <CourseCard
            key={enrollment._id}
            id={enrollment.course._id}
            title={enrollment.course.title}
            img={enrollment.course.image}
            time={enrollment.course.duration}
            level={enrollment.course.level}
            modules={`${enrollment.course.modules?.length || 0} modules`}
            price={enrollment.course.price}
            courseType={enrollment.course.courseType}
          />
        ))}
      </div>
    </section>
  )
}

export default Courses
