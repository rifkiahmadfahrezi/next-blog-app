import React from 'react'

import { StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const testimonialItems1 = [
   {
     name: 'Sarah Thompson',
     location: 'San Francisco, USA',
     rating: 5,
     text: 'The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated.',
   },
   {
     name: 'Raj Patel',
     location: 'Milano, Italy',
     rating: 5,
     text: 'The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis.',
   },
   {
     name: 'Emily Adams',
     location: 'London, UK',
     rating: 5,
     text: 'The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care.',
   },
 ];

 const testimonialItems2 = [
   
   {
      name: 'Alan Jackson',
      location: 'Houston, USA',
      rating: 5,
      text: 'The reports on space mining prospects have fueled my passion for space exploration. They provide a comprehensive view.',
    },
    {
      name: 'Jessica Miller',
      location: 'Berlin, Germany',
      rating: 5,
      text: 'The research papers on genomic breakthroughs have been a goldmine of information. They\'ve shaped the direction of my research in genomics.',
    },
    {
      name: 'Diego Lopez',
      location: 'Barcelona, Spain',
      rating: 5,
      text: 'The ebooks on renewable energy strategies have given me the insights I needed to pivot my startup towards sustainability.',
    },
 ]

const Testimonials = () => {
  return (
    <>
      <section >
         <div className="border-b">
            <div className="container mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {testimonialItems1.map((item, i) => (
                     <div key={item.name} 
                         className={cn("p-6 md:py-20 md:px-10", i !== testimonialItems1.length -1  ?  "border-r" : '')}>
                        <div className="flex items-center gap-2 justify-center my-7">
                           <Avatar className='border -ml-1' >
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                           </Avatar>
                           <div className="">
                              <h1 className='text-lg md:text-xl font-medium' >{item.name}</h1>
                              <p className='text-xs md:text-sm text-muted-foreground' >{item.location}</p>
                           </div>
                        </div>

                        <Card className='p-3 pt-10 relative mt-10' >
                           <Badge variant={'outline'} className='rounded-full absolute bg-background -top-3 left-2/4 -translate-x-2/4' >
                              {Array(item.rating).fill(0).map((_, i) => (
                                 <StarIcon 
                                    key={i} 
                                    className='fill-primary text-primary' />
                              ))}
                           </Badge>
                           {item.text}
                        </Card>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
               {testimonialItems2.map((item, i) => (
                  <div key={item.name}  
                     className={cn("p-6 md:py-20 md:px-10", i !== testimonialItems1.length -1  ?  "border-r" : '')}>
                     <div className="flex items-center gap-2 justify-center my-7">
                        <Avatar className='border -ml-1' >
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="">
                           <h1 className='text-lg md:text-xl font-medium' >{item.name}</h1>
                           <p className='text-xs md:text-sm text-muted-foreground' >{item.location}</p>
                        </div>
                     </div>

                     <Card className='p-3 pt-10 relative mt-10' >
                        <Badge variant={'outline'} className='rounded-full absolute bg-background -top-3 left-2/4 -translate-x-2/4' >
                           {Array(item.rating).fill(0).map((_, i) => (
                              <StarIcon 
                                 key={i} 
                                 className='fill-primary text-primary' />
                           ))}
                        </Badge>
                        {item.text}
                     </Card>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </>
  )
}

export default Testimonials