import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
         name: 'admin',
      }
   })
   const authorRole = await prisma.role.upsert({
      where: { name: 'author' },
      update: {},
      create: {
         name: 'author',
      }
   })
   const userRole = await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
         name: 'user',
      }
   })
   console.log({ adminRole, authorRole, userRole })
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