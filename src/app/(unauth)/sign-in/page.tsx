import React from 'react'
import { 
   Card, 
   CardContent, 
   CardDescription, 
   CardHeader, 
   CardFooter,
   CardTitle 
} from '@/components/ui/card'
import SigninForm from './components/signin-form'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata : Metadata = {
   title: 'Sign In - FutureTech'
}


const SignInPage = () => {

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
               <CardTitle>Sign In</CardTitle>
               <CardDescription>Enter your username and password to continue.</CardDescription>
               </CardHeader>
               <CardContent>
                  <SigninForm />
               </CardContent>
               <CardFooter>
                  <p className='text-muted-foreground' >Dont have an account? <Link 
                        className='text-primary underline'
                        href={'/sign-up'}>Sign Up</Link></p>
               </CardFooter>
            </Card>
         </div>
     </div>
   </>
  )
}

export default SignInPage