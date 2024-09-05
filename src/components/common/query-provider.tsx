'use client'

import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const QueryProvider = ({ children } : { children : React.ReactNode }) => {
   const [queryClient] = useState(new QueryClient())
  return (
   <>
      <QueryClientProvider client={queryClient} >
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   </>
  )
}

export default QueryProvider