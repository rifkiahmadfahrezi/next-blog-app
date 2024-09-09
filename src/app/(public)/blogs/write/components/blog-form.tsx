'use client'
import React, { useState } from 'react'
import { 
   Form, 
   FormItem,
   FormLabel,
   FormField,
   FormMessage,
   FormControl,
   FormDescription,
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
import { useSession } from 'next-auth/react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { addblog, BlogInput } from '@/services/blogs'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/services/categories'

const schema = z.object({
   title: z.string({ required_error: "Title is required"}).min(1, { message: "Title is required" }),
   thumbnail: z.string({ required_error: "Thumbnail is required"}).min(1, { message: "Thumbnail is required" }),
   introduction: z.string({ required_error: "Introduction is required"}).min(1, { message: "Introduction is required" }),
   categoryId: z.string({ required_error: "You should pick one category" }).min(1, { message: "Category is required" }),
   content: z.string({ required_error: "Blog content is required" }).min(1, { message: "Content is required" })
})

const BlogForm = () => {
   const { data: session } = useSession()
   const [isPublished, setIsPublished] = useState<boolean>(false)
   const [isPending, setIsPending] = useState<boolean>(false)
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         title: '', thumbnail: '', introduction: '',  categoryId: '', content: ''
      }
   })
   // fetch categories
   const { data: categories, isLoading } = useQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories
   })

   const submitHandler = form.handleSubmit(async (values : z.infer<typeof schema>) => {
      setIsPending(true)
      const data : BlogInput = { 
         ...values, 
         userId: session?.id || '',
         isPublished
      }

      try {
         if(!data.userId) return toast.error("User id not found!")
         const res = await addblog(data)

         if(res.statusText === 'OK' && isPublished){
            form.reset()
         }

         if(res.status !== 201){
            throw new Error('An error is occured')
         }

         console.log(res.data)
         toast.success(res.data?.message || 'Blog created succesfully')
      } catch (error) {
         console.error(error)
         // @ts-ignore
         toast.error(error.response?.data?.message || 'Blog created succesfully')
      }finally{
         setIsPending(false)
      }
   })

  return (
   <Card className="p-5">
      <Form {...form} >
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
                     <FormItem className='w-full' >
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
                     <FormItem className='w-full' >
                     <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder={isLoading ? 'loading...' : "Select Categories"} />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {!isLoading && categories?.map(item => (
                                 <SelectItem value={item.id.toString()}>
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
                  <FormItem className='w-full' >
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

            <footer className='mt-7 flex items-center justify-between gap-3' >
               <div className="space-x-3">
                  <Button variant={'outline'} >
                     Preview
                  </Button>
                  <Button 
                     disabled={isPending && isPublished === false}
                     onClick={() => setIsPublished(false)}
                     type='submit'
                     variant={'secondary'}>
                     {isPending && isPublished === false ? 'Saving...' : 'Save as draft'}
                  </Button>
               </div>
               <Button 
                   disabled={isPending && isPublished}
                  onClick={() => setIsPublished(true)}
                  type='submit' >
                   {isPending && isPublished ? 'Publsing...' : 'Publish!'}
               </Button>
            </footer>
         </form>
      </Form>
   </Card>
  )
}

export default BlogForm