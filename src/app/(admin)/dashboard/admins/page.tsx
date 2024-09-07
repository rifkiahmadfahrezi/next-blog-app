import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import AdminsTable from './components/admins-table'
import { SearchInput } from '@/components/common/search-input'

export const metadata: Metadata = {
   title: 'admins - dashboard FutureTech',
   description: 'List of accounts with user role'
}
// 
const DashboardadminsPages = () => {
  return (
   <>
      <Suspense>
         <div className="flex my-7 justify-between">
            <div className="">
               <h1 className="text-xl md:text-2xl font-medium">admins</h1>
               <p className='text-muted-foreground' >List of account with role admin</p>
            </div>

               <SearchInput />
         </div>
         <AdminsTable />
      </Suspense>
   </>
  )
}

export default DashboardadminsPages