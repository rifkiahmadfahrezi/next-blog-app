'use client'

import React, { useMemo } from "react"
import { 
   Table, 
   TableBody, 
   TableHead, 
   TableHeader, 
   TableCell, 
   TableRow,
   TableCaption
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

import AddCategory from "./add-category"
import DeleteCatagory from "./delete-catagory"
import UpdateCategory from "./update-category"

import { getAllCategories } from "@/services/categories"

export default function CategoriesTable() {
   const searchParams = useSearchParams()
   const { data : categories, isLoading} = useQuery({
      queryKey: ['categories'],
      queryFn: () => getAllCategories(),
   })
   
   const filteredCategories = useMemo(() => {
      return categories
      ?.filter(item => item.name.toLowerCase().includes(searchParams.get('search') || ''))
   }, [searchParams.get('search'), categories])

   

   return (
   <>
      <Card className="p-5">
         <AddCategory />
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {isLoading && 
               <TableRow  >
                  <TableCell>
                     Loading...
                  </TableCell>
               </TableRow> 
               }
               {!isLoading && filteredCategories?.map((item, i) => (
                  <TableRow key={item.id} >
                     <TableCell>{i+1}</TableCell>
                     <TableCell>{item.name}</TableCell>
                     <TableCell>{item.slug}</TableCell>
                     <TableCell className="flex gap-2" >
                        <UpdateCategory data={item} />
                        <DeleteCatagory id={item.id as string} />     
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableCaption>
               {!searchParams.get('search')
                  ? <p>List of blog categories ({categories?.length || 0} items)</p>
                  : <p>Result for &ldquo;{searchParams.get('search')}&rdquo; ({filteredCategories?.length || 0} items)</p>
               }
            </TableCaption>
         </Table>
      </Card>
   </>
   )
}