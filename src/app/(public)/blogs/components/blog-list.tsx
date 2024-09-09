'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon, Share2Icon } from 'lucide-react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getAllBlogs } from '@/services/blogs'
import { BlogCard } from '@/components/common/skeletons'
import ShareButton from '@/components/common/share-button'

const BlogList = () => {

   const { data: blogs, isLoading } = useQuery({
      queryKey: ['blogs-published'],
      queryFn: () => getAllBlogs(true)
   })

  return (
   <>
      <section className='py-10 md:py-20' >
         <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 focus-card-container">
               {isLoading && Array(4).fill(0).map((_, i) => (
                  <BlogCard key={i}/>
               ))}
               {!isLoading && blogs?.map((item, i) => (
                  <div key={i}  className="focus-card">
                     <figure className='aspect-video overflow-hidden rounded-md' >
                        <Image 
                           src={item.thumbnail}
                           alt='Blog thumbnail'
                           width={500}
                           height={300}
                           className='h-auto w-auto object-cover'
                           />
                     </figure>
                     <figcaption className='mt-4' >
                        <h1 className="text-xl md:text-2xl font-medium line-clamp-2 ">{item.title}</h1>
                        <p className='text-muted-foreground' >{item.category.name}</p>

                        <div className="mt-5 flex items-center justify-between">
                           <ShareButton data={{
                              title: item.title,
                              text: item.title,
                              url: '/blogs/' + item.slug,
                           }} />
                           <Button
                              asChild
                              size={'lg'} 
                              className='text-muted-foreground hover:text-foreground'  variant={'outline'} >
                              <Link href={`/blogs/${item.slug}`} >
                                 <span>
                                    Read More
                                 </span>
                                 <ArrowUpRightIcon className='text-primary' />
                              </Link>
                           </Button>
                        </div>
                     </figcaption>
                  </div>
               ))}
            </div>
         </div>
      </section>
   </>
  )
}

export default BlogList