import React from 'react'

import HeroSection from './components/hero-section'
import { Badge } from '@/components/ui/badge'
import SubSection from './components/sub-section'
import FeaturesSection from './components/features-section'
import Testimonials from './components/testimonials'

const HomePage = () => {
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
          <Badge className='max-w-fit text-lg md:text-xl' variant={'secondary'} >What Our Readers Say</Badge>
          <span className='text-3xl md:text-4xl' >Real Words from Real Readers</span>
        </h1>
      </article>
    </SubSection>
    <Testimonials />
  </>
  )
}

export default HomePage