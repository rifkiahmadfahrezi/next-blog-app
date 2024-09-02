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
      label: 'News',
      href: '/#',
   },
   {
      label: 'Podcast',
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