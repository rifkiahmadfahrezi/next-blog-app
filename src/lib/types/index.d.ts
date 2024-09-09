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

export interface Blog extends DBModel{
   id: string;
   title: string;
   slug: string;
   thumbnail: string;
   introduction: string;
   readingTime: number;
   content: string;
   categoryId: string;
   isPublished: boolean;
   userId: string;
   user: User
   category: Category
}