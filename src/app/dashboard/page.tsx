'use client'
import CircularProgressBar from '@/components/CircularProgressBar'
import CourseCard from '@/components/main/CourseCard'
import { User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useGetEnrolledCoursesQuery, useGetFeaturedCoursesQuery } from '@/redux/api/courseApi'
import { useUserProfileQuery } from '@/redux/api/userApi'


const Dashboard = () => {
    const { data: userProfile } = useUserProfileQuery();
    const { data: enrolledData, isLoading: isEnrollLoading } = useGetEnrolledCoursesQuery();
    const { data: featuredData, isLoading: isFeaturedLoading } = useGetFeaturedCoursesQuery();

    const user = userProfile;
    const enrollments = enrolledData?.enrollments || [];
    const featuredCourses = featuredData?.courses || [];

    return (
        <section className='w-full flex flex-col md:flex-row min-h-screen gap-6'>
            <div className='w-full md:w-[64vw] '>
                {/* top -banner */}
                <div className='w-full rounded-3xl bg-[#7851A9] px-8 py-10 text-white'>
                    <p className='tracking-wider uppercase text-sm mt-4'>Basic Course</p>
                    <h2 className='text-3xl max-w-[400px] mt-4 font-semibold text-balance'>Build a Personal Brand that Becomes a Legacy</h2>
                </div>

                {/* details - Enrolled Courses Progress */}
                <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {isEnrollLoading ? <p>Loading progress...</p> :
                        enrollments.length === 0 ? <p className="text-gray-500 p-4">You are not enrolled in any courses yet.</p> :
                            enrollments.map((enrollment) => (
                                <div key={enrollment._id} className='bg-white flex items-center rounded-3xl px-6 py-4 gap-3 shadow-sm'>
                                    <div className='py-3  px-3 bg-[#7851A9] text-white rounded-full'>
                                        <UserIcon className='' />
                                    </div>

                                    <div className='space-y-1'>
                                        <p className='text-xs text-gray-400'>{enrollment.progress}% Complete</p>
                                        <p className='font-medium text-sm truncate max-w-[200px]'>{enrollment.course.title}</p>
                                    </div>
                                </div>
                            ))}
                </div>

                {/* my learning - Suggested/Featured */}
                <div className='mt-6'>
                    <h2 className='text-2xl font-semibold'>Continue Learning</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4'>
                        {isFeaturedLoading ? <p>Loading suggestions...</p> :
                            featuredCourses.slice(0, 3).map((course, idx) => (
                                <CourseCard
                                    key={course._id || idx}
                                    id={course._id}
                                    img={course.image}
                                    title={course.title}
                                    time={course.duration}
                                    level={course.level}
                                    modules={`${course.modules?.length} modules`}
                                    price={course.price}
                                    courseType={course.courseType}
                                />
                            ))}
                    </div>
                </div>

            </div>

            <div className='w-full md:w-1/3 bg-white py-6 px-4 rounded-2xl'>
                <h2 className='text-2xl text-[#7851A9]'>Statistics</h2>

                <div className='flex flex-col h-full justify-between'>
                    <div className="flex flex-col items-center mt-10  bg-gray-50 p-6 rounded-xl">
                        <CircularProgressBar
                            progress={enrollments.length > 0 ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progress, 0) / enrollments.length) : 0}
                            imageUrl={user?.img || "https://i.pravatar.cc/150?img=3"}
                        />
                        <h2 className="mt-4 text-lg font-medium text-black">{user ? `${user.firstName} ${user.lastName}` : 'User'}</h2>
                        <p className="text-xs text-gray-400 mt-2 text-center">Ready to build your personal brand today?</p>
                    </div>

                    <div className='px-6 py-4'>
                        <p className='text-start font-medium text-sm'>Your Mentor</p>

                        <div className='flex items-center gap-4 mt-4'>
                            <div>
                                <Image src={'/assets/stella.jpg'} alt='image' width={60} height={50} className='object-cover size-14 rounded-full' />
                            </div>
                            <div>
                                <p className='font-medium text-sm'>Stella Nwosu</p>
                                <p className='text-xs text-neutral-400'>Brand Manager</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Dashboard
