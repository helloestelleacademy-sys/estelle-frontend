import React from 'react'
import { Button } from './ui/button'

const Cta = () => {
  return (
    <section className='py-18 lg:py-20'>
      <div className='max-w-7xl mx-auto px-10 md:px-6'>
        <div className='bg-[#7852A9] px-10 py-12 rounded-3xl flex flex-col md:flex-row justify-start items-center gap-15 lg:h-[350px]'>
            <div className='space-y-5'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl tracking-wide text-white'>Ready to build your Personal Brand?</h2>
            <p className='text-2xl text-gray-100 max-w-xl font-light tracking-wide'>Let your personal brand become a legacy with <span className='font-bold text-white'>Estelle</span></p>
            </div>
        

        <Button className='text-2xl px-5 py-7 bg-white text-[#7852A9] font-semibold hover:bg-[#eeedef]'>Start Learning</Button>
        
        </div>

      </div>
    </section>
  )
}

export default Cta
