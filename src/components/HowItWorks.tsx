import React from 'react'
import { Award, CheckCircle2, Linkedin, MessageCircle } from 'lucide-react'

const MockCard = ({ children }: { children: React.ReactNode }) => (
  <div
    aria-hidden='true'
    className='w-full max-w-sm rounded-2xl border border-[#E7E7E7] bg-white p-5 shadow-[0_10px_30px_-12px_rgba(55,41,109,0.18)]'
  >
    {children}
  </div>
)

const steps = [
  {
    kicker: 'Step 1',
    title: 'Find your voice and tell your story',
    text: 'Start with expert-led courses that help you define who you are, what you stand for, and how you want to be remembered. Learn at your own pace, with lifetime access.',
    mock: (
      <MockCard>
        <p className='text-[11px] uppercase tracking-widest text-neutral-400'>Course progress</p>
        <p className='mt-2 font-semibold text-[#37296D]'>Your brand story</p>
        <div className='mt-4 h-2 overflow-hidden rounded-full bg-[#F3EDFB]'>
          <div className='h-full w-2/5 rounded-full bg-[#7852A9]' />
        </div>
        <div className='mt-4 space-y-2.5 text-sm'>
          <p className='flex items-center gap-2 text-neutral-700'><CheckCircle2 className='size-4 text-[#7852A9]' /> Define your message</p>
          <p className='flex items-center gap-2 text-neutral-700'><CheckCircle2 className='size-4 text-[#7852A9]' /> Know your audience</p>
          <p className='flex items-center gap-2 text-neutral-400'><span className='size-4 rounded-full border border-neutral-300' /> Craft your story</p>
        </div>
      </MockCard>
    ),
  },
  {
    kicker: 'Step 2',
    title: 'Practise with guidance, not guesswork',
    text: 'Reinforce what you learn with AI-powered training and tailored quizzes, and get goal-focused coaching and 1-1 growth sessions with tutors when you need them.',
    mock: (
      <MockCard>
        <p className='text-[11px] uppercase tracking-widest text-neutral-400'>Quick check</p>
        <div className='mt-3 space-y-2'>
          <div className='h-3 w-11/12 rounded-full bg-neutral-200' />
          <div className='h-3 w-7/12 rounded-full bg-neutral-200' />
        </div>
        <div className='mt-4 space-y-2'>
          <div className='rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-500'>Option A</div>
          <div className='rounded-xl border border-[#7852A9] bg-[#F3EDFB] px-3 py-2 text-sm font-medium text-[#37296D]'>Option B</div>
          <div className='rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-500'>Option C</div>
        </div>
        <p className='mt-4 inline-flex items-center gap-2 rounded-full bg-[#37296D] px-3 py-1.5 text-xs text-white'>
          <MessageCircle className='size-3.5' /> 1-1 session with a tutor
        </p>
      </MockCard>
    ),
  },
  {
    kicker: 'Step 3',
    title: 'Get certified and get seen',
    text: 'Earn a certificate when you complete a course, show it off on your LinkedIn profile, and stay top of mind for the clients and recruiters you want to reach.',
    mock: (
      <MockCard>
        <div className='rounded-xl border border-dashed border-[#7852A9]/40 bg-[#FBF8FF] p-5 text-center'>
          <Award className='mx-auto size-8 text-[#7852A9]' />
          <p className='mt-2 text-[11px] uppercase tracking-widest text-neutral-400'>Certificate</p>
          <p className='mt-1 font-semibold text-[#37296D]'>Certificate of completion</p>
        </div>
        <p className='mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700'>
          <Linkedin className='size-3.5 text-[#7852A9]' /> Add to LinkedIn
        </p>
      </MockCard>
    ),
  },
]

const HowItWorks = () => {
  return (
    <section id='how-it-works' className='py-12 lg:py-16'>
      <div className='max-w-6xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-8 lg:mb-10'>
          <p className='text-xs font-medium uppercase tracking-[0.2em] text-[#7852A9]'>How it works</p>
          <h2 className='text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl text-balance'>
            From your story to your{' '}
            <span className='text-[#7852A9]'>legacy</span>
          </h2>
        </div>

        <ol className='flex flex-col gap-6'>
          {steps.map((step, index) => (
            <li
              key={step.kicker}
              className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 rounded-3xl border border-[#E7E7E7] bg-[#FBF9F7] p-6 md:p-10'
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <p className='text-xs font-medium uppercase tracking-[0.2em] text-[#7852A9]'>{step.kicker}</p>
                <h3 className='mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-balance'>{step.title}</h3>
                <p className='mt-4 text-neutral-600 leading-relaxed text-pretty'>{step.text}</p>
              </div>
              <div className={clsxOrder(index)}>{step.mock}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// mirrors the copy column so the mock sits on the opposite side from md up
const clsxOrder = (index: number) =>
  `flex justify-center ${index % 2 === 1 ? 'md:order-1 md:justify-start' : 'md:justify-end'}`

export default HowItWorks
