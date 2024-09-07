'use client'

import React, { useMemo } from 'react'
import { useQuery } from "@tanstack/react-query"
import { Card } from '@/components/ui/card'
import { 
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow 
} from "@/components/ui/table"
import { ADMIN_ROLE_ID } from '@/lib/contants'
import { getAllUsers } from '@/services/users'

import RoleDropdown from '@/components/common/role-dropdown'
import { useSearchParams } from 'next/navigation'
import DeleteUser from '../../users/components/delete-user'

const AdminsTable = () => {
   const searchParams = useSearchParams()
   const keyword : string = searchParams.get('search') || ''
   const { data : users, isLoading } = useQuery({
      queryKey: ['admins'],
      queryFn: () => getAllUsers(ADMIN_ROLE_ID)
   })

   const filteredUsers = useMemo(() => {
      return users
      ?.filter(item => item.username.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword) )
   }, [keyword, users, searchParams])

  return (
   <>
      <Card className="p-5">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {isLoading && <TableRow><TableCell>Loading...</TableCell></TableRow> }
               {!isLoading && filteredUsers?.map((item, i) => (
                  <TableRow key={item.id} >
                     <TableCell>{i+1}</TableCell>
                     <TableCell>{item.username}</TableCell>
                     <TableCell>{item.email}</TableCell>
                     <TableCell>
                        <RoleDropdown user={item} />
                     </TableCell>
                     <TableCell>
                        <DeleteUser id={item.id.toString()} queryKey={['admins']} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableCaption>
               {!searchParams.get('search')
                  ? <p>List of admins ({users?.length || 0} items)</p>
                  : <p>Result for &ldquo;{keyword}&rdquo; ({filteredUsers?.length || 0} items)</p>
               }
            </TableCaption>
         </Table>
      </Card>
   </>
  )
}

export default AdminsTable