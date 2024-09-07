import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
export default async function middleware(req: NextRequest){
   const { pathname } = req.nextUrl
   const url = new URL(req.url)

   const session = await getToken({ req })
   const redirectTo = (path: string) => NextResponse.redirect(new URL(path, url)) 

   // if user already login
   if(pathname.startsWith('/sign') && session){
      return redirectTo('/')
   }

   // if client access dashboard page
   if(pathname.startsWith('/dashboard')){
      // check login status
      if(!session) return redirectTo('/')
      // check role
      if(session?.role === 'admin' || session?.role === 'author'){
         return NextResponse.next()
      }
      return redirectTo('/')
   }

   if (
      pathname.startsWith('/dashboard/users') || 
      pathname.startsWith('/dashboard/authors') || 
      pathname.startsWith('/dashboard/admins')
   ) {
      if (session?.role !== 'admin') {
         return redirectTo('/dashboard')
      }
   }
   
}

export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
      "/dashboard",
      "/sign-in",
      "/sign-up",
   ],
 }