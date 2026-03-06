'use client'
import EventCard from '@/components/main/EventCard'
import { useGetAllEventsQuery } from '@/redux/api/eventApi'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';

const EventsPage = () => {
    const cardRef = useRef<(HTMLDivElement | null)[]>([])
    const { data, isLoading, error } = useGetAllEventsQuery();

    useGSAP(() => {
        if (data?.events) {
            gsap.from(cardRef.current, { opacity: 0, scale: 0.9, ease: 'power2.out', duration: 0.8, stagger: 0.1 })
        }
    }, [data])

    return (
        <main className="min-h-screen bg-[#F7F0FF]">
            <HeroGeometric className="bg-[#F7F0FF] py-20 min-h-[40dvh]">
                <div className="relative w-full flex flex-col items-center justify-center px-6 text-center">
                    <h1 className='text-4xl lg:text-[56px] font-bold mb-6 text-black'>
                        Upcoming <span className='text-[#7852A9]'>Events</span>
                    </h1>
                    <p className='lg:text-xl max-w-2xl text-sm text-black'>
                        Join our exclusive webinars, workshops, and networking events to accelerate your brand legacy.
                    </p>
                </div>
            </HeroGeometric>

            <section className='py-12 lg:py-20'>
                <div className='max-w-7xl mx-auto px-4 md:px-6'>
                    {isLoading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7852A9]"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <p className="text-xl text-red-500 font-semibold mb-2">Oops! Something went wrong.</p>
                            <p className="text-gray-600">We couldn't load the events at this time.</p>
                        </div>
                    )}

                    {!isLoading && !error && data?.events.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100">
                            <p className="text-xl text-gray-800 font-semibold mb-2">No events scheduled yet.</p>
                            <p className="text-gray-600">Check back soon for exciting new opportunities!</p>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {data && data.events && data.events.map((event, index) => (
                            <div key={event._id || index} className='' ref={(el) => { cardRef.current[index] = el }}>
                                <EventCard
                                    id={event._id}
                                    img={event.image}
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    price={event.price}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default EventsPage
