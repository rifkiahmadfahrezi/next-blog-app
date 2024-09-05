import type { Category } from "@/lib/types";
import axiosClient from "./axios";

export interface CategoryInput {
   name: string
}

export async function getAllCategories() : Promise<Category[] | undefined> {
   try {
      const res = await axiosClient.get('/api/categories')
      return res.data.categories
   } catch (error) {
      console.error(error)
   }
}

export async function addCategory(input:CategoryInput) {
   return await axiosClient.post('/api/categories', input)
}
export async function deleteCategory(id: string) {
   return await axiosClient.delete(`/api/categories?id=${id}`)
}
export async function updateCategory(input:CategoryInput, id: string) {
   return await axiosClient.put(`/api/categories?id=${id}`, input)
}