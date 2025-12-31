"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type CourseProp = {
    id: string,
    title: string,
    img: string,
    time: string,
    price: string | number,
    level: string,
    modules: string,
    courseType?: string,
}

const CourseCard = ({ id, title, img, courseType, time }: CourseProp) => {
    return (
        <div className='bg-[#FFFBF2] rounded-[32px] p-2 flex flex-col shadow-sm border border-stone-50 overflow-hidden group hover:shadow-md transition-shadow duration-300 h-full'>
            {/* Course Image */}
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-white flex items-center justify-center">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className='object-contain p-2 rounded-[24px] group-hover:scale-105 transition-transform duration-500'
                />
            </div>

            <div className='px-4 pt-6 pb-6 flex flex-col flex-1 justify-between'>
                <div>
                    <div className='flex items-center gap-2 mb-3'>
                        <span className='px-3 py-1 bg-[#EEE0FF] text-[#7851A9] text-xs font-semibold rounded-full uppercase tracking-wide'>
                            {courseType || 'Course'}
                        </span>
                    </div>

                    <h2 className='text-[20px] font-semibold text-gray-900 leading-tight mb-2 line-clamp-2'>
                        {title}
                    </h2>

                    <p className='text-[#E0B0FF] font-medium text-sm mb-4'>
                        {time || '1 hour'},
                    </p>
                </div>

                <div className='mt-auto w-full'>
                    <Link href={`/dashboard/courses/${id}`} className='block w-full'>
                        <Button className='w-full bg-[#37296D] hover:bg-[#302362] text-white text-lg font-medium py-6 rounded-xl shadow-lg shadow-purple-900/10 transition-all'>
                            Start Learning
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
