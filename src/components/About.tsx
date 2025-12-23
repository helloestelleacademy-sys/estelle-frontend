'use client'
import React from 'react'
import Image from 'next/image'

const About = () => {

  return (
    <section id='about' className='py-16 lg:py-18'>
      <div className='flex flex-col'>
            <h3 className='subText font-bold text-3xl mb-10 text-center'>Trusted by hundreds of learners in 10+ countries around the world</h3>

        <div className='bg-[#EEE0FF] px-8 py-12'>
            <div className='max-w-6xl mx-auto flex flex-col gap-8 justify-center items-center'>
            <h2 className='text-xl font-semibold text-[#7851A9]'>Invest in your personal brand</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                <div className='flex flex-col gap-4 max-sm:items-center max-sm:text-center'>
                    <Image src='/assets/Star.svg' alt='Icon' width={50} height={30} />

                    <div className='space-y-3'>
                        <h2 className='font-semibold text-[#7851A9]'>Become a thought leader</h2>
                        <p className='text-sm text-neutral-400 text-balance'>Learn how to tell your story that becomes a legacy. Get seen and make an impact.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4 max-sm:items-center max-sm:text-center'>
                    <Image src='/assets/certificate.svg' alt='Icon' width={50} height={30} />

                    <div className='space-y-3'>
                        <h2 className='font-semibold text-[#7851A9]'>Expert led courses</h2>
                        <p className='text-sm text-neutral-400 text-balance'>Access to valuable knowledge and mentorship that improves your visibility.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4 max-sm:items-center max-sm:text-center'>
                    <Image src='/assets/graduate.svg' alt='Icon' width={50} height={30} />

                    <div className='space-y-3'>
                        <h2 className='font-semibold text-[#7851A9]'>Earn valuable credentials</h2>
                        <p className='text-sm text-neutral-400 text-balance'>Get certified and boost your chances of being trusted by clients & recruiters.</p>
                    </div>
                </div>
            </div>

            </div>
        </div>


      </div>
    </section>
  )
}

export default About


