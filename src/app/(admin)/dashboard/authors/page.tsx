import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import AuthorsTable from './components/authors-table'
import { SearchInput } from '@/components/common/search-input'

export const metadata: Metadata = {
   title: 'Authors - dashboard FutureTech',
   description: 'List of accounts with author role'
}
// 
const DashboardAuthorsPages = () => {
  return (
   <>
      <Suspense>
         <div className="flex my-7 justify-between">
            <div className="">
               <h1 className="text-xl md:text-2xl font-medium">Authors</h1>
               <p className='text-muted-foreground' >List of account with role author</p>
            </div>

               <SearchInput />
         </div>
         <AuthorsTable />
      </Suspense>
   </>
  )
}

export default DashboardAuthorsPages