'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import React from 'react'

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const UserDropdown = () => {
   const { data: session } = useSession()
   return (
   <>
      <DropdownMenu>
      <DropdownMenuTrigger asChild >
         <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
         <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuItem
            onClick={() => {
               signOut()
            }}
            >
            <span className="text-red-600 flex items-center gap-3">
               <LogOutIcon className='size-3'  />
               Logout
            </span>
         </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
   </>
  )
}

export default UserDropdown