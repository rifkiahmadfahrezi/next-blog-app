import React from 'react'
import type { Metadata } from 'next'

import { Sidebar } from '@/components/common/sidebar'
import { DashboardNav } from '@/components/common/dashboard-nav'

export const metadata : Metadata = {
  title: 'Dashboard - FutureTech'
}

const DashboardLayout = ({ children } : { children : React.ReactNode }) => {
  return (
  <>
    <div className='grid grid-cols-1 md:grid-cols-[minmax(200px,300px),1fr]' >
      <Sidebar />
      <div>
        <DashboardNav />
        <main className="container mx-auto my-7 px-4">
          {children}
        </main>
      </div>
    </div>
  </>
  )
}

export default DashboardLayout