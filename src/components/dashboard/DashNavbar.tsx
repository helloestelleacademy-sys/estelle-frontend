"use client";
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

const DashNavbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className='flex items-center justify-between gap-6 md:gap-10 w-full'>
      <div className='flex items-center gap-4 w-full'>
        <SidebarTrigger size={'lg'} className='' />

        <div className='relative hidden md:block'>
          <Input className='border-[#7851A9] w-[300px] rounded-3xl bg-gray-200 pl-10 text-[#7851A9]' placeholder='Search your courses' />
          <Search className='absolute right-4 top-2 text-[#7851A9] cursor-pointer' size={18} />
        </div>
      </div>

      <Link href="/dashboard/profile">
        <Avatar className="cursor-pointer border-2 border-[#7851A9]">
          <AvatarImage src={user?.avatar} alt={user?.firstName} className="object-cover" />
          <AvatarFallback className="bg-[#7851A9] text-white">
            {user?.firstName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}

export default DashNavbar
