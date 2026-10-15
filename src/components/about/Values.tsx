import React from 'react'
import { Accessibility, Archive, ArrowUpRight, BadgeCheck, Users } from 'lucide-react'

const values = [
  {
    title: 'Authenticity',
    text: 'We believe true influence begins with being real. Every story matters, and every voice deserves to be heard.',
    icon: BadgeCheck,
  },
  {
    title: 'Empowerment',
    text: 'We equip people with the tools and confidence to take charge of their growth and build something lasting.',
    icon: ArrowUpRight,
  },
  {
    title: 'Accessibility',
    text: 'Education on personal branding should be available to everyone, everywhere, regardless of background or experience.',
    icon: Accessibility,
  },
  {
    title: 'Legacy',
    text: "We don't just build brands; we build names that will be remembered.",
    icon: Archive,
  },
  {
    title: 'Community',
    text: 'Collaboration fuels greatness. We learn, grow, and thrive together.',
    icon: Users,
  },
]

const Values = () => {
  return (
    <section className='py-20 lg:py-24'>
      <div className='max-w-6xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-12 lg:mb-16'>
          <p className='font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#7852A9]'>What we stand for</p>
          <h2 className='text-3xl md:text-5xl font-semibold tracking-tight text-balance'>
            Our core <span className='font-accent text-[#7852A9] text-[1.1em]'>values</span>
          </h2>
        </div>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5'>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <li
                key={value.title}
                className='lg:col-span-2 [&:nth-child(4)]:lg:col-span-3 [&:nth-child(5)]:lg:col-span-3 group flex flex-col rounded-2xl border border-[#7852A9]/15 bg-white p-7 transition-colors duration-200 hover:border-[#7852A9]/40'
              >
                <div className='flex items-center justify-between mb-10'>
                  <span className='flex size-11 items-center justify-center rounded-full bg-[#F3EDFB] text-[#7852A9]'>
                    <Icon aria-hidden='true' className='size-5' />
                  </span>
                  <span className='font-mono text-sm tabular-nums text-neutral-400'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className='text-xl font-semibold text-[#37296D] mb-2'>{value.title}</h3>
                <p className='text-sm leading-relaxed text-neutral-600 text-pretty'>{value.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Values
