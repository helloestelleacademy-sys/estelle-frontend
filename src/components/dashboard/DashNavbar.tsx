import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const DashNavbar = () => {
  return (
    <div className='flex items-center gap-6 md:gap-10 w-full'>
        <SidebarTrigger size={'lg'} className=''/>

        <div className='relative'>
            <Input className='border-[#7851A9] w-[300px] rounded-3xl bg-gray-200 pl-10 text-[#7851A9]' placeholder='Search your courses'/>
            <Search className='absolute right-4 top-2 text-[#7851A9] cursor-pointer' size={18} />
        </div>
    </div>
  )
}

export default DashNavbar
