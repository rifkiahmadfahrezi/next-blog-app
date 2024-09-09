import axiosClient from "./axios";
import type { Blog } from "@/lib/types";

export interface BlogInput {
   title: string;
   thumbnail: string;
   introduction: string;
   content: string;
   categoryId: string;
   isPublished: boolean;
   userId?: string // optinal on update
}

export async function getAllBlogs(isPublished?: boolean) : Promise<Blog[] | undefined> {
   try {
      const res = await axiosClient.get(`/api/blogs?published=${isPublished}`)
      return res.data
   } catch (error) {
      console.error(error)
   }
}
// export async function getBlogById(id: string) : Promise<Blog | undefined> {
//    try {
//       const res = await axiosClient.get(`/api/blogs?id=${id}`)
//       return res.data
//    } catch (error) {
//       console.error(error)
//    }
// }

export async function addblog(input: BlogInput) {
   return await axiosClient.post('/api/blogs', input)
}
export async function deleteBlog(id: string) {
   return await axiosClient.delete(`/api/blogs?id=${id}`)
}
export async function chageBlogVisibility(id: string, isPublished: boolean) {
   return await axiosClient.patch(`/api/blogs?id=${id}`, { isPublished })
}
export async function updateblog(input: BlogInput, id: string) {
   return await axiosClient.put(`/api/blogs?id=${id}`, input)
}