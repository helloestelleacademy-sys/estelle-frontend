import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const CourseCard = () => {
  return (
    <div className='rounded-xl shadow-lg'>
      <div className='w-full h-[200px]'>
        <Image src={'/assets/Img4.png'} alt='image' width={300} height={200} className='object-cover h-full w-full rounded-t-2xl'/>
      </div>

      <div className='py-6 px-4 bg-white rounded-2xl -mt-2'>
        <h2 className='font-semibold text-xl'>Building Your Personal Brand from Scratch</h2>
        <p className='text-xs text-neutral-400 mt-2'>1 hour, 30mins</p>
        <div className='mt-2'>
        <Button className='bg-[#7851A9]'>Resume</Button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
