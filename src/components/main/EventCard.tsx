"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type EventProp = {
    id: string,
    title: string,
    img: string,
    date: string,
    location: string,
    price: string | number,
}

const EventCard = ({ id, title, img, date, location }: EventProp) => {
    return (
        <div className='bg-[#FFFBF2] rounded-[32px] p-2 flex flex-col shadow-sm border border-stone-50 overflow-hidden group hover:shadow-md transition-shadow duration-300 h-full'>
            {/* Event Image */}
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-white flex items-center justify-center">
                <Image
                    src={img || '/assets/headerImg.png'}
                    alt={title}
                    fill
                    className='object-cover p-2 rounded-[24px] group-hover:scale-105 transition-transform duration-500'
                />
            </div>

            <div className='px-4 pt-6 pb-6 flex flex-col flex-1 justify-between'>
                <div>
                    <div className='flex items-center gap-2 mb-3'>
                        <span className='px-3 py-1 bg-[#EEE0FF] text-[#7851A9] text-xs font-semibold rounded-full uppercase tracking-wide'>
                            Event
                        </span>
                    </div>

                    <h2 className='text-[20px] font-semibold text-gray-900 leading-tight mb-2 line-clamp-2'>
                        {title}
                    </h2>

                    <p className='text-[#7851A9] font-medium text-sm mb-1'>
                        {new Date(date).toLocaleDateString('en-US', { dateStyle: 'full' })}
                    </p>
                    <p className='text-gray-600 text-sm mb-4'>
                        {location}
                    </p>
                </div>

                <div className='mt-auto w-full'>
                    <Link href={`/events/${id}`} className='block w-full'>
                        <Button className='w-full bg-[#37296D] hover:bg-[#302362] text-white text-lg font-medium py-6 rounded-xl shadow-lg shadow-purple-900/10 transition-all'>
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCard
