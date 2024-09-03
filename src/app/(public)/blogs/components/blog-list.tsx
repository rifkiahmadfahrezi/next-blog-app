import React from 'react'

import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon, Share2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BlogList = () => {
  return (
   <>
      <section className='py-10 md:py-20' >
         <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 focus-card-container">
               {Array(9).fill(0).map((_, i) => (
                  <div key={i}  className="focus-card">
                     <figure className='aspect-video overflow-hidden rounded-md' >
                        <Image 
                           src={'https://picsum.photos/500/350'}
                           alt='Blog thumbnail'
                           width={500}
                           height={300}
                           className='h-auto w-auto object-cover'
                           />
                     </figure>
                     <figcaption className='mt-4' >
                        <h1 className="text-xl md:text-2xl font-medium line-clamp-2 ">Lorem ipsum dolor sit amet.</h1>
                        <p className='text-muted-foreground' >Category</p>

                        <div className="mt-5 flex items-center justify-between">
                           <Button className='flex items-center gap-2  text-muted-foreground hover:text-foreground' variant={'outline'} >
                              <Share2Icon className='size-5' />
                              <span>Share</span>
                           </Button>
                           <Button
                              asChild
                              size={'lg'} 
                              className='text-muted-foreground hover:text-foreground'  variant={'outline'} >
                              <Link href={`/blogs/${i + 1}`} >
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