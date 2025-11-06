'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  const [isScrolled, setIsScrolled] =useState(false);
  const [isOpen, setIsOpen] =useState(false); 
  const mobileMenuRef =useRef(null);
  const linkRef = useRef<(HTMLAnchorElement  | null)[]>([]);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null)

  useEffect(()=>{
        const handleScroll =()=>{
            setIsScrolled(window.scrollY > 20) // this checks if the page is scrolled more than 20px, if so it sets isScrolled to true
        };
        window.addEventListener('scroll', handleScroll) // add the event listener to the window object

        return()=> window.removeEventListener('scroll', handleScroll) // cleanup function to remove the event listener when the component unmounts
    },[])

  useGSAP(()=>{

        gsap.set(mobileMenuRef.current, {yPercent:-200})
        gsap.set(linkRef.current, {autoAlpha:0})

        menuTl.current =gsap.timeline({
            paused:true
        })
        .to(mobileMenuRef.current, {yPercent:0,opacity:1, duration:0.8, ease:'power3.out'})
        .to(linkRef.current, {autoAlpha:1, stagger:0.08, duration:0.8, ease:'power2.out'})
        
        iconTl.current =gsap.timeline({
            paused:true
        })
        .to([topLineRef.current], {
            rotation:45,
            y:3.3,
            duration:0.5,
            ease:"power2.inOut",
        })
        .to([bottomLineRef.current], {
            rotation:-45,
            y:-3.3,
             duration:0.5,
            ease:"power2.inOut",
        }, "<")
    },[])

  const onNavLinkClose =()=>{
        menuTl.current?.reverse()
        setIsOpen(false)
         iconTl!.current!.reverse()
  }

  const toggleMenu =()=>{
        if(isOpen){
            menuTl.current?.reverse()
            setIsOpen(false)
             iconTl!.current!.reverse()
        }else{
            menuTl.current?.play()
            setIsOpen(true)
             iconTl.current?.play()
        }

    }

  
const navLinks =[
    {
        title:"Home",
        link:"/",
    },
    {
        title:"About",
        link:"/about",
    },
    // {
    //     title:"Courses",
    //     link:"/courses",
    // },

]

  return (
    <nav className={`w-full py-3 fixed top-0 left-0  z-50 transition-all duration-300 bg-blur ${isScrolled ? '  backdrop-blur-glass bg-[#7851A9]' :
        'bg-transparent'}`}>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-2'>
        {/* logo */}
        {isScrolled ?(
          <Link href={'/'} className=''>
            <Image src={'/assets/Estellelogonew.png'} alt='Logo' width={120} height={100} />
        </Link>
        ) 
        :(
          <Link href={'/'} className=''>
            <Image src={'/assets/Estellelogonew2.png'} alt='Logo' width={120} height={100}/>
        </Link>
        )
      }
        

        <ul className='hidden sm:flex gap-6 items-center text-white'>
          <Link href={'/about'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>About</li>
          </Link>
          <a href={'https://mainstack.store/stellanwosu/w2RdFBdyAPo7'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Pricing</li>
          </a>
          {/* <Link href={'/courses'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Courses</li>
          </Link>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer', !isScrolled && 'text-[#37296D]')}>Subjects</li> */}
        </ul>

        <div className='hidden md:flex space-x-6'>
            <Button disabled className='w-[100px] py-5 bg-white text-black'>Login</Button>
            <Button disabled className='bg-[#7852A9] w-[100px] py-5'>Signup</Button>
        </div>

         <div onClick={toggleMenu} className='md:hidden bg-white size-12 z-50 flex flex-col gap-1 justify-center items-center md:size-20 transition-all duration-300 rounded-full cursor-pointer'>
                <span ref={topLineRef} className='block w-8 h-0.5 bg-black rounded-full origin-center'></span>
                <span ref={bottomLineRef} className='block w-8 h-0.5 bg-black rounded-full origin-center'></span>
          </div>

      </div>

      <div ref={mobileMenuRef} className='md:hidden fixed inset-0 border border-white/15 w-full h-[screen] bg-black/30 z-30 flex flex-col items-center justify-between text-white/80 py-22 px-10 gap-y-10 backdrop-blur opacity-0 '>
            <div className='flex flex-col gap-y-6 text-3xl'>
                {navLinks.map((item, index)=>(
                    <Link href={item.link} key={index} ref={(el)=>{linkRef.current[index] = el }} className=''>
                        <span onClick={onNavLinkClose} className='transition-all duration-300 text-white  hover:text-white font-semibold cursor-pointer'>
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>   
    </nav>
  )
}

export default Navbar
