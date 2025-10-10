import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='w-full py-5 fixed top-0 left-0 bg-transparent z-20'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-2'>
        {/* logo */}
        <div className=''>
            <Image src={'/assets/estellteLogo.svg'} alt='Logo' width={100} height={100}/>
        </div>

        <ul className='hidden sm:flex gap-6 items-center text-white'>
            <li className='text-sm font-light cursor-pointer'>About</li>
            <li className='text-sm font-light cursor-pointer'>Pricing</li>
            <li className='text-sm font-light cursor-pointer'>Courses</li>
            <li className='text-sm font-light cursor-pointer'>Subjects</li>
        </ul>

        <div className='space-x-6'>
            <Button className='w-[100px] py-5 bg-white text-black'>Login</Button>
            <Button className='bg-[#7852A9] w-[100px] py-5'>Signup</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
