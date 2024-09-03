import Navbar from "./navbar";
import NavbarMobile from "./navbar-mobile";

export const navbarLinks = [
   {
      label: 'Home',
      href: '/',
   },
   {
      label: 'Blogs',
      href: '/blogs',
   },
   {
      label: 'Podcast',
      href: '/#',
   },
   {
      label: 'Resources',
      href: '/#',
   },
]

export const isActive = (currentPath : string, link : string) : boolean => {
   return currentPath === '/' && link !== '/'
   ? false
   : link.startsWith(currentPath)
}

export {
   Navbar,
   NavbarMobile
}