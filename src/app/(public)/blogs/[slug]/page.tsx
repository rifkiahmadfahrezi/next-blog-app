import React from 'react'

import Image from 'next/image'
import { Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import type { Blog } from '@/lib/types'
import ShareButton from '@/components/common/share-button'

interface Props { params: { slug: string} }

const BlogOpenPage = async ({ params } : Props) => {
  const blog : Blog = await fetchBlogBySlug(params.slug)
  return (
    <>
      <figure className="w-full max-h-[400px] mx-auto overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-t after:from-background after:to-transparent border-b mb-10" >
        <Image 
          priority
          src={blog.thumbnail}
          alt=''
          width={800}
          height={400}
          className='w-full max-h-[400px] object-cover'
          />
      </figure>
        <div className="container mx-auto px-5">
          <div >
            <h1 className='text-3xl md:text-6xl' >{blog.title}</h1>
          </div>
        </div>
        <div className="border-y my-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,minmax(200px,350px)] container mx-auto">
            <article className='border-r p-7' >
              <h1 className='text-xl md:text-2xl mb-2' >Introduction</h1>
              <p className='text-muted-foreground' >{blog.introduction}</p>
            <hr className='my-7'  />
              <section 
                className='prose dark:prose-invert prose-p:text-muted-foreground prose-li:text-muted-foreground'
                dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>
            <div className="">
              <div className="border-b p-7">
                <ShareButton data={{
                  title: blog.title,
                  text: blog.title,
                  url: '/blogs/' + blog.slug
                }} />
              </div>
              <div className="p-7">
                <ul className="grid grid-cols-2 gap-5">
                  <li>
                    <h1 className='text-muted-foreground' >Last Updated</h1>
                    <p>{new Date(blog.updatedAt).toDateString()}</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Category</h1>
                    <p>{blog.category.name}</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Reading Time</h1>
                    <p>{blog.readingTime} Min</p>
                  </li>
                  <li>
                    <h1 className='text-muted-foreground' >Author</h1>
                    <p>{blog.user.username}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}


async function fetchBlogBySlug(slug: string){
  const blog = await fetch(process.env.NEXTAUTH_URL+ `/api/blogs/${slug}`, { next: { revalidate: 30 } })
  return await blog.json()
}


export async function generateMetadata({ params } : Props) : Promise<Metadata> {
  const blog : Blog = await fetchBlogBySlug(params.slug)
  return {
    title: blog.title + ' - FutureTech blogs',
    keywords: blog.title,
    openGraph: {
      images: blog.thumbnail
    }
  }
}

export default BlogOpenPage