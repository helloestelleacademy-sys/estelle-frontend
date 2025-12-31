"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface EnrolledCourse {
    _id: string;
    progress: number;
    course: {
        title: string;
        _id: string;
        image?: string;
        duration?: string;
    };
}

interface EnrolledCoursesListProps {
    enrollments: EnrolledCourse[];
    isLoading: boolean;
}

const EnrolledCoursesList: React.FC<EnrolledCoursesListProps> = ({ enrollments, isLoading }) => {
    if (isLoading) {
        return (
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[1, 2].map((i) => (
                    <div key={i} className='bg-[#FFFBF2] rounded-[32px] p-4 flex flex-col gap-4 shadow-sm h-[400px] border border-stone-50'>
                        <Skeleton className="w-full h-[200px] rounded-t-[24px] rounded-b-[4px]" />
                        <div className='space-y-4 px-2'>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (enrollments.length === 0) {
        return (
            <div className="mt-6 flex flex-col items-center justify-center bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm border border-dashed border-gray-200">
                <BookOpen className="h-10 w-10 mb-4 text-[#7852A9]/50" />
                <p className="mb-4">You are not enrolled in any courses yet.</p>
                <Link href="/courses">
                    <Button variant="outline" className="border-[#7852A9] text-[#7852A9] hover:bg-[#7852A9]/5">
                        Browse Courses
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {enrollments.map((enrollment) => (
                <div key={enrollment._id} className='bg-[#FFFBF2] rounded-[32px] p-2 flex flex-col shadow-sm border border-stone-50 overflow-hidden group hover:shadow-md transition-shadow duration-300'>
                    {/* Course Image */}
                    <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-white flex items-center justify-center">
                        <Image
                            src={enrollment.course.image || '/assets/course_placeholder.jpg'}
                            alt={enrollment.course.title}
                            fill
                            className="object-contain p-2 rounded-[24px] group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className='px-4 pt-6 pb-6 flex flex-col flex-1 justify-between'>
                        <div>
                            {/* Badge matching CourseCard */}
                            <div className='flex items-center gap-2 mb-3'>
                                <span className='px-3 py-1 bg-[#EEE0FF] text-[#7851A9] text-xs font-semibold rounded-full uppercase tracking-wide'>
                                    In Progress
                                </span>
                            </div>

                            <h3 className='text-[20px] font-semibold text-gray-900 leading-tight mb-2 line-clamp-2'>
                                {enrollment.course.title}
                            </h3>
                            <p className='text-[#E0B0FF] font-medium text-sm mb-4'>
                                {enrollment.course.duration || '1 hour'},
                            </p>
                        </div>

                        <div className='mt-auto space-y-4'>
                            <Link href={`/dashboard/courses/${enrollment.course._id}`} className="block w-full">
                                {/* Button matching CourseCard color */}
                                <Button className='w-full bg-[#37296D] hover:bg-[#302362] text-white text-lg font-medium py-6 rounded-xl shadow-lg shadow-purple-900/10 transition-all'>
                                    Resume
                                </Button>
                            </Link>

                            {/* Progress Bar */}
                            <div className="w-full bg-[#E6D9F6] rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-[#C490FF] h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.max(5, enrollment.progress)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EnrolledCoursesList;
