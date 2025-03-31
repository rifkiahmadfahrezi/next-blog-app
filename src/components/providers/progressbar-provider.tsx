'use client'

import React from 'react'
import { ProgressProvider } from '@bprogress/next/app'

export const ProgressbarProvider = ({ children } : { children: React.ReactNode }) => {
  return (
   <>
      
      {children}
      <ProgressProvider 
         color='#FFD11A'
         height='4px'
         shallowRouting
         options={{ showSpinner: false }}
         />
   </>
  )
}