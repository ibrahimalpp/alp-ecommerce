'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu } from 'lucide-react'
import { APIURL, Category } from "@/app/constans"
import Image from "next/image"
import Link from "next/link"
import { slugify } from "@/lib/utils"

interface AllCategoriesProps {
  categories: Category[]
}

const AllCategories = ({ categories }: AllCategoriesProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center gap-3 text-white bg-purple-500 px-4 rounded-md py-3 cursor-pointer w-fit">
          <Menu />
          Tüm Kategoriler
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64 text-slate-600 mt-3 shadow-lg border bg-white rounded-md">
        <DropdownMenuGroup>
          {categories && categories.length > 0 ? (
            categories.map((category) =>
              category.subcategories && category.subcategories.length > 0 ? (
                <DropdownMenuSub key={category.id}>
                  <DropdownMenuSubTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition rounded pr-0">
                    {/* Kategoriye tıklanabilirlik için içeriği Link içine alıyoruz */}
                    <Link
                      href={`/categories/${slugify(category.name)}/${slugify(category.name)}`}
                      className="flex items-center gap-2"
                    >
                      {category.icon && (
                        <Image
                          src={`${APIURL}/assets/${category.icon}`}
                          alt={category.name}
                          width={20}
                          height={20}
                          className="rounded-sm object-cover"
                        />
                      )}
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent className="w-64 text-slate-600 shadow border bg-white rounded-md">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/categories/${slugify(category.name)}/${slugify(subcategory.name)}`}
                      >
                        <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 transition">
                          {subcategory.name}
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                <Link
                  key={category.id}
                  href={`/categories/${slugify(category.name)}/${slugify(category.name)}`}
                >
                  <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                    {category.icon && (
                      <Image
                        src={`${APIURL}/assets/${category.icon}`}
                        alt={category.name}
                        width={20}
                        height={20}
                        className="rounded-sm object-cover"
                      />
                    )}
                    <span>{category.name}</span>
                  </DropdownMenuItem>
                </Link>
              )
            )
          ) : (
            <DropdownMenuItem className="px-4 py-2 italic text-gray-500">
              Kategoriler şu anda kullanılabilir değil
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AllCategories
