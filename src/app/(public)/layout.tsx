import React from "react"
import { Navbar } from "@/components/common/navbar"
import Infobar from "@/components/common/infobar"
import { Footer } from "@/components/common/footer"

const PublicLayout = ({ children } : { children : React.ReactNode }) => {
  return (
   <> 
      <Infobar />
      <Navbar />
      <main className="min-h-svh">
        {children}
      </main>
      <Footer />
   </>
  )
}

export default PublicLayout