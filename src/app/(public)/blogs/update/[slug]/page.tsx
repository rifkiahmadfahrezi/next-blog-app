import React from 'react'
import UpdateForm from './components/update-form'
interface Props {
  params: {
    slug: string
  }
}

const page = ({ params } : Props) => {
  return (
  <>
    <main className="container mx-auto my-10">
     <UpdateForm slug={params.slug} />
    </main>
  </>
  )
}

export default page