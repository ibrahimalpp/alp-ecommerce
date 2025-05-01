import React from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, Info, Mail } from 'lucide-react'; // İkonlar için lucide-react kullanıyoruz

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-16 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Marka */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4">Alp E-Ticaret</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Kaliteli ürünleri uygun fiyatla sunarız.<br />
            Kargoda bekletmeyiz, küfür yemeyiz.<br />
            Sen sipariş ver, biz kral gibi gönderelim. 😎
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sayfalar</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link href="/" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                <Home className="w-4 h-4" /> Anasayfa
              </Link>
            </li>
            <li>
              <Link href="/products" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                <ShoppingBag className="w-4 h-4" /> Ürünler
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                <Info className="w-4 h-4" /> Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                <Mail className="w-4 h-4" /> İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bize Ulaş</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Mail: destek@alpstore.com<br />
            Tel: +90 500 123 45 67<br />
            Adres: İstanbul / Türkiye
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-16 pt-6 text-center text-xs text-gray-500 tracking-wider">
        © {new Date().getFullYear()} Alp E-Ticaret. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
