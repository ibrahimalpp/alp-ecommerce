'use client';

import { useEffect, useState } from "react";
import { Product } from "@/app/constans";
import HomeProduct from "@/app/(routes)/_components/HomeProduct";
import { getProducts } from "../../../../actions/getProduct";
import { Input } from "@/components/ui/input"; // Arama kutusu
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value: string) => {
    let sorted = [...filteredProducts];

    if (value === "price-low") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (value === "price-high") {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (value === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(sorted);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Başlık */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700">🚀 En Popüler Ürünler</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Sizin için seçilmiş en kaliteli ve en çok tercih edilen ürünleri keşfedin! 🎯
        </p>
      </div>

      {/* Arama ve Sıralama */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Ürün ara..."
          className="w-full md:w-1/2"
        />

        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Sırala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Fiyat: Artan</SelectItem>
            <SelectItem value="price-high">Fiyat: Azalan</SelectItem>
            <SelectItem value="name-asc">İsim: A-Z</SelectItem>
            <SelectItem value="name-desc">İsim: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400">Hiç ürün bulunamadı. 😔</p>
      ) : (
        <HomeProduct products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductsPage;
