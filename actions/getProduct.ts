import { Category, Product, Subcategory } from "@/app/constans";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { getCategories } from "./getCategories";
import { slugify } from "@/lib/utils";

export async function getProducts(
  filter: Record<string, any> = {}, 
  sort: string[] = []
): Promise<Product[]> {
  try {
    const productRecords = await directus.request(
      readItems("product", {
        filter,
        sort,
        fields: [
          "id",
          "name",
          "description",
          "price",
          "oldPrice",
          "isHome",
          "icon",
          "category_id",
          "subcategory_id"
        ]
      })
    );

    const categoryRecords = await directus.request(readItems("category")) as Category[];
    const subcategoryRecords = await directus.request(readItems("subcategory")) as Subcategory[];

    const products: Product[] = productRecords.map((record: any) => {
      const category = categoryRecords.find(cat => cat.id === record.category_id);
      const subcategory = subcategoryRecords.find(subcat => subcat.id === record.subcategory_id);

      return {
        id: record.id,
        name: record.name,
        description: record.description,
        price: record.price,
        oldPrice: record.oldPrice || null,
        isHome: record.isHome || false,
        icon: record.icon || null,
        images: [],
        category: category ? { id: category.id, name: category.name } : null,
        subcategory: subcategory ? { id: subcategory.id, name: subcategory.name } : null,
      };
    });

    return products;
  } catch (error) {
    console.error("Ürün verileri alınırken hata oluştu:", JSON.stringify(error, null, 2));
    return [];
  }
}

export async function getProductsByCategory(categorySlug:string,subcategorySlug?:string) {
  

  try {
    
    const categories=await getCategories();

    const category=categories.find((cat:any)=>slugify(cat.name)===categorySlug);
    if(!category){
      console.error("Kategori yok");
      return[];
    }
   
    let subCategoryId=null;
    if(subcategorySlug&& category.subcategories){
      const subcategory = category.subcategories.find((sub:any)=>slugify(sub.name)===subcategorySlug)

     if(subcategory){
      subCategoryId=subcategory.id
     }
    }

       const filter:any={
        category_id:{_eq:category.id},
       };

       if(subCategoryId){
        filter.subcategory_id={_eq:subCategoryId};
       }

       const products=getProducts(filter);
       return products;



  } catch (error) {
    console.error("Ürün sıralamasında hata bulundu",error)
    
    return[];
  }
  
}
