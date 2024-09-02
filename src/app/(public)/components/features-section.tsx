import React from 'react'

import Image from 'next/image'
import { Card } from '@/components/ui/card'

const features1 = [
   {
      title: 'Quantity',
      content: 'Over 1,000 articles on emerging tech trends and breakthroughs.'
   },
   {
      title: 'Variety',
      content: 'Articles cover fields like AI, robotics, biotechnology, and more.'
   },
   {
      title: 'Frequency',
      content: 'Fresh content added daily to keep you up to date.'
   },
   {
      title: 'Authoritative',
      content: 'Written by our team of tech experts and industry professionals.'
   },
]
const features2 = [
   {
      title: 'Depth',
      content: '500+ research articles for in-depth understanding.'
   },
   {
      title: 'Graphics',
      content: 'Visual aids and infographics to enhance comprehension.'
   },
   {
      title: 'Trends',
      content: 'Explore emerging trends in future technology research.'
   },
   {
      title: 'Contributors',
      content: 'Contributions from tech researchers and academics.'
   },
]

const FeaturesSection = () => {
  return (
   <>
      <section className="border-y">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
               <div className="py-20 border-r flex flex-col justify-center h-full">
                  <article className='px-5'>
                     <Image 
                        src={'/assets/Icon-1.svg'}
                        alt=''
                        width={50}
                        height={50}
                        />
                     <h1 className='font-bold text-2xl md:text-3xl' >Future Technology Blog</h1>
                     <p className='text-muted-foreground text-xs md:text-sm' >Stay informed with our blog section dedicated to future technology.</p>
                  </article>
               </div>
               <div className="py-20 px-5 md:px-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     {features1.map(item => (
                        <Card className="p-6" key={item.title} >
                           <h1 className='font-medium text-lg md:text-xl' >{item.title}</h1>
                           <p className='text-muted-foreground mt-3' >{item.content}</p>
                        </Card>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="border-y">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
               <div className="py-20 border-r flex flex-col justify-center h-full">
                  <article className='px-5'>
                     <Image 
                        src={'/assets/Icon-2.svg'}
                        alt=''
                        width={50}
                        height={50}
                        />
                     <h1 className='font-bold text-2xl md:text-3xl' >Research Insights Blogs</h1>
                     <p className='text-muted-foreground text-xs md:text-sm' >Dive deep into future technology concepts with our research section.</p>
                  </article>
               </div>
               <div className="py-20 px-5 md:px-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     {features2.map(item => (
                        <Card className="p-6" key={item.title} >
                           <h1 className='font-medium text-lg md:text-xl' >{item.title}</h1>
                           <p className='text-muted-foreground mt-3' >{item.content}</p>
                        </Card>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   </>
  )
}

export default FeaturesSection