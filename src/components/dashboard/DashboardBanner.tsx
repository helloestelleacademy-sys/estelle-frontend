"use client";

import React from 'react'
import { ElegantShape } from '@/components/ui/shape-landing-hero';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

const DashboardBanner = () => {
    return (
        <div className='relative w-full rounded-3xl bg-[#F7F0FF] px-8 py-10 overflow-hidden shadow-sm border border-purple-100'>
            {/* Background Shapes - Adjusted for banner height */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ElegantShape
                    delay={0.1}
                    width={300}
                    height={80}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-5%] top-[10%]"
                />
                <ElegantShape
                    delay={0.2}
                    width={250}
                    height={70}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-2%] top-[50%]"
                />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <p className='tracking-wider uppercase text-xs font-semibold text-[#7851A9] mt-2 mb-2'>
                        Recommended for you
                    </p>
                    <h2 className='text-3xl md:text-4xl max-w-[500px] font-bold text-gray-900 leading-tight'>
                        Build a <span className="text-[#7851A9]">Personal Brand</span> that Becomes a <span className="font-serif">Legacy</span>
                    </h2>
                </div>

                <Link href="/dashboard/pricing">
                    <Button className="bg-[#7851A9] hover:bg-[#5e3e87] text-white shadow-lg shadow-purple-200">
                        View Course
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardBanner
