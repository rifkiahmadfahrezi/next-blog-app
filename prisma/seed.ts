import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   // Create initial roles
   const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
         id: 'ADMIN',
         name: 'admin',
      },
   })
   const authorRole = await prisma.role.upsert({
      where: { name: 'author' },
      update: {},
      create: {
         id: 'AUTHOR',
         name: 'author',
      },
   })
   const userRole = await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
         id: 'USER',
         name: 'user',
      }
   })
   console.log({ adminRole, authorRole, userRole })
   // create initial admin & author

   const admin = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
         username: 'admin',
         email: 'admin@admin.com',
         password: '$2b$12$sHHxYCpjzwE6IgrYiPuvCetBG4QEQ0mYv/fuT208bAMIzwgJJaoUa', // admin
         roleId: 'ADMIN'
      }
   })
   const author = await prisma.user.upsert({
      where: { username: 'author' },
      update: {},
      create: {
         username: 'author',
         email: 'author@author.com',
         password: '$2b$12$usOYoRmyHXa/bkyXaeNvFeVtEGb4VmvaJwT.nXRWRzeM0rCng2yuq', // author
         roleId: 'AUTHOR'
      }
   })

   console.log({ admin, author })
}

main()
.then(async () => {
   await prisma.$disconnect()
})
.catch(async (e) => {
   console.error(e)
   await prisma.$disconnect()
   process.exit(1)
})