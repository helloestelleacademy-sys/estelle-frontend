'use client'

import React from 'react'
import { useGetEnrolledCoursesQuery, useGetFeaturedCoursesQuery } from '@/redux/api/courseApi'
import { useUserProfileQuery } from '@/redux/api/userApi'
import DashboardBanner from '@/components/dashboard/DashboardBanner'
import EnrolledCoursesList from '@/components/dashboard/EnrolledCoursesList'
import SuggestedCoursesList from '@/components/dashboard/SuggestedCoursesList'
import UserStatistics from '@/components/dashboard/UserStatistics'

const Dashboard = () => {
    // Parallel data fetching hook execution (React Query/RTK Query handles deduping)
    const { data: userProfile } = useUserProfileQuery();
    const { data: enrolledData, isLoading: isEnrollLoading } = useGetEnrolledCoursesQuery();
    const { data: featuredData, isLoading: isFeaturedLoading } = useGetFeaturedCoursesQuery();

    const user = userProfile;
    const enrollments = enrolledData?.enrollments || [];
    const featuredCourses = featuredData?.courses || [];

    return (
        <section className='w-full flex flex-col xl:flex-row min-h-screen gap-8 pb-10'>
            {/* Left Main Content */}
            <div className='w-full xl:w-[65%] flex flex-col gap-8'>

                {/* Hero Banner */}
                <DashboardBanner />

                {/* Enrolled Courses Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-1">My Progress</h3>
                    <EnrolledCoursesList
                        enrollments={enrollments}
                        isLoading={isEnrollLoading}
                    />
                </div>

                {/* Suggested/Featured Section */}
                <div>
                    <div className="flex justify-between items-center mb-2 ml-1">
                        <h2 className='text-xl font-semibold text-gray-800'>Continue Learning</h2>
                        {/* Optional 'View All' link could go here */}
                    </div>
                    <SuggestedCoursesList
                        courses={featuredCourses}
                        isLoading={isFeaturedLoading}
                    />
                </div>

            </div>

            {/* Right Sidebar - Statistics */}
            <div className='w-full xl:w-[35%]'>
                <UserStatistics
                    user={user}
                    enrollments={enrollments}
                />
            </div>
        </section>
    )
}

export default Dashboard

