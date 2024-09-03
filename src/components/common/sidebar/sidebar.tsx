'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { dashboardLinks } from '.'
import { isMenuActive } from '.'

const Sidebar = () => {

   const pathname = usePathname()

  return (
   <>
      <aside className="p-5 min-h-svh bg-card border-r hidden md:block">
         <Image 
            src={'/logo.svg'}
            width={150}
            height={50}
            alt='Logo'
            className='mb-10 mt-5 mx-auto'
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
      </aside>
   </>
  )
}

export default Sidebar