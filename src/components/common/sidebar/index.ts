import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";


export const dashboardLinks = [
   {
      label: 'Dashboard',
      href: '/dashboard'      
   },
   {
      label: 'Blogs',
      href: '/dashboard/blogs'      
   },
]

export const isMenuActive = (currentPath : string, link : string) : boolean => {
   return currentPath === '/dashboard' && link !== '/dashboard'
   ? false
   : link.startsWith(currentPath)
}

export { Sidebar, SidebarMobile }