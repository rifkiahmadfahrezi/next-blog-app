'use client'

import { Input } from '@/components/ui/input'
import { 
   Form, 
   FormControl, 
   FormLabel, 
   FormItem, 
   FormField, 
   FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
// import { z } from 'zod'
import React from 'react'
import { Button } from '@/components/ui/button'

const SigninForm = () => {

   const form = useForm({
      defaultValues: {
         username: '', password: ''
      }
   })

  return (
   <>
      <Form {...form} >
         <form action="">
         <FormField 
            control={form.control}
            name='username'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                     <Input placeholder='Username..' {...field} />   
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
            >
            Sign In
         </Button>
         </form>
      </Form>
   </>
  )
}

export default SigninForm