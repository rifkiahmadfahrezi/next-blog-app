import React from 'react'

import { Card } from '@/components/ui/card'

const DashboarPage = () => {
  return (
  <>
    {Array(5).fill(0).map((_, i) => (
      <Card className="p-7" key={i}>
        <h1>{i+1}</h1>
      </Card>
    ))}
  </>
  )
}

export default DashboarPage