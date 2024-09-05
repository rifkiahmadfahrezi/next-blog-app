'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import React, { FormEvent, Suspense, useCallback, useRef } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { useSearchParams, useRouter } from 'next/navigation'

interface Props {
   type?: 'onChange' | 'onSubmit'
}

export const SearchInput = ({ type = 'onChange' } : Props) => {
   const router = useRouter()
   const searchParams = useSearchParams()
   const inputRef = useRef<null | HTMLInputElement>(null)

   const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value.toLowerCase())
   
        return params.toString()
      },
      [searchParams]
    )

   function handleSubmit(e : FormEvent<HTMLFormElement>){
      e.preventDefault()
      router.replace('?'+ createQueryString('search', inputRef.current?.value || ''))
   }
   
   function handleChange(){
      router.replace('?'+ createQueryString('search', inputRef.current?.value || ''))
   }
   
   function clear(){
      router.replace('?')
   }
  return (
   <>
      <Suspense>
         <form 
            onSubmit={type === 'onSubmit' ? handleSubmit : (e) => e.preventDefault()} 
            className='flex items-center gap-2' >
            <Input 
               onChange={type === 'onChange' ? handleChange : () => null}
               defaultValue={searchParams.get('search') ?? ''}
               ref={inputRef} 
               type='search' 
               placeholder='Search...' />
            {searchParams.get('search') &&
               <Button 
                  onClick={clear}
                  title='clear' 
                  type='button'
                  variant={'destructive'} >
                  <XIcon className='size-5' />
               </Button>
            }
            <Button type='submit' >
               <SearchIcon className='size-5' />
            </Button>
         </form>
      </Suspense>
   </>
  )
}
