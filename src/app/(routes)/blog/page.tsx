'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const fakeBlogs = [
  {
    id: 1,
    title: "Yaz Aylarının Favori Ürünleri",
    description: "Yaza özel en çok satan ürünleri keşfedin! Plaj ürünleri, meyve sepetleri ve daha fazlası.",
    image: "/placeholder2.jpg",
    tag: "Yaz"
  },
  {
    id: 2,
    title: "Kışa Hazırlık Tüyoları",
    description: "Soğuk havalar için en sıcak tutan ürünleri ve alışveriş tüyolarını derledik.",
    image: "/placeholder1.jpg",
    tag: "Kış"
  },
  {
    id: 3,
    title: "En İyi Kampanyalar",
    description: "Kaçırılmayacak fırsatlarla dolu ürünleri listeledik! Hemen göz atın.",
    image: "/placeholder3.jpg",
    tag: "İndirim"
  },
];

const categories = ["Hepsi", "Yaz", "Kış", "İndirim"];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Hepsi");

  const filteredBlogs = selectedCategory === "Hepsi"
    ? fakeBlogs
    : fakeBlogs.filter((blog) => blog.tag === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Başlık */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Blog Yazılarımız
        </h1>
        <p className="text-gray-500 mt-4">Son haberler, indirimler ve trendler burada seni bekliyor.</p>
      </div>

      {/* Filtreler */}
      <div className="flex justify-center gap-4 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-purple-100 text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl hover:scale-105 transition-transform duration-500"
            >
              {/* Etiket */}
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                #{blog.tag}
              </span>

              {/* Fotoğraf */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:blur-sm group-hover:brightness-75 transition-all duration-500"
                />
              </div>

              {/* İçerik */}
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-slate-800">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="text-purple-600 hover:underline text-sm font-semibold mt-auto"
                >
                  Devamını Oku →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            Seçilen kategoride blog bulunamadı.
          </p>
        )}
      </div>

      {/* Alt Buton */}
      <div className="flex justify-center mt-16">
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-10 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300">
          Tüm Blogları Keşfet
        </button>
      </div>

    </div>
  )
}

export default Page;
