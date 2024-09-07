'use client'

import React, { Suspense, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import axiosClient from '@/services/axios'
import { Role, User } from '@/lib/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { changeUserRole } from '@/services/users'
import { toast } from 'sonner'

const schema = z.object({
   roleId: z.string({ required_error: "Role is required" })
})

const RoleDropdown = ({ user }: { user: User }) => {
   const queryClient = useQueryClient()
   const { data: roles } = useQuery({
      queryKey: ['roles'],
      queryFn: async () => await axiosClient.get('/api/roles') 
   })

   const { mutate, isPending, isSuccess } = useMutation({
      mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }) => {
         const changeRolePromise = changeUserRole(userId, roleId);
         toast.promise(changeRolePromise, {
            loading: 'Loading...',
            success: (data) => data.data.message || 'Role changed successfully',
            error: (data) => data?.response.data.message || 'Failed to change role'
         });
         return changeRolePromise;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [user.role?.name + 's'], refetchType: 'active' })
      },
      onError: (error) => {
         console.log(error)
         toast.error(error.message)
      }
   })

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { roleId: user.roleId }
   })

   const onSubmit = useCallback((values: z.infer<typeof schema>) => {
      mutate({ userId: user.id.toString(), roleId: values.roleId })
   }, [user, mutate])

  return (
   <>
   <Suspense>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem className='min-w-[100px]' >
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={user.role?.name || 'unknown'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                     <SelectLabel>Change role({user.role?.name})</SelectLabel>
                     <SelectSeparator />
                     {roles?.data.map((item : Role) => (
                        <SelectItem
                           key={item.id}
                           value={item.id as string}>{item.name}</SelectItem>
                     ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {(form.getValues('roleId') && (form.getValues('roleId') !== user.roleId) && !isSuccess) &&
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

export default RoleDropdown