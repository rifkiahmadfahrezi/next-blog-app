'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const BlogCard = () => {
  return (
   <>
      <div  className="focus-card">
         <figure className='aspect-video overflow-hidden rounded-md' >
            <Skeleton 
               className='w-full h-[250px]'
               />
         </figure>
         <figcaption className='mt-4' >
            <Skeleton className='w-full h-7 mb-3' />
            <Skeleton className='w-3/4 h-3' />

            <div className="mt-5 flex items-center justify-between">
               <Skeleton className='w-20 h-9' />

               <Skeleton className='w-20 h-9' />
            </div>
         </figcaption>
      </div>
   </>
  )
}

export default BlogCard