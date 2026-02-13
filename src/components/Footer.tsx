'use client';
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Loader2 } from 'lucide-react'
import { useSubscribeMutation } from '@/redux/api/newsletterApi'
import { toast } from 'sonner' // Assuming sonner is used for toasts based on previous files

const Links1 = [
    {
        title: 'About us',
        href: '/about'
    },
    {
        title: 'FAQ',
        href: '/#faq'
    },
    {
        title: 'Testimonials',
        href: '/#testimonials'
    },
    {
        title: 'Privacy Policy',
        href: '/privacy-policy'
    },
    {
        title: 'Terms of Service',
        href: '/terms'
    },
]

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribe, { isLoading }] = useSubscribeMutation();

    const handleSubscribe = async () => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            const response = await subscribe({ email }).unwrap();
            toast.success(response.message || "Subscribed successfully!");
            setEmail('');
        } catch (error: any) {
            console.error("Subscription error:", error);
            const errorMessage = error?.data?.message || "Failed to subscribe. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <footer id='footer' className='py-20 lg:py-24 w-full'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-8 justify-between px-4'>
                <ul className='flex flex-col gap-4 '>
                    {Links1.map((link) => (
                        <a href={link.href} key={link.title}>
                            <li className='font-semibold text-sm tracking-wide hover:text-[#7851A9] transition-colors'>{link.title}</li>
                        </a>
                    ))}
                </ul>

                <div className='flex flex-col gap-6'>
                    <div className='space-y-2'>
                        <h2 className='font-semibold text-md'>Sign up on our Newsletter</h2>
                        <p className='text-md font-medium text-[#7851A9]'>Be the first to know our update!</p>
                    </div>

                    <p className='text-md max-w-md'>Estelle is an e-learning platform designed to make personal branding education universally accessible. Through curated courses, expert mentorship,
                        and interactive learning experiences, we empower individuals and teams to define their voice, showcase their value, and build influence that matters.</p>

                    <div className='space-y-4'>
                        <Input
                            className='py-6 text-[#7851A9] pl-2 bg-gray-200'
                            placeholder='Email here'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            className='py-5 bg-[#CAA0FF]'
                            onClick={handleSubscribe}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                        </Button>
                    </div>
                </div>

                <div className='space-y-4 flex flex-col'>
                    <h2 className='font-semibold text-sm'>Contact Us</h2>
                    <a href='mailto:info@estellelearning.com' className='font-semibold text-sm hover:text-[#7851A9] underline'>info@estellelearning.com</a>
                    <a href='mailto:support@estellelearning.com' className='font-semibold text-sm hover:text-[#7851A9] underline'>support@estellelearning.com</a>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-2 flex flex-wrap justify-between mt-10'>
                <Image src={'/assets/Estellelogonew2.png'} alt='Logo' width={78} height={80} />

                <div className='space-x-4 flex items-center'>
                    <a href="https://www.linkedin.com/company/estellelearning/" target="_blank" rel="noopener noreferrer" className='hover:text-[#7851A9] transition-colors'>
                        <Linkedin />
                    </a>
                    <a href="https://www.instagram.com/estellelearning?utm_source=qr" target="_blank" rel="noopener noreferrer" className='hover:text-[#7851A9] transition-colors'>
                        <Instagram />
                    </a>
                    <a href="https://x.com/estellelearning?s=21" target="_blank" rel="noopener noreferrer" className='hover:text-[#7851A9] transition-colors'>
                        <Twitter />
                    </a>
                </div>
            </div>

            <div className='flex items-center justify-center mt-10'>
                <span className='text-center text-xs'>© 2025 estelle. All rights reserved.</span>
            </div>

        </footer>
    )
}

export default Footer
