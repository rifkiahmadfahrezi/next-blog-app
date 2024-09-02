import React from 'react'

const SubSection = ({ children } : { children : React.ReactNode }) => {
  return (
   <>
   <section className='bg-card' >
      <div className="container mx-auto p-4 py-7 md:py-20">
      {children}
      </div>
    </section>
   </>
  )
}

export default SubSection