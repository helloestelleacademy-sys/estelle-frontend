'use client'
import React, { useRef } from 'react'
import fuelIcon from "@/assets/fuelIcon.svg"
import Image from 'next/image'
import checkIconImg from '@/assets/checkIcon.svg'
import pricingImg1 from "@/assets/pricing1.svg"
import pricingImg2 from "@/assets/pricing2.svg"
import pricingImg3 from "@/assets/pricing3.svg"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger} from 'gsap/all'
import gsap from 'gsap'
import naira from '@/assets/naira.png'

gsap.registerPlugin(ScrollTrigger)
const pricing =[
    {
        title:"Basic",
        image: pricingImg1,
        price: '35,000',
        features:[
            "Lifetime Access to 6 courses",
            "Earn a certificate upon completion",
            "Tailored quizzes for practical learning",
        ],
        buttonLink:'https://mainstack.store/stellanwosu/O7XDUpkdLOhk'
    },
    {
        title:"Premium ",
        image: pricingImg2,
        price: '210,000',
        features:[
            "Lifetime Access to 10 courses",
            "Earn a certificate upon completion",
            "Tailored quizzes for practical learning",
            "1-1 hands-on mentorship access with tutors",
            "Save money 5% of your money when you pay",
            "Enjoy maximum flexible learning at your own pace ",
        ],
         buttonLink:'https://mainstack.store/stellanwosu/premium-plan'
    },
    {
        title:"Organizations",
        price: '300,000',
        image: pricingImg3,
        features:[
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
         buttonLink:'https://mainstack.store/stellanwosu/O7XDUpkdLOhk'
    },
]
const Pricing = () => {

    const priceRef =useRef<(HTMLDivElement | null)[]>([])

    useGSAP(()=>{
        // const paragraphSplit =SplitText.create('.price-paragraph', {type:'words'})

        const priceTl =gsap.timeline({
            scrollTrigger:{
                trigger:'.pricing-section',
                start:'top 60%'
            }
        })

        priceTl.to('.price-title', {opacity:1,
      duration:1,
      clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease:'circ.out'})
      .to('.price-paragraph', {opacity:1, duration:1}, '-=0.6')
    .from(priceRef.current, { //animating 
        y: 100,
        delay:0.6,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: "back.out",
      },'-=0.3');

    },[])

  return (
    <section className='pricing-section py-28 lg:py-32 bg-white'>
        <div className='max-w-6xl mx-auto max-lg:p-3'>

            <div className='flex justify-center items-center'>
                <h2 className='text-[#ffffff] px-4 py-2 rounded-lg text-sm bg-[#7852A9]'>Pricing</h2>
            </div>

            <h1  style={{
          clipPath:'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)'
        }} className='price-title mt-4 text-center font-light text-lg md:text-2xl lg:text-3xl text-black max-w-xl mx-auto'>Turn your story Into a Legacy-brand <br /><span className='font-semibold'>pay once, life time access</span></h1>
            {/* <p className='price-paragraph mt-4 max-md:text-sm text-gray-400 text-center max-w-[500px] mx-auto opacity-0'>Flexible pricing for any team size. It&apos;s a one-time payment — you only buy a
            license once, and all future updates are free for you forever.</p> */}


            <div className='mt-10 flex flex-col md:flex-row gap-8 justify-center'>
                {pricing.map((item, index)=>(

               
                <div key={item.title} ref={(el)=>{priceRef.current[index] = el}} className='bg-white border relative border-gray-100 p-6 rounded-2xl shadow-lg text-black'>
                    <Image src={item.image} alt='img' className='absolute top-0 right-0'/>
                    <div>
                        <h2 className='text-[#ffffff] px-4 py-2 rounded-lg text-sm bg-[#7852A9] max-w-min'>{item.title}</h2>

                        <h2 className='font-bold text-3xl md:text-5xl mt-6 flex'><span className='text-gray-400 text-2xl'> <Image src={naira} alt='naira'  /></span> {item.price}</h2>
                        {/* <p className='text-gray-400 max-w-[250px] text-sm mt-6'>{item.desc}</p> */}

                        <div className='flex justify-between items-center max-w-[200px] mx-auto mt-8    '>

                        <a href={item.buttonLink} className='gradient-bg w-full px-8 py-4 rounded-4xl shadow-lg shadow-[#ebccfd] text-sm flex justify-center items-center text-white gap-2'>
                            <Image src={fuelIcon} alt='img' />
                            <p>Buy Now</p>
                        </a>
                        </div>

                        <div className='mt-8'>
                            <ul className='flex flex-col gap-2'>
                                {item.features.map((feature, index)=>(
                                    <li key={index} className='flex items-center gap-2 text-gray-500 text-sm'>
                                        <Image src={checkIconImg} alt='icon'/>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                ))}
            </div>
            
            {/* <p className='text-center text-sm mt-10 leading-6 text-gray-500 max-w-[450px] mx-auto'>Not ready to pay yet? Try the free demo with 600 icons. Same styles, same
            features, same flexibility. It also includes full preview.</p> */}


        </div>
      
    </section>
  )
}

export default Pricing
