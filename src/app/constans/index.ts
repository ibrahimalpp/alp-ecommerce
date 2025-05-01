// Footer'da kullanılacak her bölümün tipi
export const APIURL= process.env.NEXT_PUBLIC_DIRECTUS_URL



export type FooterSection = {
  title: string;
  links: string[];
};

// Footer bölümlerini tanımlıyoruz
export const footerSections: FooterSection[] = [
  {
    title: 'About Us',
    links: ['Who We Are', 'Our Values', 'Careers', 'Press'],
  },
  {
    title: 'Customer Service',
    links: ['Help Center', 'FAQs', 'Returns', 'Shipping Info'],
  },
  {
    title: 'Products',
    links: ['New Arrivals', 'Best Sellers', 'Gift Cards', 'Special Offers'],
  },
];

export type Navlink={
  href:string;
  label:string;
};

export const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Ürünler", href: "/product" },
  { label: "Meyve & Sebze", href: "/categories/meyve-sebze/meyve-sebze" },
  { label: "Et & Balık", href: "/categories/et-balik/et-balik" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

export type SliderItem ={
  id:string;
  title:string;
  image:string;
}

export type Subcategory={
  id:string;
  name:string;
};


export type Category={
  id:string;
  name:string;
  icon?:string;
  subcategories?:Subcategory[];
};


export type Product={
  id:number;
  name:string;
  description:string;
  price:string;
  oldPrice:string | null;
  isHome?:boolean;
  images?:string  [];
  icon?: string;
  category:Category|null;
  subcategory:Subcategory|null;
};