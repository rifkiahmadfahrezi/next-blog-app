import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { convert } from 'html-to-text'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getReadingTime(
  text: string, 
  wpm :number = 225,
){
  return convert(text).length / wpm 
}