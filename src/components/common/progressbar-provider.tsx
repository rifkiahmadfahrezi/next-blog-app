'use client'

import React from 'react'
import { AppProgressBar } from "next-nprogress-bar"

const ProgressbarProvider = ({ children } : { children: React.ReactNode }) => {
  return (
   <>
      
      {children}
      <AppProgressBar 
         color='#FFD11A'
         height='4px'
         shallowRouting
         options={{ showSpinner: false }}
         />
   </>
  )
}

export default ProgressbarProvider