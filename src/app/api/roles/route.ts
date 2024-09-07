import prisma from "@/services/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   // check client role
   const token = await getToken({ req })

   if(!token || (token?.role !== 'admin')){
      return NextResponse.json({
         status: false,
         message: `Unauthorized`
      }, { status: 401 })
   }

   const roles = await prisma.role.findMany();
   return NextResponse.json(roles);
}