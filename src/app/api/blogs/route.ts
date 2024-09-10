import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/services/prisma";
import slug from "slug";
import { getReadingTime } from "@/lib/utils";


export async function GET(req: NextRequest) {
   const url = req.nextUrl
   const isPublished = url.searchParams.get('published') || 'true'
   const token = await getToken({ req })

   let blogs

   // if client accest drafted blogs
   if(isPublished && JSON.parse(isPublished) === false){

      // check client role
      if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
         return NextResponse.json({
            status: false,
            message: `Unauthorized`
         }, { status: 401 })
      }

      blogs = await prisma.blog.findMany({
         where: { isPublished: false },
         select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            introduction: true,
            isPublished: true,
            category: true,
            readingTime: true,
            thumbnail: true,
            user: true
         },
         orderBy: {
            updatedAt: 'desc'
         }
      })

   }else{
      blogs = await prisma.blog.findMany({
         where: { isPublished: true },
         select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            introduction: true,
            isPublished: true,
            category: true,
            readingTime: true,
            thumbnail: true,
            user: true
         },
         orderBy: {
            updatedAt: 'desc'
         }
      })

   }


   if(!blogs){
      return NextResponse.json({
         message: 'Failed to fetch blogs, try again!'
      }, { status: 500 })
   }

   return NextResponse.json(blogs, { status: 200 })
}


export async function POST(req: NextRequest) {
   // check client role
   const token = await getToken({ req })
   if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   
   const {
      title,
      thumbnail,
      introduction,
      categoryId,
      content,
      userId,
      isPublished,
   } = await req.json()

   // check if category exist
   const categoryExist = await prisma.category.findFirst({
      where: { id: categoryId }
   })

   if(!categoryExist){
      return NextResponse.json({
         message: 'Category with provided id is not exist',
      }, { status: 404 })
   }

   // check if blog with slug already exist
   const blogSlugExist = await prisma.blog.findUnique({
      where: { slug: slug(title) }
   })

   if(blogSlugExist){
      return NextResponse.json({
         message: 'Blog with the same slug already exist, please change the title!',
      }, { status: 400 })
   }
   
   // check if user exist
   const userExist = await prisma.user.findFirst({
      where: { id: userId }
   })

   if(!userExist){
      return NextResponse.json({
         message: 'User with provided id is not exist',
      }, { status: 404 })
   }

   const blog = await prisma.blog.create({
      data: {
         title,
         thumbnail,
         introduction,
         categoryId,
         content,
         userId,
         isPublished,
         readingTime: getReadingTime(content),
         slug: slug(title)
      }
   })

   if(!blog){
      return NextResponse.json({
         message: 'Failed to save blog, try again!',
      }, { status: 500 })
   }

   return NextResponse.json({
      message: !isPublished ? 'Blog drafted succesfuly' : 'Blog published succesfuly' 
   }, { status: 201 })

}
export async function PUT(req: NextRequest) {
   // check client role
   const token = await getToken({ req })
   if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const id = req.nextUrl.searchParams.get('id')

   if(!id){
      return NextResponse.json({
         message: 'Please provide blog id'
      }, { status: 400 })
   }
   // check if blog with provided id exist
   const blogExist = await prisma.blog.findFirst({
      where: { id }
   })

   if(!blogExist){
      return NextResponse.json({
         message: 'Blog with provided id is not exist'
      }, { status: 404 })
   }

   const {
      title,
      thumbnail,
      introduction,
      categoryId,
      content,
      userId,
   } = await req.json()

   // check if category exist
   const categoryExist = await prisma.category.findFirst({
      where: { id: categoryId }
   })

   if(!categoryExist){
      return NextResponse.json({
         message: 'Category with provided id is not exist',
      }, { status: 404 })
   }


   // check if blogs title change
   if(slug(title) !== blogExist.slug){
      // check if blog with slug already exist
      const blogSlugExist = await prisma.blog.findUnique({
         where: { slug: slug(title) }
      })

      if(blogSlugExist){
         return NextResponse.json({
            message: 'Blog with the same slug already exist, please change the title!',
         }, { status: 400 })
      }
   }
   
   // check if user exist
   const userExist = await prisma.user.findFirst({
      where: { id: userId }
   })

   if(!userExist){
      return NextResponse.json({
         message: 'User with provided id is not exist',
      }, { status: 404 })
   }

   const blog = await prisma.blog.update({
      where: { id },
      data: {
         title,
         thumbnail,
         introduction,
         categoryId,
         content,
         userId,
         readingTime: getReadingTime(content),
         slug: slug(title),
         updatedAt: new Date().toISOString()
      }
   })

   if(!blog){
      return NextResponse.json({
         message: 'Failed to update blog, try again!',
      }, { status: 500 })
   }

   return NextResponse.json({
      message: 'Blog updated succesfuly' 
   }, { status: 200 })

}
export async function PATCH(req: NextRequest) {
   // check client role
   const token = await getToken({ req })
   if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const id = req.nextUrl.searchParams.get('id')

   if(!id){
      return NextResponse.json({
         message: 'Please provide blog id'
      }, { status: 400 })
   }
   // check if blog with provided id exist
   const blogExist = await prisma.blog.findFirst({
      where: { id }
   })

   if(!blogExist){
      return NextResponse.json({
         message: 'Blog with provided id is not exist'
      }, { status: 404 })
   }

   const {
      isPublished,
   } = await req.json()

   const blog = await prisma.blog.update({
      where: { id },
      data: {
         isPublished,
         updatedAt: new Date().toISOString()
      }
   })

   if(!blog){
      return NextResponse.json({
         message: `Failed to ${isPublished ? "publish" : 'draft'} blog, try again!`,
      }, { status: 500 })
   }

   return NextResponse.json({
      message: `Blog ${isPublished ? "published" : 'drafted'} succesfuly` 
   }, { status: 200 })

}


export async function DELETE(req :NextRequest) {
   const url = req.nextUrl
   const id = url.searchParams.get('id')

   const token = await  getToken({ req })

   // check client role
   if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
      return NextResponse.json({
         message: "Unauthorized"
      }, { status: 401 })
   }
   
   if(!id){
      return NextResponse.json({
         message: "Please provide blog id"
      }, { status: 400 })
   }


   const blogExist = await prisma.blog.findFirst({
      where: { id }
   })

   if(!blogExist){
      return NextResponse.json({
         message: "Blog with provided id is not exist"
      }, { status: 404 })
   }

   const blog = await prisma.blog.delete({
      where: { id }
   })

   if(!blog){
      return NextResponse.json({
         message: "Blog failed to delete!"
      }, { status: 500 })
   }
   
   return NextResponse.json({
      message: "Blog deleted succesfuly"
   }, { status: 200 })

}