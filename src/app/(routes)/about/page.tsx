'use client'

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Smile } from 'lucide-react'; // İkonlar için

const Page = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Alp E-Ticaret'e Hoşgeldin
        </h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Kaliteli ürünleri hızlı ve güvenli bir şekilde sunarak müşterilerimizin memnuniyetini en üst seviyeye çıkarmayı hedefliyoruz. Bizim için her sipariş bir dostluk başlangıcıdır!
        </p>
      </div>

      {/* Avantajlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
        <div className="flex flex-col items-center gap-4">
          <Truck className="w-12 h-12 text-purple-500" />
          <h3 className="text-xl font-semibold">Hızlı Teslimat</h3>
          <p className="text-gray-500 text-sm">Siparişlerinizi 24 saat içinde kargoluyoruz. Hızlı ve güvenilir gönderim bizim işimiz.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <ShieldCheck className="w-12 h-12 text-purple-500" />
          <h3 className="text-xl font-semibold">Güvenli Alışveriş</h3>
          <p className="text-gray-500 text-sm">Tüm işlemleriniz SSL sertifikası ile korunur. Güvende kalmanız bizim önceliğimizdir.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Smile className="w-12 h-12 text-purple-500" />
          <h3 className="text-xl font-semibold">Müşteri Memnuniyeti</h3>
          <p className="text-gray-500 text-sm">Sorun yaşarsanız hemen destek ekibimiz devrede. Sizin mutluluğunuz bizim başarımızdır.</p>
        </div>
      </div>

      {/* İletişim Butonu */}
      <div className="flex justify-center mt-16">
        <Link href="/contact">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
            Bize Ulaş
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Page;
