'use client'

import React from 'react'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { deleteBlog } from '@/services/blogs'
import { toast } from 'sonner'
 

const DeleteBlog = ({ id, published } : { id: string, published: boolean }) => {
   const queryClient = useQueryClient()
   const { isPending, mutate } = useMutation({
      mutationFn: async (id : string) => {
         const promise = deleteBlog(id)
          toast.promise(promise, {
            loading: 'Deleting...',
            success: (data) => data.data.message || 'Blog deleted succesfuly',
            error: (data) => data?.response.data.message || 'Failed to delete blog'
         })
         return promise
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: published ? ['blogs-published'] : ['blogs-drafted'], refetchType: 'active' })
      },
      onError: (error) => {
         console.log(error)
         toast.error(error.message)
      }
   })



  return (
   <>
      <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button 
            className="text-destructive hover:text-destructive"
            variant={'ghost'}
            size={'icon'} >
            <Trash2Icon />
         </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
            </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
               disabled={isPending}
               onClick={() => mutate(id)}
               >Delete</AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
   </>
  )
}

export default DeleteBlog