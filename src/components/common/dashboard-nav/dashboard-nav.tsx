import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { SidebarMobile } from '../sidebar'
import { Button } from '@/components/ui/button'


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
            <DropdownMenu>
               <DropdownMenuTrigger asChild >
                  <Avatar>
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild >
                     <Link href={'/profile'} >
                        Profile
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <span className="text-red-600 flex items-center gap-3">
                        <LogOutIcon className='size-3'  />
                        Logout
                     </span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </nav>
   </>
  )
}

export default DashboardNav