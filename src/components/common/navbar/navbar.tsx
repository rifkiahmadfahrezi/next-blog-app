"use client"
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NavbarMobile from './navbar-mobile'

import { usePathname } from 'next/navigation'

import { navbarLinks, isActive} from '.'

const Navbar : React.FC = () => {
   const pathname = usePathname()

  return (
   <>
      <header className='bg-card border-y sticky top-0 z-50' >
         <div className="container mx-auto px-2">
            <nav className='hidden md:flex items-center justify-between py-4 px-5' >
               <Link href={'/'} >
                  <Image 
                     src={'/logo.svg'}
                     width={150}
                     height={50}
                     alt='logo'
                     />
               </Link>

               <ul className='flex items-center gap-5' >
                  {navbarLinks.map((link) => (
                     <li key={link.href} >
                        <Button asChild 
                           variant={isActive(pathname, link.href) ? 'outline' : 'ghost'} >
                           <Link href={link.href} >
                              {link.label}
                           </Link>
                        </Button>
                     </li>
                  ))}
               </ul>

               <Button asChild >
                  <Link href={'/contact'} >
                     Contact Us
                  </Link>
               </Button>
            </nav>
            <div className="block md:hidden">
               <NavbarMobile />
            </div>
         </div>
      </header>
   </>
  )
}

export default Navbar