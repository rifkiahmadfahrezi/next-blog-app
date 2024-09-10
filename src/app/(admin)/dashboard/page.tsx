import React from 'react'

import { Card } from '@/components/ui/card'

const DashboarPage = () => {
  return (
  <>
    <Card className="p-6">
        <h1 className="text-3xl font-bold mb-10">Welcome, 👋</h1>
        <h2 className="text-2xl font-bold mb-4">Fullstack NextJS Blog app</h2>
        <p className="text-lg ">Simple blog web application, built with NextJS, TypeScript, Prisma, React-Query, and Shadcn UI.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Main Features</h2>
        <ul className="list-disc list-inside space-y-2 ">
            <li>Multi-role authentication (admin, author, user)</li>
            <li>Responsive design</li>
            <li>Rich text editor</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
                <h3 className="text-xl font-medium mb-2">Client</h3>
                <ul className="list-disc list-inside">
                    <li>NextJS (TypeScript)</li>
                    <li>React-Query</li>
                    <li>Shadcn UI</li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-2">Server</h3>
                <ul className="list-disc list-inside">
                    <li>NextJS API routes</li>
                    <li>Prisma</li>
                    <li>PostgreSQL (Supabase)</li>
                </ul>
            </div>
        </div>
    </Card>

  </>
  )
}

export default DashboarPage