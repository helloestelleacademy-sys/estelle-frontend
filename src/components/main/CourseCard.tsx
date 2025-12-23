// import { BadgeDollarSign, Book, ChartNoAxesCombined, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

type CourseProp = {
    title: string,
    img: string,
    time: string,
    price: string | number,
    level: string,
    modules: string,
    courseType?: string,
}

const CourseCard = ({ title, img, courseType }: CourseProp) => {
    return (
        <div className='rounded-xl shadow-md hover:shadow-lg transition duration-300 relative'>
            <Image src={img} alt='Image' width={200} height={150} className='w-full h-[200px] rounded-2xl inset-0 object-cover' />

            <div className='py-6 px-4 bg-white rounded-2xl -mt-2'>
                <h2 className='font-semibold text-lg'>{title}</h2>

                {/* <div className='flex items-center mt-2'>
                    <div className='flex items-center gap-2'>
                        <TimerIcon  className='text-gray-400' size={18}  />
                        <p className='text-xs text-neutral-400 mt-2'>{time}</p>
                    </div>

                        <p className='pl-3 text-xl flex items-center gap-2'>
                            <BadgeDollarSign className='text-gray-400' size={18} />
                                {price}
                        </p>
                </div> */}
                {/* <hr className='mt-4' /> */}
                <div className='flex items-center justify-between gap-6 mt-4 px-8'>
                    <Button className='bg-[#EEE0FF] w-[120px] text-black hover:bg-[#dbc2fa]'>{courseType}</Button>

                    <h2 className='text-sm'>30 minutes</h2>
                </div>
                <div className='mt-4 w-full flex justify-center px-6'>
                    <Button className='w-full bg-[#37296D] py-6 hover:bg-[#302362]'>Start Learning</Button>
                </div>
                {/* <div className='flex justify-between  mt-2'>
                    <div className='flex items-center gap-2'>
                            <ChartNoAxesCombined  className='text-gray-400' size={18}  />
                            <p className='text-xs text-neutral-400 mt-2'>{level}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Book className='text-gray-400' size={18}  />
                        <p className='text-xs text-neutral-400 mt-2'>{modules}</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CourseCard
