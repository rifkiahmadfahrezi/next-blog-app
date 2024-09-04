'use client'

import { Input } from '@/components/ui/input'
import { 
   Form, 
   FormControl, 
   FormLabel, 
   FormItem, 
   FormField, 
   FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

const signInSchema = z.object({
   email: z.string()
      .min(1, { message: 'Email is required' })
      .email({ message: "Invalid email format" }),
   password: z.string().min(1, { message: 'Password is required' }),
})

const SigninForm = () => {
   const router = useRouter()
   const [pending, setPending] = useState<boolean>(false)
   const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
         email: '', password: ''
      },
   })

   const onSubmit = async (values : z.infer<typeof signInSchema>) => {
      setPending(true)
      try {
         const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
          })
          if (res?.ok) {
            toast.success("Login success")
            router.replace('/')
         } else {
            toast.error(res?.error || "Login Failed")
            throw new Error(res?.error || 'Failed, Try again later')
          }
      } catch (error) {
         console.error(error)
      }finally{
         setPending(false)
      }
   }

  return (
   <>
      <Form {...form} >
         <form action="" onSubmit={form.handleSubmit(onSubmit)} >
         <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                     <Input type='email' placeholder='jhon@doe.com' {...field} />   
                  </FormControl>
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
                  <FormMessage />
               </FormItem>
            )}
         />

         <Button
            className='my-5'
            type='submit'
            disabled={pending}
            >
            {pending ? 'Loading..' : 'Sign In'}
         </Button>
         </form>
      </Form>
   </>
  )
}

export default SigninForm