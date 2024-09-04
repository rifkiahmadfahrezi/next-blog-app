"use client"
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NavbarMobile from './navbar-mobile'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { navbarLinks, isActive} from '.'
import UserDropdown from '../user-dropdown'

const Navbar : React.FC = () => {
   const pathname = usePathname()
   const { data: session ,status } = useSession()

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
                     {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                     {/* @ts-ignore */}
                     {(status === 'authenticated' && session?.role === 'admin') &&
                        <Button asChild 
                           variant={isActive(pathname, '/dashboard') ? 'outline' : 'ghost'} >
                           <Link href={'/dashboard'} >
                              Dashboard
                           </Link>
                        </Button>
                     }
               </ul>

               {status !== 'authenticated' ? 
               <ul className="flex gap-2 items-center">
                  <li>
                     <Button 
                        variant={'outline'}
                        asChild
                        className='w-full'  >
                        <Link href={'/sign-in'} >
                           Sign In
                        </Link>
                     </Button>
                  </li>
                  <li>
                     <Button asChild
                        className='w-full'  >
                        <Link href={'/sign-up'} >
                           Sign Up
                        </Link>
                     </Button>
                  </li>
               </ul>
               : <UserDropdown />
               }
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