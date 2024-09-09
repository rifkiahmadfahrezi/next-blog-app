import prisma from "@/services/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function GET(req:NextRequest, { params }: { params: { slug: string } }) {
   const token = await getToken({ req })
   const { slug } = params
   const isPublished = req.nextUrl.searchParams.get('published') || 'true'

   let blogs

   // if client accest drafted blogs
   if(isPublished && isPublished === 'false'){

      // check client role
      if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
         return NextResponse.json({
            status: false,
            message: `Unauthorized`
         }, { status: 401 })
      }


      blogs = await prisma.blog.findFirst({
         where: { slug, isPublished: false },
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
            user: true,
            content: true,
         },
      })

   }else if(isPublished === 'true'){
      blogs = await prisma.blog.findFirst({
         where: { slug , isPublished: true},
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
            user: true,
            content: true,
         },
      })
   }else{
      // check client role
      if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
         return NextResponse.json({
            status: false,
            message: `Unauthorized`
         }, { status: 401 })
      }
      blogs = await prisma.blog.findFirst({
         where: { slug },
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
            user: true,
            content: true,
         },
      })
     
   }


   if(!blogs){
      return NextResponse.json({
         message: 'Failed to fetch blogs, try again!'
      }, { status: 500 })
   }

   return NextResponse.json(blogs, { status: 200 })

}