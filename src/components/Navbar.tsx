'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { MoveRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import DiscountBanner, { BANNER_HEIGHT } from './DiscountBanner'

const EASE_DRAWER = 'cubic-bezier(0.32, 0.72, 0, 1)'
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  // the waitlist CTA lives in the header button / mobile menu button instead
  // {
  //   title: "Waitlist",
  //   link: "/waitlist",
  // },
  // {
  //   title: "Courses",
  //   link: "/",
  // },
  // {
  //   title: "Events",
  //   link: "/events",
  // },
  // {
  //     title:"Courses",
  //     link:"/courses",
  // },

  // {
  //   title: "Support",
  //   link: "#footer",
  // },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // the launch countdown rides along with the header, on the landing page only
  const showBanner = pathname === '/'
  const bannerOffset = showBanner ? BANNER_HEIGHT : 0

  const { user } = useSelector((state: RootState) => state.auth)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((open) => !open)

  // close the menu whenever the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // lock page scroll while the menu is open, and close on Escape
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // if the viewport grows to desktop while open, reset the state
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <nav className='w-full z-50 bg-white fixed top-0'>
      {showBanner && (
        <div className='relative z-20'>
          <DiscountBanner />
        </div>
      )}
      <div className='relative z-20 flex items-center justify-between max-w-6xl mx-auto px-4 md:px-6 py-3'>
        {/* logo */}
        <Link href={'/'} onClick={closeMenu}>
          <Image src={'/assets/Estellelogonew2.png'} alt='Estelle' width={78} height={80} />
        </Link>

        <ul className='hidden md:flex gap-6 items-center text-[#37296D]'>
          <Link href={'/about'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>About</li>
          </Link>
          {/* <Link href={'/waitlist'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>Waitlist</li>
          </Link> */}
          <Link href={'/events'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>Events</li>
          </Link>
          <Link href={'#footer'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>Support</li>
          </Link>
          {/* <Link href={'/courses'}>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>Courses</li>
          </Link>
            <li className={clsx('text-[16px] font-semibold tracking-wide  cursor-pointer')}>Subjects</li> */}
        </ul>

        <div className='hidden md:flex space-x-6'>
          {!user && (
            <Link href='/waitlist'>
              <Button className='bg-[#7852A9] w-fit hover:bg-[#563b7a] active:bg-black transition-colors py-5'>Join the Waitlist</Button>
            </Link>
          )}

        </div>

        {/* hamburger */}
        <button
          type='button'
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
          className='md:hidden relative size-11 rounded-full bg-[#f3edfb] text-[#37296D] cursor-pointer touch-manipulation transition-transform duration-150 ease-out active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7852A9]'
        >
          <span
            aria-hidden='true'
            className='absolute left-1/2 top-1/2 -ml-[10px] -mt-px block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none'
            style={{
              transitionTimingFunction: EASE_OUT,
              transform: isOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-3.5px) rotate(0deg)',
            }}
          />
          <span
            aria-hidden='true'
            className='absolute left-1/2 top-1/2 -ml-[10px] -mt-px block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none'
            style={{
              transitionTimingFunction: EASE_OUT,
              transform: isOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(3.5px) rotate(0deg)',
            }}
          />
        </button>
      </div>

      {/* mobile menu: circle reveal that grows out of the hamburger */}
      <div
        id='mobile-menu'
        aria-hidden={!isOpen}
        className='md:hidden fixed inset-0 z-10 h-dvh bg-[#faf7ff] flex flex-col px-6 motion-reduce:transition-none'
        style={{
          clipPath: isOpen
            ? `circle(150% at calc(100% - 40px) ${36 + bannerOffset}px)`
            : `circle(0px at calc(100% - 40px) ${36 + bannerOffset}px)`,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          // closing is quicker than opening; visibility flips only after the reveal has finished
          transition: isOpen
            ? `clip-path 500ms ${EASE_DRAWER}, visibility 0s`
            : `clip-path 320ms ${EASE_DRAWER}, visibility 0s linear 320ms`,
          paddingTop: `calc(7rem + ${bannerOffset}px)`,
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* soft brand glow */}
        <div aria-hidden='true' className='pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#a984dd]/25 blur-3xl' />

        <p
          className='relative text-xs font-semibold uppercase tracking-[0.2em] text-[#7852A9] transition-[opacity,transform] duration-300 motion-reduce:transition-none'
          style={{
            transitionTimingFunction: EASE_OUT,
            transitionDelay: isOpen ? '120ms' : '0ms',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          Menu
        </p>

        <ul className='relative mt-4 flex flex-col'>
          {navLinks.map((item, index) => {
            const isActive = pathname === item.link
            return (
              <li
                key={item.title}
                className='border-b border-[#37296D]/10 transition-[opacity,transform] duration-300 motion-reduce:transition-none'
                style={{
                  transitionTimingFunction: EASE_OUT,
                  transitionDelay: isOpen ? `${160 + index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                }}
              >
                <Link
                  href={item.link}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  className={clsx(
                    'group flex min-h-16 items-center justify-between gap-4 py-3 text-3xl font-semibold tracking-tight transition-colors duration-150 active:text-[#7852A9]',
                    isActive ? 'text-[#7852A9]' : 'text-[#37296D]'
                  )}
                >
                  <span className='flex items-baseline gap-4'>
                    <span className='w-6 text-sm font-medium tabular-nums text-[#37296D]/40'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </span>
                  <MoveRight
                    aria-hidden='true'
                    className={clsx(
                      'size-5 shrink-0 transition-transform duration-200 ease-out group-active:translate-x-1',
                      isActive ? 'text-[#7852A9]' : 'text-[#37296D]/40'
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* primary action */}
        <div
          className='relative mt-auto transition-[opacity,transform] duration-300 motion-reduce:transition-none'
          style={{
            transitionTimingFunction: EASE_OUT,
            transitionDelay: isOpen ? `${160 + navLinks.length * 50 + 40}ms` : '0ms',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          {!user ? (
            <Link href='/waitlist' onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
              <Button className='w-full gap-3 rounded-xl bg-[#7852A9] py-7 text-base hover:bg-black active:bg-black active:scale-[0.98] transition-[background-color,transform] duration-150'>
                Join the Waitlist <MoveRight className='size-4' />
              </Button>
            </Link>
          ) : (
            <a href='/dashboard' onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
              <Button className='w-full gap-3 rounded-xl bg-[#4e2286] py-7 text-base hover:bg-black active:bg-black active:scale-[0.98] transition-[background-color,transform] duration-150'>
                Go to Dashboard <MoveRight className='size-4' />
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
