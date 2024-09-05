import Sidebar from "./sidebar";
import SidebarMobile from "./sidebar-mobile";


// (author & admin)
export const dashboardLinks = [
   {
      label: 'Dashboard',
      href: '/dashboard'      
   },
   {
      label: 'Blogs',
      href: '/dashboard/blogs'      
   },
   {
      label: 'Categories',
      href: '/dashboard/categories'      
   },
]

// admin only
export const adminDashboardLinks = [
   {
      label: 'Admins',
      href: '/dashboard/admins'      
   },
   {
      label: 'Authors',
      href: '/dashboard/authors'      
   },
   {
      label: 'Users',
      href: '/dashboard/users'      
   },
]

export const isMenuActive = (currentPath : string, link : string) : boolean => {
   return currentPath === '/dashboard' && link !== '/dashboard'
   ? false
   : link.startsWith(currentPath)
}

export { Sidebar, SidebarMobile }