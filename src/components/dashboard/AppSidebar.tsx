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
// import { NavItems, NavItems2 } from '@/constants'
import Link from 'next/link'


type NavLinks = {
  NavLinks1: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[]
  NavLinks2: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[]
}

const AppSidebar = ({ NavLinks1, NavLinks2 }: NavLinks) => {
  return (
    <Sidebar>
      <SidebarHeader className='px-10 py-2'>
        <Link href={'/'} className=''>
          <Image src={'/assets/Estellelogonew2.png'} alt='Logo' width={78} height={80} />
        </Link>
      </SidebarHeader>

      <SidebarContent className='flex flex-col justify-between'>
        <SidebarGroup>
          <SidebarGroupContent className='px-8'>
            <SidebarMenu className='w-full flex items-start flex-col gap-4 justify-start '>
              {NavLinks1.map((item) => (
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
              {NavLinks2.map((item) => (
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
