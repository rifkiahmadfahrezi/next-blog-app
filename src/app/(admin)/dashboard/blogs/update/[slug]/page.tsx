import React from 'react'
import UpdateForm from '@/components/features/blog/update-blog-form'
interface Props {
  params: Promise<{
    slug: string
  }>
}

const page = async ({ params } : Props) => {
  const slug = (await params).slug
  return (
  <>
    <main className="container mx-auto my-10">
     <UpdateForm slug={slug} />
    </main>
  </>
  )
}

export default page