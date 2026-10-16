'use client'
import { useEffect, useState } from 'react'

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60

// height is fixed so the navbar and page content can offset for it
export const BANNER_HEIGHT = 44

const DiscountBanner = () => {

  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    // Persist end time so refresh doesn't reset countdown
    let endTime = localStorage.getItem('promo_end_time')

    const resetTimer = () => {
      const now = Date.now()
      const newEndTime = now + THIRTY_DAYS_IN_SECONDS * 1000
      localStorage.setItem('promo_end_time', newEndTime.toString())
      return newEndTime.toString()
    }

    if (!endTime) {
      endTime = resetTimer()
    }

    const interval = setInterval(() => {
      const now = Date.now()
      let endTimestamp = Number(endTime)

      if (endTimestamp <= now) {
        endTime = resetTimer()
        endTimestamp = Number(endTime)
      }

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
    <div className='flex items-center gap-6 md:gap-12 text-white font-bold text-sm md:text-base uppercase w-max tracking-widest shrink-0'>
      <span className='text-yellow-300'>⚠️ join the waitlist</span>
      <span>Launch countdown:</span>
      <span className='text-yellow-300'>★</span>
      <span>Nov 28 2026<span className='tabular-nums bg-black/20 px-2 py-1 rounded ml-2'>{format(hours)}H : {format(minutes)}M : {format(seconds)}S</span></span>
      <span className='text-yellow-300'>★</span>
      <span>50 days : 12 hours : 30 secs</span>
      <span className='text-yellow-300'>★</span>
    </div>
  )

  return (
    <div
      className='w-full overflow-hidden bg-[#D00000] border-y-2 border-yellow-400 flex items-center'
      style={{ height: BANNER_HEIGHT }}
    >
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 55s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll { animation: none; }
        }
      `}</style>
      {/* Marquee Track: Contains TWO sets of content. We slide the whole thing by 50% */}
      <div className='flex animate-scroll gap-6 md:gap-12'>
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
  )
}

export default DiscountBanner
