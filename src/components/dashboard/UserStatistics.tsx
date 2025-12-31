"use client";

import React from 'react';
import Image from 'next/image';
import CircularProgressBar from '@/components/CircularProgressBar';
import { Flame, BookOpen, Trophy, Clock, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserStatisticsProps {
    user: any;
    enrollments: any[];
}

const UserStatistics: React.FC<UserStatisticsProps> = ({ user, enrollments }) => {

    const averageProgress = enrollments.length > 0
        ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progress, 0) / enrollments.length)
        : 0;

    const completedCourses = enrollments.filter(e => e.progress === 100).length;
    // const inProgressCourses = enrollments.length - completedCourses; // Unused for now

    // Dynamic Data from User Model
    const dailyStreak = user?.streak || 0;
    const hoursLearned = Math.round((user?.totalMinutesLearned || 0) / 60);

    return (
        <div className='w-full flex flex-col gap-6 h-full'>

            {/* 1. Main Profile Card */}
            <div className='bg-white p-6 rounded-[32px] shadow-sm border border-stone-50 flex flex-col items-center relative overflow-hidden'>
                {/* Decorative Background Blur */}
                <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-[#7852A9]/10 to-transparent z-0"></div>

                <div className="z-10 flex flex-col items-center w-full">
                    <div className="mb-4">
                        <CircularProgressBar
                            progress={averageProgress}
                            imageUrl={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=7852A9&color=fff`}
                            size={100}
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 text-center">
                        {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                    </h2>

                    <Badge className="mt-2 bg-[#F3EBF9] text-[#7852A9] hover:bg-[#ebdcf7] border-0 px-3 py-1 rounded-full font-medium">
                        {user?.plan || 'Free Plan'}
                    </Badge>

                    <p className="text-sm text-gray-400 mt-4 text-center max-w-[220px]">
                        {averageProgress === 0
                            ? "Ready to start your journey?"
                            : "You're doing great! Keep it up."}
                    </p>
                </div>
            </div>

            {/* 2. Gamification / Quick Stats Grid */}
            <div className='grid grid-cols-2 gap-4'>

                {/* Streak */}
                <div className='bg-white p-4 rounded-[24px] shadow-sm border border-stone-50 flex flex-col justify-between h-[110px]'>
                    <div className='flex items-center justify-between'>
                        <div className='p-2 bg-orange-50 rounded-full'>
                            <Flame className='w-5 h-5 text-orange-500 fill-orange-500' />
                        </div>
                        <span className='text-xs font-semibold text-gray-400'>STREAK</span>
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold text-gray-900'>{dailyStreak}</h3>
                        <p className='text-xs text-gray-400'>Days Fire</p>
                    </div>
                </div>

                {/* Courses Count */}
                <div className='bg-white p-4 rounded-[24px] shadow-sm border border-stone-50 flex flex-col justify-between h-[110px]'>
                    <div className='flex items-center justify-between'>
                        <div className='p-2 bg-purple-50 rounded-full'>
                            <BookOpen className='w-5 h-5 text-[#7852A9]' />
                        </div>
                        <span className='text-xs font-semibold text-gray-400'>ACTIVE</span>
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold text-gray-900'>{enrollments.length}</h3>
                        <p className='text-xs text-gray-400'>Courses</p>
                    </div>
                </div>

                {/* Hours Learned */}
                <div className='bg-white p-4 rounded-[24px] shadow-sm border border-stone-50 flex flex-col justify-between h-[110px]'>
                    <div className='flex items-center justify-between'>
                        <div className='p-2 bg-blue-50 rounded-full'>
                            <Clock className='w-5 h-5 text-blue-500' />
                        </div>
                        <span className='text-xs font-semibold text-gray-400'>TIME</span>
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold text-gray-900'>{hoursLearned}h</h3>
                        <p className='text-xs text-gray-400'>Learned</p>
                    </div>
                </div>

                {/* Completion / Trophy */}
                <div className='bg-white p-4 rounded-[24px] shadow-sm border border-stone-50 flex flex-col justify-between h-[110px]'>
                    <div className='flex items-center justify-between'>
                        <div className='p-2 bg-yellow-50 rounded-full'>
                            <Trophy className='w-5 h-5 text-yellow-500' />
                        </div>
                        <span className='text-xs font-semibold text-gray-400'>WINS</span>
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold text-gray-900'>{completedCourses}</h3>
                        <p className='text-xs text-gray-400'>Completed</p>
                    </div>
                </div>

            </div>

            {/* 3. Mentor Card */}
            <div className='bg-[#FFFBF2] p-5 rounded-[24px] border border-[#F5E6CC] flex items-center gap-4 relative overflow-hidden'>
                {/* Subtle decorative circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#7852A9]/5 rounded-full blur-2xl"></div>

                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <Image
                        src={'/assets/stella.jpg'}
                        alt='Stella Nwosu'
                        fill
                        className='object-cover'
                        onError={(e) => {
                            // Fallback handled by parent or placeholder logic if needed
                        }}
                    />
                </div>
                <div className='z-10'>
                    <p className='text-[10px] uppercase font-bold text-[#7852A9] tracking-wider mb-0.5'>Personal Mentor</p>
                    <p className='font-bold text-gray-900 text-sm'>Stella Nwosu</p>
                    <div className='flex items-center gap-1 mt-1'>
                        <Zap className='w-3 h-3 text-[#FFD700] fill-[#FFD700]' />
                        <p className='text-xs text-gray-500'>Online Now</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserStatistics
