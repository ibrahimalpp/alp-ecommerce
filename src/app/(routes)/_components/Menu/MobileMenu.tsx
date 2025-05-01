'use client'
import { navLinks } from "@/app/constans"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from 'next/link'

const MobileMenu = () => {
  return (
    <div className="md:hidden px-6 pb-4 space-y-2 text-sm">
     <Sheet>
  <SheetTrigger><Menu/></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>  Alp E-ticaret <span className="text-purple-400">Store</span></SheetTitle>
      <SheetDescription asChild>
       <div className="flex flex-col gap-1 items-start">
       {navLinks.map((link,index)=>(
            <Link href={link.href} key={index} className='hover:bg-purple-500 rounded-xl p-2 transition duration-500'>
                {link.label}
            </Link>
        ))}
       </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default MobileMenu
