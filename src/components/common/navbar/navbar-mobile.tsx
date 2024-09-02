"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { navbarLinks, isActive } from '.'
import Image from 'next/image'
import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
   Sheet,
   SheetContent,
   SheetTrigger,
 } from "@/components/ui/sheet"
 

const NavbarMobile = () => {
   const pathname = usePathname()

  return (
   <>
      <nav className='flex items-center justify-between py-4 px-5' >
         <Link href={'/'} >
            <Image 
               src={'/logo.svg'}
               width={125}
               height={35}
               alt='logo'
               />
         </Link>

         <Sheet>
            <SheetTrigger asChild >
               <Button variant={'ghost'} size={'icon'} >
                  <MenuIcon />
               </Button>
            </SheetTrigger>
            <SheetContent side={'left'} >
               <nav className="py-10">
                  <ul className='flex flex-col w-full items-center gap-5' >
                     {navbarLinks.map((link) => (
                        <li key={link.href} className='w-full' >
                           <Button asChild
                              className='w-full' 
                              variant={isActive(pathname, link.href) ? 'outline' : 'ghost'} >
                              <Link href={link.href} >
                                 {link.label}
                              </Link>
                           </Button>
                        </li>
                     ))}
                        <li>
                           <Button asChild
                              className='w-full'  >
                              <Link href={'/contact'} >
                                 Contact Us
                              </Link>
                           </Button>
                        </li>
                  </ul>
               </nav>
            </SheetContent>
         </Sheet>

      </nav>
   </>
  )
}

export default NavbarMobile