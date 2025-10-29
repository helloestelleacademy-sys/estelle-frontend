import React from 'react'
import { Button } from './ui/button'
import { User } from 'lucide-react'
import Image from 'next/image'

const About = () => {
  return (
    <section className='py-22 lg:py-28 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 lg:px-8 '>
        <div className='flex lg:flex-row flex-col gap-12'>
        {/* left */}
        <div className='space-y-6 flex-1'>
            <p className='text-sm text-[#76a8ee] flex items-center gap-2'>Why Estelle</p>
            <h2 className='text-3xl md:text-4xl lg:text-5xl mt-2 font-semibold'>About Estelle</h2>
            <p className='text-neutral-500 max-w-xl text-[18px] tracking-wide text-balance'>Become a thought leader: Learn how to tell your story that becomes a legacy. Get seen and make an impact. 
            Expert led courses: Access to valuable knowledge and mentorship that improves your visibility 
            Earn valuable credentials: Get certified and boost your chances of being trusted by clients & recruiters.
            saepe excepturi repellat totam obcaecati quae accusantium consequuntur blanditiis deleniti quisquam.
            saepe excepturi repellat totam obcaecati quae accusantium consequuntur blanditiis deleniti quisquam.
            saepe excepturi repellat totam obcaecati quae accusantium consequuntur blanditiis deleniti quisquam.</p>

            <div className='flex items-center gap-4 flex-wrap mt-3'>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>Expert-Led Courses</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>Affordable & Accessible</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='size-10 p-2 rounded-full bg-gray-300'>
                        <User className='  text-black'/>
                    </div>
                    <p className='text-sm text-neutral-400'>For individuals & Teams</p>
                </div>
            </div>
            
            <div>
            <Button className='bg-gradient-to-r from-[#ff00ff] via-[#d500f9] to-[#7b1fa2] hover:opacity-90 w-[200px] py-6 text-lg'>Read More</Button>
            </div>
        </div>

        {/* right */}
        <div className='rounded-2xl h-[500px] w-full lg:w-[400px] relative'>
            <Image src={'/assets/aboutImg.jpg'} alt='image' width={200} height={150} className='w-full h-full object-cover rounded-2xl' />
        </div>

        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-22 gap-10'>
            <div className='bg-gray-300 px-4 flex items-end justify-end pb-10 relative rounded-3xl h-[400px]'>
                <Image src={'/assets/img4.png'} alt='image' width={200} height={150} className='absolute inset-0 w-full h-full object-cover rounded-2xl' />
                <div className='relative'>
                    <h2 className='text-2xl text-white'>Expert led Mentorship</h2>
                    <p className='text-sm text-neutral-300'>Learn from industry leaders who have built remarkable personal brands</p>
                </div>
            </div>
            <div className='bg-gray-300 px-4 flex items-end justify-end pb-10 relative rounded-3xl h-[400px]'>

                <div className='relative'>
                    <h2 className='text-2xl text-white'>Expert led Mentorship</h2>
                    <p className='text-sm text-neutral-500'>Learn from industry leaders who have built remarkable personal brands</p>
                </div>
            </div>
            <div className='bg-gray-300 px-4 flex items-end justify-end pb-10 relative rounded-3xl h-[400px]'>

                <div className='relative'>
                    <h2 className='text-2xl'>Expert led Mentorship</h2>
                    <p className='text-sm text-neutral-500'>Learn from industry leaders who have built remarkable personal brands</p>
                </div>
            </div>
        </div> */}


      </div>
    </section>
  )
}

export default About
