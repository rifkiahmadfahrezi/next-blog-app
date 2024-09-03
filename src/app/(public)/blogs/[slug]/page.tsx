import React from 'react'

import Image from 'next/image'
import { Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BlogOpenPage = () => {
  return (
    <>
      <figure className="w-full max-h-[400px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-t after:from-background after:to-transparent border-b mb-10" >
        <Image 
          priority
          src={'https://picsum.photos/500/350'}
          alt=''
          width={800}
          height={400}
          className='w-full max-h-[400px]'
          />
      </figure>
        <div className="container mx-auto px-5">
          <div >
            <h1 className='text-3xl md:text-6xl' >The Rise of Artificial Intelligence in Healthcare</h1>
          </div>
        </div>
        <div className="border-y my-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,minmax(200px,350px)] container mx-auto">
            <article className='border-r p-7' >
              <h1 className='text-xl md:text-2xl mb-2' >Introduction</h1>
              <p className='text-muted-foreground' >Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.</p>
            <hr className='my-7'  />
              <section>
                <h1 className='text-xl md:text-2xl mb-2' >Introduction</h1>
                <p className='text-muted-foreground'>Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.</p>
                <br />
                <p className='text-muted-foreground'>Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system. In this blog post, we will delve into the diverse applications of AI in healthcare, from diagnostic imaging to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.</p>
              </section>
            </article>
            <div className="grid grid-cols-1">
              <div className="border-b p-7">
                <Button className='flex items-center gap-2 p-5 rounded-full' variant={'outline'} >
                  <Share2Icon className='size-5' />
                  Share
                </Button>
              </div>
              <div className="p-7">
                <ul className="grid grid-cols-2 gap-5">
                  <li>
                    <h1 className='text-muted-foreground' >Published date</h1>
                    <p>October 15, 2023</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Category</h1>
                    <p>Healthcare</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Reading Time</h1>
                    <p>10 Min</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Author Name</h1>
                    <p>Dr. Emily Walker</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default BlogOpenPage