'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetEnrolledCoursesQuery, useGetAllCoursesQuery } from '@/redux/api/courseApi'
import EnrolledCoursesList from '@/components/dashboard/EnrolledCoursesList'
import SuggestedCoursesList from '@/components/dashboard/SuggestedCoursesList'

const Courses = () => {
  const { data: enrolledData, isLoading: isEnrolledLoading } = useGetEnrolledCoursesQuery();
  const { data: allCoursesData, isLoading: isAllCoursesLoading } = useGetAllCoursesQuery({});

  const enrollments = enrolledData?.enrollments || [];
  const allCourses = allCoursesData?.courses || [];

  return (
    <section className='py-8 min-h-screen px-6'>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">Manage your learning and explore new skills.</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-transparent p-0 border-b w-full justify-start rounded-none h-auto">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-base font-medium text-gray-500 data-[state=active]:border-[#7852A9] data-[state=active]:text-[#7852A9] data-[state=active]:shadow-none hover:text-[#7852A9]/80 transition-colors"
            >
              All Courses
            </TabsTrigger>
            <TabsTrigger
              value="my-courses"
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-base font-medium text-gray-500 data-[state=active]:border-[#7852A9] data-[state=active]:text-[#7852A9] data-[state=active]:shadow-none hover:text-[#7852A9]/80 transition-colors"
            >
              My Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <SuggestedCoursesList
              courses={allCourses}
              isLoading={isAllCoursesLoading}
            />
          </TabsContent>

          <TabsContent value="my-courses" className="mt-0">
            <EnrolledCoursesList
              enrollments={enrollments}
              isLoading={isEnrolledLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Courses
