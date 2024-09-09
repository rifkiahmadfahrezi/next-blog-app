'use client'

import React, { Suspense, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectGroup,
   SelectLabel,
   SelectTrigger,
   SelectValue,
   SelectSeparator
 } from "@/components/ui/select"
 import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
 } from "@/components/ui/form"

import type { Blog } from '@/lib/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { chageBlogVisibility } from '@/services/blogs'
import { toast } from 'sonner'


const schema = z.object({
   isPublished: z.boolean({ required_error: "Publish is required" })
})

const BlogVisibilityDropdown = ({ blog }: { blog: Blog }) => {
   const queryClient = useQueryClient()
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { isPublished: blog.isPublished }
   })
   const formValue = form.watch("isPublished")
   const { mutate, isPending, isSuccess } = useMutation({
      mutationFn: async ({ blogId, isPublished }: { blogId: string; isPublished: boolean }) => {
         const changePublishPromise = chageBlogVisibility(blogId, isPublished);
         toast.promise(changePublishPromise, {
            loading: 'Loading...',
            success: (data) => data.data.message || 'Blog visibility changed successfully',
            error: (data) => data?.response.data.message || 'Failed to change publish'
         });
         return changePublishPromise;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ 
            queryKey: blog.isPublished ? ['blogs-published'] : ['blogs-drafted'] , 
            refetchType: 'active' 
         })
      },
      onError: (error) => {
         console.log(error)
         toast.error(error.message)
      }
   })


   const onSubmit = useCallback((values: z.infer<typeof schema>) => {
      mutate({ blogId: blog.id.toString(), isPublished: values.isPublished })
   }, [blog, mutate])


  return (
   <>
   <Suspense>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className='min-w-[100px]' >
              <Select 
                  onValueChange={(value) => field.onChange(value === 'true')} 
                  defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={blog.isPublished ? 'Published' : 'Drafted'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Change visibility({blog.isPublished ? 'Published' : 'Drafted'})</SelectLabel>
                     <SelectSeparator />
                     <SelectItem
                           value={'true'}>Publish</SelectItem>
                     <SelectItem
                           value={'false'}>Draft</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {(formValue !== undefined && formValue !== blog.isPublished && !isSuccess) &&
            <Button 
               disabled={isPending}   
               type="submit" size={'sm'} >Change</Button>
           }
      </form>
    </Form>
   </Suspense>
   </>
  )
}

export default BlogVisibilityDropdown