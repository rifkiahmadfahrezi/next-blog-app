import { redirect } from 'next/navigation'

const page = () => {
  redirect('/dashboard/blogs')
}

export default page