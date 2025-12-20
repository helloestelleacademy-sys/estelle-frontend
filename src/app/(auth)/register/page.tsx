"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
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
import { useRegisterMutation } from '@/redux/api/authApi'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

 
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "First name is required"),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})
 

const Register = () => {
    const router =useRouter()
   const [register, {isLoading, error, isSuccess}] =useRegisterMutation()
    
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
    },
  })

const onSubmit =async (values: z.infer<typeof formSchema>)=>{
            try {
                const res = await register(values)
            } catch (error) {
                 console.error('Registration failed', error);
                 toast.error("Registration failed" + error)
            }
    }

    useEffect(()=>{
        if(error){
        toast.error("Register failed: " + error!)
        }
    
        if(isSuccess){
        toast.success("Registered successful")
        form.reset()
        router.push("/login")
    }
    }, [isSuccess])


  return (
    <div className='relative  min-h-screen overflow-auto flex justify-end px-2 md:px-20 py-8 md:py-6'>
      <div className='bg-white py-6  md:py-15 w-full md:max-w-[600px] px-10 md:px-16 rounded-2xl'>
        
        <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-3xl'>Sign Up</h2>
            <div className=''>
                <Image src={'/assets/estelleLogoColor.svg'} alt='Logo' width={100} height={100}/>
            </div>
        </div>

        <p className='mt-8 tracking-wide'>Already have an account? <Link href='/login' className='text-[#7852A9] pl-2 underline'>Sign in</Link></p>

    <div className='mt-6'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField 
                control={form.control}
                name="firstName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                         <FormControl>
                            <Input placeholder="firstname" {...field} />
                        </FormControl>
                       
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="lastName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                         <FormControl>
                            <Input placeholder="lastname" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
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
                 <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-light'>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="******" className='py-6' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                <div className="flex items-center gap-3 mt-4">
                    <Checkbox id="terms" checked className='border-[#7851A9]'/>
                    <p className='font-light text-sm'>I agree to platforms <span className='text-[#7851A9] font-semibold'>Terms of service</span> and <span className='text-[#7851A9] font-semibold'>Privacy Policy</span></p>
                </div>

                <Button type="submit" className='w-full py-6 bg-[#7851A9] hover:bg-[#563382] transition duration-300'> {isLoading? <Loader2 className="animate-spin" /> :"Continue"}</Button>

            </form>
        </Form>
    </div>

    <div className='mt-6 flex items-center gap-4 justify-center'>
        <div className='w-[220px] h-[1.5px] bg-black' />
        <span>Or</span>
        <div className='w-[220px] h-[1.5px] bg-black' />
    </div>

    <div className='mt-6 flex items-center gap-10 justify-center'>
        <Image src={google} alt='google-icon' className='w-[50px]' />
        <Image src={linkedin} alt='linkedin-icon' className='w-[50px]' />
        <Image src={teams} alt='teams-icon'className='w-[50px]' />
    </div>

      </div>
    </div>
  )
}

export default Register
