import React from 'react'


const Cta = () => {
  return (
    <section className='py-18 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='bg-[#7852A9] px-10 py-12 rounded-3xl flex flex-col md:flex-row justify-start items-center gap-15 lg:h-[350px]'>
          <div className='space-y-5'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold max-w-2xl tracking-wide text-white'>Ready to build your Personal Brand?</h2>
            <p className='text-xl text-gray-100 max-w-xl font-light tracking-wide'>Let your personal brand become a legacy with <span className='font-bold text-white'>Estelle</span></p>
          </div>

          <a href='https://whatsapp.com/channel/0029VbBA6IzHVvTfvZMufU3M' className=' hover:opacity-90 flex items-center justify-center bg-white text-[#7852A9] hover:bg-[#eeedef] py-4 rounded-2xl font-semibold w-full md:w-[200px]'>Join our community</a>

        </div>

      </div>
    </section>
  )
}

export default Cta
