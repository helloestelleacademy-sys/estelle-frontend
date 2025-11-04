import AppSidebar from '@/components/dashboard/AppSidebar';
import DashNavbar from '@/components/dashboard/DashNavbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import React from 'react'

const layout =async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider>
        <AppSidebar />
        <div className='w-full min-h-screen bg-[#f3ebf9] flex flex-col gap-10 py-4 pl-3 md:pl-6'>
            <DashNavbar />
            <div className=' px-2 md:px-10 lg:px-12 py-4 font-sans '>
                {children}
            </div>
        </div>
    </SidebarProvider>
  )
}

export default layout
