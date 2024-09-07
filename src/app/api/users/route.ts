import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
   // check client role
   const token = await getToken({ req })

   if(!token || (token?.role !== 'admin')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }
   
   const roleId = req.nextUrl.searchParams.get("roleId");

   // chekc if role exists
   if(roleId){
      const roleExist = await prisma.role.findFirst({
         where: { id: roleId }
      });
      
      if(!roleExist){
         return NextResponse.json({ message: "Role does not exist" }, { status: 404 });
      }
      const userByRole = await prisma.user.findMany({
         where: { roleId },
         select: {
            id: true,
            username: true,
            email: true,
            role: true,
         }
      });
      
      return NextResponse.json(userByRole, { status: 200 });
   }

   const users = await prisma.user.findMany();
   return NextResponse.json(users);
}

export async function PUT(req: NextRequest){
   // check client role
   const token = await getToken({ req })

   if(!token || (token?.role !== 'admin')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const userId = req.nextUrl.searchParams.get("id") || '';

   // check if user exist
   const userExist = await prisma.user.findFirst({
      where: { id: userId }
   })

   if(!userExist){
      return NextResponse.json({
         message: "Account with provided id is not exist!"
      }, { status: 404 })
   }

   const data = await req.json()

   const user = await prisma.user.update({
      where: { 
         id: userId
      },
      data
   })

   if(!user){
      return NextResponse.json({
         message: "Failed to update account!, try again"
      }, { status: 500 })
   }
   
   return NextResponse.json({
      message: "Account updated succesfuly"
   }, { status: 200 })
}
export async function DELETE(req: NextRequest){
   // check client role
   const token = await getToken({ req })

   if(!token || (token?.role !== 'admin')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const userId = req.nextUrl.searchParams.get("id") || '';

   // check if user exist
   const userExist = await prisma.user.findFirst({
      where: { id: userId }
   })

   if(!userExist){
      return NextResponse.json({
         message: "Account with provided id is not exist!"
      }, { status: 404 })
   }

   const user = await prisma.user.delete({
      where: { 
         id: userId
      }
   })

   if(!user){
      return NextResponse.json({
         message: "Failed to delete account!, try again"
      }, { status: 500 })
   }
   
   return NextResponse.json({
      message: "Account deleted succesfuly"
   }, { status: 200 })
}
