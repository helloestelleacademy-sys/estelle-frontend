'use client'
import { useEffect, useState } from 'react'

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60


const DiscountBanner = () => {

     const [timeLeft, setTimeLeft] = useState<number>(0)

     useEffect(() => {
    // Persist end time so refresh doesn't reset countdown
    let endTime = localStorage.getItem('promo_end_time')

    if (!endTime) {
      const now = Date.now()
      const newEndTime = now + THIRTY_DAYS_IN_SECONDS * 1000
      localStorage.setItem('promo_end_time', newEndTime.toString())
      endTime = newEndTime.toString()
    }

    const endTimestamp = Number(endTime)

    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTimestamp - now) / 1000))
      setTimeLeft(remaining)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Show only 24h cycle
  const hours = Math.floor((timeLeft % 86400) / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const format = (value: number) => value.toString().padStart(2, '0')


  return (
        <div className='w-full bg-red-600 py-8 px-2'>
            <div className='max-w-6xl mx-auto flex items-center text-white text-sm md:text-2xl lg:text-3xl justify-between'>
                <h2 className=''>30% Discount!!!</h2>

                <h2>DON'T MISS THIS OFFER</h2>

                <div className='flex items-center gap-4 md:gap-8'>
                    <div className='flex flex-col items-center'>
                        <h2 className='font-semibold'>{format(hours)}</h2>
                        <p className='text-sm '>hours</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='font-semibold'>{format(minutes)}</h2>
                        <p className='text-sm '>mins</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='font-semibold'>{format(seconds)}</h2>
                        <p className='text-sm '>seconds</p>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default DiscountBanner
