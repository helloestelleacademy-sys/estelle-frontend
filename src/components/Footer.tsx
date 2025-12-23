import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const Links1 = [
    {
        title: 'About us',
        href: '/'
    },
    {
        title: 'Contact us',
        href: '/'
    },
    {
        title: 'FAQs',
        href: '/'
    },
    {
        title: 'Testimonials',
        href: '/'
    },
]
// const Links2 =[

//     {
//         title:'Blog',
//         href:'/'
//     },

// ]

const Footer = () => {
    return (
        <footer className='py-18 lg:py-20 w-full'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-8 justify-between px-4'>
                <ul className='flex flex-col gap-4 '>
                    {Links1.map((link) => (
                        <li key={link.title} className='font-semibold text-sm tracking-wide'>{link.title}</li>
                    ))}
                </ul>
                {/* <ul className='flex flex-col gap-4 '>
                {Links2.map((link)=>(
                    <li key={link.title} className='font-semibold text-sm tracking-wide'>{link.title}</li>
                ))}
            </ul> */}

                <div className='flex flex-col gap-6'>
                    <h2 className='font-semibold text-sm'>Subscribe</h2>

                    <p className='text-xs max-w-md'>Estelle is an e-learning platform designed to make personal branding education universally accessible. Through curated courses, expert mentorship,
                        and interactive learning experiences, we empower individuals and teams to define their voice, showcase their value, and build influence that matters.</p>

                    <div className='space-y-4'>
                        <Input className='py-6 text-[#7851A9] pl-2 bg-gray-200' placeholder='Email here' />
                        <Button className='py-5 bg-[#CAA0FF]'>Subscribe Now</Button>
                    </div>
                </div>

                <div className='space-y-4'>
                    <a href='support@estellelearning.com' className='font-semibold text-sm'>support@estellelearning.com</a>
                    {/* <p className='font-semibold text-sm'>+234 803 069 6738</p> */}
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-2 flex flex-wrap justify-between mt-10'>
                <Image src={'/assets/Estellelogonew2.png'} alt='Logo' width={100} height={100} />

                <div className='space-x-4 flex items-center'>
                    <Facebook />
                    <Linkedin />
                    <Instagram />
                    <Youtube />

                </div>
            </div>

            <div className='flex items-center justify-center mt-10'>
                <span className='text-center text-xs'>© 2025 estelle. All rights reserved.</span>
            </div>

        </footer>
    )
}

export default Footer
