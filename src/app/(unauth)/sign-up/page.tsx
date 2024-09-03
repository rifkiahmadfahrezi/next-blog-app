import React from 'react'
import { 
   Card, 
   CardContent, 
   CardDescription, 
   CardHeader, 
   CardTitle,
   CardFooter
} from '@/components/ui/card'
import SignupForm from './components/signup-form'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata : Metadata = {
   title: 'Sign Up - FutureTech'
}


const SignUpPage = () => {

  return (
   <>
     <div className="grid grid-cols-1 md:grid-cols-2 min-h-svh">
         <figure className="hidden sm:block sm:border-r">
            <Image 
               src={'/assets/abstract.svg'}
               width={400}
               height={300}
               alt=''
               className='opacity-25'
               />
         </figure>
         <div className="grid place-items-center">
            <Card>
               <CardHeader>
                  <Image 
                     src={'/logo.svg'}
                     width={100}
                     height={50}
                     alt=''
                     className='my-5'
                     />
               <CardTitle>Sign Up</CardTitle>
               <CardDescription>Enter your details below to create your account and get started.</CardDescription>
               </CardHeader>
               <CardContent>
                  <SignupForm />
               </CardContent>
               <CardFooter>
                  <p className='text-muted-foreground' >Already have an account? <Link 
                        className='text-primary underline'
                        href={'/sign-in'}>Sign In</Link></p>
               </CardFooter>
            </Card>
         </div>
     </div>
   </>
  )
}

export default SignUpPage