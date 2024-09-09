import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRightIcon } from 'lucide-react'

const HeroSection = () => {
  return (
  <>
    <header className='border-b' >  
      <div className="container mx-auto md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2">

        <div className="border-r">
          <article className='my-10 p-5'>
            <p className='text-muted-foreground' >Your Journey to Tomorrow Begins Here</p>
            <h1 className='text-3xl md:text-6xl my-5' >Explore the Frontiers of Artificial Intelligence</h1>
            <p className='text-xs md:text-sm text-muted-foreground' >Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
          </article>

          <div className="grid grid-cols-3 border-t">
            <div className="border-r border-l  px-6 py-10">
                <p className='text-xl md:text-2xl'>300<span className='text-primary'>+</span></p>
                <h1 className='text-muted-foreground' >Resources available</h1>
            </div>
            <div className="border-r  px-6 py-10">
                <p className='text-xl md:text-2xl'>12k<span className='text-primary'>+</span></p>
                <h1 className='text-muted-foreground' >Total Downloads</h1>
            </div>
            <div className=" px-6 py-10">
                <p className='text-xl md:text-2xl'>10k<span className='text-primary'>+</span></p>
                <h1 className='text-muted-foreground' >Active Users</h1>
            </div>
          </div>
        </div>

        <div className="p-5 relative overflow-hidden">
          <figure className='absolute top-0 left-0 opacity-40'>
            <Image 
              src={'/assets/abstract.svg'}
              width={500}
              height={300}
              className=''
              alt=''
              />
          </figure>
          
          <div className="flex flex-col justify-end h-full relative z-10">
            <Card className='rounded-full p-2 bg-background opacity-100 flex max-w-fit' >
              {Array(4).fill(0).map((_, i) => (
                <Avatar key={i} className='border -ml-1' >
                  <AvatarImage src={`https://avatar.iran.liara.run/public/${i+1}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </Card>
            <article className="mb-10 mt-2">
              <h1 className='text-xl md:text-2xl' >Explore 1000+ resources</h1>
              <p className='text-muted-foreground' >Over 1,000 articles on emerging tech trends and breakthroughs.</p>
            </article>

            <Button 
              asChild variant={'outline'} size={'lg'} className='max-w-fit' >
              <Link href="/#" >
                Explore Resources <span><ArrowUpRightIcon className='text-primary' /></span>
              </Link>
            </Button>
          </div>
        </div>
         </div>
      </div>
      <div className="border-y">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-r p-7">
                <Image 
                  src={'/assets/Icon-1.svg'}
                  width={50}
                  height={50}
                  className='size-[30px] md:size-[50px]'
                  alt=''
                  />

                <div className="flex items-center justify-between my-5">
                  <article>
                    <h1 className='text-xl md:text-2xl' >Latest News Updates</h1>
                    <p className='text-muted-foreground' >Stay Current</p>
                  </article>

                  <Button size={'icon'} className='rounded-full' >
                    <ArrowUpRightIcon />
                  </Button>
                </div>
                <p className='text-muted-foreground' >Over 1,000 articles published monthly</p>
            </div>
            <div className="border-r p-7">
                <Image 
                  src={'/assets/Icon-2.svg'}
                  width={50}
                  height={50}
                  className='size-[30px] md:size-[50px]'
                  alt=''
                  />

                <div className="flex items-center justify-between my-5">
                  <article>
                    <h1 className='text-xl md:text-2xl' >Expert Contributors</h1>
                    <p className='text-muted-foreground' >Trusted Insights</p>
                  </article>

                  <Button size={'icon'} className='rounded-full' >
                    <ArrowUpRightIcon />
                  </Button>
                </div>
                <p className='text-muted-foreground' >50+ renowned AI experts on our team</p>
            </div>
            <div className="border-r p-7">
                <Image 
                  src={'/assets/Icon-3.svg'}
                  width={50}
                  height={50}
                  className='size-[30px] md:size-[50px]'
                  alt=''
                  />

                <div className="flex items-center justify-between my-5">
                  <article>
                    <h1 className='text-xl md:text-2xl' >Global Readership</h1>
                    <p className='text-muted-foreground' >Worldwide Impact</p>
                  </article>

                  <Button size={'icon'} className='rounded-full' >
                    <ArrowUpRightIcon />
                  </Button>
                </div>
                <p className='text-muted-foreground' >2 million monthly readers</p>
            </div>
          </div>
          </div>
      </div>
    </header>
  </>
  )
}

export default HeroSection