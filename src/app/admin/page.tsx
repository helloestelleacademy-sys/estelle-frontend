'use client';
import UsersPerDay from '@/components/admin/UsersPerDay'
import { TrendingUp, User, BookOpen, Banknote } from 'lucide-react'
import React from 'react'
import { useGetOverviewQuery } from '@/redux/api/analyticsApi';

const Home = () => {
  const { data: overview, isLoading } = useGetOverviewQuery();

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className='py-6 px-8 rounded-2xl bg-primary-foreground flex flex-col  justify-between'>
        <User className='text-neutral-500' />

        <div className='mt-2'>
          <h2 className='font-medium text-[16px] '>Total Registered Users</h2>
          <p className='text-[12.5px] text-neutral-500'>Users currently registerd with Estelle</p>
        </div>


        <div className='text-sm flex items-center gap-2 mt-2'>
          <TrendingUp className='text-green-600' size={18} />
          <p className='text-sm text-gray-500'>{overview?.totalUsers || 0}</p>
        </div>
      </div>

      <div className='py-6 px-8 rounded-2xl bg-primary-foreground flex flex-col  justify-between'>
        <BookOpen className='text-neutral-500' />

        <div className='mt-2'>
          <h2 className='font-medium text-[16px] '>Total Courses Created</h2>
          <p className='text-[12.5px] text-neutral-500'>Courses currently created on Estelle</p>
        </div>


        <div className='text-sm flex items-center gap-2 mt-2'>
          <TrendingUp className='text-green-600' size={18} />
          <p className='text-sm text-gray-500'>{overview?.totalCourses || 0}</p>
        </div>
      </div>

      <div className='py-6 px-8 rounded-2xl bg-primary-foreground flex flex-col  justify-between'>
        <Banknote className='text-neutral-500' />

        <div className='mt-2'>
          <h2 className='font-medium text-[16px] '>Total Revenue</h2>
          <p className='text-[12.5px] text-neutral-500'>Total revenue generated</p>
        </div>


        <div className='text-sm flex items-center gap-2 mt-2'>
          <TrendingUp className='text-green-600' size={18} />
          <p className='text-sm text-gray-500'>₦{overview?.totalRevenue?.toLocaleString() || 0}</p>
        </div>
      </div>

      <div className='p-4 lg:col-span-3 rounded-2xl bg-primary-foreground'>
        <div className='w-full rounded-3xl bg-[#7851A9] px-4 py-5 text-white'>
          <p className='tracking-wider uppercase text-sm mt-4'>Welcome to Estelle Admin Dashboard</p>
          <h2 className='text-xl max-w-[400px] mt-4 font-semibold text-balance'>Building a Personal Brand that Becomes a Legacy</h2>
        </div>
      </div>
      <div className='p-4 rounded-2xl lg:col-span-4 lg:row-span-2 bg-primary-foreground'>
        <UsersPerDay data={overview?.usersPerDay || []} />
      </div>


      <div className='p-4 rounded-2xl bg-primary-foreground'>
        <h2 className='text-lg font-medium mb-4'>Recent Signups</h2>
        <div className='space-y-4'>
          {overview?.recentUsers?.map((user: any) => (
            <div key={user._id} className='flex items-center gap-3 border-b pb-2 last:border-0 last:pb-0'>
              <div className='bg-primary/10 rounded-full p-2'>
                <User size={16} className='text-primary' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>{user.firstName} {user.lastName}</p>
                <p className='text-xs text-muted-foreground'>{user.email}</p>
              </div>
              <div className='text-xs text-muted-foreground'>
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className='p-4 rounded-2xl bg-primary-foreground'>
        <h2 className='text-lg font-medium mb-4'>Recent Payments</h2>
        <div className='space-y-4'>
          {overview?.recentPayments?.map((payment: any) => (
            <div key={payment._id} className='flex items-center gap-3 border-b pb-2 last:border-0 last:pb-0'>
              <div className='bg-green-100 rounded-full p-2'>
                <Banknote size={16} className='text-green-600' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>{payment.user?.firstName} {payment.user?.lastName}</p>
                <p className='text-xs text-muted-foreground'>{payment.reference}</p>
              </div>
              <div className='text-sm font-medium'>
                ₦{(payment.amount / 100).toLocaleString()}
              </div>
            </div>
          ))}
          {(!overview?.recentPayments || overview.recentPayments.length === 0) && (
            <p className="text-sm text-muted-foreground">No recent payments.</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Home
