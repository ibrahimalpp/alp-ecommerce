'use client';

import { Product } from "@/app/constans";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { APIURL } from "@/app/constans";
import Link from "next/link";
import SepeteEkleButton from "@/components/SepeteEkleButton";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Heart } from "lucide-react";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const [isClient, setIsClient] = useState(false);
  const [favoriMi, setFavoriMi] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFavoriMi(isFavorite(product.id));
  }, [isFavorite, product.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Link'e gitmesini engelle
    if (favoriMi) {
      removeFavorite(product.id);
      setFavoriMi(false);
    } else {
      addFavorite(product);
      setFavoriMi(true);
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl hover:shadow-lg transition overflow-hidden relative">

      {/* 💜 Favori Kalp Butonu */}
      {isClient && (
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favoriMi ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      )}

      {/* Ürün Detay Linki */}
      <Link href={`/product/${product.id}`}>
        <div className="p-2 flex items-center justify-center bg-gray-50">
          <Image
            alt={product.name}
            src={`${APIURL}/assets/${product.icon || "default-image.jpg"}`}
            width={1000}
            height={1000}
            className="rounded-2xl w-32 h-auto"
          />
        </div>

        <div className="px-4 pt-3 flex flex-col gap-2">
          {product.category?.name && (
            <span className="text-xs bg-black text-white px-3 py-1 rounded-full w-fit">
              {product.category.name}
            </span>
          )}

          <h2 className="text-md font-semibold text-slate-700">
            {product.name}
          </h2>

          <div
            className="text-sm text-gray-500 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="flex justify-start items-center gap-3 mt-2">
            <span className="text-purple-600 font-bold">
              {product.price} ₺
            </span>
            {product.oldPrice && (
              <span className="line-through text-sm text-gray-400">
                {product.oldPrice} ₺
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Sepete Ekle Butonu */}
      <div className="px-4 pb-4 mt-2">
        <SepeteEkleButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
