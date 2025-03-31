import React from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

const Infobar = () => {
  return (
   <>
      <header className='p-4' >
         <div className="container text-center mx-auto">
         <Link href={'/#'} 
            className='flex gap-3 w-full justify-center text-muted-foreground text-xs md:text-base hover:underline'>Subscribe to our Newsletter For New & latest Blogs and Resources <span><ArrowUpRightIcon className='text-primary' /></span> </Link>
         </div>
      </header>
   </>
  )
}

export default Infobar