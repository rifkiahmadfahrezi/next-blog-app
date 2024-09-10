'use client'
import React, { useEffect, useState } from 'react'
import { 
   Form, 
   FormItem,
   FormLabel,
   FormField,
   FormMessage,
   FormControl,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { 
   Select, 
   SelectTrigger, 
   SelectValue, 
   SelectContent, 
   SelectItem 
} from '@/components/ui/select'
import TextEditor from '@/components/common/text-editor'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { BlogInput, updateblog } from '@/services/blogs'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/services/categories'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { Blog } from '@/lib/types'

const schema = z.object({
   title: z.string().min(1, "Title is required"),
   thumbnail: z.string().min(1, "Thumbnail is required"),
   introduction: z.string().min(1, "Introduction is required"),
   categoryId: z.string().min(1, "Category is required"),
   content: z.string().min(1, "Content is required"),
})

const UpdateForm = ({ slug } : { slug: string }) => {
   const { data: blog, isLoading } = useQuery({
      queryKey: ['blog-update', slug],
      queryFn: async () => {
         try {
            const promise = await fetch('/api/blogs/'+slug+'?published=all')
            return await promise.json() as Blog
         } catch (error) {
            console.error(error)
         }
      }
   })
   const router = useRouter()
   const [isPublished, setIsPublished] = useState<boolean>(false)
   const [isPending, setIsPending] = useState<boolean>(false)
   
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         title: '', 
         thumbnail:  '', 
         introduction: '',  
         categoryId:  '', 
         content: ''
      }
   })

   
   // Reset the form values with blog data once loaded
   useEffect(() => {
      if (blog) {
         form.reset({
            title: blog?.title || '', 
            thumbnail: blog?.thumbnail || '', 
            introduction: blog?.introduction || '',  
            categoryId: blog?.category.id as string || '', 
            content: blog?.content || ''
         })
      }
   }, [blog, form])

   const { data: categories, isLoading: categoryLoading } = useQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories
   })

   const submitHandler = form.handleSubmit(async (values) => {
      setIsPending(true)
      const data: BlogInput = { 
         ...values, 
         isPublished: blog?.isPublished || false
      }

      try {
         if(!blog?.id){
            toast.error('Blog id not found')
            return
         }
         
         const res = await updateblog(data, blog.id)

         router.replace('/dashboard/blogs')
         toast.success(res.data?.message || 'Blog updated successfully')
      } catch (error) {
         console.error(error)
         toast.error('Failed to update the blog')
      } finally {
         setIsPending(false)
      }
   })

   if (isLoading) {
      return <Loader className='text-center animate-spin' />
   }

   return (
      <Card className="p-5">
         <Form {...form}>
            <form onSubmit={submitHandler}>
               <FormField 
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>  
                           <Input placeholder='Lorem ipsum...' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            
               <div className="flex items-center gap-4 justify-between my-3">
                  <FormField 
                     control={form.control}
                     name='thumbnail'
                     render={({ field }) => (
                        <FormItem className='w-full'>
                           <FormLabel>Thumbnail</FormLabel>
                           <FormControl>  
                              <Input placeholder='Lorem ipsum...' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="categoryId"
                     render={({ field }) => (
                        <FormItem className='w-full'>
                           <FormLabel>Category</FormLabel>
                           <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value || form.getValues('categoryId')}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder={categoryLoading ? 'loading...' : blog?.category?.name} />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {!categoryLoading && categories?.map(item => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                       {item.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <FormField 
                  control={form.control}
                  name='introduction'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Introduction</FormLabel>
                        <FormControl>  
                           <Textarea placeholder='Lorem ipsum...' {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                           <TextEditor {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <footer className='mt-7 flex items-center justify-between gap-3'>
                  <div className="space-x-3">
                     <Button variant='outline'>
                        Preview
                     </Button>
                     <Button 
                        disabled={isPending}
                        onClick={() => setIsPublished(false)}
                        type='submit'>
                        {isPending ? 'Updating...' : 'Update'}
                     </Button>
                  </div>
               </footer>
            </form>
         </Form>
      </Card>
   )
}

export default UpdateForm
