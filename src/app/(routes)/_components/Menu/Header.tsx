'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserButton from "./User";
import MobileMenu from "./MobileMenu";
import AllCategories from "./AllCategories";
import MainMenu from "./MainMenu";
import Cart from "./Cart";
import { Category } from "@/app/constans";
import { getCategories } from "../../../../../actions/getCategories";
import { useBalanceStore } from "@/store/balanceStore";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { balance } = useBalanceStore();
  const [isClient, setIsClient] = useState(false);
  const [userExists, setUserExists] = useState(false); // 💥 Kullanıcı var mı localStorage'da?

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem('user');
      setUserExists(!!userData); // user varsa true, yoksa false
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <header className="w-full bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition">
          Alp E-ticaret <span className="text-purple-400">Store</span>
        </Link>

        {/* Menü */}
        <nav className="hidden md:flex items-center gap-8">
          <MainMenu categories={categories} />
        </nav>

        {/* Sağ ikonlar */}
        <div className="flex items-center gap-3">
          <Cart />
          <UserButton />

          {/* Wallet */}
          {isClient && userExists && (
            <div className="hidden sm:flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Wallet className="w-4 h-4" />
              <span>₺{balance.toFixed(2)}</span>
            </div>
          )}

          {/* Mobil Menü Butonu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {mobileOpen && <MobileMenu />}

      {/* Tüm Kategoriler */}
      <div className="hidden lg:flex py-4 flex-row lg:px-32 xl:px-64 mx-2 items-center justify-between">
        <AllCategories categories={categories} />
      </div>
    </header>
  );
};

export default Header;
