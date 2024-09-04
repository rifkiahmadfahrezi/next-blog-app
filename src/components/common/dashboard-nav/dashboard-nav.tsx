import React from 'react'
import Link from 'next/link'
import { SidebarMobile } from '../sidebar'
import { Button } from '@/components/ui/button'

import UserDropdown from '../user-dropdown'


const DashboardNav = () => {
  return (
   <>
      <nav className='px-5 py-3 bg-card border-y flex justify-between items-center' >
         <div className="">
            <SidebarMobile />
         </div>
 
         <div className="flex items-center gap-3">
            <Button 
               asChild
               variant={'ghost'}>
                  <Link href={'/'}>
                     Home
                  </Link>
            </Button>
            <UserDropdown />
         </div>
      </nav>
   </>
  )
}

export default DashboardNav