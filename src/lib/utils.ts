import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { convert } from 'html-to-text'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadingTime(
  text: string, 
  wpm :number = 200,
){
  const base64ImagePattern = /<img[^>]+src="data:image\/[^;]+;base64[^"]*"[^>]*>/g
  const textWithoutImages = text.replace(base64ImagePattern, '')
  const plainText = convert(textWithoutImages)
  
  return plainText.split(' ').length / wpm
}