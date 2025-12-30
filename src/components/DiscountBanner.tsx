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

  const MarqueeContent = () => (
    <div className='flex items-center gap-6 md:gap-12 text-white font-bold text-sm md:text-lg uppercase w-max tracking-widest shrink-0'>
      <span className='text-yellow-300'>⚠️ FLASH SALE</span>
      <span>30% OFF PREMIUM PLAN</span>
      <span className='text-yellow-300'>★</span>
      <span>OFFER ENDS IN: <span className='font-mono bg-black/20 px-2 py-1 rounded'>{format(hours)}:{format(minutes)}:{format(seconds)}</span></span>
      <span className='text-yellow-300'>★</span>
      <span>DON'T MISS OUT</span>
      <span className='text-yellow-300'>★</span>
    </div>
  )


  return (
    <div className='absolute top-[90px] left-0 w-full h-20 z-[40] overflow-visible pointer-events-none flex items-center justify-center '>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <div className='w-[105%] bg-[#D00000] py-3 -rotate-1 shadow-xl flex items-center border-y-2 border-yellow-400 overflow-hidden'>
        {/* Marquee Track: Contains TWO sets of content. We slide the whole thing by 50% */}
        <div className='flex animate-scroll gap-6 md:gap-12 '>
          {/* Set 1 */}
          <div className='flex gap-6 md:gap-12 shrink-0'>
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
          {/* Set 2 (Duplicate) */}
          <div className='flex gap-6 md:gap-12 shrink-0'>
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountBanner
