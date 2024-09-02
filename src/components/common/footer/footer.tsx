import React from 'react'
import Link from 'next/link'

import { footerLinks } from '.'

import { TwitterIcon, LinkedinIcon, FacebookIcon } from 'lucide-react'

const Footer = () => {
  return (
  <footer className='py-10 border-t bg-background'>
    <div className="container mx-auto px-5">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 ">
        {footerLinks.map(item => (
          <li key={item.group}>
            <h1 className='font-bold text-xl' >{item.group}</h1>

            <ul className='mt-5 space-y-2' >
              {item.links.map(a => (
                 <li key={a.href} >
                  <Link className='text-muted-foreground hover:underline' href={a.href}>
                    {a.label}
                  </Link>
                 </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <hr className='my-5' />
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="space-x-2">
          <Link 
            href={'/#'}
            className="hover:underline text-muted-foreground">
              Terms & Condition
          </Link>

          <Link 
            href={'/#'}
            className="hover:underline text-muted-foreground">
              Privacy Policy
          </Link>
        </div>

        <div className="">
          
        </div>
        <div className="">
          <p className='text-muted-foreground' >&copy; {new Date().getFullYear()} FutureTech. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer