
import { Navbar } from "@/components/common/navbar"
import Infobar from "@/components/common/infobar"

const PublicLayout = ({ children } : { children : React.ReactNode }) => {
  return (
   <> 
      <Infobar />
      <Navbar />
      {children}
   </>
  )
}

export default PublicLayout