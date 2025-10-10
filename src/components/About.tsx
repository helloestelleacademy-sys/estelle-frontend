import { User, User2 } from 'lucide-react'
import React from 'react'

const About = () => {
  return (
    <section className='py-18 lg:py-24'>
      <div className='max-w-6xl mx-auto px-4 '>
        <h2 className='text-3xl lg:text-4xl font-sans font-semibold'>Why Estelle?</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-8'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center justify-center bg-[#CAA0FF] size-10  rounded-full'>
                        <User2 className='text-black' />
                    </div>
                    <span className='font-medium'>Expert-led Courses</span>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center justify-center bg-[#CAA0FF] size-10  rounded-full'>
                        <User2 className='text-black' />
                    </div>
                    <span className='font-medium'>Affordable & Accessible</span>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center justify-center bg-[#CAA0FF] size-10  rounded-full'>
                        <User2 className='text-black' />
                    </div>
                    <span className='font-medium'>For individuals & teams</span>
                </div>
            </div>

            <div className='col-span-2'>
                <p className='text-neutral-600 tracking-wide'> Estelle is a Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, aperiam fugit! Similique eveniet omnis qui nobis architecto? Iure,
                     totam est autem sunt quae quia. Suscipit vitae non voluptatem amet culpa?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo accusantium facere architecto a veniam praesentium odio dolor, 
                    nihil totam adipisci quia molestias doloribus aperiam nam, iste harum voluptatibus cupiditate ad?
                    totam est autem sunt quae quia. Suscipit vitae non voluptatem amet culpa?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non voluptates suscipit expedita aperiam, rem nesciunt perspiciatis et vitae amet quia minima.
                    Rerum a voluptatem quos ab nemo aut facere enim!     
                </p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default About
