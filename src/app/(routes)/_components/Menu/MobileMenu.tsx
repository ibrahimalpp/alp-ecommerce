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
import { Menu, Wallet } from "lucide-react"
import Link from 'next/link'
import { useBalanceStore } from "@/store/balanceStore"

const MobileMenu = () => {
  const { balance } = useBalanceStore();

  return (
    <div className="md:hidden px-6 pb-4 text-sm">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Alp E-ticaret <span className="text-purple-400">Store</span>
            </SheetTitle>

            <SheetDescription asChild>
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-1 mt-4">
                  {/* Menü Linkleri */}
                  {navLinks.map((link, index) => (
                    <Link
                      href={link.href}
                      key={index}
                      className="hover:bg-purple-500 rounded-xl p-2 transition duration-500 w-full"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* 💸 Bakiye Bölümü */}
                <div className="w-full border-t pt-4 mt-6 flex justify-between items-center text-sm text-gray-600">
                  <span className="font-medium">Bakiyeniz:</span>
                  <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-md">
                    <Wallet className="w-4 h-4" />
                    <span className="font-semibold">
                      ₺{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
