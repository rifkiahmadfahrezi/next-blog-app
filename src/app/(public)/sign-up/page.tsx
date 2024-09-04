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
     <div className="container mx-auto">
         <Card className='my-10 max-w-sm  md:max-w-lg mx-auto' >
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
   </>
  )
}

export default SignUpPage