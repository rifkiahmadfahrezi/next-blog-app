import React from 'react'
import type { Metadata } from 'next'
import BlogForm from '@/components/features/blog/blog-form'
export const metadata : Metadata = {
   title: "Write blog - FutureTech"
} 

const WriteBlogPage = () => {
  return (
   <>
      <main className='container mx-auto my-10' >
         <BlogForm />
      </main>
   </>
  )
}

export default WriteBlogPage