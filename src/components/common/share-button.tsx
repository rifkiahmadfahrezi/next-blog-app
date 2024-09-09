'use client'
import React, { useCallback } from 'react'
import { Button } from '../ui/button'
import { Share2Icon } from 'lucide-react'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface Props {
   data: ShareData,
   className?: ClassValue
}

const ShareButton = (props : Props) => {

   const shareHandler = useCallback(async () => {
      if(navigator.canShare(props.data)){
         try {
            await navigator.share(props.data)
         } catch (error) {
            console.error(error)
            toast.error("Failed to share")
         }
      }
   }, [props.data])
  return (
   <>
      <Button className={cn('flex items-center gap-2 p-5 rounded-full', props.className)} 
         onClick={shareHandler}
         variant={'outline'} >
         <Share2Icon className='size-5' />
         Share
      </Button>
   </>
  )
}

export default ShareButton