import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/services/prisma'
import bcrypt from "bcrypt"

const authOption : NextAuthOptions = {
   session: {
      strategy: 'jwt'
   },
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      CredentialsProvider({
         type: 'credentials',
         name: 'credentials',
         credentials: {
            email: {
               label: "Email",
               type: 'email'
            },
            password: {
               label: "Password",
               type: 'password'
            },
         },
         async authorize(credentials){
            const { email, password } = credentials as {
               email: string, password: string
            }

            const user = await prisma.user.findUnique({
               where: { email },
               select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  roleId: true,
                  role: true
               }
            })

            if (!user) {
               throw new Error(`Account with email ${email} is not registered!`)
             }
            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
               throw new Error('Password is incorrect')
            }


            return {
               id: user.id,
               username: user.username,
               email: user.email,
               roleId: user.roleId,
               role: user.role.name
            }
         }
      })
   ],
   pages: {
      signIn: '/sign-in',
   },
   callbacks: {
      async jwt({token, user}){
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         if(user) token.role = user.role
         return token
      },
      async session({session, token}){
         return {
            ...session,
            id: token.id,
            role: token.role
         }
      }
   }
}


const handler = NextAuth(authOption)


export {
   handler as GET,
   handler as POST
}