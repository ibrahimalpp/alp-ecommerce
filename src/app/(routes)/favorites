// src/app/favorites/page.tsx
'use client';

import { useFavoritesStore } from '@/store/favoritesStore';
import ProductItem from '../_components/ProductItem';

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">❤️ Favorilerim</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">Hiç ürün favorilenmemiş.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
