import { Product } from '@/app/constans';
import React from 'react';
import ProductItem from './ProductItem';

interface HomeProductProps {
  products: Product[];
}

const HomeProduct = ({ products }: HomeProductProps) => {
  return (
    <div className="mt-12 mb-12 flex flex-col px-4 lg:px-32 xl:px-64">
    <div className="text-center mb-10">
  <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
    🚀 En Popüler Ürünler
  </h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Sizin için seçilmiş en kaliteli ve en çok tercih edilen ürünleri keşfedin. 🎯
  </p>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products?.length > 0 ? (
          products.map((product) => (

            <ProductItem product={product} key={product.id}/>



          
          ))
        ) : (
          <p className="text-gray-400 italic col-span-full">
            Ürün bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeProduct;
