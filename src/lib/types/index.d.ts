export interface DBModel {
   id: string | number
   createdAt: string
   updatedAt: string
}

export interface Category extends DBModel {
   name: string
   slug: string
}