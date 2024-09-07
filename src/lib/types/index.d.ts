export interface DBModel {
   id: string | number
   createdAt: string
   updatedAt: string
}

export interface Category extends DBModel {
   name: string
   slug: string
}

export interface Role extends DBModel {
   name: string
}

export interface User extends DBModel {
   username: string
   email: string
   password: string
   roleId: string
   role?: Role
}