import React, { Suspense } from 'react'
import type { Metadata } from 'next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchInput } from '@/components/common/search-input'

import BlogsTable from './components/blogs-table'

export const metadata : Metadata = {
   title: 'Blogs - dashboard FutureTech'
}

const BlogsDashboardPage = () => {
  return (
   <>
   <Suspense>
      <div className="flex my-7 justify-between">
         <h1 className="text-xl md:text-2xl font-medium">Blogs</h1>

         <SearchInput />
      </div>
      <Tabs defaultValue="published">
         <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafted">Drafted</TabsTrigger>
         </TabsList>
         <TabsContent value="published">
            <BlogsTable published={true} />
         </TabsContent>
         <TabsContent value="drafted">
            <BlogsTable published={false} />
         </TabsContent>
      </Tabs>

   </Suspense>
   </>
  )
}

export default BlogsDashboardPage