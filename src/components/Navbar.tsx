'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import clsx from 'clsx'

const Navbar = () => {
  const [isScrolled, setIsScrolled] =useState(false);

  useEffect(()=>{
        const handleScroll =()=>{
            setIsScrolled(window.scrollY > 20) // this checks if the page is scrolled more than 20px, if so it sets isScrolled to true
        };
        window.addEventListener('scroll', handleScroll) // add the event listener to the window object

        return()=> window.removeEventListener('scroll', handleScroll) // cleanup function to remove the event listener when the component unmounts
    },[])

  return (
    <nav className={`w-full py-5 fixed top-0 left-0  z-50 transition-all duration-300 bg-blur ${isScrolled ? '  backdrop-blur-glass bg-[#7851A9]' :
        'bg-transparent'}`}>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-2'>
        {/* logo */}
        {isScrolled ?(
          <Link href={'/'} className=''>
            <Image src={'/assets/estellteLogo.svg'} alt='Logo' width={100} height={100}/>
        </Link>
        ) 
        :(
          <Link href={'/'} className=''>
            <Image src={'/assets/estelleLogoColor.svg'} alt='Logo' width={100} height={100}/>
        </Link>
        )
      }
        

        <ul className='hidden sm:flex gap-6 items-center text-white'>
          <Link href={'/about'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>About</li>
          </Link>
          <Link href={'/courses'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Pricing</li>
          </Link>
          <Link href={'/courses'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Courses</li>
          </Link>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Subjects</li>
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
