import React from 'react'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'


const CTA = () => {
  return (
   <>
   <section id="call-to-action" className='py-10 bg-card border-t' >
      <div className="container mx-auto">
         <div className="my-12">
            <figure className='flex items-center justify-start gap-10' >
               <Image 
                  src={'/icon-logo.svg'}
                  width={150}
                  height={150}
                  alt='logo'
                  />

               <figure>
                  <Badge 
                     variant={'secondary'}>Learn, Connect, and Innovate</Badge>
                  <h1 className='text-3xl md:text-5xl my-3 font-medium' >Be Part of the Future Tech Revolution</h1>
                  <p className='text-muted-foreground w-full md:w-3/4' >Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.</p>
               </figure>
            </figure>
         </div> 

         <div className="bg-background p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-5 md:p-8">
               <div className="flex items-center justify-between">
                  <h1 className='text-xl md:text-2xl font-medium'>Resource Access</h1>

                  <Button
                     size={'icon'}
                     className='rounded-full'
                     >
                        <ArrowUpRight />
                  </Button>
               </div>
               <p className='text-muted-foreground mt-2'>Visitors can access a wide range of resources, including ebooks, whitepapers, reports.</p>
            </Card>
            <Card className="p-5 md:p-8">
               <div className="flex items-center justify-between">
               <h1 className='text-xl md:text-2xl font-medium'>Community Forum</h1>

                  <Button
                     size={'icon'}
                     className='rounded-full'
                     >
                        <ArrowUpRight />
                  </Button>
               </div>
              
               <p className='text-muted-foreground mt-2'>Join our active community forum to discuss industry trends, share insights, and collaborate with peers.</p>
            </Card>
            <Card className="p-5 md:p-8">
               <div className="flex items-center justify-between">
                  <h1 className='text-xl md:text-2xl font-medium'>Tech Events</h1>

                  <Button
                     size={'icon'}
                     className='rounded-full'
                     >
                        <ArrowUpRight />
                  </Button>
               </div>
               
               <p className='text-muted-foreground mt-2'>Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.</p>
            </Card>
         </div>
      </div>  
   </section>
   </>
  )
}

export default CTA