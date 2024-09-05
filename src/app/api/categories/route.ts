import prisma from "@/services/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import slug from "slug";
import { getToken } from "next-auth/jwt";

// get all categories
export async function GET(req : NextRequest) {
   const url = new URL(req.url).searchParams
   const name = url.get('name') ?? ''

   const categories = await prisma.category.findMany({
      orderBy: {
         name: 'asc'
      },
      where: {
         name: {
            startsWith: `${name}`
         }
      }
   })
   return NextResponse.json({
      categories
   })
}

export async function POST(req : NextRequest) {
   // check client role
   const token = await getToken({ req })

   if(!token || (token?.role !== 'admin' && token?.role !== 'author')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const { name } = await req.json()
   // check if category name already exist
   const categoryExist = await prisma.category.findUnique({
      where: { name }
   })

   if(categoryExist){
      return NextResponse.json({
         status: false,
         message: `Category with name ${name} already exist!`
      }, { status: 400 })
   }

   const category = await prisma.category.create({
      data: { name, slug: slug(name) }
   })

   if(!category){
      return NextResponse.json({
         status: false,
         message: "Category failed to create!"
      }, { status: 500 })
   }

   return NextResponse.json({
      status: true,
      message: "New category created succesfuly!"
   }, { status: 201 })
}

export async function DELETE(req:NextRequest) {
   const url = new URL(req.url).searchParams
   const id = url.get('id')

   if(!id){
      return NextResponse.json({
         status: false,
         message: "Please provide category id!"
      }, { status: 400 })
   }

   // check id category exist
   const categoryExist = await prisma.category.findFirst({
      where: { id }
   })

   if(!categoryExist){
      return NextResponse.json({
         status: false,
         message: "Category with provided id is not exist!"
      }, { status: 404 })
   }
   // delete category
   const category = await prisma.category.delete({
      where: { id }
   })
   
   if(!category){
      return NextResponse.json({
         status: false,
         message: `Category failed to delete!`
      }, { status: 500 })
   }

   return NextResponse.json({
      status: true,
      message: `Category ${category.name} deleted succesfuly!`
   }, { status: 201 })

}

export async function PUT(req:NextRequest) {
   const url = new URL(req.url).searchParams
   const id = url.get('id')
   const { name } = await req.json()

   if(!id){
      return NextResponse.json({
         status: false,
         message: "Please provide category id!"
      }, { status: 400 })
   }

   // check if category exist
   const categoryExist = await prisma.category.findFirst({
      where: { id }
   })
   
   if(!categoryExist){
      return NextResponse.json({
         status: false,
         message: `Category with provided id is not exist!`
      }, { status: 500 })
   }
   // check if category name already exist
   const categoryNameExist = await prisma.category.findUnique({
      where: { name }
   })

   if(categoryNameExist){
      return NextResponse.json({
         status: false,
         message: `Category with name ${name} already exist!`
      }, { status: 400 })
   }

   const category = await prisma.category.update({
      where: { id },
      data: { 
         name, 
         slug: slug(name),
         updatedAt: new Date().toISOString()
      }
   })

   if(!category){
      return NextResponse.json({
         status: false,
         message: "Category failed to update!"
      }, { status: 500 })
   }

   return NextResponse.json({
      status: true,
      message: "Category updated succesfuly!"
   }, { status: 201 })
}