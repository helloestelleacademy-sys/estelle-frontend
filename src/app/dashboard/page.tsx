import CircularProgressBar from '@/components/CircularProgressBar'
import CourseCard from '@/components/CourseCard'
import { User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const TrackedVideos =[
    {
        title:'Personal Branding',
        videos:'2/5'
    },
    {
        title:'Leader on Linkedin',
        videos:'4/5'
    },
    {
        title:'Optimizing Identity',
        videos:'3/5'
    },
]

const Dashboard = () => {
  return (
    <section className='w-full flex flex-col md:flex-row min-h-screen gap-6'>
      <div className='w-full md:w-[64vw] '>
        {/* top -banner */}
        <div className='w-full rounded-3xl bg-[#7851A9] px-8 py-10 text-white'>
            <p className='tracking-wider uppercase text-sm mt-4'>Basic Course</p>
            <h2 className='text-3xl max-w-[400px] mt-4 font-semibold text-balance'>Build a Personal Brand that Becomes a Legacy</h2>
        </div>

        {/* details */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {TrackedVideos.map((video)=>(
                <div key={video.title} className='bg-white flex items-center rounded-3xl px-6 py-4 gap-3'>
                    <div className='py-3  px-3 bg-[#7851A9] text-white rounded-full'>
                        <User className='' />
                    </div>

                    <div className='space-y-1'>
                        <p className='text-xs text-gray-400'>{video.videos} Watched</p>
                        <p className='font-medium text-sm'>{video.title}</p>
                    </div>
                </div>
            ))}
        </div>
            
            {/* my learning */}
        <div className='mt-6'>
            <h2 className='text-2xl font-semibold'>Continue Learning</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4'>
            <CourseCard />
            <CourseCard />
            <CourseCard />
            </div>
        </div>

      </div>

      <div className='w-full md:w-1/3 bg-white py-6 px-4 rounded-2xl'>
            <h2 className='text-2xl text-[#7851A9]'>Statistics</h2>

            <div className='flex flex-col h-full justify-between'>
                <div className="flex flex-col items-center mt-10  bg-gray-50">
                    <CircularProgressBar
                        progress={40}
                        imageUrl="https://i.pravatar.cc/150?img=3"
                    />
                    <h2 className="mt-4 text-lg font-medium text-black">Stella Johnson</h2>
                    <p className="text-xs text-gray-400 mt-2">Ready to build your personal brand today?</p>
                </div>

                <div className='px-6 py-4'>
                    <p className='text-start font-medium text-sm'>Your Mentor</p>

                    <div className='flex items-center gap-4 mt-4'>
                        <div>
                            <Image src={'/assets/Img4.png'} alt='image' width={60} height={50} className='object-cover size-22 rounded-full' />
                        </div>
                        <div>
                            <p className='font-medium text-sm'>John Smith</p>
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
