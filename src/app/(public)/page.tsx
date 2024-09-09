import React from 'react'

import HeroSection from './components/hero-section'
import { Badge } from '@/components/ui/badge'
import SubSection from './components/sub-section'
import FeaturesSection from './components/features-section'
import Testimonials from './components/testimonials'
import { getAllBlogs } from '@/services/blogs'
import ShareButton from '@/components/common/share-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CTA from '@/components/common/cta'

const HomePage = async () => {
  const blogs = await getAllBlogs(true)
  return (
  <>
    <HeroSection />
    <SubSection>
      <article>
        <h1 className='flex flex-col gap-3' >
          <Badge className='max-w-fit text-lg md:text-xl' variant={'secondary'} >Unlock the Power of</Badge>
          <span className='text-3xl md:text-4xl' >FutureTech Features</span>
        </h1>
      </article>
    </SubSection>
    <FeaturesSection />
    <SubSection>
      <article>
        <h1 className='flex flex-col gap-3' >
          <Badge className='max-w-fit text-lg md:text-xl' variant={'secondary'} >A Knowledge Treasure Trove</Badge>
          <span className='text-3xl md:text-4xl' >Explore FutureTech's In-Depth Blog Posts</span>
        </h1>
      </article>
    </SubSection>
    {blogs?.map((item => (
      <div className="border-b py-10 px-5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="">
            <p className="text-muted-foreground">{new Date(item.updatedAt).toLocaleDateString()}</p>
            <h1 className="text-2xl md:text-3xl">{item.title}</h1>
            <p className='text-muted-foreground line-clamp-2 text-xs w-full md:w-2/3'>{item.introduction}</p>

            <ShareButton 
              className="mt-3"
              data={{
              title: item.title,
              text: item.title,
              url: '/blogs/'+ item.slug
            }}/>
          </div>

            <Button 
              variant={'outline'}
              asChild>
              <Link href={`/blogs/${item.slug}`}>
                View Blog
              </Link>
            </Button>
        </div>
      </div>
    )))}
    <SubSection>
      <article>
        <h1 className='flex flex-col gap-3' >
          <Badge className='max-w-fit text-lg md:text-xl' variant={'secondary'} >What Our Readers Say</Badge>
          <span className='text-3xl md:text-4xl' >Real Words from Real Readers</span>
        </h1>
      </article>
    </SubSection>
    <Testimonials />
    <CTA />
  </>
  )
}


export default HomePage