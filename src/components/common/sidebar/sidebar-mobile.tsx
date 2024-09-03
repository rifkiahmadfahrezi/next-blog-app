'use client'

import React from 'react'
import {
   Sheet,
   SheetContent,
   SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from 'lucide-react'


import { dashboardLinks } from '.'
import { isMenuActive } from '.'
 

const SidebarMobile = () => {
   const pathname = usePathname()

  return (
   <>
   <Sheet>
      <SheetTrigger asChild >
         <Button  
            className='block md:hidden'
            size={'icon'}
            variant={'ghost'} >
            <MenuIcon />
         </Button>
      </SheetTrigger>
      <SheetContent side={'left'} >
         
         <Image 
            src={'/logo.svg'}
            width={150}
            height={50}
            alt='Logo'
            className='mb-10 mt-5 mx-auto my-7'
            />
         <nav className="flex flex-col gap-2">
            {dashboardLinks.map(item => (
               <Button 
                  key={item.href}
                  asChild
                  variant={isMenuActive(pathname, item.href) ? 'outline' : 'ghost'}
                  >
               <Link href={item.href} >
                  {item.label}
               </Link>
               </Button>
            ))}
         </nav>
      </SheetContent>
   </Sheet>
   </>
  )
}

export default SidebarMobile