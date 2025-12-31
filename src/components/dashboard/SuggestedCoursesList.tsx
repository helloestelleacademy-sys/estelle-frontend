"use client";

import React from 'react';
import CourseCard from '@/components/main/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

interface SuggestedCoursesListProps {
    courses: any[];
    isLoading: boolean;
}

const SuggestedCoursesList: React.FC<SuggestedCoursesListProps> = ({ courses, isLoading }) => {
    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return <p className="text-gray-500 mt-4">No suggestions available at the moment.</p>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {courses.slice(0, 3).map((course, idx) => (
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
    );
};

export default SuggestedCoursesList;
