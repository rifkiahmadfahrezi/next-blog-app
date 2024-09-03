import React from 'react'
import type { Metadata } from 'next'

import BlogList from './components/blog-list'

export const metadata : Metadata = {
  title: 'Blogs'
}

const BlogsPage = () => {
  return (
  <>
    <section className="py-10 md:py-20 border-b">
      <div className="container mx-auto">
        <h1 className='text-3xl md:text-6xl font-bold' >Blogs</h1>
        <p className='text-muted-foreground w-full md:w-2/4 mt-2' >Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover the world through our news coverage.</p>
      </div>
    </section>
    <BlogList />
  </>
  )
}

export default BlogsPage