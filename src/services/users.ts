import axiosClient from "./axios";
import type { User } from "@/lib/types";


export async function getAllUsers(roleId ?: string) : Promise<User[] | undefined> {
   try {
      const res = await axiosClient.get(`/api/users?roleId=${roleId}`)
      return res.data
   } catch (error) {
      console.error(error)
   }
}

export async function changeUserRole(userId:string, roleId: string) {
   return await axiosClient.put(`/api/users?id=${userId}`, { roleId })
}
export async function deleteUser(userId:string) {
   return await axiosClient.delete(`/api/users?id=${userId}`)
}