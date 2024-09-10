'use client'

import React, { useMemo, Suspense } from "react"
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
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
 } from "@/components/ui/tooltip"
 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeleteBlog from "./delete-blog"
import { PencilIcon, PlusIcon } from "lucide-react"
import BlogVisibilityDropdown from "@/components/common/blog-visibility-dropdown"
import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"

import { getAllBlogs } from "@/services/blogs"

export default function BlogsTable({ published } : { published: boolean }) {
   const { data : session } = useSession()
   const searchParams = useSearchParams()
   const { data : blogs, isLoading} = useQuery({
      queryKey: published ? ['blogs-published'] : ['blogs-drafted'],
      queryFn: () => getAllBlogs(published),
   })
   
   const filteredBlogs = useMemo(() => {
      return blogs
      ?.filter(item => item.title.toLowerCase().includes(searchParams.get('search') || ''))
   }, [searchParams.get('search'), blogs, searchParams])

   // console.log(blogs)

   return (
   <>
      <Suspense>
      <Card className="p-5">
         <Button asChild className="mb-6" >
            <Link 
               target="_blank"
               href={`/blogs/write`}>
               <PlusIcon className="size-5 mr-2" />
               <span>Write blog</span>
            </Link>
         </Button>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Written on</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Author</TableHead>
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
               {!isLoading && filteredBlogs?.map((item, i) => (
                  <TableRow key={item.id} >
                     <TableCell>{i+1}</TableCell>
                     <TableCell className="line-clamp-1" >
                        {item.isPublished
                        ? <Link className="underline" 
                              href={`/blogs/${item.slug}`}
                              target="_blank"
                              >
                              {item.title}
                           </Link>
                        : <p>{item.title}</p> 
                        }
                     </TableCell>
                     <TableCell>
                        {
                           // @ts-ignore
                           (session?.user.email === item.user.email || session?.role === 'admin')
                           ? <BlogVisibilityDropdown blog={item} />
                           : item.isPublished ? <Badge>Published</Badge> : <Badge variant={'outline'}>drafted</Badge>
                        }
                     </TableCell>
                     <TableCell>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger>{new Date(item.createdAt).toLocaleDateString()}</TooltipTrigger>
                              <TooltipContent>
                                 <p>{new Date(item.createdAt).toLocaleString()}</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </TableCell>
                     <TableCell>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger>{new Date(item.updatedAt).toLocaleDateString()}</TooltipTrigger>
                              <TooltipContent>
                                 <p>{new Date(item.updatedAt).toLocaleString()}</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </TableCell>
                     <TableCell>{item.user.username}</TableCell>
                     <TableCell className="flex gap-2" >
                        {  
                           // @ts-ignore
                           session?.user.email === item.user.email &&
                           <Button asChild 
                              size={'icon'}
                              variant={'ghost'}
                              >
                              <Link 
                                 target="_blank"
                                 href={`/blogs/update/${item.slug}`}>
                                 <PencilIcon className="size-5" />
                              </Link>
                           </Button>
                        }
                        {
                           // @ts-ignore
                           (session?.user.email === item.user.email || session?.role === 'admin') &&
                           <DeleteBlog 
                              published={item.isPublished}
                              id={item.id as string} />  
                        }
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableCaption>
               {!searchParams.get('search')
                  ? <p>List of {published ? "published" : "drafted"} blogs ({blogs?.length || 0} items)</p>
                  : <p>Result for &ldquo;{searchParams.get('search')}&rdquo; ({filteredBlogs?.length || 0} items)</p>
               }
            </TableCaption>
         </Table>
      </Card>
      </Suspense>
   </>
   )
}