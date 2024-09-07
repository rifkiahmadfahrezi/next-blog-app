'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

import { adminDashboardLinks, dashboardLinks } from '.'
import { isMenuActive } from '.'
import { cn } from '@/lib/utils'

const Sidebar = () => {
   const { data: session } = useSession()
   const pathname = usePathname()

  return (
   <>
      <aside className="min-h-svh bg-card border-r hidden md:block">
         <Image 
            src={'/logo.svg'}
            width={150}
            height={50}
            alt='Logo'
            className='mb-10 mt-5 mx-auto'
            />
         <nav className="flex flex-col gap-y-1">
            {dashboardLinks.map(item => (
               <Link 
                  className={cn("p-3 pl-5 relative after:content-[''] after:inset-0 after:w-full after:h-full after:bg-primary/10 after:absolute after:scale-x-0 after:ease-in-out after:origin-right hover:after:scale-x-100 after:transition after:duration-200 hover:after:origin-left", 
                     isMenuActive(pathname, item.href) && "bg-background border-y border-l-4 border-l-primary"
                  )}
                  key={item.href}
                  href={item.href} >
                  <span className="relative z-10">
                     {item.label}
                  </span>
               </Link>
            ))}
            {session?.role === 'admin' && 
               adminDashboardLinks.map(item => (
                  <Link 
                     className={cn("p-3 pl-5 relative after:content-[''] after:inset-0 after:w-full after:h-full after:bg-primary/10 after:absolute after:scale-x-0 after:ease-in-out after:origin-right hover:after:scale-x-100 after:transition after:duration-200 hover:after:origin-left", 
                        isMenuActive(pathname, item.href) && "bg-background border-y border-l-4 border-l-primary"
                     )}
                     key={item.href}
                     href={item.href} >
                     <span className="relative z-10">
                        {item.label}
                     </span>
                  </Link>
               ))
            }
         </nav>
      </aside>
   </>
  )
}

export default Sidebar