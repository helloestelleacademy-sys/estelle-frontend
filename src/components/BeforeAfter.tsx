import React from 'react'
import { Check, X } from 'lucide-react'

const without = [
  { text: 'Unseen by recruiters', tilt: '-rotate-3' },
  { text: 'A generic LinkedIn profile', tilt: 'rotate-2' },
  { text: 'No clear story', tilt: '-rotate-1' },
  { text: 'Skills nobody can verify', tilt: 'rotate-3' },
  { text: 'Opportunities go elsewhere', tilt: '-rotate-2' },
  { text: 'Forgotten after the interview', tilt: 'rotate-1' },
]

const withEstelle = [
  { title: 'Learn at your own pace', text: 'Expert-led courses with lifetime access.' },
  { title: 'Practise with guidance', text: 'AI-powered training, tailored quizzes and access to tutors.' },
  { title: 'Get certified', text: 'Add your certificate to your LinkedIn profile.' },
  { title: 'Be remembered', text: 'Stay top of mind for clients and recruiters.' },
]

const BeforeAfter = () => {
  return (
    <section id='difference' className='py-20 lg:py-24'>
      <div className='max-w-6xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-12 lg:mb-16'>
          <p className='font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#7852A9]'>The difference</p>
          <h2 className='text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl text-balance'>
            Talent is everywhere.{' '}
            <span className='font-accent text-[#7852A9] text-[1.1em]'>Visibility</span> is not.
          </h2>
          <p className='text-neutral-600 max-w-xl text-balance'>
            Two people with the same skills. One has a personal brand that does the talking.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* without */}
          <div className='rounded-3xl border border-[#E7E7E7] bg-[#F6F4F8] p-8 md:p-10 flex flex-col min-h-[420px]'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold text-neutral-900'>Without a personal brand</h3>
              <span className='font-mono text-[11px] uppercase tracking-widest text-neutral-500 rounded-full border border-neutral-300 px-3 py-1'>Before</span>
            </div>

            <ul className='flex flex-wrap items-center justify-center content-center gap-3 flex-1 py-10'>
              {without.map((item) => (
                <li
                  key={item.text}
                  className={`${item.tilt} inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-400 bg-white/70 px-4 py-2 text-sm text-neutral-500`}
                >
                  <X aria-hidden='true' className='size-3.5 shrink-0 text-neutral-400' />
                  {item.text}
                </li>
              ))}
            </ul>

            <p className='text-sm text-neutral-500 text-center text-balance'>
              Good work that never gets noticed.
            </p>
          </div>

          {/* with */}
          <div className='relative overflow-hidden rounded-3xl bg-[#37296D] p-8 md:p-10 flex flex-col min-h-[420px] text-white'>
            <div aria-hidden='true' className='pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#a984dd]/30 blur-3xl' />

            <div className='relative flex items-center justify-between'>
              <h3 className='text-xl font-semibold'>With Estelle</h3>
              <span className='font-mono text-[11px] uppercase tracking-widest text-white/80 rounded-full border border-white/30 px-3 py-1'>After</span>
            </div>

            <ol className='relative flex-1 flex flex-col justify-center py-10'>
              {withEstelle.map((step, index) => (
                <li key={step.title} className='relative flex gap-4 pb-6 last:pb-0'>
                  {index < withEstelle.length - 1 && (
                    <span aria-hidden='true' className='absolute left-[13px] top-8 bottom-0 w-px bg-white/25' />
                  )}
                  <span className='relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#a984dd] text-[#37296D]'>
                    <Check aria-hidden='true' className='size-4' strokeWidth={3} />
                  </span>
                  <div>
                    <p className='font-semibold leading-7'>{step.title}</p>
                    <p className='text-sm text-white/70 text-balance'>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className='relative text-sm text-white/80 text-center text-balance'>
              One path, from learning to being remembered.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
