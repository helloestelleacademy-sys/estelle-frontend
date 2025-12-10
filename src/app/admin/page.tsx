import UsersPerDay from '@/components/admin/UsersPerDay'
import { TrendingUp, User } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className='py-6 px-8 rounded-2xl bg-primary-foreground flex flex-col  justify-between'>
            <User className='text-neutral-500' />
            
            <div className='mt-2'>
            <h2 className='font-medium text-[16px] '>Total Registered Users</h2>
            <p className='text-[12.5px] text-neutral-500'>Users currently registerd with Estelle</p>
            </div>
            

            <div className='text-sm flex items-center gap-2 mt-2'>
                <TrendingUp className='text-green-600' size={18}/>
                <p className='text-sm text-gray-500'>6000</p>
            </div>
        </div>

      <div className='py-6 px-8 rounded-2xl bg-primary-foreground flex flex-col  justify-between'>
            <User className='text-neutral-500' />
            
            <div className='mt-2'>
            <h2 className='font-medium text-[16px] '>Total Courses Created</h2>
            <p className='text-[12.5px] text-neutral-500'>Courses currently created on Estelle</p>
            </div>
            

            <div className='text-sm flex items-center gap-2 mt-2'>
                <TrendingUp className='text-green-600' size={18}/>
                <p className='text-sm text-gray-500'>8</p>
            </div>
        </div>

      <div className='p-4 lg:col-span-2 rounded-2xl bg-primary-foreground'>
        <div className='w-full rounded-3xl bg-[#7851A9] px-4 py-5 text-white'>
            <p className='tracking-wider uppercase text-sm mt-4'>Welcome to Estelle Admin Dashboard</p>
            <h2 className='text-xl max-w-[400px] mt-4 font-semibold text-balance'>Building a Personal Brand that Becomes a Legacy</h2>
        </div>
      </div>
      <div className='p-4 rounded-2xl lg:col-span-3 lg:row-span-2 bg-primary-foreground'>
        <UsersPerDay />
      </div>

      
      <div className='p-4 rounded-2xl bg-primary-foreground'>

      </div>

      {/* <div className='border border-gray-400 p-4 rounded-2xl bg-primary-foreground'>

      </div> */}

    </div>
  )
}

export default Home
