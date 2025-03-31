'use client'

import React, { useState } from 'react'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogTrigger,
 } from "@/components/ui/dialog"
import {
   Form,
   FormControl,
   FormMessage,
   FormItem,
   FormLabel,
   FormField,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import slug from 'slug'

import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { addCategory } from '@/services/categories'
import { toast } from 'sonner'
import type { CategoryInput } from '@/services/categories'


const schema = z.object({
   name: z.string().min(1, {message: "Category name is required!"}).trim()
})
 

const AddCategory = () => {
   const queryClient = useQueryClient()
   const [categoryName, setCategoryName] = useState<string>('')
   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         name: ''
      }
   })

   const { isPending, mutate } = useMutation({
      mutationFn: async (data : CategoryInput) => {
         const promise = addCategory(data)
         toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => data.data.message || 'Category added succesfuly',
            error: (data) => data?.response.data.message || 'Failed to add category'
         })
         return promise
      }, 
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['categories'], refetchType: 'active' })
      },
      onError: (error) => {
         console.log(error)
         toast.error(error.message)
      }
   })

   function onSubmit(values : z.infer<typeof schema>){
      mutate(values)
   }

  return (
   <>
   <Dialog>
      <DialogTrigger asChild >
         <Button size={'sm'} className="mt-4 mb-7" >
            <PlusIcon className="size-4 mr-2" />
            <span>Add category</span>
         </Button>
      </DialogTrigger>
      <DialogContent>
         <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <DialogDescription>
               The new category will be used on a blog, and a category slug will be created automaticaly.
            </DialogDescription>
         </DialogHeader>
         <div className="mt-4">
            <Form {...form} >
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField 
                     control={form.control}
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category name</FormLabel>
                           <FormControl>
                              <Input 
                               onInput={(e) => setCategoryName((e.target as HTMLInputElement).value)}
                               placeholder='e.g. tech' {...field}/>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     />
                  <div className="flex flex-col my-3">
                     <Label className='mb-2' htmlFor='slug' >Slug</Label>
                     <Input id="slug" readOnly value={slug(categoryName)} />
                     <small className='text-xs text-muted-foreground mt-1' >Slug auto generated from category name</small>
                  </div>
                  <DialogFooter>
                     <Button
                        variant={'destructive'}
                        onClick={() => {
                           form.reset()
                           setCategoryName('')
                        }}
                        type='reset'>
                        Clear
                     </Button>
                     <Button
                        disabled={isPending}
                        type='submit'>
                        {isPending ? 'Loading...' : 'Add'}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </div>
      </DialogContent>
   </Dialog>
   </>
  )
}

export default AddCategory