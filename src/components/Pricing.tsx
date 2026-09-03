/* Pricing section disabled — replaced by the waitlist section on the landing page.

'use client'
import React, { useRef } from 'react'
import fuelIcon from "@/assets/fuelIcon.svg"
import Image from 'next/image'
import checkIconImg from '@/assets/checkIcon.svg'
import pricingImg1 from "@/assets/pricing1.svg"
import pricingImg2 from "@/assets/pricing2.svg"
import pricingImg3 from "@/assets/pricing3.svg"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import naira from '@/assets/naira.png'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)
const pricing = [
    {
        title: "Basic",
        image: pricingImg1,
        price: '35,000',
        slashPrice: '50,000',
        features: [
            "Lifetime Access to 6 courses",
            "Earn a certificate upon completion",
            "Tailored quizzes for practical learning",
        ],
        buttonLink: 'https://mainstack.store/stellanwosu/O7XDUpkdLOhk',
        buttonColor: "bg-[#8a55cf]",
        buttonText: "Buy Now"
    },
    {
        title: "Premium ",
        image: pricingImg2,
        price: '210,000',
        features: [
            "Lifetime Access to 10 courses",
            "Earn a certificate upon completion",
            "Tailored quizzes for practical learning",
            "1-1 hands-on mentorship access with tutors",
            "Save money 30% of your money when you pay",
            "Enjoy maximum flexible learning at your own pace ",
        ],
        buttonLink: 'https://mainstack.store/stellanwosu/premium-plan',
        buttonColor: "bg-[#7852A9]",
        buttonText: "Buy Now"
    },
    {
        title: "Organizations",
        price: '300,000',
        image: pricingImg3,
        features: [
            "AI powered training",
            "Lifetime Access to 9 courses",
            "Earn a certificate upon completion",
            "Tailored quizzes for practical learning",
            "Goal focused coaching & access to tutors",
            "Enjoy maximum flexible learning at your own pace",
            "Admin dashboard to track employee learning progress",
            "Free personal branding resources, templates and toolkits",
            "Dedicated customer success team and strategic implementation service",
        ],
        buttonLink: 'mailto:info.estelleglobal@gmail.com?subject=Inquiry:%20Organization%20Plan&body=Hello%20Estelle%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20the%20Organization%20Plan%20for%20my%20team.%20Please%20provide%20more%20details.%0D%0A%0D%0ABest%20regards,',
        buttonColor: "bg-[#8a55cf]",
        buttonText: "Book a Call"
    },
]
const Pricing = () => {

    const priceRef = useRef<(HTMLDivElement | null)[]>([])

    useGSAP(() => {
        // const paragraphSplit =SplitText.create('.price-paragraph', {type:'words'})

        const priceTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.pricing-section',
                start: 'top 75%'
            }
        })

        priceTl.from('.price-title', { opacity: 0, duration: 0.5, ease: 'power1.in' })
            //   .to('.price-paragraph', {opacity:1, duration:1}, '-=0.6')
            .from(priceRef.current, { //animating 
                y: 100,
                delay: 0.2,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out",
            }, '-=0.3');

    }, [])

    return (
        <section id='pricing' className='pricing-section py-16 lg:py-18 bg-white'>
            <div className='max-w-6xl mx-auto max-lg:p-3'>

                <div className='flex justify-center items-center'>
                    <h2 className='text-[#ffffff] px-4 py-2 rounded-lg text-sm bg-[#7852A9]'>Pricing</h2>
                </div>

                <h1 className='price-title mt-4 text-center font-light text-lg md:text-2xl lg:text-3xl text-black max-w-xl mx-auto'>Turn your story Into a Legacy-brand <br /><span className='font-semibold'>pay once, life time access</span></h1>

                <div className='mt-16 flex flex-col md:flex-row gap-8 justify-center'>
                    {pricing.map((item, index) => {

                        const isHighlighted = index === 1;
                        return (
                            <div key={item.title} ref={(el) => { priceRef.current[index] = el }} className='flex flex-col'>
                                {isHighlighted && <div className='w-full px-10 py-4 rounded-2xl flex items-center justify-center text-white bg-[#7852A9] scale-105'>
                                    <h2 className='text-xl'>Most Popular</h2>
                                </div>}
                                <div className={`bg-white border relative  p-6 rounded-2xl shadow-lg text-black ${isHighlighted ? ' scale-105 border-6 rounded-t-none rounded-b-2xl border-[#7852A9]' : 'border-gray-100'}`}>
                                    <div>
                                        <div className='flex justify-between'>
                                            <h2 className='text-[#7852A9] px-4 py-2 rounded-lg text-sm  max-w-min'>{item.title}</h2>
                                            <h2 className='text-[#ffffff] px-4 py-2 rounded-lg text-sm bg-[#FE401C] max-w-min'>-30%</h2>
                                        </div>

                                        <div className={`${index === 0 && `flex items-center justify-center flex-col`} `}>
                                            <h2 className='font-bold text-3xl md:text-4xl mt-6 flex'>
                                                <span className='text-gray-400 text-2xl'> <Image src={naira} alt='naira' /></span> {item.price}

                                            </h2>
                                            {index === 0 && <h2 className='font-medium text-2xl md:text-3xl mt-6 flex line-through'>
                                                <span className='text-gray-400 text-2xl'> <Image src={naira} alt='naira' /></span> {item.slashPrice}

                                            </h2>}
                                        </div>

                                        <div className='mt-8'>
                                            <ul className='flex flex-col gap-2'>
                                                {item.features.map((feature, index) => (
                                                    <li key={index} className='flex items-center gap-2 text-gray-500 text-sm'>
                                                        <Image src={checkIconImg} alt='icon' />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className='flex justify-between items-center max-w-[200px] mx-auto mt-8    '>

                                            <a href={item.buttonLink} className={clsx('w-full px-8 py-4 rounded-md shadow text-sm flex justify-center items-center text-white gap-2 hover:bg-black active:bg-black transition-colors duration-300', item.buttonColor)}>
                                                <Image src={fuelIcon} alt='img' />
                                                <p>{item.buttonText}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </section>
    )
}

export default Pricing

*/
export {};
