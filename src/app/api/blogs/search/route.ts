import prisma from "@/services/prisma"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
   const url = req.nextUrl
   const keyword = url.searchParams.get('keyword')
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
         where: clauseGenerator(false, keyword || ''),
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
            updatedAt: 'asc'
         },
      })

   }else{
      blogs = await prisma.blog.findMany({
         where: clauseGenerator(true, keyword || ''),
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
            updatedAt: 'asc'
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

function clauseGenerator(isPublished: boolean, keyword : string){
   return keyword ? {
      isPublished,
      title: {
         search: keyword
      }
   } : {
      isPublished: false,
   }
}