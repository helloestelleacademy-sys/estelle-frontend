import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Image from 'next/image'
import { NavItems, NavItems2 } from '@/constants'
 


const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='px-10 py-8'>
        <div className=''>
            <Image src={'/assets/estelleLogoColor.svg'} alt='Logo' width={100} height={100}/>
        </div>
      </SidebarHeader>

      <SidebarContent className='flex flex-col justify-between'>
        <SidebarGroup>
            <SidebarGroupContent className='px-8'>
                <SidebarMenu className='w-full flex items-start flex-col gap-4 justify-start '>
                    {NavItems.map((item) => (
                        <SidebarMenuItem key={item.title} className='hover:bg-gray-200 transition duration-300 cursor-pointer w-full rounded-2xl'>
                        <SidebarMenuButton asChild className='font-medium py-5'>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupContent className='px-8'>
                <SidebarMenu className='w-full flex items-start flex-col gap-4 justify-start '>
                     {NavItems2.map((item) => (
                            <SidebarMenuItem key={item.title} className='hover:bg-gray-200 transition duration-300 cursor-pointer w-full rounded-2xl'>
                            <SidebarMenuButton asChild className='font-medium py-5'>
                                <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
