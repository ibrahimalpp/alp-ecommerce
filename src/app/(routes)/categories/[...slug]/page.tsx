import React from 'react'
import { getProductsByCategory } from '../../../../../actions/getProduct'
import ProductItem from '../../_components/ProductItem'

interface CategoriesDetailPageProps {
  params: Promise<{ slug: string }>
}

const CategoriesDetailPage = async ({ params }: CategoriesDetailPageProps) => {
  // URL'den gelen parametreleri alıyoruz
  const slug = (await params).slug

  // slug array'inden kategori ve alt kategori isimlerini çekiyoruz
  const categorySlug = slug[0]
  const subcategorySlug = slug[1]

  // Kategori ve alt kategoriye göre ürünleri çekiyoruz
  const products = await getProductsByCategory(categorySlug, subcategorySlug)

  console.log("Çekilen ürünler:", products)

  // Başlık için gösterilecek ismi belirliyoruz (öncelik alt kategoride)
  const displayTitle = subcategorySlug ? subcategorySlug : categorySlug

  return (
    <div className="px-4 lg:px-32 xl:px-64 mt-12 mb-12">
      {/* Üst başlık */}
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {displayTitle.replace(/-/g, " ")}
      </h1>

      {/* Ürünler listeleniyor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))
        ) : (
          // Eğer ürün yoksa kullanıcıya mesaj göster
          <p className="text-gray-400 italic col-span-full text-center">
            Ürün bulunamadı.
          </p>
        )}
      </div>
    </div>
  )
}

export default CategoriesDetailPage
