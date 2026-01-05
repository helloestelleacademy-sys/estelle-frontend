"use client";
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
import { Lock } from 'lucide-react'

import Image from 'next/image'
import { NavItems, NavItems2, NavItemsAdmin, NavItemsAdmin2 } from '@/constants'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logout } from '@/redux/features/authSlice'

interface AppSidebarProps {
  type?: 'dashboard' | 'admin';
}

const AppSidebar = ({ type = 'dashboard' }: AppSidebarProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const links1 = type === 'admin' ? NavItemsAdmin : NavItems;
  const links2 = type === 'admin' ? NavItemsAdmin2 : NavItems2;

  const handleItemClick = (title: string) => {
    if (title === 'Log out' || title === 'Logout') {
      dispatch(logout());
    }
  }

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

              {links1.map((item) => {
                const restrictedItems = ['Resources', 'AI Tools', 'Certificate', 'Community'];
                const isLocked = restrictedItems.includes(item.title) && (!user?.plan || user.plan === 'Free');

                if (isLocked) {
                  return (
                    <SidebarMenuItem key={item.title} className='w-full rounded-2xl'>
                      <SidebarMenuButton asChild className='font-medium py-5'>
                        <Link href="/dashboard/pricing">
                          <Lock className='w-5 h-5 text-gray-500' />
                          <span className="text-gray-500">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title} className='hover:bg-gray-200 transition duration-300 cursor-pointer w-full rounded-2xl'>
                    <SidebarMenuButton asChild className='font-medium py-5'>
                      <Link href={item.url} {...(item.title === 'Community' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent className='px-8'>
            <SidebarMenu className='w-full flex items-start flex-col gap-4 justify-start '>
              {links2.map((item) => (
                <SidebarMenuItem key={item.title} className='hover:bg-gray-200 transition duration-300 cursor-pointer w-full rounded-2xl'>
                  <SidebarMenuButton asChild className='font-medium py-5'>
                    <Link href={item.url} onClick={() => handleItemClick(item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
