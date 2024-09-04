'use client'

import { Input } from '@/components/ui/input'
import { 
   Form, 
   FormControl, 
   FormLabel, 
   FormItem, 
   FormField, 
   FormMessage,
   FormDescription
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

const schema = z.object({
   username: z.string({ required_error: 'Username is required' })
      .min(5, { message: 'Username must be at least 5 characters' })
      .trim().refine(s => !s.includes(' '), "Username cannot contain any white spaces"),
   email: z.string().min(1, { message: 'Email is required' })
   .email({ message: "Invalid email format" }),
   password: z.string({ required_error: 'Password is required' })
      .min(5, { message: 'Password must be at least 5 characters' }),
})

const SignupForm = () => {
   const [pending, setPending] = useState<boolean>(false)
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         username: '', email: '', password: ''
      }
   })

   const onSubmit = async (values : z.infer<typeof schema>) => {
      setPending(true)
      try {
         const req = await fetch("/api/auth/register", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(values),
         })
         const res = await req.json()
         if (!req.ok) {
            toast.error(res.message || "Something wrong, try again later")
            return
         }

         toast.success(res.message || "Sign up success, now Sign in to access your account")
         return signIn(undefined, { callbackUrl: "/" })
       } catch (error) {
         console.error(error)
       }finally{
         setPending(false)
       }
   }

  return (
   <>
      <Form {...form} >
         <form onSubmit={form.handleSubmit(onSubmit)} className=''  >
            <FormField 
               control={form.control}
               name='username'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Username</FormLabel>
                     <FormControl>
                        <Input placeholder='Username..' {...field} />   
                     </FormControl>
                     <FormDescription>
                        eg. jhondoe
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder='Email..' {...field} />   
                     </FormControl>
                     <FormDescription>
                        eg. jhondoe@mail.com
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField 
               control={form.control}
               name='password'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input placeholder='Password..' type="password" {...field} />   
                     </FormControl>
                     <FormDescription>
                        min 5 characters
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

         <Button
            className='my-5'
            type="submit"
            disabled={pending}
            >
            {pending ? 'Loading..' : 'Sign Up'}
         </Button>
         </form>
      </Form>
   </>
  )
}

export default SignupForm