import React from 'react'
import type { Metadata } from 'next'

import { SearchInput } from '@/components/common/search-input'

import CategoriesTable from './components/categories-table'

export const metadata : Metadata = {
   title: 'Categories - dashboard FutureTech'
}

const CategoriesDashboardPage = () => {
  return (
   <>
      <div className="flex my-7 justify-between">
         <h1 className="text-xl md:text-2xl font-medium">Blog Categories</h1>

         <SearchInput />
      </div>
      <CategoriesTable />
   </>
  )
}

export default CategoriesDashboardPage