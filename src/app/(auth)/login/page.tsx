"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import google from '@/assets/Google.svg'
import linkedin from '@/assets/LinkedIn.svg'
import teams from '@/assets/Teams.svg'
import Link from 'next/link'
import { useLoginMutation } from '@/redux/api/authApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'



const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})


const Login = () => {
  const router = useRouter()
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation()
  const [passwordVisible, setPasswordVisible]= useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      const res = await login(values)
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  useEffect(() => {
    if (isError) {
      // toast.error(error.data?.message || "Login failed")
      toast.error("Login failed: " + isError!)
    }

    if (isSuccess) {
      toast.success("Login successful")
      form.reset()
      router.push("/dashboard")
    }
  }, [isSuccess])


  return (
    <div className='relative  min-h-screen flex justify-end px-2 md:px-20 py-8 md:py-12'>
      <div className='bg-white py-10  md:py-15 w-full md:max-w-[600px] px-10 md:px-16 rounded-2xl'>

        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-3xl'>Sign In</h2>
          <div className=''>
            <Image src={'/assets/Estellelogonew2.png'} alt='Logo' width={78} height={80} />
          </div>
        </div>

        <p className='mt-8 tracking-wide'>Don&apos;t have an account? <Link href='/register' className='text-[#7852A9] pl-2 underline'>Create an account</Link></p>

        <div className='mt-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-light'>Email address </FormLabel>
                    <FormControl>
                      <Input placeholder="estelle@gmail.com" className='py-6' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='relative'>

              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className='relative'>
                      <Input type={passwordVisible ? "text" : "password"}  placeholder="password" {...field} />                  
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  <button type='button' onClick={()=>setPasswordVisible(!passwordVisible)} 
                      className='absolute inset-y-0 right-3 top-6 flex items-center text-gray-500'
                      >
                        {passwordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Checkbox id="terms" className='border-[#7851A9]' />
                <p className='font-light text-sm'>I agree to platforms <span className='text-[#7851A9] font-semibold'>Terms of service</span> and <span className='text-[#7851A9] font-semibold'>Privacy Policy</span></p>
              </div>

              <Button type="submit" className='w-full py-6 bg-[#7851A9] hover:bg-[#563382] transition duration-300'> {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}</Button>

            </form>
          </Form>
        </div>

        <div className='mt-6 flex items-center gap-4 justify-center'>
          <div className='w-[220px] h-[1.5px] bg-black' />
          <span>Or</span>
          <div className='w-[220px] h-[1.5px] bg-black' />
        </div>

        <div className='mt-6 flex items-center gap-10 justify-center'>
          <div className='cursor-pointer' onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1"}/auth/google`}>
            <Image src={google} alt='google-icon' className='w-[50px]' />
          </div>
          <div className='cursor-pointer' onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://estelle-backend.onrender.com/api/v1"}/auth/linkedin`}>
            <Image src={linkedin} alt='linkedin-icon' className='w-[50px]' />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
