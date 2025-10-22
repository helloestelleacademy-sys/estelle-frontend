import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import { Instagram, Linkedin, TwitchIcon, X, Youtube } from 'lucide-react'

const Links1 =[
    {
        title:'About us',
        href:'/'
    },
    {
        title:'Services',
        href:'/'
    },
    {
        title:'Support',
        href:'/'
    },
    {
        title:'Privacy Policy',
        href:'/'
    },
    {
        title:'Terms of Use',
        href:'/'
    },
]
const Links2 =[
    {
        title:'Contact us',
        href:'/'
    },
    {
        title:'Blog',
        href:'/'
    },
    {
        title:'FAQs',
        href:'/'
    },
    {
        title:'Testimonials',
        href:'/'
    },
    {
        title:'Careers',
        href:'/'
    },
]

const Footer = () => {
  return (
    <footer className='py-18 lg:py-20 w-full'>
        <div className='max-w-7xl mx-auto flex flex-wrap gap-8 justify-between px-4'>
            <ul className='flex flex-col gap-4 '>
                {Links1.map((link)=>(
                    <li key={link.title} className='font-semibold text-sm tracking-wide'>{link.title}</li>
                ))}
            </ul>
            <ul className='flex flex-col gap-4 '>
                {Links2.map((link)=>(
                    <li key={link.title} className='font-semibold text-sm tracking-wide'>{link.title}</li>
                ))}
            </ul>

            <div className='flex flex-col gap-6'>
                <h2 className='font-semibold text-sm'>Subscribe</h2>

                <p className='text-xs max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aspernatur rerum molestias minima mollitia? 
                Laborum fugit accusamus iure nam vitae quis libero ea, cum perspiciatis dolorum maxime. Culpa, fuga reiciendis.</p>

                <div className='space-y-4'>
                    <Input className='py-6 text-[#7851A9] pl-2 bg-gray-200' placeholder='Email here'/>
                    <Button className='py-5 bg-[#CAA0FF]'>Subscribe Now</Button>
                </div>
            </div>

            <div className='space-y-4'>
                <h3 className='font-semibold text-sm'>estelle@gmail.com</h3>
                <p className='font-semibold text-sm'>+234 803 069 6738</p>
            </div>
        </div>

        <div className='max-w-7xl mx-auto px-2 flex flex-wrap justify-between mt-10'>
             <Image src={'/assets/estelleLogoColor.svg'} alt='Logo' width={100} height={100}/>

             <div className='space-x-4 flex items-center'>
                <Linkedin />
                <Instagram />
                <Youtube />
                <TwitchIcon />
             </div>
        </div>
        
        <div className='flex items-center justify-center mt-10'>
        <span className='text-center text-xs'>© 2025 estelle. All rights reserved.</span>
        </div>
      
    </footer>
  )
}

export default Footer
