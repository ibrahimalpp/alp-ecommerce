import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import type { Category} from "@/app/constans"; // type olarak import



export async function getCategories(): Promise<Category[]> {
  try {
    const records = await directus.request(readItems("category"));


    const subcategories = await directus.request(readItems("subcategory"));

    const categoriesWithSubCategories= records.map((category:any)=>{
        const relatedSubcategories = subcategories.filter(
            (subcategory:any)=>subcategory.category_id === category.id
        );
        return {
            ... category,
            subcategories:relatedSubcategories,

        }
    })
       return categoriesWithSubCategories;



 
  } catch (error) {
    console.error("Kategory verileri alınırken hata oluştu:", error);
    return [];
  }
}
