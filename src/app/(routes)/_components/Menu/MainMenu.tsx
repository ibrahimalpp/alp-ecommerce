'use client';

import { APIURL, Category, navLinks } from '@/app/constans';
import { slugify } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react'; // opsiyonel ikon
import React from 'react';

interface MainMenuProps {
  categories: Category[];
}

const MainMenu = ({ categories }: MainMenuProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {/* Sabit NavLinkler (Home, Shop) */}
      {navLinks.slice(0, 2).map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="text-sm text-white hover:text-purple-400 font-medium transition duration-300"
        >
          {link.label}
        </Link>
      ))}

      {/* Dinamik Kategoriler */}
      {categories.slice(0, 2).map((category) => (
        <Link
          key={category.id}
          href={`/categories/${slugify(category.name)}/${slugify(category.name)}`}
          className="flex items-center gap-2 text-sm text-white hover:text-purple-400 font-medium transition duration-300"
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
          {category.name}
        </Link>
      ))}

      {/* Son NavLinkler (Blog, Contact) */}
      {navLinks.slice(4, 6).map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className="text-sm text-white hover:text-purple-400 font-medium transition duration-300"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
