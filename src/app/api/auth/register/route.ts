import prisma from "@/services/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import { USER_ROLE_ID } from "@/lib/contants"

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json()

    const hash = await bcrypt.hash(password, 12)

    // check username
    const usernameExist = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if(usernameExist){
      return NextResponse.json({
        status: false,
        message: `Username ${username} already registered!`
      },{ status: 409 })
    }
    // check email
    const emailExist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(emailExist){
      return NextResponse.json({
        status: false,
        message: `Email ${email} already registered!`
      },{ status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        roleId: USER_ROLE_ID // set as user role by default
      },
    })

    return NextResponse.json({
        status: true,
        message: "Register success",
        user
      },{
        status: 200
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: false, message: error.message },
        { status: 500 },
      )
    }
  }
}